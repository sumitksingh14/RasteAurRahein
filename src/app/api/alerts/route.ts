import { NextRequest, NextResponse } from "next/server";
import { getTripAlert, getBulkAlerts } from "@/lib/tripAlerts";

/**
 * GET /api/alerts?slug=spiti-valley
 * GET /api/alerts?slugs=spiti-valley,leh-ladakh-9-days
 * Returns the current alert(s) for trip(s) (public, no auth).
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const slugsParam = req.nextUrl.searchParams.get("slugs");

  if (!slug && !slugsParam) {
    return NextResponse.json({ error: "slug or slugs required" }, { status: 400 });
  }

  // Bulk query mode
  if (slugsParam) {
    const slugs = slugsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const alerts = await getBulkAlerts(slugs);
    const res = NextResponse.json({ alerts });
    res.headers.set("Cache-Control", "public, max-age=60, s-maxage=120, stale-while-revalidate=300");
    return res;
  }

  // Single query mode
  const alert = await getTripAlert(slug!);
  const res = NextResponse.json({ alert });
  res.headers.set("Cache-Control", "public, max-age=60, s-maxage=120, stale-while-revalidate=300");
  return res;
}
