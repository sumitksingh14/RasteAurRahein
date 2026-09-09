import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";

interface Props {
  params: Promise<{ id: string }>;
}

// ---------------------------------------------------------------------------
// GET /api/group-trips/[id] — group detail
// ---------------------------------------------------------------------------
export async function GET(_req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const hash = await redis.hgetall(`group:${id}`);
  if (!hash) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // Check membership
  const isMember = await redis.sismember(`group:${id}:memberIds`, session.userId);
  if (!isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fetch all members with roles
  const membersHash = await redis.hgetall(`group:${id}:members`);
  const memberIds = await redis.smembers(`group:${id}:memberIds`);

  // Hydrate member info from Redis user hashes
  const members = await Promise.all(
    memberIds.map(async (uid) => {
      const userHash = await redis.hgetall(`user:${uid}`);
      return {
        id: uid,
        username: userHash?.username || uid,
        email: userHash?.email || "",
        role: membersHash?.[uid] || "member",
      };
    })
  );

  return NextResponse.json({
    group: {
      ...hash,
      members,
      userRole: membersHash?.[session.userId] || "member",
    },
  });
}

// ---------------------------------------------------------------------------
// PATCH /api/group-trips/[id] — update name, startDate, or checklist
// ---------------------------------------------------------------------------
export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const hash = await redis.hgetall(`group:${id}`);
  if (!hash) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const isMember = await redis.sismember(`group:${id}:memberIds`, session.userId);
  if (!isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const updates: Record<string, string> = {};

  if (body.name && typeof body.name === "string") updates.name = body.name;
  if (body.startDate && typeof body.startDate === "string") updates.startDate = body.startDate;
  if (body.checklist !== undefined) updates.checklist = JSON.stringify(body.checklist);

  if (Object.keys(updates).length > 0) {
    await redis.hset(`group:${id}`, updates);
  }

  return NextResponse.json({ success: true });
}
