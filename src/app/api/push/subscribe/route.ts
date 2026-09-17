import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  savePushSubscription,
  removePushSubscription,
  getUserPushSubscriptions,
} from "@/lib/pushSubscriptions";

/** GET /api/push/subscribe — returns public VAPID key and status */
export async function GET() {
  const session = await getSession();
  const publicKey =
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    "BIsV88-g5oBgvrI7BGNJsZn-fz4X6MTEKztqbVjZTlprVylyZdEE7xg8Tbr6zauguv6JjoIMmPU6ofKC7SD62UM";

  let isSubscribed = false;
  let favoriteRegions: string[] = [];

  if (session) {
    const userSubs = await getUserPushSubscriptions(session.userId);
    if (userSubs.length > 0) {
      isSubscribed = true;
      favoriteRegions = userSubs[0].favoriteRegions || [];
    }
  }

  return NextResponse.json({
    publicKey,
    isSubscribed,
    favoriteRegions,
  });
}

/** POST /api/push/subscribe — registers or updates a push subscription */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { subscription, favoriteRegions } = body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: "Invalid subscription payload" },
        { status: 400 }
      );
    }

    const saved = await savePushSubscription(
      subscription,
      session?.userId,
      Array.isArray(favoriteRegions) ? favoriteRegions : []
    );

    return NextResponse.json({ success: true, subscription: saved });
  } catch (err: unknown) {
    console.error("Push subscription error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/** DELETE /api/push/subscribe — unregisters a subscription */
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint } = body;

    if (!endpoint || typeof endpoint !== "string") {
      return NextResponse.json(
        { error: "endpoint is required" },
        { status: 400 }
      );
    }

    await removePushSubscription(endpoint);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Push unsubscribe error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
