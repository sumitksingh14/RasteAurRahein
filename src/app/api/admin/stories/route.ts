import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getPendingStories } from "@/lib/stories";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const stories = await getPendingStories();
  return NextResponse.json({ stories });
}
