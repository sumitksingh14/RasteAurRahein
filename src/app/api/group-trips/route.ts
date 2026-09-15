import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface GroupTrip {
  id: string;
  name: string;
  sourceTripSlug?: string;
  sourceItineraryId?: string;
  organizerId: string;
  startDate?: string;
  createdAt: string;
  checklist?: string; // JSON array string
}

// ---------------------------------------------------------------------------
// GET /api/group-trips — list groups the current user belongs to
// ---------------------------------------------------------------------------
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const groupIds = await redis.smembers(`user:${session.userId}:groups`);
    if (groupIds.length === 0) {
      return NextResponse.json({ groups: [] });
    }

    // Batch all Redis calls using Promise.all
    const pipeline: Array<Promise<any>> = [];
    for (const id of groupIds) {
      pipeline.push(redis.hgetall(`group:${id}`).catch(() => null));
      pipeline.push(redis.scard(`group:${id}:memberIds`).catch(() => 0));
      pipeline.push(redis.hget(`group:${id}:members`, session.userId).catch(() => null));
    }

    const results = await Promise.all(pipeline);

    const groups = groupIds
      .map((id, idx) => {
        const hash = results[idx * 3];
        if (!hash || !hash.id) return null;

        const memberCount = results[idx * 3 + 1];
        const role = results[idx * 3 + 2];

        return {
          id: hash.id,
          name: hash.name,
          role: (role || "member") as "organizer" | "member",
          startDate: hash.startDate,
          memberCount,
          sourceTripSlug: hash.sourceTripSlug,
          sourceItineraryId: hash.sourceItineraryId,
        };
      })
      .filter(Boolean);

    const validGroups = groups;
    return NextResponse.json({ groups: validGroups });
  } catch (err) {
    console.error("GET /api/group-trips error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST /api/group-trips — create a new group trip
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, sourceTripSlug, sourceItineraryId, startDate } = body;

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!sourceTripSlug && !sourceItineraryId) {
    return NextResponse.json(
      { error: "sourceTripSlug or sourceItineraryId is required" },
      { status: 400 }
    );
  }

  const id = `grp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const createdAt = new Date().toISOString();

  const hash: Record<string, string> = {
    id,
    name,
    organizerId: session.userId,
    createdAt,
    checklist: "[]",
  };
  if (sourceTripSlug) hash.sourceTripSlug = sourceTripSlug;
  if (sourceItineraryId) hash.sourceItineraryId = sourceItineraryId;
  if (startDate) hash.startDate = startDate;

  await redis.hset(`group:${id}`, hash);

  // Add organizer as member
  await redis.hset(`group:${id}:members`, { [session.userId]: "organizer" });
  await redis.sadd(`group:${id}:memberIds`, session.userId);

  // Add group to user's index
  await redis.sadd(`user:${session.userId}:groups`, id);

  return NextResponse.json({ group: { ...hash, role: "organizer", memberCount: 1 } }, { status: 201 });
}
