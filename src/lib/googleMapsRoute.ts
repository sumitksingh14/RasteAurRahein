/**
 * Builds a Google Maps Directions URL for a multi-stop route.
 * No API key required — uses the public Google Maps web URL scheme.
 *
 * Format: https://www.google.com/maps/dir/Origin/Stop1/Stop2/Destination
 */

export interface RouteStop {
  label: string;
  lat?: number;
  lng?: number;
}

/**
 * Build a Google Maps Directions URL.
 *
 * @param origin      - Starting point (city name or "lat,lng")
 * @param destination - Final destination (city name or "lat,lng")
 * @param waypoints   - Optional intermediate stops
 * @returns           - Full Google Maps directions URL
 */
export function buildGoogleMapsUrl(
  origin: string,
  destination: string,
  waypoints?: RouteStop[]
): string {
  const base = "https://www.google.com/maps/dir/";

  const stops: string[] = [
    origin,
    ...(waypoints ?? []).map((wp) =>
      wp.lat && wp.lng ? `${wp.lat},${wp.lng}` : wp.label
    ),
    destination,
  ].filter(Boolean);

  // Encode each stop and join with "/"
  const path = stops.map((s) => encodeURIComponent(s)).join("/");

  return `${base}${path}`;
}

/**
 * Extract named waypoints from an itinerary (activities with location or
 * transport activities that name a place in their title).
 */
export interface ItineraryActivity {
  title: string;
  type?: string;
  location?: { name: string; lat?: number; lng?: number };
}

export interface ItineraryDay {
  activities: ItineraryActivity[];
}

export function extractWaypointsFromItinerary(
  days: ItineraryDay[]
): RouteStop[] {
  const seen = new Set<string>();
  const waypoints: RouteStop[] = [];

  for (const day of days) {
    for (const activity of day.activities ?? []) {
      // Prefer activities with explicit location data
      if (activity.location?.name) {
        const key = activity.location.name.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          waypoints.push({
            label: activity.location.name,
            lat: activity.location.lat,
            lng: activity.location.lng,
          });
        }
      }
    }
  }

  return waypoints;
}
