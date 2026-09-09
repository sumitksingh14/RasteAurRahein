import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";

interface Props {
  params: Promise<{ id: string; userId: string }>;
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, userId } = await params;
  const hash = await redis.hgetall(`group:${id}`);
  if (!hash) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // Only organizer can remove others; any member can remove themselves
  const requestorRole = await redis.hget(`group:${id}:members`, session.userId);
  if (session.userId !== userId && requestorRole !== "organizer") {
    return NextResponse.json({ error: "Only the organizer can remove other members" }, { status: 403 });
  }

  // Cannot remove the organizer themselves via this endpoint
  if (userId === hash.organizerId && session.userId !== userId) {
    return NextResponse.json({ error: "Cannot remove the organizer" }, { status: 400 });
  }

  await redis.hdel(`group:${id}:members`, userId);
  await redis.srem(`group:${id}:memberIds`, userId);
  await redis.srem(`user:${userId}:groups`, id);

  return NextResponse.json({ success: true });
}
