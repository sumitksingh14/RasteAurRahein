/**
 * POST /api/enrichment/sweep
 *
 * Admin-triggered "sweep all trips" — finds missing/stale fields across all
 * trips and enqueues normal-priority enrichment jobs for each.
 *
 * Protected by admin session. Use the Enrichment admin page to trigger this.
 */

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getAllTrips } from "@/lib/queries";
import { getTripFieldStatuses, enqueueJob } from "@/lib/enrichment/store";
import { mergeCompletenessMap, ALL_FIELD_NAMES } from "@/lib/enrichment/detector";
import type { TripFieldName, EnrichmentJob } from "@/lib/enrichment/types";

export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const trips = await getAllTrips();
    let queued = 0;
    const queuedJobs: { tripSlug: string; field: TripFieldName }[] = [];

    for (const trip of trips) {
      const storedStatuses = await getTripFieldStatuses(trip.slug);
      const completeness = mergeCompletenessMap(trip, storedStatuses);

      for (const field of ALL_FIELD_NAMES) {
        const info = completeness[field];
        // Enqueue for missing or stale fields
        if (info.status === "missing" || info.status === "stale") {
          const job: EnrichmentJob = {
            jobId: crypto.randomUUID(),
            tripSlug: trip.slug,
            field,
            priority: "normal",
            enqueuedAt: new Date().toISOString(),
            attempt: 0,
          };
          await enqueueJob(job);
          queued++;
          queuedJobs.push({ tripSlug: trip.slug, field });
        }
      }
    }

    return NextResponse.json({
      queued,
      jobs: queuedJobs,
      message: `Queued ${queued} enrichment jobs across ${trips.length} trips.`,
    });
  } catch (err) {
    console.error("[enrichment/sweep] Error:", err);
    return NextResponse.json(
      { error: "Failed to sweep trips for enrichment" },
      { status: 500 }
    );
  }
}
