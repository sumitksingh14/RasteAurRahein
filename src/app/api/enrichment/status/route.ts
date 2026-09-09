/**
 * GET /api/enrichment/status
 *
 * Returns the current TripFieldStatus for a given trip and field.
 * Public endpoint (read-only) — cached by Redis.
 *
 * Query params: tripSlug, field
 */

import { NextRequest, NextResponse } from "next/server";
import { getFieldStatus } from "@/lib/enrichment/store";
import type { TripFieldName } from "@/lib/enrichment/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tripSlug = searchParams.get("tripSlug");
  const field = searchParams.get("field") as TripFieldName | null;

  if (!tripSlug || !field) {
    return NextResponse.json(
      { error: "tripSlug and field are required" },
      { status: 400 }
    );
  }

  try {
    const status = await getFieldStatus(tripSlug, field);
    return NextResponse.json(
      { status },
      {
        headers: {
          // Cache for 60 seconds on CDN (status changes via jobs, not real-time)
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (err) {
    console.error("[enrichment/status] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch field status" },
      { status: 500 }
    );
  }
}
