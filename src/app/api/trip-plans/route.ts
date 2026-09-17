import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { setTripPlan, getAllTripPlans, getSavedTripSlugs } from "@/lib/savedTrips";
import { getTripBySlug } from "@/lib/queries";

/** GET /api/trip-plans — returns all plan metadata and trip info for the signed-in user's saved trips */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slugs = await getSavedTripSlugs(session.userId);
  const plans = await getAllTripPlans(session.userId, slugs);

  const tripsMeta = await Promise.all(
    slugs.map(async (slug) => {
      const trip = await getTripBySlug(slug);
      return {
        slug,
        title:
          trip?.title ||
          slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        image: null,
        duration: trip?.itinerary ? `${trip.itinerary.length} days` : undefined,
        cost: trip?.totalBudget ? `₹${trip.totalBudget.toLocaleString("en-IN")}` : undefined,
      };
    })
  );

  return NextResponse.json({ plans, trips: tripsMeta, slugs });
}

/** PATCH /api/trip-plans — update plan metadata for a specific trip */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { tripSlug, ...data } = body;

  if (!tripSlug || typeof tripSlug !== "string") {
    return NextResponse.json({ error: "tripSlug is required" }, { status: 400 });
  }

  if (data.status && !["planned", "in-progress", "completed"].includes(data.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (data.actualSpend !== undefined) {
    const spend = Number(data.actualSpend);
    if (isNaN(spend) || spend < 0) {
      return NextResponse.json({ error: "actualSpend must be a non-negative number" }, { status: 400 });
    }
    data.actualSpend = spend;
  }

  const plan = await setTripPlan(session.userId, tripSlug, data);
  return NextResponse.json({ plan });
}
