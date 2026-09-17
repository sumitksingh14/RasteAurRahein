import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { submitReport, getReportsByTrip } from "@/lib/fieldReports";
import sanitizeHtml from "sanitize-html";

/** GET /api/field-reports?tripSlug=xxx */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tripSlug = searchParams.get("tripSlug");

  if (!tripSlug) {
    return NextResponse.json({ error: "tripSlug is required" }, { status: 400 });
  }

  const session = await getSession();
  const reports = await getReportsByTrip(tripSlug, {
    includeUserId: session?.userId,
  });

  return NextResponse.json({ reports });
}

/** POST /api/field-reports — requires auth */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in to submit a field report" }, { status: 401 });
  }

  const body = await req.json();
  const { tripSlug, text, dateOfTravel, season, rating, photoUrls } = body;

  if (!tripSlug || !text?.trim()) {
    return NextResponse.json({ error: "tripSlug and text are required" }, { status: 400 });
  }

  const validSeasons = ["Summer", "Monsoon", "Winter", "Spring", "Autumn"];
  if (!validSeasons.includes(season)) {
    return NextResponse.json({ error: "Invalid season" }, { status: 400 });
  }

  const ratingNum = Number(rating);
  if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
  }

  const sanitizedText = sanitizeHtml(String(text).trim(), { allowedTags: [], allowedAttributes: {} }).slice(0, 2000);

  // Validate and sanitize photo URLs (max 5)
  let cleanPhotoUrls = "";
  if (photoUrls && Array.isArray(photoUrls)) {
    const urls = (photoUrls as string[])
      .slice(0, 5)
      .filter((u) => typeof u === "string" && u.startsWith("http"))
      .map((u) => u.trim());
    cleanPhotoUrls = urls.join(",");
  }

  const report = await submitReport(session.userId, session.username, {
    tripSlug,
    body: sanitizedText,
    dateOfTravel: dateOfTravel || new Date().toISOString().slice(0, 10),
    season,
    rating: ratingNum,
    photoUrls: cleanPhotoUrls || undefined,
  });

  return NextResponse.json({ report }, { status: 201 });
}
