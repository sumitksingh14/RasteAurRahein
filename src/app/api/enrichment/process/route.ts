/**
 * POST /api/enrichment/process
 *
 * Worker endpoint — dequeues and processes enrichment jobs.
 * Called by Vercel Cron (nightly) or manually by an admin.
 *
 * Protected by CRON_SECRET header to prevent public invocation.
 * Processes up to 5 jobs per call to stay within function timeout limits.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { dequeueJobs } from "@/lib/enrichment/store";
import { runEnrichment } from "@/lib/enrichment/enrichmentEngine";
import type { EnrichmentJob } from "@/lib/enrichment/types";

const CRON_SECRET = process.env.CRON_SECRET;
const MAX_JOBS_PER_RUN = 5;

export const maxDuration = 300; // Vercel Pro: 5 minutes

export async function POST(req: NextRequest) {
  // Auth check: allow Vercel Cron, CRON_SECRET header, or authenticated Admin session
  const authHeader = req.headers.get("authorization");
  const cronHeader = req.headers.get("x-cron-secret");

  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  const hasCronSecret =
    CRON_SECRET && (cronHeader === CRON_SECRET || authHeader === `Bearer ${CRON_SECRET}`);
  const adminSession = await getAdminSession();

  if (!isVercelCron && !hasCronSecret && !adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Dequeue jobs (high priority first)
    const jobs: EnrichmentJob[] = await dequeueJobs(MAX_JOBS_PER_RUN);

    if (jobs.length === 0) {
      return NextResponse.json({
        processed: 0,
        message: "Queue is empty — nothing to process.",
      });
    }

    // Process jobs sequentially (to respect API rate limits)
    const results: Array<{
      jobId: string;
      tripSlug: string;
      field: string;
      outcome: string;
      message: string;
      durationMs: number;
    }> = [];

    for (const job of jobs) {
      try {
        const result = await runEnrichment(job);
        results.push({
          jobId: job.jobId,
          tripSlug: job.tripSlug,
          field: job.field,
          outcome: result.outcome,
          message: result.message,
          durationMs: result.durationMs,
        });
      } catch (err) {
        results.push({
          jobId: job.jobId,
          tripSlug: job.tripSlug,
          field: job.field,
          outcome: "failed",
          message: err instanceof Error ? err.message : String(err),
          durationMs: 0,
        });
      }
    }

    const successCount = results.filter((r) => r.outcome === "success").length;
    const failCount = results.filter((r) => r.outcome === "failed").length;
    const skipCount = results.filter((r) => r.outcome === "skipped").length;

    return NextResponse.json({
      processed: jobs.length,
      success: successCount,
      failed: failCount,
      skipped: skipCount,
      results,
    });
  } catch (err) {
    console.error("[enrichment/process] Error:", err);
    return NextResponse.json(
      { error: "Failed to process enrichment jobs" },
      { status: 500 }
    );
  }
}
