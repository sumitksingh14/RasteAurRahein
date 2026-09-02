import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminSession, SEED_ADMIN_EMAIL } from "@/lib/admin";
import { redis } from "@/lib/redis";
import { randomUUID } from "crypto";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

/** GET /api/admin/users — list all registered users with their admin status */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const ids = await redis.smembers("users:index");
    const adminIds = new Set(await redis.smembers("admins:index"));

    const users: AdminUser[] = [];

    for (const id of ids) {
      const hash = await redis.hgetall(`user:${id}`);
      if (!hash) continue;
      const email = hash.email || "";
      // User is admin if in admins:index OR is the seed email
      const isAdmin =
        adminIds.has(id) || email.toLowerCase() === SEED_ADMIN_EMAIL.toLowerCase();
      users.push({
        id: hash.id || id,
        username: hash.username || "",
        email,
        createdAt: hash.createdAt || "",
        isAdmin,
      });
    }

    // Sort: admins first, then newest first
    users.sort((a, b) => {
      if (a.isAdmin !== b.isAdmin) return a.isAdmin ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Admin users GET error:", err);
    return NextResponse.json({ users: [] });
  }
}

/** POST /api/admin/users — create a new user from the admin portal */
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { username, email, password, makeAdmin = false } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email and password are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json({ error: "Username must be 3–30 characters" }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9_.\-]+$/.test(username)) {
      return NextResponse.json({ error: "Username can only contain letters, numbers, _ . -" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Uniqueness checks
    const existingEmail = await redis.get(`user:email:${email.toLowerCase()}`);
    if (existingEmail) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    const existingUsername = await redis.get(`user:username:${username.toLowerCase()}`);
    if (existingUsername) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    // Create user in Redis
    const userId = randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);

    await redis.hset(`user:${userId}`, {
      id: userId,
      username,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
      createdBy: "admin",
    });
    await redis.set(`user:email:${email.toLowerCase()}`, userId);
    await redis.set(`user:username:${username.toLowerCase()}`, userId);
    await redis.sadd("users:index", userId);

    // Optionally grant admin role
    if (makeAdmin) {
      await redis.sadd("admins:index", userId);
    }

    return NextResponse.json({
      success: true,
      user: { id: userId, username, email: email.toLowerCase(), isAdmin: !!makeAdmin },
    });
  } catch (err) {
    console.error("Admin users POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
