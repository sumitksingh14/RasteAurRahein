/**
 * Saved Trips — Redis-backed bookmark helpers.
 *
 * Redis keys:
 *   saved:trips:{userId}          → SET of tripSlugs (user's bookmarks)
 *   trip:saves:{tripSlug}         → SET of userIds (for global save counts)
 *   trip:plan:{userId}:{tripSlug} → HASH { status, plannedStart, plannedEnd,
 *                                          actualSpend, quotedBudget, notes }
 */

import { redis } from "@/lib/redis";

export type TripStatus = "planned" | "in-progress" | "completed";

export interface TripPlan {
  tripSlug: string;
  status: TripStatus;
  plannedStart?: string;  // ISO date string
  plannedEnd?: string;    // ISO date string
  actualSpend?: number;   // INR
  quotedBudget?: string;  // e.g. "₹25,000"
  notes?: string;
}

function tripPlanKey(userId: string, tripSlug: string) {
  return `trip:plan:${userId}:${tripSlug}`;
}

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

/**
 * Persist trip plan metadata (status, dates, spend) for a user + trip.
 * Only updates fields that are explicitly provided.
 */
export async function setTripPlan(
  userId: string,
  tripSlug: string,
  data: Partial<Omit<TripPlan, "tripSlug">>
): Promise<TripPlan> {
  const key = tripPlanKey(userId, tripSlug);
  const existing = await redis.hgetall(key);

  const merged: Record<string, string> = {};
  if (existing) Object.assign(merged, existing);

  if (data.status !== undefined) merged.status = data.status;
  if (data.plannedStart !== undefined) merged.plannedStart = data.plannedStart;
  if (data.plannedEnd !== undefined) merged.plannedEnd = data.plannedEnd;
  if (data.actualSpend !== undefined) merged.actualSpend = String(data.actualSpend);
  if (data.quotedBudget !== undefined) merged.quotedBudget = data.quotedBudget;
  if (data.notes !== undefined) merged.notes = data.notes;

  await redis.hset(key, merged);

  return {
    tripSlug,
    status: (merged.status as TripStatus) || "planned",
    plannedStart: merged.plannedStart,
    plannedEnd: merged.plannedEnd,
    actualSpend: merged.actualSpend ? Number(merged.actualSpend) : undefined,
    quotedBudget: merged.quotedBudget,
    notes: merged.notes,
  };
}

/**
 * Get trip plan metadata for a specific trip.
 */
export async function getTripPlan(
  userId: string,
  tripSlug: string
): Promise<TripPlan | null> {
  const hash = await redis.hgetall(tripPlanKey(userId, tripSlug));
  if (!hash || !hash.status) return null;
  return {
    tripSlug,
    status: hash.status as TripStatus,
    plannedStart: hash.plannedStart,
    plannedEnd: hash.plannedEnd,
    actualSpend: hash.actualSpend ? Number(hash.actualSpend) : undefined,
    quotedBudget: hash.quotedBudget,
    notes: hash.notes,
  };
}

/**
 * Get all trip plans for a user (one per saved trip that has a plan set).
 * Returns a map of tripSlug → TripPlan.
 */
export async function getAllTripPlans(
  userId: string,
  tripSlugs: string[]
): Promise<Record<string, TripPlan>> {
  if (tripSlugs.length === 0) return {};
  const plans = await Promise.all(
    tripSlugs.map((slug) => getTripPlan(userId, slug))
  );
  const result: Record<string, TripPlan> = {};
  plans.forEach((plan, i) => {
    if (plan) result[tripSlugs[i]] = plan;
  });
  return result;
}
