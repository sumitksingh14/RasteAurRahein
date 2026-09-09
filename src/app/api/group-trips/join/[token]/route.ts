import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";
import { sendGroupJoinNotification } from "@/lib/email";

interface Props {
  params: Promise<{ token: string }>;
}

export async function POST(_req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token } = await params;
  const groupId = await redis.get(`group:invite:${token}`);

  if (!groupId) {
    return NextResponse.json(
      { error: "Invalid or expired invite link" },
      { status: 404 }
    );
  }

  const hash = await redis.hgetall(`group:${groupId}`);
  if (!hash) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // Already a member?
  const alreadyMember = await redis.sismember(`group:${groupId}:memberIds`, session.userId);
  if (alreadyMember) {
    return NextResponse.json({ groupId, alreadyMember: true });
  }

  // Add user as member
  await redis.hset(`group:${groupId}:members`, { [session.userId]: "member" });
  await redis.sadd(`group:${groupId}:memberIds`, session.userId);
  await redis.sadd(`user:${session.userId}:groups`, groupId);

  // Notify organizer
  const organizerId = hash.organizerId;
  if (organizerId) {
    const organizerHash = await redis.hgetall(`user:${organizerId}`);
    if (organizerHash?.email) {
      await sendGroupJoinNotification({
        organizerEmail: organizerHash.email,
        organizerName: organizerHash.username || organizerId,
        joinerName: session.username,
        groupName: hash.name,
        groupId,
      });
    }
  }

  return NextResponse.json({ groupId, joined: true });
}
