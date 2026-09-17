import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/admin";
import {
  getAllPushSubscriptions,
  sendPushNotification,
} from "@/lib/pushSubscriptions";

/**
 * POST /api/push/send
 * Sends a push notification to subscribers.
 * Restrict to authenticated admins.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !isAdmin(session.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, body: notifBody, url = "/", region } = body;

    if (!title || !notifBody) {
      return NextResponse.json(
        { error: "title and body are required" },
        { status: 400 }
      );
    }

    const allSubs = await getAllPushSubscriptions();
    if (allSubs.length === 0) {
      return NextResponse.json({ sentCount: 0, message: "No subscribers found" });
    }

    // Filter by region if specified
    const targetSubs = region
      ? allSubs.filter(
          (s) =>
            !s.favoriteRegions ||
            s.favoriteRegions.length === 0 ||
            s.favoriteRegions.some(
              (r) => r.toLowerCase() === region.toLowerCase()
            )
        )
      : allSubs;

    const payload = {
      title,
      body: notifBody,
      url,
      icon: "/icons/icon-192.png",
    };

    const results = await Promise.allSettled(
      targetSubs.map((sub) => sendPushNotification(sub, payload))
    );

    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value.success
    ).length;

    return NextResponse.json({
      sentCount: successful,
      totalTargeted: targetSubs.length,
    });
  } catch (err: unknown) {
    console.error("Failed to broadcast push notification:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
