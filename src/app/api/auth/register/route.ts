import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { redis } from "@/lib/redis";
import { createSession } from "@/lib/session";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // --- Validation ---
    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json({ error: "Username must be 3–30 characters" }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      return NextResponse.json({ error: "Username can only contain letters, numbers, _ . -" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // --- Uniqueness checks ---
    const existingEmail = await redis.get(`user:email:${email.toLowerCase()}`);
    if (existingEmail) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    const existingUsername = await redis.get(`user:username:${username.toLowerCase()}`);
    if (existingUsername) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    // --- Create user ---
    const userId = randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);

    await redis.hset(`user:${userId}`, {
      id: userId,
      username,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    });
    await redis.set(`user:email:${email.toLowerCase()}`, userId);
    await redis.set(`user:username:${username.toLowerCase()}`, userId);

    // --- Issue session ---
    await createSession({ userId, username, email: email.toLowerCase() });

    return NextResponse.json({ success: true, user: { id: userId, username, email: email.toLowerCase() } });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
