import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { redis } from "@/lib/redis";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/email and password are required" },
        { status: 400 }
      );
    }

    const input = identifier.trim();

    // Resolve userId — treat as email if it contains "@", otherwise as username
    let userId: string | null = null;
    if (input.includes("@")) {
      userId = await redis.get(`user:email:${input.toLowerCase()}`);
    } else {
      userId = await redis.get(`user:username:${input.toLowerCase()}`);
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    const userHash = await redis.hgetall(`user:${userId}`);
    if (!userHash) {
      return NextResponse.json(
        { error: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, userHash.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username/email or password" },
        { status: 401 }
      );
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
