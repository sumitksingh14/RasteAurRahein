/**
 * GET /api/admin/enrichment/gaps
 *
 * Returns a completeness report for all trips — which fields are missing, pending,
 * ai_filled, verified, or stale. Admin-only.
 */

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getAllTrips } from "@/lib/queries";
import { getTripFieldStatuses } from "@/lib/enrichment/store";
import { mergeCompletenessMap, ALL_FIELD_NAMES } from "@/lib/enrichment/detector";
import type { TripFieldName } from "@/lib/enrichment/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const trips = await getAllTrips();

    const report = await Promise.all(
      trips.map(async (trip) => {
        const storedStatuses = await getTripFieldStatuses(trip.slug);
        const completeness = mergeCompletenessMap(trip, storedStatuses);

        const fieldSummary = ALL_FIELD_NAMES.map((field: TripFieldName) => {
          const info = completeness[field];
          const stored = storedStatuses.find((s) => s.field === field);
          return {
            field,
            status: info.status,
            confidence: stored?.confidence ?? null,
            generatedAt: stored?.generatedAt ?? null,
            verifiedAt: stored?.verifiedAt ?? null,
          };
        });

        const statusCounts = fieldSummary.reduce(
          (acc, f) => {
            acc[f.status] = (acc[f.status] ?? 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        return {
          tripSlug: trip.slug,
          tripTitle: trip.title,
          tripStatus: trip.status,
          fields: fieldSummary,
          statusCounts,
          completenessScore:
            ((statusCounts.verified ?? 0) + (statusCounts.ai_filled ?? 0)) /
            ALL_FIELD_NAMES.length,
        };
      })
    );

    // Sort by completeness ascending (most incomplete first)
    report.sort((a, b) => a.completenessScore - b.completenessScore);

    return NextResponse.json({
      trips: report,
      totalTrips: trips.length,
      summary: {
        missing: report.reduce(
          (sum, t) => sum + (t.statusCounts.missing ?? 0),
          0
        ),
        pending: report.reduce(
          (sum, t) => sum + (t.statusCounts.pending ?? 0),
          0
        ),
        ai_filled: report.reduce(
          (sum, t) => sum + (t.statusCounts.ai_filled ?? 0),
          0
        ),
        verified: report.reduce(
          (sum, t) => sum + (t.statusCounts.verified ?? 0),
          0
        ),
        stale: report.reduce(
          (sum, t) => sum + (t.statusCounts.stale ?? 0),
          0
        ),
      },
    });
  } catch (err) {
    console.error("[enrichment/gaps] Error:", err);
    return NextResponse.json(
      { error: "Failed to compute completeness report" },
      { status: 500 }
    );
  }
}
