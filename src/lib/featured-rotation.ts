import type { Trip } from "@/lib/types";
import { TRIP_REGION_MAP, REGIONS } from "@/lib/regions";

/**
 * Returns current date formatted as YYYY-MM-DD in India Standard Time (IST, UTC+5:30).
 */
export function getISTDateKey(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Returns current month (1-12) in India Standard Time.
 */
export function getISTMonth(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "numeric",
  }).formatToParts(date);
  const m = parts.find((p) => p.type === "month")?.value;
  return m ? parseInt(m, 10) : date.getMonth() + 1;
}

/**
 * Polynomial string hash for consistent cross-platform seed generation.
 */
function hashDateString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Mulberry32 pseudo-random number generator for deterministic daily sequence.
 */
function createMulberry32(seed: number) {
  let s = seed | 0;
  return function next(): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Checks if a trip is well-suited for the given IST month.
 */
export function isTripInSeason(trip: Trip, month: number): boolean {
  const monthNames = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
  ];
  const currentMonthCode = monthNames[month - 1];
  const tripMonth = (trip.bestSuggestedMonth ?? "").toLowerCase();
  const tripTags = (trip.tags ?? []).map((t) => t.toLowerCase());

  // Direct month match
  if (tripMonth.includes(currentMonthCode)) return true;

  // Seasonal groupings in India:
  // Winter: Dec, Jan, Feb
  // Summer/Pre-monsoon: Mar, Apr, May
  // Monsoon: Jun, Jul, Aug, Sep
  // Autumn/Post-monsoon: Oct, Nov
  if ([12, 1, 2].includes(month)) {
    return (
      /dec|jan|feb|winter|snow/.test(tripMonth) ||
      tripTags.some((t) => /winter|snow|december|january|february/.test(t))
    );
  }
  if ([3, 4, 5].includes(month)) {
    return (
      /mar|apr|may|spring|summer/.test(tripMonth) ||
      tripTags.some((t) => /spring|summer|march|april|may/.test(t))
    );
  }
  if ([6, 7, 8, 9].includes(month)) {
    return (
      /jun|jul|aug|sep|monsoon|rain/.test(tripMonth) ||
      tripTags.some((t) => /monsoon|rain|waterfall|june|july|august|september/.test(t))
    );
  }
  if ([10, 11].includes(month)) {
    return (
      /oct|nov|autumn|fall|post-monsoon/.test(tripMonth) ||
      tripTags.some((t) => /autumn|october|november|diwali/.test(t))
    );
  }

  return false;
}

/**
 * Identifies the primary region key for a trip.
 */
export function getTripPrimaryRegion(trip: Trip): string {
  const mapped = TRIP_REGION_MAP[trip.slug];
  if (mapped && mapped.length > 0) return mapped[0];

  const matched = REGIONS.find((r) =>
    r.tags.some((rtag) =>
      trip.tags?.some(
        (ttag) =>
          ttag.toLowerCase() === rtag.toLowerCase() ||
          ttag.toLowerCase().includes(rtag.toLowerCase())
      )
    )
  );

  return matched?.slug || "general";
}

/**
 * Computes a balanced, deterministically rotated list of featured trips for today.
 *
 * Balance criteria:
 * - Deterministic rotation based on current date in IST.
 * - Seasonality bonus: trips matching current weather/season receive higher rank.
 * - Popularity weight: accounts for views/likes baseline to ensure quality.
 * - Regional diversity: max 2 trips per region so homepage isn't dominated by one area.
 * - Single row size: returns targetCount (default 8) distinct trips.
 */
export function getDailyFeaturedTrips(
  trips: Trip[],
  targetCount = 8,
  date = new Date()
): Trip[] {
  if (!trips || trips.length === 0) return [];
  if (trips.length <= targetCount) return [...trips];

  const dateKey = getISTDateKey(date);
  const istMonth = getISTMonth(date);

  // Assign deterministic daily composite score
  const scoredTrips = trips.map((trip) => {
    // Deterministic random jitter in [0, 1] for this trip today
    const tripSeed = hashDateString(`${dateKey}-${trip.slug}`);
    const tripRng = createMulberry32(tripSeed);
    const dailyJitter = tripRng();

    const inSeason = isTripInSeason(trip, istMonth);
    const seasonScore = inSeason ? 2.5 : 0;

    // Log-scaled popularity to prevent one super-viral trip from permanent lock-in
    const popularity = Math.log10(Math.max(1, (trip.viewCount ?? 0) + (trip.likes ?? 0) * 5));

    // Composite score combining daily rotation jitter, seasonal relevance, and popularity
    const score = dailyJitter * 4.0 + seasonScore + popularity * 0.8;

    return {
      trip,
      score,
      region: getTripPrimaryRegion(trip),
      inSeason,
    };
  });

  // Sort by highest composite score
  scoredTrips.sort((a, b) => b.score - a.score);

  // Greedily pick with regional diversity: max 2 trips per region
  const selected: Trip[] = [];
  const regionCounts: Record<string, number> = {};
  const deferred: Trip[] = [];

  for (const item of scoredTrips) {
    const currentRegionCount = regionCounts[item.region] || 0;
    if (currentRegionCount < 2) {
      selected.push(item.trip);
      regionCounts[item.region] = currentRegionCount + 1;
      if (selected.length === targetCount) break;
    } else {
      deferred.push(item.trip);
    }
  }

  // If region caps prevented reaching targetCount, fill remaining from deferred
  if (selected.length < targetCount && deferred.length > 0) {
    for (const trip of deferred) {
      selected.push(trip);
      if (selected.length === targetCount) break;
    }
  }

  return selected;
}
