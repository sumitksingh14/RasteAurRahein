import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getAllTrips, createTrip } from "@/lib/queries";
import type { Trip } from "@/lib/types";
import { randomUUID } from "crypto";

/** GET /api/admin/trips — list all trips (including drafts) */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const trips = await getAllTrips();
  return NextResponse.json({ trips });
}

/** POST /api/admin/trips — create a new trip */
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const { title, slug, excerpt, tags, country, startDate, endDate,
            status, totalBudget, currency, tripType, bestSuggestedMonth } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const trip: Trip = {
      _id: `trip-${randomUUID().slice(0, 8)}`,
      title,
      slug,
      excerpt: excerpt || "",
      tags: Array.isArray(tags) ? tags : [],
      country: country || "",
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      bestSuggestedMonth: bestSuggestedMonth || "",
      status: status || "draft",
      totalBudget: totalBudget ? Number(totalBudget) : undefined,
      currency: currency || "INR",
      tripType: tripType || "",
      itinerary: [],
      _createdAt: now,
      _updatedAt: now,
    };

    await createTrip(trip);
    return NextResponse.json({ trip }, { status: 201 });
  } catch (err) {
    console.error("Admin create trip error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
