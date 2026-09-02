import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { redis } from "@/lib/redis";
import { getAllTrips } from "@/lib/queries";
import type { TripComment } from "@/lib/types";

/** GET /api/admin/comments — all comments across all trips */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const trips = await getAllTrips();
    const results = await Promise.all(
      trips.map(async (trip) => {
        const raw = await redis.lrange(`comments:${trip.slug}`, 0, -1);
        const comments: TripComment[] = raw
          .map((s) => { try { return JSON.parse(s) as TripComment; } catch { return null; } })
          .filter(Boolean) as TripComment[];
        return comments;
      })
    );
    const all = results.flat().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ comments: all });
  } catch (err) {
    console.error("Admin comments error:", err);
    return NextResponse.json({ comments: [] });
  }
}

/**
 * DELETE /api/admin/comments
 * Body: { tripSlug: string; commentId: string }
 * Removes the comment from the Redis list.
 */
export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { tripSlug, commentId } = await req.json();
  if (!tripSlug || !commentId) {
    return NextResponse.json({ error: "tripSlug and commentId are required" }, { status: 400 });
  }

  try {
    const key = `comments:${tripSlug}`;
    const raw = await redis.lrange(key, 0, -1);
    const kept = raw.filter((s) => {
      try { return (JSON.parse(s) as TripComment).id !== commentId; } catch { return true; }
    });
    // Rebuild the list: delete key then re-push
    await redis.del(key);
    for (const item of kept) {
      await redis.rpush(key, item);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin delete comment error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
