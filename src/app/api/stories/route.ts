import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { submitStory } from "@/lib/stories";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { tripSlug, title, body: storyBody, photoUrl } = body;

    if (!tripSlug || !title || !storyBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const story = await submitStory({
      tripSlug,
      title,
      body: storyBody,
      photoUrl,
      userId: session.userId,
      username: session.username,
    });

    return NextResponse.json({ success: true, story });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
