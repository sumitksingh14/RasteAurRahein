import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const trip = await sanityClient.fetch(
      `*[_type == "trip" && slug.current == $slug][0]{_id, viewCount}`,
      { slug }
    );

    if (trip) {
      await sanityClient
        .patch(trip._id)
        .set({ viewCount: (trip.viewCount || 0) + 1 })
        .commit();
    }

    return NextResponse.json({ success: true });
  } catch {
    // Silently fail — view count is non-critical
    return NextResponse.json({ success: false });
  }
}
