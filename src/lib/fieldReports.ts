/**
 * Field Reports — user-generated trip reports with moderation.
 *
 * Redis keys:
 *   report:{id}               → HASH of report fields
 *   reports:trip:{tripSlug}   → LIST of report IDs (LPUSH → newest first)
 *   reports:pending           → SET of report IDs awaiting moderation
 *   reports:user:{userId}     → SET of report IDs by this user
 */

import { redis } from "@/lib/redis";

export type ReportStatus = "pending" | "approved" | "rejected";
export type Season = "Summer" | "Monsoon" | "Winter" | "Spring" | "Autumn";

export interface FieldReport {
  id: string;
  tripSlug: string;
  userId: string;
  authorName: string;
  body: string;
  dateOfTravel: string; // ISO date string (just the date part)
  season: Season;
  rating: number; // 1–5
  status: ReportStatus;
  /** Up to 5 comma-separated image URLs */
  photoUrls?: string;
  createdAt: string;
}

function reportKey(id: string) {
  return `report:${id}`;
}
function tripReportsKey(tripSlug: string) {
  return `reports:trip:${tripSlug}`;
}
function userReportsKey(userId: string) {
  return `reports:user:${userId}`;
}
const PENDING_SET = "reports:pending";

function generateId(): string {
  return `fr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function submitReport(
  userId: string,
  authorName: string,
  data: Pick<FieldReport, "tripSlug" | "body" | "dateOfTravel" | "season" | "rating" | "photoUrls">
): Promise<FieldReport> {
  const id = generateId();
  const createdAt = new Date().toISOString();

  const report: FieldReport = {
    id,
    userId,
    authorName,
    status: "pending",
    createdAt,
    ...data,
    rating: Math.min(5, Math.max(1, Math.round(data.rating))),
  };

  await redis.hset(reportKey(id), {
    id,
    tripSlug: data.tripSlug,
    userId,
    authorName,
    body: data.body,
    dateOfTravel: data.dateOfTravel,
    season: data.season,
    rating: String(report.rating),
    status: "pending",
    photoUrls: data.photoUrls || "",
    createdAt,
  });

  // Prepend to per-trip list (newest first)
  await redis.lpush(tripReportsKey(data.tripSlug), id);
  // Track per-user
  await redis.sadd(userReportsKey(userId), id);
  // Add to moderation queue
  await redis.sadd(PENDING_SET, id);

  return report;
}

function hashToReport(hash: Record<string, string>): FieldReport {
  return {
    id: hash.id,
    tripSlug: hash.tripSlug,
    userId: hash.userId,
    authorName: hash.authorName,
    body: hash.body,
    dateOfTravel: hash.dateOfTravel,
    season: hash.season as Season,
    rating: Number(hash.rating),
    status: hash.status as ReportStatus,
    photoUrls: hash.photoUrls || undefined,
    createdAt: hash.createdAt,
  };
}

export async function getReportsByTrip(
  tripSlug: string,
  { includeUserId }: { includeUserId?: string } = {}
): Promise<FieldReport[]> {
  const ids = await redis.lrange(tripReportsKey(tripSlug), 0, -1);
  if (!ids.length) return [];

  const hashes = await Promise.all(
    ids.map((id) => redis.hgetall(reportKey(id)).catch(() => null))
  );

  return hashes
    .filter((h): h is Record<string, string> => h !== null && !!h.id)
    .map(hashToReport)
    .filter(
      (r) => r.status === "approved" || r.userId === includeUserId
    );
}

export async function getReportById(id: string): Promise<FieldReport | null> {
  const hash = await redis.hgetall(reportKey(id));
  if (!hash || !hash.id) return null;
  return hashToReport(hash);
}

export async function getPendingReports(): Promise<FieldReport[]> {
  const ids = await redis.smembers(PENDING_SET);
  if (!ids.length) return [];

  const hashes = await Promise.all(
    ids.map((id) => redis.hgetall(reportKey(id)).catch(() => null))
  );

  return hashes
    .filter((h): h is Record<string, string> => h !== null && !!h.id)
    .map(hashToReport)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function updateReportStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<boolean> {
  const hash = await redis.hgetall(reportKey(id));
  if (!hash || !hash.id) return false;

  await redis.hset(reportKey(id), { status });
  await redis.srem(PENDING_SET, id);
  return true;
}

export async function deleteReport(id: string): Promise<boolean> {
  const hash = await redis.hgetall(reportKey(id));
  if (!hash || !hash.id) return false;

  await redis.del(reportKey(id));
  await redis.lrem(tripReportsKey(hash.tripSlug), 0, id);
  await redis.srem(userReportsKey(hash.userId), id);
  await redis.srem(PENDING_SET, id);
  return true;
}
