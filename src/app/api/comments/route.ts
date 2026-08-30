import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getSession } from "@/lib/session";
import type { TripComment } from "@/lib/types";

function commentsKey(slug: string) {
  return `comments:${slug}`;
}

/** GET /api/comments?tripSlug=xxx */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tripSlug = searchParams.get("tripSlug");

  if (!tripSlug) {
    return NextResponse.json({ error: "tripSlug is required" }, { status: 400 });
  }

  try {
    const raw = await redis.lrange(commentsKey(tripSlug), 0, -1);
    const comments: TripComment[] = raw
      .map((s) => {
        try { return JSON.parse(s) as TripComment; } catch { return null; }
      })
      .filter(Boolean) as TripComment[];

    // Return newest first
    comments.reverse();
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

/** POST /api/comments — requires login */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in to comment" }, { status: 401 });
  }

  const { tripSlug, body } = await req.json();
  if (!tripSlug || !body?.trim()) {
    return NextResponse.json({ error: "tripSlug and body are required" }, { status: 400 });
  }

  const trimmedBody = String(body).trim().slice(0, 1000); // cap at 1000 chars

  const comment: TripComment = {
    id: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
    tripSlug,
    authorName: session.username,
    userId: session.userId,
    body: trimmedBody,
    createdAt: new Date().toISOString(),
  };

  await redis.rpush(commentsKey(tripSlug), JSON.stringify(comment));
  return NextResponse.json({ comment }, { status: 201 });
}
