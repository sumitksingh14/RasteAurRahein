import { cache } from "react";
import type { Trip, Author } from "./types";
import { redis } from "./redis";
import { DEMO_TRIPS } from "./data/trips";
import { DEMO_AUTHOR } from "./data/author";

export { DEMO_TRIPS, DEMO_AUTHOR };

const TRIPS_INDEX_KEY = "trips:index";

// ──────────────────────────────────────────────────
// Process-level Cache (O(1) lookups)
// ──────────────────────────────────────────────────
let tripSlugIndex: Map<string, Trip> | null = null;

function getStaticTripBySlug(slug: string): Trip | null {
  if (!tripSlugIndex) {
    tripSlugIndex = new Map(DEMO_TRIPS.map((t) => [t.slug, t]));
  }
  return tripSlugIndex.get(slug) || null;
}

// ──────────────────────────────────────────────────
// Redis Helpers
// ──────────────────────────────────────────────────
async function getRedisTrips(): Promise<Trip[]> {
  try {
    const slugs = await redis.smembers(TRIPS_INDEX_KEY);
    if (!slugs || slugs.length === 0) return [];
    const trips = await Promise.all(
      slugs.map(async (slug) => {
        const raw = await redis.get(`trip:${slug}`);
        if (!raw) return null;
        try {
          return JSON.parse(raw) as Trip;
        } catch {
          return null;
        }
      })
    );
    return trips.filter(Boolean) as Trip[];
  } catch {
    return [];
  }
}

// ──────────────────────────────────────────────────
// Query Layer (with React.cache for request-level memoization)
// ──────────────────────────────────────────────────

export const getAllTrips = cache(async (): Promise<Trip[]> => {
  const redisTrips = await getRedisTrips();
  const redisSlugs = new Set(redisTrips.map((t) => t.slug));
  const filteredDemo = DEMO_TRIPS.filter((t) => !redisSlugs.has(t.slug));
  return [...redisTrips, ...filteredDemo].sort(
    (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );
});

export const getTripBySlug = cache(async (slug: string): Promise<Trip | null> => {
  try {
    const raw = await redis.get(`trip:${slug}`);
    if (raw) return JSON.parse(raw) as Trip;
  } catch {
    // fall through to static data
  }
  return getStaticTripBySlug(slug);
});

export const getTripsByRegion = cache(async (regionSlug: string): Promise<Trip[]> => {
  const all = await getAllTrips();
  return all.filter((t) =>
    t.tags?.map((tag) => tag.toLowerCase()).includes(regionSlug.replace(/-/g, " "))
  );
});

export const getFeaturedTrips = cache(async (): Promise<Trip[]> => {
  const all = await getAllTrips();
  return all.filter((t) => t.status === "published").slice(0, 3);
});

export const searchTrips = cache(async (queryText: string): Promise<Trip[]> => {
  const lower = queryText.toLowerCase();
  const all = await getAllTrips();
  return all.filter(
    (t) =>
      t.title.toLowerCase().includes(lower) ||
      (t.excerpt && t.excerpt.toLowerCase().includes(lower)) ||
      (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(lower)))
  );
});

export async function incrementViewCount(slug: string): Promise<void> {
  // Mock no-op
}

// ──────────────────────────────────────────────────
// Admin CRUD
// ──────────────────────────────────────────────────

export async function createTrip(trip: Trip): Promise<void> {
  await redis.set(`trip:${trip.slug}`, JSON.stringify(trip));
  await redis.sadd(TRIPS_INDEX_KEY, trip.slug);
}

export async function updateTrip(slug: string, updates: Partial<Trip>): Promise<Trip | null> {
  const existing = await getTripBySlug(slug);
  if (!existing) return null;
  const updated: Trip = {
    ...existing,
    ...updates,
    slug, // slug is immutable
    _updatedAt: new Date().toISOString(),
  };
  await redis.set(`trip:${slug}`, JSON.stringify(updated));
  await redis.sadd(TRIPS_INDEX_KEY, slug);
  return updated;
}

export async function deleteTrip(slug: string): Promise<void> {
  await redis.del(`trip:${slug}`);
  await redis.srem(TRIPS_INDEX_KEY, slug);
}
