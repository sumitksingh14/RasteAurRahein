import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { toggleSavedTrip, getSavedTripSlugs } from "@/lib/savedTrips";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slugs = await getSavedTripSlugs(session.userId);
  return NextResponse.json({ savedSlugs: slugs });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tripSlug } = await req.json();
  if (!tripSlug || typeof tripSlug !== "string") {
    return NextResponse.json({ error: "tripSlug is required" }, { status: 400 });
  }

  const isSaved = await toggleSavedTrip(session.userId, tripSlug);
  return NextResponse.json({ saved: isSaved, tripSlug });
}
