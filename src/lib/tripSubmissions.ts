/**
 * Trip Submissions — community-submitted trip routes for admin review.
 *
 * Redis keys:
 *   submission:{id}          → HASH of submission fields
 *   submissions:pending      → LIST of IDs (LPUSH, newest first)
 *   submissions:user:{userId} → SET of IDs submitted by this user
 */

import { redis } from "@/lib/redis";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface TripSubmission {
  id: string;
  userId: string;
  authorName: string;
  title: string;
  region: string;
  days: number;
  budget: string;          // e.g. "₹20,000–₹30,000"
  description: string;
  gpxData?: string;        // Raw GPX XML (optional)
  coverImageUrl?: string;
  status: SubmissionStatus;
  createdAt: string;
}

function submissionKey(id: string) {
  return `submission:${id}`;
}
function userSubmissionsKey(userId: string) {
  return `submissions:user:${userId}`;
}
const PENDING_LIST = "submissions:pending";

function generateId(): string {
  return `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function submitTrip(
  userId: string,
  authorName: string,
  data: Pick<TripSubmission, "title" | "region" | "days" | "budget" | "description" | "gpxData" | "coverImageUrl">
): Promise<TripSubmission> {
  const id = generateId();
  const createdAt = new Date().toISOString();

  const submission: TripSubmission = {
    id,
    userId,
    authorName,
    status: "pending",
    createdAt,
    ...data,
    days: Math.max(1, Math.round(data.days)),
  };

  await redis.hset(submissionKey(id), {
    id,
    userId,
    authorName,
    title: data.title,
    region: data.region,
    days: String(submission.days),
    budget: data.budget || "",
    description: data.description,
    gpxData: data.gpxData || "",
    coverImageUrl: data.coverImageUrl || "",
    status: "pending",
    createdAt,
  });

  await redis.lpush(PENDING_LIST, id);
  await redis.sadd(userSubmissionsKey(userId), id);

  return submission;
}

function hashToSubmission(hash: Record<string, string>): TripSubmission {
  return {
    id: hash.id,
    userId: hash.userId,
    authorName: hash.authorName,
    title: hash.title,
    region: hash.region,
    days: Number(hash.days),
    budget: hash.budget,
    description: hash.description,
    gpxData: hash.gpxData || undefined,
    coverImageUrl: hash.coverImageUrl || undefined,
    status: hash.status as SubmissionStatus,
    createdAt: hash.createdAt,
  };
}

export async function getSubmission(id: string): Promise<TripSubmission | null> {
  const hash = await redis.hgetall(submissionKey(id));
  if (!hash || !hash.id) return null;
  return hashToSubmission(hash);
}

export async function listPendingSubmissions(): Promise<TripSubmission[]> {
  const ids = await redis.lrange(PENDING_LIST, 0, -1);
  if (!ids.length) return [];

  const hashes = await Promise.all(
    ids.map((id) => redis.hgetall(submissionKey(id)).catch(() => null))
  );

  return hashes
    .filter((h): h is Record<string, string> => h !== null && !!h.id)
    .map(hashToSubmission);
}

export async function getUserSubmissions(userId: string): Promise<TripSubmission[]> {
  const ids = await redis.smembers(userSubmissionsKey(userId));
  if (!ids.length) return [];

  const hashes = await Promise.all(
    ids.map((id) => redis.hgetall(submissionKey(id)).catch(() => null))
  );

  return hashes
    .filter((h): h is Record<string, string> => h !== null && !!h.id)
    .map(hashToSubmission)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateSubmissionStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<boolean> {
  const hash = await redis.hgetall(submissionKey(id));
  if (!hash || !hash.id) return false;

  await redis.hset(submissionKey(id), { status });
  await redis.lrem(PENDING_LIST, 0, id);
  return true;
}
