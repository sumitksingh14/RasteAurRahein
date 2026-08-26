import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { redis } from "@/lib/redis";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Look up user by email
    const userId = await redis.get(`user:email:${email.toLowerCase()}`);
    if (!userId) {
      // Same error message for both cases to prevent user enumeration
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const userHash = await redis.hgetall(`user:${userId}`);
    if (!userHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, userHash.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

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
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
