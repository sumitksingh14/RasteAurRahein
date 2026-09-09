/**
 * GET /api/admin/enrichment/runs
 *
 * Returns the last 100 enrichment run log entries with aggregate stats.
 * Admin-only.
 */

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getRunLogs, getFieldsByStatus } from "@/lib/enrichment/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const logs = await getRunLogs(100);

    const successCount = logs.filter((l) => l.outcome === "success").length;
    const failCount = logs.filter((l) => l.outcome === "failed").length;
    const skipCount = logs.filter((l) => l.outcome === "skipped").length;
    const totalTokens = logs.reduce((sum, l) => sum + (l.tokensUsed ?? 0), 0);

    // Approval rate: verified / (verified + ai_filled)
    const verifiedFields = await getFieldsByStatus("verified");
    const aiFilled = await getFieldsByStatus("ai_filled");
    const approvalRate =
      verifiedFields.length + aiFilled.length === 0
        ? 0
        : verifiedFields.length / (verifiedFields.length + aiFilled.length);

    return NextResponse.json({
      logs,
      successCount,
      failCount,
      skipCount,
      totalTokens,
      approvalRate,
    });
  } catch (err) {
    console.error("[enrichment/runs] Error:", err);
    return NextResponse.json(
      { error: "Failed to load run logs" },
      { status: 500 }
    );
  }
}
