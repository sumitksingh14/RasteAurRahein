import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ valid: false, error: "Token missing" }, { status: 400 });
  }

  try {
    const { redis } = await import("@/lib/redis");
    const userId = await redis.get(`pwd:reset:${token}`);
    if (!userId) {
      return NextResponse.json({ valid: false, error: "Token expired or invalid" }, { status: 400 });
    }
    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false, error: "Server error" }, { status: 500 });
  }
}
