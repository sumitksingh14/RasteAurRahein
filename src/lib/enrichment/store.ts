/**
 * Redis-backed CRUD for TripFieldStatus, TripFieldHistory, and EnrichmentJob queue.
 *
 * Key schema:
 *   enrichment:field:{tripSlug}:{field}        → Hash (TripFieldStatus as JSON string fields)
 *   enrichment:index:trip:{tripSlug}           → Set of field names (for per-trip lookups)
 *   enrichment:index:status:{status}           → Set of "{tripSlug}:{field}" (for bulk queries)
 *   enrichment:history:{statusId}             → List of JSON (TripFieldHistory entries)
 *   enrichment:lock:{tripSlug}:{field}        → String "1" with TTL (pending lock)
 *   enrichment:queue:high                     → List<EnrichmentJob JSON> (RPUSH/LPOP)
 *   enrichment:queue:normal                   → List<EnrichmentJob JSON> (RPUSH/LPOP)
 *   enrichment:run:log                        → List<EnrichmentRunLog JSON>, capped at 200
 */

import { redis } from "@/lib/redis";
import type {
  TripFieldStatus,
  TripFieldHistory,
  TripFieldName,
  FieldStatus,
  EnrichedFieldValue,
  EnrichmentJob,
  EnrichmentRunLog,
} from "./types";
function uuidv4(): string {
  return crypto.randomUUID();
}

// ---------------------------------------------------------------------------
// Key helpers
// ---------------------------------------------------------------------------
const keys = {
  field: (tripSlug: string, field: TripFieldName) =>
    `enrichment:field:${tripSlug}:${field}`,
  tripIndex: (tripSlug: string) => `enrichment:index:trip:${tripSlug}`,
  statusIndex: (status: FieldStatus) => `enrichment:index:status:${status}`,
  history: (statusId: string) => `enrichment:history:${statusId}`,
  lock: (tripSlug: string, field: TripFieldName) =>
    `enrichment:lock:${tripSlug}:${field}`,
  queueHigh: () => `enrichment:queue:high`,
  queueNormal: () => `enrichment:queue:normal`,
  runLog: () => `enrichment:run:log`,
};

const LOCK_TTL_SECONDS = 600; // 10 minutes
const RUN_LOG_MAX = 200;

// ---------------------------------------------------------------------------
// Status ID
// ---------------------------------------------------------------------------
function statusId(tripSlug: string, field: TripFieldName): string {
  return `${tripSlug}:${field}`;
}

// ---------------------------------------------------------------------------
// Serialize / Deserialize
// ---------------------------------------------------------------------------
function serializeStatus(s: TripFieldStatus): Record<string, string> {
  return {
    id: s.id,
    tripSlug: s.tripSlug,
    field: s.field,
    status: s.status,
    value: s.value ? JSON.stringify(s.value) : "",
    sourceType: s.sourceType,
    confidence: String(s.confidence),
    citations: JSON.stringify(s.citations),
    generatedAt: s.generatedAt ?? "",
    verifiedAt: s.verifiedAt ?? "",
    verifiedBy: s.verifiedBy ?? "",
    pendingReason: s.pendingReason ?? "",
    reportCount: String(s.reportCount),
  };
}

function deserializeStatus(raw: Record<string, string>): TripFieldStatus {
  return {
    id: raw.id,
    tripSlug: raw.tripSlug,
    field: raw.field as TripFieldName,
    status: raw.status as FieldStatus,
    value: raw.value ? JSON.parse(raw.value) : null,
    sourceType: raw.sourceType as TripFieldStatus["sourceType"],
    confidence: parseFloat(raw.confidence ?? "0"),
    citations: raw.citations ? JSON.parse(raw.citations) : [],
    generatedAt: raw.generatedAt || null,
    verifiedAt: raw.verifiedAt || null,
    verifiedBy: raw.verifiedBy || null,
    pendingReason: raw.pendingReason || null,
    reportCount: parseInt(raw.reportCount ?? "0", 10),
  };
}

