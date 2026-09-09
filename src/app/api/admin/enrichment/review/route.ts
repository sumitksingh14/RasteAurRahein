/**
 * PATCH /api/admin/enrichment/review
 *
 * Approve, edit-then-approve, or reject a TripFieldStatus that is ai_filled.
 * - Approve: status → verified, records verifiedBy + verifiedAt
 * - Reject: status → missing (resets for retry)
 * Admin-only.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import {
  getFieldStatus,
  upsertFieldStatus,
  appendHistory,
} from "@/lib/enrichment/store";
import type { TripFieldName } from "@/lib/enrichment/types";

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { tripSlug, field, action, editedValue } = body as {
      tripSlug: string;
      field: TripFieldName;
      action: "approve" | "reject";
      editedValue?: unknown;
    };

    if (!tripSlug || !field || !action) {
      return NextResponse.json(
        { error: "tripSlug, field, and action are required" },
        { status: 400 }
      );
    }

    const existing = await getFieldStatus(tripSlug, field);
    if (!existing) {
      return NextResponse.json(
        { error: "Field status not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      const valueToStore = editedValue ?? existing.value;

      await appendHistory(
        tripSlug,
        field,
        existing.value,
        existing.status,
        session.userId,
        `Human ${editedValue ? "edited and " : ""}approved`
      );

      await upsertFieldStatus(tripSlug, field, {
        status: "verified",
        value: valueToStore as typeof existing.value,
        verifiedAt: new Date().toISOString(),
        verifiedBy: session.userId,
        pendingReason: null,
      });

      return NextResponse.json({
        success: true,
        message: `${field} verified for trip ${tripSlug}`,
      });
    }

    if (action === "reject") {
      await appendHistory(
        tripSlug,
        field,
        existing.value,
        existing.status,
        session.userId,
        "Human rejected — reset to missing for re-enrichment"
      );

      await upsertFieldStatus(tripSlug, field, {
        status: "missing",
        value: null,
        confidence: 0,
        citations: [],
        generatedAt: null,
        pendingReason: "Rejected by reviewer",
      });

      return NextResponse.json({
        success: true,
        message: `${field} rejected and reset to missing for ${tripSlug}`,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("[enrichment/review] Error:", err);
    return NextResponse.json(
      { error: "Review action failed" },
      { status: 500 }
    );
  }
}
