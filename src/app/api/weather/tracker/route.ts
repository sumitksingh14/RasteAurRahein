import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { ALL_HUB_LOCATIONS } from "@/lib/weatherCoords";

const CACHE_TTL = 600; // 10 minutes
const CACHE_KEY = "weather:tracker";

export async function GET() {
  // Check Redis cache
  try {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { headers: { "X-Cache": "HIT" } });
    }
  } catch {
    // proceed
  }

  // Batch fetch all hub locations in parallel
  const results = await Promise.allSettled(
    ALL_HUB_LOCATIONS.map(async (loc) => {
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", String(loc.lat));
      url.searchParams.set("longitude", String(loc.lon));
      url.searchParams.set("current", [
        "temperature_2m",
        "apparent_temperature",
        "precipitation",
        "weather_code",
      ].join(","));
      url.searchParams.set("timezone", "Asia/Kolkata");
      url.searchParams.set("forecast_days", "1");

      const res = await fetch(url.toString(), { next: { revalidate: 0 } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();

      return {
        name: loc.name,
        lat: loc.lat,
        lon: loc.lon,
        tempC: raw.current.temperature_2m,
        feelsLikeC: raw.current.apparent_temperature,
        precipMm: raw.current.precipitation,
        weatherCode: raw.current.weather_code,
      };
    })
  );

  const locations = results.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    return {
      name: ALL_HUB_LOCATIONS[i].name,
      lat: ALL_HUB_LOCATIONS[i].lat,
      lon: ALL_HUB_LOCATIONS[i].lon,
      tempC: null,
      feelsLikeC: null,
      precipMm: null,
      weatherCode: null,
      error: true,
    };
  });

  const payload = { locations, fetchedAt: new Date().toISOString() };

  try {
    await redis.set(CACHE_KEY, JSON.stringify(payload), CACHE_TTL);
  } catch {
    // non-fatal
  }

  return NextResponse.json(payload, { headers: { "X-Cache": "MISS" } });
}
