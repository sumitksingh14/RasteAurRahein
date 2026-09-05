/**
 * Geolocation utility — asks the browser for GPS coordinates,
 * then reverse-geocodes them with Nominatim (OpenStreetMap) to get a
 * human-readable city/area string. No API key required.
 *
 * Also provides forward-geocoding (searchLocations) for autocomplete
 * suggestions as the user types.
 */

export type GeolocationStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unavailable"
  | "error";

// ---------------------------------------------------------------------------
// Location suggestion (forward-geocoding)
// ---------------------------------------------------------------------------
export interface LocationSuggestion {
  /** Human-readable one-liner shown in the dropdown */
  label: string;
  /** Short display name — city / town / village */
  city: string;
  /** State / province */
  state: string;
  /** Country */
  country: string;
  lat: number;
  lng: number;
}

/**
 * Query Nominatim for up to `limit` place suggestions matching `query`.
 * Debounce the caller to avoid hitting the 1 req/s rate-limit.
 *
 * @param query  - User's typed text (min 2 chars recommended)
 * @param limit  - Maximum suggestions returned (default 6)
 */
export async function searchLocations(
  query: string,
  limit = 6
): Promise<LocationSuggestion[]> {
  if (!query || query.trim().length < 2) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", String(limit));
  // Bias results toward India first, but don't restrict — useful for
  // international starting points too.
  url.searchParams.set("countrycodes", "in,np,lk,bt,bd,pk,mm,th,id,my,vn,kh,la,cn");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "RasteAurRahein/1.0 (travel-blog)" },
  });

  if (!res.ok) return [];

  const data: Array<{
    display_name: string;
    lat: string;
    lon: string;
    address: Record<string, string>;
    type: string;
  }> = await res.json();

  return data
    .filter((r) => {
      // Only include meaningful place types (skip roads, postcodes, etc.)
      const t = r.type;
      return (
        t === "city" || t === "town" || t === "village" || t === "municipality" ||
        t === "suburb" || t === "neighbourhood" || t === "administrative" ||
        t === "state" || t === "county" || t === "district" || t === "region"
      );
    })
    .map((r) => {
      const addr = r.address ?? {};
      const city =
        addr.city || addr.town || addr.village || addr.municipality ||
        addr.suburb || addr.county || addr.state_district || "";
      const state = addr.state || addr.state_district || "";
      const country = addr.country || "";

      // Build a compact label: "City, State, Country"
      const parts = [city, state, country].filter(Boolean);
      const label = parts.join(", ") || r.display_name.split(",").slice(0, 3).join(", ");

      return {
        label,
        city,
        state,
        country,
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
      };
    })
    .filter((s, i, arr) => {
      // Deduplicate by label
      return arr.findIndex((x) => x.label === s.label) === i;
    });
}



export interface GeolocationResult {
  label: string;       // "Koramangala, Bengaluru, Karnataka"
  city: string;        // "Bengaluru"
  area: string;        // "Koramangala"
  state: string;       // "Karnataka"
  lat: number;
  lng: number;
}

/** Ask browser for position and resolve to structured location info. */
export async function detectUserLocation(): Promise<GeolocationResult> {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  // Step 1: Get GPS coordinates
  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000, // cache for 5 min
    });
  });

  const { latitude: lat, longitude: lng } = position.coords;

  // Step 2: Reverse-geocode using Nominatim (OpenStreetMap, no API key needed)
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

  const res = await fetch(url, {
    headers: {
      // Nominatim requires a User-Agent identifying the application
      "User-Agent": "RasteAurRahein/1.0 (travel-blog)",
    },
  });

  if (!res.ok) {
    throw new Error(`Reverse geocoding failed: ${res.status}`);
  }

  const data = await res.json();
  const addr = data.address ?? {};

  // Extract relevant address components (Nominatim returns different keys by region)
  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.municipality ||
    addr.county ||
    "";

  const area =
    addr.suburb ||
    addr.neighbourhood ||
    addr.quarter ||
    addr.residential ||
    addr.road ||
    "";

  const state = addr.state || addr.state_district || "";

  // Build a human-readable label
  const parts = [area, city, state].filter(Boolean);
  const label = parts.length > 0 ? parts.join(", ") : data.display_name ?? "Your Location";

  return { label, city, area, state, lat, lng };
}

/** Map browser GeolocationPositionError codes to user-friendly messages. */
export function geolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location access was denied. Please type your starting city manually.";
    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable right now.";
    case error.TIMEOUT:
      return "Location request timed out. Please try again or type your city manually.";
    default:
      return "Could not detect your location. Please enter it manually.";
  }
}
