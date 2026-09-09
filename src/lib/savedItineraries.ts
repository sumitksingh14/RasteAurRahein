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

function generateId(): string {
  return `si-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Persist a new AI-generated itinerary for this user.
 * Returns the saved itinerary with its generated id.
 */
export async function saveItinerary(
  userId: string,
  data: Omit<SavedItinerary, "id" | "userId" | "createdAt">
): Promise<SavedItinerary> {
  const id = generateId();
  const createdAt = new Date().toISOString();

  const itinerary: SavedItinerary = {
    id,
    userId,
    createdAt,
    ...data,
  };

  // Store hash
  await redis.hset(itineraryKey(id), {
    id,
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
  const results = await Promise.all(ids.map(getSavedItineraryById));
  return results.filter((r): r is SavedItinerary => r !== null);
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

  await redis.del(itineraryKey(id));

  // Remove from the user's list
  const key = userItinerariesKey(userId);
  const ids = await redis.lrange(key, 0, -1);
  const updated = ids.filter((i) => i !== id);
  await redis.del(key);
  for (const itemId of updated) {
    await redis.rpush(key, itemId);
  }

  return true;
}
