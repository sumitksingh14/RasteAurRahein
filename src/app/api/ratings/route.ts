import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getSession } from "@/lib/session";

function ratingsKey(slug: string) {
  return `ratings:${slug}`;
}

/** GET /api/ratings?tripSlug=xxx */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tripSlug = searchParams.get("tripSlug");

  if (!tripSlug) {
    return NextResponse.json({ error: "tripSlug is required" }, { status: 400 });
  }

  const session = await getSession();
  const key = ratingsKey(tripSlug);

  try {
    const [allVals, userRatingRaw] = await Promise.all([
      redis.hvals(key).catch(() => [] as string[]),
      session ? redis.hget(key, session.userId).catch(() => null) : Promise.resolve(null),
    ]);

    const votes = allVals.map(Number).filter((n) => n >= 1 && n <= 5);
    const count = votes.length;
    const average = count > 0 ? votes.reduce((a, b) => a + b, 0) / count : 0;
    const userRating = userRatingRaw ? Number(userRatingRaw) : null;

    return NextResponse.json({ average: Math.round(average * 10) / 10, count, userRating });
  } catch {
    return NextResponse.json({ average: 0, count: 0, userRating: null });
  }
}

/** POST /api/ratings  body: { tripSlug, rating } — 1-5 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in to rate" }, { status: 401 });
  }

  const { tripSlug, rating } = await req.json();
  const ratingNum = Number(rating);

  if (!tripSlug || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ error: "tripSlug and rating (1-5) are required" }, { status: 400 });
  }

  const key = ratingsKey(tripSlug);
  await redis.hset(key, { [session.userId]: String(Math.round(ratingNum)) });

  // Recalculate
  const allVals = await redis.hvals(key).catch(() => [] as string[]);
  const votes = allVals.map(Number).filter((n) => n >= 1 && n <= 5);
  const count = votes.length;
  const average = count > 0 ? votes.reduce((a, b) => a + b, 0) / count : 0;

  return NextResponse.json({
    average: Math.round(average * 10) / 10,
    count,
    userRating: Math.round(ratingNum),
  });
}
