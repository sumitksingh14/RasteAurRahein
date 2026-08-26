import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { redis } from "@/lib/redis";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Verify token
    const userId = await redis.get(`pwd:reset:${token}`);
    if (!userId) {
      return NextResponse.json({ error: "Reset link has expired or is invalid. Please request a new one." }, { status: 400 });
    }

    // Fetch user
    const userHash = await redis.hgetall(`user:${userId}`);
    if (!userHash) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hash new password and update
    const passwordHash = await bcrypt.hash(password, 12);
    await redis.hset(`user:${userId}`, { passwordHash });

    // Consume the token (one-time use)
    await redis.del(`pwd:reset:${token}`);

    // Auto sign-in after successful reset
    await createSession({
      userId: userHash.id,
      username: userHash.username,
      email: userHash.email,
    });

    return NextResponse.json({
      success: true,
      user: { id: userHash.id, username: userHash.username, email: userHash.email },
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
