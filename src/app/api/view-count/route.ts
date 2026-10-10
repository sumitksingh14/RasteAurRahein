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

    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!upstashUrl || !upstashToken) {
      return NextResponse.json(slug ? { count: null } : { views: {} });
    }

    if (slug) {
      const key = `views:${slug}`;
      const response = await fetch(`${upstashUrl}/get/${key}`, {
        headers: {
          Authorization: `Bearer ${upstashToken}`,
        },
      });

      const { result } = await response.json();
      const res = NextResponse.json({ count: result ? parseInt(result, 10) : 0 });
      res.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return res;
    }

    // No slug passed: fetch all views
    const keysResponse = await fetch(`${upstashUrl}/keys/views:*`, {
      headers: {
        Authorization: `Bearer ${upstashToken}`,
      },
    });

    const { result: keys } = await keysResponse.json();
    if (!Array.isArray(keys) || keys.length === 0) {
      return NextResponse.json({ views: {} });
    }

    const mgetResponse = await fetch(`${upstashUrl}/mget/${keys.join("/")}`, {
      headers: {
        Authorization: `Bearer ${upstashToken}`,
      },
    });

    const { result: rawValues } = await mgetResponse.json();
    const views: Record<string, number> = {};

    keys.forEach((key: string, idx: number) => {
      const tripSlug = key.replace(/^views:/, "");
      const val = rawValues && rawValues[idx] ? parseInt(rawValues[idx], 10) : 0;
      views[tripSlug] = val;
    });

    const res = NextResponse.json({ views });
    res.headers.set("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
    return res;
  } catch {
    return NextResponse.json({ count: null, views: {} });
  }
}

