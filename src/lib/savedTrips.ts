/**
 * Saved Trips — Redis-backed bookmark helpers.
 *
 * Redis keys:
 *   saved:trips:{userId}    → SET of tripSlugs (user's bookmarks)
 *   trip:saves:{tripSlug}   → SET of userIds (for global save counts)
 */

import { redis } from "@/lib/redis";

function userSavesKey(userId: string) {
  return `saved:trips:${userId}`;
}

function tripSavesKey(tripSlug: string) {
  return `trip:saves:${tripSlug}`;
}

/**
 * Toggle the bookmark on a trip for a given user.
 * Returns true if the trip is now saved, false if it was removed.
 */
export async function toggleSavedTrip(
  userId: string,
  tripSlug: string
): Promise<boolean> {
  const key = userSavesKey(userId);
  const isSaved = await redis.sismember(key, tripSlug);

  if (isSaved) {
    await redis.srem(key, tripSlug);
    await redis.srem(tripSavesKey(tripSlug), userId);
    return false;
  } else {
    await redis.sadd(key, tripSlug);
    await redis.sadd(tripSavesKey(tripSlug), userId);
    return true;
  }
}

/**
 * Returns the set of trip slugs saved by this user.
 */
export async function getSavedTripSlugs(userId: string): Promise<string[]> {
  return redis.smembers(userSavesKey(userId));
}

/**
 * Returns true if a specific trip is bookmarked by the user.
 */
export async function isTripSaved(
  userId: string,
  tripSlug: string
): Promise<boolean> {
  return redis.sismember(userSavesKey(userId), tripSlug);
}

/**
 * Returns the global bookmark count for a trip.
 */
export async function getTripSaveCount(tripSlug: string): Promise<number> {
  return redis.scard(tripSavesKey(tripSlug));
}
