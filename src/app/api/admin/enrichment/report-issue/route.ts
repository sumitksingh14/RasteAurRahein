/**
 * POST /api/admin/enrichment/report-issue
 *
 * Public "Report an issue" endpoint — any visitor can flag a field as incorrect.
 * - Decrements confidence by 0.1 per report (floor 0)
 * - Below 0.5 confidence: downgrades status to "stale" and re-queues enrichment
 * - No auth required (reader-facing)
 */

import { NextRequest, NextResponse } from "next/server";
import { recordIssueReport, enqueueJob, isLocked } from "@/lib/enrichment/store";
import type { TripFieldName, EnrichmentJob } from "@/lib/enrichment/types";

// Simple rate limiting: max 3 reports per IP per field per day (Redis-backed)
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tripSlug, field, reason } = body as {
      tripSlug: string;
      field: TripFieldName;
      reason?: string;
    };

    if (!tripSlug || !field) {
      return NextResponse.json(
        { error: "tripSlug and field are required" },
        { status: 400 }
      );
    }

    // Basic rate limit: 3 reports per IP per trip+field per 24 hours
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rateLimitKey = `enrichment:report:ratelimit:${ip}:${tripSlug}:${field}`;
    const reportCount = await redis.incr(rateLimitKey);
    if (reportCount === 1) {
      await redis.expire(rateLimitKey, 86400); // 24h TTL on first report
    }
    if (reportCount > 3) {
      return NextResponse.json(
        { error: "Too many reports from this IP. Please try again tomorrow." },
        { status: 429 }
      );
    }

    const updated = await recordIssueReport(tripSlug, field);
    if (!updated) {
      return NextResponse.json(
        { error: "Field not found — nothing to report." },
        { status: 404 }
      );
    }

    // If field went stale, enqueue a re-check
    if (updated.status === "stale") {
      const locked = await isLocked(tripSlug, field);
      if (!locked) {
        const job: EnrichmentJob = {
          jobId: crypto.randomUUID(),
          tripSlug,
          field,
          priority: "high",
          enqueuedAt: new Date().toISOString(),
          attempt: 0,
        };
        await enqueueJob(job);
      }
    }

    console.info(
      `[report-issue] ${tripSlug}:${field} reported. Reason: "${reason ?? "none"}". New confidence: ${updated.confidence.toFixed(2)}, status: ${updated.status}`
    );

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your report. We will review and update this information.",
      newStatus: updated.status,
    });
  } catch (err) {
    console.error("[enrichment/report-issue] Error:", err);
    return NextResponse.json(
      { error: "Failed to record report" },
      { status: 500 }
    );
  }
}
