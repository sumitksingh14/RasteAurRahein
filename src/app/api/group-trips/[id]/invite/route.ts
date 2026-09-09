import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";
import crypto from "crypto";
import { sendGroupInviteEmail } from "@/lib/email";

const INVITE_TTL = 60 * 60 * 24 * 7; // 7 days

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const hash = await redis.hgetall(`group:${id}`);
  if (!hash) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // Only organizer can generate invites
  const role = await redis.hget(`group:${id}:members`, session.userId);
  if (role !== "organizer") {
    return NextResponse.json({ error: "Only the organizer can generate invite links" }, { status: 403 });
  }

  // Generate a secure random token
  const token = crypto.randomBytes(24).toString("hex");

  // Store token → groupId mapping with TTL
  await redis.set(`group:invite:${token}`, id, INVITE_TTL);

  // Optional: send email invite if email provided in body
  const body = await req.json().catch(() => ({}));
  if (body.email && typeof body.email === "string") {
    const organizerHash = await redis.hgetall(`user:${session.userId}`);
    await sendGroupInviteEmail({
      toEmail: body.email,
      inviterName: session.username,
      groupName: hash.name,
      groupId: id,
      token,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raste-aur-rahein.vercel.app";
  const joinUrl = `${siteUrl}/trips/group/${id}/join?token=${token}`;

  return NextResponse.json({ token, joinUrl, expiresIn: "7 days" });
}
