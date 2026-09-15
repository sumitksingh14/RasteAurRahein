import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { redis } from "@/lib/redis";
import { getAllTrips } from "@/lib/queries";

/** GET /api/admin/analytics — aggregate stats across all trips */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const trips = await getAllTrips();

    // Use Redis pipeline to batch all SCARD and LLEN calls
    const pipeline: Array<Promise<any>> = [];
    for (const trip of trips) {
      pipeline.push(redis.scard(`trip:likes:${trip.slug}`).catch(() => 0));
      pipeline.push(redis.llen(`comments:${trip.slug}`).catch(() => 0));
    }

    const results = await Promise.all(pipeline);

    const stats = trips.map((trip, idx) => ({
      slug: trip.slug,
      title: trip.title,
      status: trip.status,
      viewCount: trip.viewCount || 0,
      likes: results[idx * 2],
      commentCount: results[idx * 2 + 1],
    }));

    const totalLikes = stats.reduce((s, t) => s + t.likes, 0);
    const totalComments = stats.reduce((s, t) => s + t.commentCount, 0);
    const totalViews = stats.reduce((s, t) => s + t.viewCount, 0);

    const topByViews = [...stats].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
    const topByLikes = [...stats].sort((a, b) => b.likes - a.likes).slice(0, 5);

    // Count registered users
    const userCount = await redis.scard("users:index").catch(() => 0);

    return NextResponse.json({
      summary: {
        totalTrips: trips.length,
        publishedTrips: trips.filter((t) => t.status === "published").length,
        draftTrips: trips.filter((t) => t.status === "draft").length,
        totalViews,
        totalLikes,
        totalComments,
        totalUsers: userCount,
      },
      topByViews,
      topByLikes,
      tripStats: stats,
    });
  } catch (err) {
    console.error("Admin analytics error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
