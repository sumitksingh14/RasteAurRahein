import { NextRequest, NextResponse } from "next/server";
import { getStoriesByTrip } from "@/lib/stories";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  
  try {
    const stories = await getStoriesByTrip(slug, true); // only approved stories
    return NextResponse.json({ stories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
