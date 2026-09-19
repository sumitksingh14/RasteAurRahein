import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { sendEnquiryNotification } from "@/lib/email";

// Simple rate-limiting: 1 enquiry per IP per 60 seconds
const RATE_LIMIT_TTL = 60;

function sanitize(str: string): string {
  return str.trim().slice(0, 2000).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, tripTitle, tripSlug } = body;

    // Validate required fields
    if (!name || !email || !message || !tripSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rateLimitKey = `enquiry:ratelimit:${ip}`;
    try {
      const existing = await redis.get(rateLimitKey);
      if (existing) {
        return NextResponse.json(
          { error: "Please wait before submitting another enquiry." },
          { status: 429 }
        );
      }
      await redis.set(rateLimitKey, "1", RATE_LIMIT_TTL);
    } catch {
      // Redis unavailable — allow the request through
    }

    // Build enquiry record
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const enquiry = {
      id,
      name: sanitize(name),
      email: sanitize(email),
      message: sanitize(message),
      tripTitle: sanitize(tripTitle || ""),
      tripSlug: sanitize(tripSlug),
      createdAt: new Date().toISOString(),
    };

    // Persist to Redis (list + individual key, 90-day TTL)
    try {
      await redis.lpush("enquiries:list", id);
      await redis.set(`enquiry:${id}`, JSON.stringify(enquiry), 60 * 60 * 24 * 90);
    } catch (err) {
      console.error("Failed to save enquiry to Redis:", err);
      // Non-fatal — still send the email notification
    }

    // Send email notification to owner
    await sendEnquiryNotification({
      name: enquiry.name,
      email: enquiry.email,
      message: enquiry.message,
      tripTitle: enquiry.tripTitle || enquiry.tripSlug,
      tripSlug: enquiry.tripSlug,
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Enquiry POST error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// GET — list recent enquiries (admin use only; no auth yet, keep behind Vercel preview protection)
export async function GET() {
  try {
    const ids = await redis.lrange("enquiries:list", 0, 49);
    if (!ids || ids.length === 0) return NextResponse.json({ enquiries: [] });

    const keys = (ids as string[]).map((id: string) => `enquiry:${id}`);
    const raws = await redis.mget(...keys);
    const enquiries = (raws as (string | null)[])
      .map((r) => {
        if (!r) return null;
        try { return JSON.parse(r); } catch { return null; }
      })
      .filter(Boolean);

    return NextResponse.json({ enquiries });
  } catch {
    return NextResponse.json({ enquiries: [] });
  }
}