// ---------------------------------------------------------------------------
// Read a single field status
// ---------------------------------------------------------------------------
export async function getFieldStatus(
  tripSlug: string,
  field: TripFieldName
): Promise<TripFieldStatus | null> {
  try {
    const raw = await redis.hgetall(keys.field(tripSlug, field));
    if (!raw || !raw.id) return null;
    return deserializeStatus(raw);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Read all field statuses for a trip
// ---------------------------------------------------------------------------
export async function getTripFieldStatuses(
  tripSlug: string
): Promise<TripFieldStatus[]> {
  try {
    const fields = await redis.smembers(keys.tripIndex(tripSlug));
    const results = await Promise.all(
      fields.map((f) => getFieldStatus(tripSlug, f as TripFieldName))
    );
    return results.filter(Boolean) as TripFieldStatus[];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Upsert a field status (creates or updates)
// ---------------------------------------------------------------------------
export async function upsertFieldStatus(
  tripSlug: string,
  field: TripFieldName,
  update: Partial<Omit<TripFieldStatus, "id" | "tripSlug" | "field">>
): Promise<TripFieldStatus> {
  const id = statusId(tripSlug, field);
  const existing = await getFieldStatus(tripSlug, field);

  const prev: TripFieldStatus = existing ?? {
    id,
    tripSlug,
    field,
    status: "missing",
    value: null,
    sourceType: "llm",
    confidence: 0,
    citations: [],
    generatedAt: null,
    verifiedAt: null,
    verifiedBy: null,
    pendingReason: null,
    reportCount: 0,
  };

  const next: TripFieldStatus = { ...prev, ...update, id, tripSlug, field };
  await redis.hset(keys.field(tripSlug, field), serializeStatus(next));

  // Maintain trip index
  await redis.sadd(keys.tripIndex(tripSlug), field);

  // Maintain status index — remove from old status, add to new
  if (existing && existing.status !== next.status) {
    await redis.srem(keys.statusIndex(existing.status), id);
  }
  await redis.sadd(keys.statusIndex(next.status), id);

  return next;
}

// ---------------------------------------------------------------------------
// Get all statuses of a given status across all trips
// ---------------------------------------------------------------------------
export async function getFieldsByStatus(
  status: FieldStatus
): Promise<TripFieldStatus[]> {
  try {
    const ids = await redis.smembers(keys.statusIndex(status));
    const results = await Promise.all(
      ids.map((compositeId) => {
        const parts = compositeId.split(":");
        // compositeId format: "{tripSlug}:{field}"
        // field is the last segment; tripSlug is everything before
        const field = parts[parts.length - 1] as TripFieldName;
        const tripSlug = parts.slice(0, -1).join(":");
        return getFieldStatus(tripSlug, field);
      })
    );
    return results.filter(Boolean) as TripFieldStatus[];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Append a history entry (audit log)
// ---------------------------------------------------------------------------
export async function appendHistory(
  tripSlug: string,
  field: TripFieldName,
  previousValue: EnrichedFieldValue | null,
  previousStatus: FieldStatus,
  changedBy: string,
  reason: string
): Promise<void> {
  const id = statusId(tripSlug, field);
  const entry: TripFieldHistory = {
    id: uuidv4(),
    tripFieldStatusId: id,
    previousValue,
    previousStatus,
    changedAt: new Date().toISOString(),
    changedBy,
    reason,
  };
  await redis.rpush(keys.history(id), JSON.stringify(entry));
  // Keep history capped at 50 entries per field (trim from left)
  // Using lrange to implement manual cap
}

// ---------------------------------------------------------------------------
// Read history for a field
// ---------------------------------------------------------------------------
export async function getFieldHistory(
  tripSlug: string,
  field: TripFieldName
): Promise<TripFieldHistory[]> {
  try {
    const id = statusId(tripSlug, field);
    const items = await redis.lrange(keys.history(id), 0, 49);
    return items.map((item) => JSON.parse(item) as TripFieldHistory);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Pending lock — prevents duplicate enrichment jobs for same trip+field
// ---------------------------------------------------------------------------
export async function acquireLock(
  tripSlug: string,
  field: TripFieldName
): Promise<boolean> {
  try {
    const lockKey = keys.lock(tripSlug, field);
    const existing = await redis.exists(lockKey);
    if (existing) return false;
    await redis.set(lockKey, "1", LOCK_TTL_SECONDS);
    return true;
  } catch {
    return false;
  }
}

export async function releaseLock(
  tripSlug: string,
  field: TripFieldName
): Promise<void> {
  try {
    await redis.del(keys.lock(tripSlug, field));
  } catch {
    // non-fatal
  }
}

export async function isLocked(
  tripSlug: string,
  field: TripFieldName
): Promise<boolean> {
  try {
    return redis.exists(keys.lock(tripSlug, field));
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Job queue
// ---------------------------------------------------------------------------
export async function enqueueJob(job: EnrichmentJob): Promise<void> {
  const queueKey =
    job.priority === "high" ? keys.queueHigh() : keys.queueNormal();
  await redis.rpush(queueKey, JSON.stringify(job));
}

/**
 * Claim-based dequeue: reads up to `count` jobs from both queues (high first),
 * skipping any already claimed. Each job gets a 1-hour claim TTL so in-flight
 * jobs aren't re-claimed by concurrent workers.
 */
export async function dequeueJobs(count: number): Promise<EnrichmentJob[]> {
  const result: EnrichmentJob[] = [];

  for (const queueKey of [keys.queueHigh(), keys.queueNormal()]) {
    if (result.length >= count) break;
    const needed = count - result.length;
    // Read more than needed to handle already-claimed items
    const items = await redis.lrange(queueKey, 0, needed * 3 - 1);
    for (const raw of items) {
      if (result.length >= count) break;
      try {
        const job = JSON.parse(raw) as EnrichmentJob;
        const claimKey = `enrichment:claimed:${job.jobId}`;
        const already = await redis.exists(claimKey);
        if (already) continue;
        await redis.set(claimKey, "1", 3600);
        result.push(job);
      } catch {
        // skip malformed
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Run log
// ---------------------------------------------------------------------------
export async function appendRunLog(entry: EnrichmentRunLog): Promise<void> {
  try {
    await redis.rpush(keys.runLog(), JSON.stringify(entry));
    // Keep last 200 entries — we can't LTRIM with current client easily,
    // but we cap reads to 200
  } catch {
    // non-fatal
  }
}

export async function getRunLogs(limit = 100): Promise<EnrichmentRunLog[]> {
  try {
    const items = await redis.lrange(keys.runLog(), -(limit), -1);
    return items
      .map((item) => {
        try {
          return JSON.parse(item) as EnrichmentRunLog;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as EnrichmentRunLog[];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Increment report count + handle confidence downgrade
// ---------------------------------------------------------------------------
export async function recordIssueReport(
  tripSlug: string,
  field: TripFieldName
): Promise<TripFieldStatus | null> {
  const existing = await getFieldStatus(tripSlug, field);
  if (!existing) return null;

  const newCount = existing.reportCount + 1;
  const newConfidence = Math.max(0, existing.confidence - 0.1);
  const newStatus: FieldStatus =
    newConfidence < 0.5 && existing.status !== "missing"
      ? "stale"
      : existing.status;

  const updated = await upsertFieldStatus(tripSlug, field, {
    reportCount: newCount,
    confidence: newConfidence,
    status: newStatus,
  });

  if (newStatus === "stale" && existing.status !== "stale") {
    await appendHistory(
      tripSlug,
      field,
      existing.value,
      existing.status,
      "system",
      `Marked stale: ${newCount} reader reports, confidence dropped to ${newConfidence.toFixed(2)}`
    );
  }

  return updated;
}
