import { NextRequest, NextResponse } from "next/server";
import { parseItineraryHtml, sanitizeItineraryHtml } from "@/lib/itineraryParser";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "html field is required" }, { status: 400 });
    }

    if (html.length > 500_000) {
      return NextResponse.json({ error: "HTML too large (max 500KB)" }, { status: 413 });
    }

    const parsed = parseItineraryHtml(html);
    const sanitized = sanitizeItineraryHtml(html);

    return NextResponse.json({
      success: true,
      parsed,
      sanitizedHtml: sanitized,
      dayCount: parsed.days.length,
      activityCount: parsed.days.reduce((s, d) => s + d.activities.length, 0),
    });
  } catch (err) {
    console.error("Import itinerary error:", err);
    return NextResponse.json({ error: "Failed to parse itinerary" }, { status: 500 });
  }
}
