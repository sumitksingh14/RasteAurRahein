/**
 * Trip Alert System — Redis-backed road/trail condition alerts.
 *
 * Redis schema:
 *   alert:{slug}  →  JSON string of TripAlert  (or doesn't exist = no alert)
 *
 * Status meanings:
 *   "open"    — Route is accessible, no known issues
 *   "caution" — Proceed with care; conditions noted (landslide risk, road damage, etc.)
 *   "closed"  — Route is inaccessible (blocked road, flooded, military restriction)
 */

import { redis } from "@/lib/redis";

export interface TripAlert {
  slug: string;
  status: "open" | "caution" | "closed";
  message: string;
  updatedAt: string;   // ISO 8601
  updatedBy?: string;  // admin username
}

function alertKey(slug: string) {
  return `alert:${slug}`;
}

export async function getTripAlert(slug: string): Promise<TripAlert | null> {
  try {
    const raw = await redis.get(alertKey(slug));
    if (!raw) return null;
    return JSON.parse(raw as string) as TripAlert;
  } catch {
    return null;
  }
}

export async function setTripAlert(alert: TripAlert): Promise<void> {
  await redis.set(alertKey(alert.slug), JSON.stringify(alert));
}

export async function deleteTripAlert(slug: string): Promise<void> {
  await redis.del(alertKey(slug));
}

/** Fetch alerts for multiple slugs in one round trip */
export async function getBulkAlerts(slugs: string[]): Promise<Record<string, TripAlert>> {
  if (slugs.length === 0) return {};
  try {
    const keys = slugs.map(alertKey);
    const values = await Promise.all(keys.map((k) => redis.get(k)));
    const result: Record<string, TripAlert> = {};
    slugs.forEach((slug, i) => {
      const raw = values[i];
      if (raw) {
        try {
          result[slug] = JSON.parse(raw as string) as TripAlert;
        } catch { /* ignore bad JSON */ }
      }
    });
    return result;
  } catch {
    return {};
  }
}
