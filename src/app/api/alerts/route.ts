import { NextRequest, NextResponse } from "next/server";
import { getTripAlert } from "@/lib/tripAlerts";

/**
 * GET /api/alerts?slug=spiti-valley
 * Returns the current alert for a trip (public, no auth).
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const alert = await getTripAlert(slug);
  return NextResponse.json({ alert });
}
