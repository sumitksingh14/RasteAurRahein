import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/admin";
import { submitTrip, listPendingSubmissions, getUserSubmissions } from "@/lib/tripSubmissions";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await isAdmin(session.email, session.userId);
  const submissions = admin
    ? await listPendingSubmissions()
    : await getUserSubmissions(session.userId);

  return NextResponse.json({ submissions });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, region, days, budget, description, gpxData, coverImageUrl } = body;

  if (!title?.trim() || !region?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "title, region, and description are required" }, { status: 400 });
  }

  const submission = await submitTrip(session.userId, session.username, {
    title: String(title).trim().slice(0, 120),
    region: String(region).trim().slice(0, 80),
    days: Number(days) || 1,
    budget: String(budget || "").trim().slice(0, 60),
    description: String(description).trim().slice(0, 3000),
    gpxData: gpxData ? String(gpxData).slice(0, 500_000) : undefined,
    coverImageUrl: coverImageUrl ? String(coverImageUrl).trim() : undefined,
  });

  return NextResponse.json({ submission }, { status: 201 });
}
