import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const CACHE_TTL = 600; // 10 minutes

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const cacheKey = `weather:forecast:${lat}:${lon}`;

  // Check Redis cache
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      });
    }
  } catch {
    // If cache fails, proceed to live fetch
  }

  // Fetch from Open-Meteo (no API key required)
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("current", [
    "temperature_2m",
    "apparent_temperature",
    "relative_humidity_2m",
    "precipitation",
    "weather_code",
    "wind_speed_10m",
    "wind_direction_10m",
  ].join(","));
  url.searchParams.set("daily", [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "precipitation_probability_max",
    "wind_speed_10m_max",
    "sunrise",
    "sunset",
  ].join(","));
  url.searchParams.set("timezone", "Asia/Kolkata");
  url.searchParams.set("forecast_days", "7");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 0 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 502 });
    }

    const raw = await res.json();

    // Simplify the response
    const payload = {
      current: {
        tempC: raw.current.temperature_2m,
        feelsLikeC: raw.current.apparent_temperature,
        humidity: raw.current.relative_humidity_2m,
        precipMm: raw.current.precipitation,
        weatherCode: raw.current.weather_code,
        windKph: raw.current.wind_speed_10m,
        windDir: raw.current.wind_direction_10m,
      },
      daily: raw.daily.time.map((date: string, i: number) => ({
        date,
        weatherCode: raw.daily.weather_code[i],
        maxC: raw.daily.temperature_2m_max[i],
        minC: raw.daily.temperature_2m_min[i],
        precipMm: raw.daily.precipitation_sum[i],
        precipProbability: raw.daily.precipitation_probability_max[i],
        windMaxKph: raw.daily.wind_speed_10m_max[i],
        sunrise: raw.daily.sunrise[i],
        sunset: raw.daily.sunset[i],
      })),
    };

    // Cache the response
    try {
      await redis.set(cacheKey, JSON.stringify(payload), CACHE_TTL);
    } catch {
      // Cache write failure is non-fatal
    }

    return NextResponse.json(payload, { headers: { "X-Cache": "MISS" } });
  } catch (err) {
    console.error("Weather forecast fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
