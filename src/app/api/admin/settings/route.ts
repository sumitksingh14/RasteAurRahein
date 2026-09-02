import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { redis } from "@/lib/redis";

const SETTINGS_KEY = "site:settings";

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  maintenanceMode: string; // "true" | "false"
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Raste Aur Raahein",
  tagline: "Travel Blog by Sumit Singh",
  contactEmail: "zsumitksingh@gmail.com",
  instagramUrl: "",
  twitterUrl: "",
  youtubeUrl: "",
  maintenanceMode: "false",
};

/** GET /api/admin/settings */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const stored = await redis.hgetall(SETTINGS_KEY);
    const settings = { ...DEFAULT_SETTINGS, ...stored };
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
  }
}

/** PUT /api/admin/settings */
export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json() as Partial<SiteSettings>;
    // Only persist valid string fields
    const toSet: Record<string, string> = {};
    (Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[]).forEach((k) => {
      if (body[k] !== undefined) toSet[k] = String(body[k]);
    });
    await redis.hset(SETTINGS_KEY, toSet);
    const stored = await redis.hgetall(SETTINGS_KEY);
    return NextResponse.json({ settings: { ...DEFAULT_SETTINGS, ...stored } });
  } catch (err) {
    console.error("Admin settings error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
