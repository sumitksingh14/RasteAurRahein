import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getSession } from "@/lib/session";
import { getTripDummyLikes } from "@/lib/likes";

function likeKey(type: string, id: string): string {
  return `${type}:likes:${id}`;
}

/** GET /api/likes?type=trip&id=spiti-valley */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "type and id are required" }, { status: 400 });
  }

  const key = likeKey(type, id);
  const session = await getSession();
  const dummyBase = type === "trip" ? getTripDummyLikes(id) : 0;

  const [realCount, liked] = await Promise.all([
    redis.scard(key).catch(() => 0),
    session ? redis.sismember(key, session.userId).catch(() => false) : Promise.resolve(false),
  ]);

  return NextResponse.json({ count: dummyBase + (realCount || 0), liked });
}

/** POST /api/likes  body: { type, id } → toggles like */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in to like" }, { status: 401 });
  }

  const { type, id } = await req.json();
  if (!type || !id) {
    return NextResponse.json({ error: "type and id are required" }, { status: 400 });
  }

  const key = likeKey(type, id);
  const alreadyLiked = await redis.sismember(key, session.userId);

  if (alreadyLiked) {
    await redis.srem(key, session.userId);
  } else {
    await redis.sadd(key, session.userId);
  }

  const dummyBase = type === "trip" ? getTripDummyLikes(id) : 0;
  const realCount = (await redis.scard(key).catch(() => 0)) || 0;
  return NextResponse.json({ count: dummyBase + realCount, liked: !alreadyLiked });
}
