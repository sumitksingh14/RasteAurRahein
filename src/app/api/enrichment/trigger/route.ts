/**
 * POST /api/enrichment/trigger
 *
 * On-demand trigger for a single field enrichment job.
 * Called from the trip page when a field is detected as missing.
 * Non-blocking (returns 202 immediately after enqueuing).
 *
 * Rate-limited by the pending lock — if a job is already running for this
 * trip+field, returns 202 with isAlreadyPending: true.
 */

import { NextRequest, NextResponse } from "next/server";
import { isLocked, enqueueJob, getFieldStatus } from "@/lib/enrichment/store";
import { runEnrichment } from "@/lib/enrichment/enrichmentEngine";
import type { TripFieldName, EnrichmentJob } from "@/lib/enrichment/types";

export const maxDuration = 120; // Allow up to 2 minutes for worker LLM + API execution

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tripSlug, field, priority = "high", sync = false } = body as {
      tripSlug: string;
      field: TripFieldName;
      priority?: "high" | "normal";
      sync?: boolean;
    };

    if (!tripSlug || !field) {
      return NextResponse.json(
        { error: "tripSlug and field are required" },
        { status: 400 }
      );
    }

    const validFields: TripFieldName[] = [
      "cover_image",
      "gallery_images",
      "overall_cost",
      "stay_recommendations",
      "route_options",
      "weather_summary",
    ];
    if (!validFields.includes(field)) {
      return NextResponse.json(
        { error: `Invalid field: ${field}` },
        { status: 400 }
      );
    }

    // Check if already locked (job in progress)
    const locked = await isLocked(tripSlug, field);
    if (locked) {
      return NextResponse.json(
        {
          status: "accepted",
          isAlreadyPending: true,
          message: "Enrichment is already running for this field.",
        },
        { status: 202 }
      );
    }

    // Check if already verified — don't re-trigger unless explicitly requested
    const existing = await getFieldStatus(tripSlug, field);
    if (existing?.status === "verified" && priority !== "high") {
      return NextResponse.json(
        {
          status: "skipped",
          message: "Field is already verified. No re-enrichment needed.",
        },
        { status: 200 }
      );
    }

    // Prepare job
    const job: EnrichmentJob = {
      jobId: crypto.randomUUID(),
      tripSlug,
      field,
      priority,
      enqueuedAt: new Date().toISOString(),
      attempt: 0,
    };

    // If high priority or sync requested (e.g. from admin action or on-demand page load), run immediately
    if (priority === "high" || sync) {
      const result = await runEnrichment(job);
      return NextResponse.json(
        {
          status: result.outcome === "success" ? "success" : result.outcome === "skipped" ? "skipped" : "failed",
          jobId: job.jobId,
          outcome: result.outcome,
          message: result.message,
          tokensUsed: result.tokensUsed,
          durationMs: result.durationMs,
        },
        { status: result.outcome === "failed" ? 500 : 200 }
      );
    }

    // Otherwise enqueue for background worker processing
    await enqueueJob(job);

    return NextResponse.json(
      {
        status: "accepted",
        jobId: job.jobId,
        message: `Enrichment job for ${field} queued. Check back shortly.`,
      },
      { status: 202 }
    );
  } catch (err) {
    console.error("[enrichment/trigger] Error:", err);
    return NextResponse.json(
      { error: "Failed to process enrichment trigger" },
      { status: 500 }
    );
  }
}
