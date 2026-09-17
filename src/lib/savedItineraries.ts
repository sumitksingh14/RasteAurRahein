/**
 * Saved AI-generated Itineraries — Redis-backed persistence.
 *
 * Redis keys:
 *   itinerary:{id}              → HASH of itinerary fields
 *   saved:itineraries:{userId}  → LIST of itinerary IDs (newest first, via LPUSH)
 */

import { redis } from "@/lib/redis";

export interface SavedItinerary {
  id: string;
  userId: string;
  slug: string;        // public shareable slug, e.g. "goa-3-days-ab12c"
  title: string;
  destination: string;
  days: number;
  pace: string;       // e.g. "relaxed", "moderate", "packed"
  budget: string;     // e.g. "₹25,000 – ₹35,000"
  travelStyle: string; // comma-separated tags
  itineraryJson: string; // JSON.stringify of the full GeneratedTrip
  createdAt: string;
}

function itineraryKey(id: string) {
  return `itinerary:${id}`;
}

function userItinerariesKey(userId: string) {
  return `saved:itineraries:${userId}`;
}

function slugKey(slug: string) {
  return `itinerary:slug:${slug}`;
}

function generateId(): string {
  return `si-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function generateSlug(destination: string): string {
  const base = destination
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}

/**
 * Persist a new AI-generated itinerary for this user.
 * Returns the saved itinerary with its generated id.
 */
export async function saveItinerary(
  userId: string,
  data: Omit<SavedItinerary, "id" | "userId" | "createdAt" | "slug">
): Promise<SavedItinerary> {
  const id = generateId();
  const slug = generateSlug(data.destination);
  const createdAt = new Date().toISOString();

  const itinerary: SavedItinerary = {
    id,
    slug,
    userId,
    createdAt,
    ...data,
  };

  // Store hash
  await redis.hset(itineraryKey(id), {
    id,
    slug,
    userId,
    title: data.title,
    destination: data.destination,
    days: String(data.days),
    pace: data.pace,
    budget: data.budget,
    travelStyle: data.travelStyle,
    itineraryJson: data.itineraryJson,
    createdAt,
  });

  // Reverse-lookup: slug → id
  await redis.set(slugKey(slug), id);

  // Prepend to user's list (newest first)
  await redis.rpush(userItinerariesKey(userId), id);

  return itinerary;
}

/**
 * Returns all itinerary IDs for this user (newest first).
 */
export async function getSavedItineraryIds(userId: string): Promise<string[]> {
  const ids = await redis.lrange(userItinerariesKey(userId), 0, -1);
  return ids.reverse(); // newest first (RPUSH + reverse)
}

/**
 * Fetches a single saved itinerary by ID.
 */
export async function getSavedItineraryById(
  id: string
): Promise<SavedItinerary | null> {
  const hash = await redis.hgetall(itineraryKey(id));
  if (!hash) return null;
  return {
    ...hash,
    days: Number(hash.days),
  } as unknown as SavedItinerary;
}

/**
 * Returns all saved itineraries for a user, fully hydrated, newest first.
 */
export async function getSavedItineraries(
  userId: string
): Promise<SavedItinerary[]> {
  const ids = await getSavedItineraryIds(userId);
  if (!ids || ids.length === 0) return [];

  // Batch all HGETALL calls using Promise.all
  const rawItineraries = await Promise.all(
    ids.map(id => redis.hgetall(itineraryKey(id)).catch(() => null))
  );

  return rawItineraries
    .filter((hash): hash is Record<string, string> => hash !== null && hash.id !== undefined)
    .map(hash => ({
      ...hash,
      days: Number(hash.days || 0),
    } as unknown as SavedItinerary));
}

/**
 * Fetch a saved itinerary by its public slug.
 * Does a two-step lookup: slug → id → hash.
 */
export async function getItineraryBySlug(
  slug: string
): Promise<SavedItinerary | null> {
  const id = (await redis.get(slugKey(slug))) as string | null;
  if (id) {
    return getSavedItineraryById(id);
  }
  return getSavedItineraryById(slug);
}

/**
 * Delete a saved itinerary (only if owned by userId).
 * Returns true if deleted, false if not found or not owned.
 */
export async function deleteItinerary(
  userId: string,
  id: string
): Promise<boolean> {
  const hash = await redis.hgetall(itineraryKey(id));
  if (!hash || hash.userId !== userId) return false;

  // Remove slug reverse-lookup if present
  if (hash.slug) await redis.del(slugKey(hash.slug));

  await redis.del(itineraryKey(id));

  const key = userItinerariesKey(userId);
  await redis.lrem(key, 0, id);

  return true;
}

