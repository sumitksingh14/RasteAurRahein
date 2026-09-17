import { redis } from "@/lib/redis";
import webpush from "web-push";
import crypto from "crypto";

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface StoredPushSubscription {
  endpoint: string;
  keys: PushSubscriptionKeys;
  userId?: string;
  favoriteRegions?: string[];
  createdAt: string;
  updatedAt: string;
}

const VAPID_PUBLIC =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  "BIsV88-g5oBgvrI7BGNJsZn-fz4X6MTEKztqbVjZTlprVylyZdEE7xg8Tbr6zauguv6JjoIMmPU6ofKC7SD62UM";
const VAPID_PRIVATE =
  process.env.VAPID_PRIVATE_KEY ||
  "mKCP0-5-6BBv6X4cidhiL5cI0DgOTJoib5CW1As28YE";
const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || "mailto:admin@rasteaurrahein.com";

try {
  if (VAPID_PUBLIC && VAPID_PRIVATE) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
  }
} catch (e) {
  console.warn("Failed to configure web-push VAPID details:", e);
}

function endpointHash(endpoint: string): string {
  return crypto.createHash("sha256").update(endpoint).digest("hex").slice(0, 32);
}

const SET_KEY = "push:subscriptions";
const subKey = (hash: string) => `push:sub:${hash}`;
const userKey = (userId: string) => `push:user:${userId}`;

/**
 * Save or update a push subscription in Redis.
 */
export async function savePushSubscription(
  sub: { endpoint: string; keys: PushSubscriptionKeys },
  userId?: string,
  favoriteRegions: string[] = []
): Promise<StoredPushSubscription> {
  const hash = endpointHash(sub.endpoint);
  const now = new Date().toISOString();

  const existingRaw = await redis.get(subKey(hash));
  let existing: StoredPushSubscription | null = null;
  if (existingRaw) {
    try {
      existing = typeof existingRaw === "string" ? JSON.parse(existingRaw) : existingRaw;
    } catch {
      // ignore
    }
  }

  const record: StoredPushSubscription = {
    endpoint: sub.endpoint,
    keys: sub.keys,
    userId: userId || existing?.userId,
    favoriteRegions: favoriteRegions.length > 0 ? favoriteRegions : existing?.favoriteRegions || [],
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  await Promise.all([
    redis.sadd(SET_KEY, hash),
    redis.set(subKey(hash), JSON.stringify(record)),
    ...(record.userId ? [redis.sadd(userKey(record.userId), hash)] : []),
  ]);

  return record;
}

/**
 * Remove a subscription when it expires or the user unsubscribes.
 */
export async function removePushSubscription(endpoint: string): Promise<boolean> {
  const hash = endpointHash(endpoint);
  const existingRaw = await redis.get(subKey(hash));
  if (existingRaw) {
    try {
      const existing: StoredPushSubscription =
        typeof existingRaw === "string" ? JSON.parse(existingRaw) : existingRaw;
      if (existing.userId) {
        await redis.srem(userKey(existing.userId), hash);
      }
    } catch {
      // ignore
    }
  }

  await Promise.all([redis.srem(SET_KEY, hash), redis.del(subKey(hash))]);
  return true;
}

/**
 * Fetch all registered push subscriptions.
 */
export async function getAllPushSubscriptions(): Promise<StoredPushSubscription[]> {
  const hashes = await redis.smembers(SET_KEY);
  if (!hashes || hashes.length === 0) return [];

  const keys = hashes.map((h) => subKey(h));
  const results = await redis.mget(...keys);

  const subs: StoredPushSubscription[] = [];
  for (const raw of results) {
    if (!raw) continue;
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      subs.push(parsed);
    } catch {
      // ignore parse errors
    }
  }
  return subs;
}

/**
 * Fetch subscriptions for a specific user.
 */
export async function getUserPushSubscriptions(
  userId: string
): Promise<StoredPushSubscription[]> {
  const hashes = await redis.smembers(userKey(userId));
  if (!hashes || hashes.length === 0) return [];

  const keys = hashes.map((h) => subKey(h));
  const results = await redis.mget(...keys);

  const subs: StoredPushSubscription[] = [];
  for (const raw of results) {
    if (!raw) continue;
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      subs.push(parsed);
    } catch {
      // ignore
    }
  }
  return subs;
}

/**
 * Send a web push notification to a specific subscriber.
 */
export async function sendPushNotification(
  sub: StoredPushSubscription | { endpoint: string; keys: PushSubscriptionKeys },
  payload: {
    title: string;
    body: string;
    url?: string;
    icon?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const pushSub = {
      endpoint: sub.endpoint,
      keys: sub.keys,
    };
    await webpush.sendNotification(pushSub, JSON.stringify(payload));
    return { success: true };
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message?: string };
    // If subscription is expired/gone (410 or 404), purge from Redis
    if (error.statusCode === 410 || error.statusCode === 404) {
      await removePushSubscription(sub.endpoint);
    }
    return { success: false, error: error.message || "Failed to send notification" };
  }
}
