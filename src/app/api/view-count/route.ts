import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    // If Upstash Redis is not configured, silently succeed
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!upstashUrl || !upstashToken) {
      return NextResponse.json({ success: true, count: null });
    }

    // Atomic INCR — works without a write-capable Sanity token
    const key = `views:${slug}`;
    const response = await fetch(`${upstashUrl}/incr/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${upstashToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Upstash responded with ${response.status}`);
    }

    const { result: count } = await response.json();
    return NextResponse.json({ success: true, count });
  } catch {
    // Silently fail — view count is non-critical
    return NextResponse.json({ success: true, count: null });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!upstashUrl || !upstashToken) {
      return NextResponse.json({ count: null });
    }

    const key = `views:${slug}`;
    const response = await fetch(`${upstashUrl}/get/${key}`, {
      headers: {
        Authorization: `Bearer ${upstashToken}`,
      },
    });

    const { result } = await response.json();
    return NextResponse.json({ count: result ? parseInt(result, 10) : 0 });
  } catch {
    return NextResponse.json({ count: null });
  }
}

