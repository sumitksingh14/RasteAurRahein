import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const CACHE_TTL = 86400; // 24 hours
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const cacheKey = `weather:climate:${lat}:${lon}`;

  // Check Redis cache
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), { headers: { "X-Cache": "HIT" } });
    }
  } catch {
    // proceed
  }

  // Fetch 5 years of monthly historical data from Open-Meteo Archive API
  const endYear = new Date().getFullYear() - 1;
  const startYear = endYear - 4; // 5-year window
  const startDate = `${startYear}-01-01`;
  const endDate = `${endYear}-12-31`;

  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);
  url.searchParams.set("daily", [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
  ].join(","));
  url.searchParams.set("timezone", "Asia/Kolkata");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 0 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch climate data" }, { status: 502 });
    }

    const raw = await res.json();

    // Aggregate daily data into monthly averages (across all 5 years)
    const monthlyAccum: Record<
      number,
      { maxTemps: number[]; minTemps: number[]; precipTotal: number; days: number }
    > = {};

    for (let m = 0; m < 12; m++) {
      monthlyAccum[m] = { maxTemps: [], minTemps: [], precipTotal: 0, days: 0 };
    }

    raw.daily.time.forEach((dateStr: string, i: number) => {
      const month = new Date(dateStr).getMonth();
      const acc = monthlyAccum[month];
      if (raw.daily.temperature_2m_max[i] !== null) acc.maxTemps.push(raw.daily.temperature_2m_max[i]);
      if (raw.daily.temperature_2m_min[i] !== null) acc.minTemps.push(raw.daily.temperature_2m_min[i]);
      if (raw.daily.precipitation_sum[i] !== null) acc.precipTotal += raw.daily.precipitation_sum[i];
      acc.days++;
    });

    const avg = (arr: number[]) =>
      arr.length > 0 ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : null;

    const monthly = MONTHS.map((name, m) => {
      const acc = monthlyAccum[m];
      return {
        month: name,
        monthIndex: m,
        avgMaxC: avg(acc.maxTemps),
        avgMinC: avg(acc.minTemps),
        avgPrecipMm: acc.days > 0 ? Math.round((acc.precipTotal / (acc.days / 30)) * 10) / 10 : 0,
      };
    });

    // Compute "best months" — lower rainfall + moderate temps (10–35°C avg)
    const bestMonths = monthly
      .filter((m) => {
        const avgTemp = m.avgMaxC !== null && m.avgMinC !== null
          ? (m.avgMaxC + m.avgMinC) / 2
          : null;
        return (
          m.avgPrecipMm < 80 &&
          avgTemp !== null &&
          avgTemp >= 5 &&
          avgTemp <= 36
        );
      })
      .map((m) => m.month);

    const payload = {
      monthly,
      bestMonths,
      dataYears: `${startYear}–${endYear}`,
    };

    // Cache for 24h
    try {
      await redis.set(cacheKey, JSON.stringify(payload), CACHE_TTL);
    } catch {
      // non-fatal
    }

    return NextResponse.json(payload, { headers: { "X-Cache": "MISS" } });
  } catch (err) {
    console.error("Climate data fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
