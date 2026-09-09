import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  saveItinerary,
  getSavedItineraries,
} from "@/lib/savedItineraries";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const itineraries = await getSavedItineraries(session.userId);
  return NextResponse.json({ itineraries });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, destination, days, pace, budget, travelStyle, itineraryJson } = body;

  if (!title || !destination || !itineraryJson) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const itinerary = await saveItinerary(session.userId, {
    title,
    destination,
    days: Number(days) || 1,
    pace: pace || "",
    budget: budget || "",
    travelStyle: travelStyle || "",
    itineraryJson,
  });

  return NextResponse.json({ itinerary }, { status: 201 });
}
