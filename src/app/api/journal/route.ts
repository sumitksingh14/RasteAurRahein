import { NextRequest, NextResponse } from "next/server";
import { getAllFieldNotes, createFieldNote } from "@/lib/fieldNotes";
import { getAdminSession } from "@/lib/admin";
import type { FieldNoteCategory } from "@/lib/types";

/** GET /api/journal — list all field notes */
export async function GET() {
  try {
    const notes = await getAllFieldNotes();
    return NextResponse.json({ notes });
  } catch (err: any) {
    console.error("GET /api/journal error:", err);
    return NextResponse.json({ error: "Failed to fetch field notes" }, { status: 500 });
  }
}

/** POST /api/journal — create a new field note (Admin only) */
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      category,
      excerpt,
      body: noteBody,
      coverImageUrl,
      relatedTripSlug,
      tags,
      readingTime,
    } = body;

    if (!title || !slug || !category || !excerpt || !noteBody) {
      return NextResponse.json(
        { error: "Missing required fields (title, slug, category, excerpt, body)" },
        { status: 400 }
      );
    }

    const note = await createFieldNote({
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      title: title.trim(),
      category: category as FieldNoteCategory,
      excerpt: excerpt.trim(),
      body: noteBody,
      coverImageUrl: coverImageUrl || undefined,
      relatedTripSlug: relatedTripSlug || undefined,
      tags: Array.isArray(tags) ? tags : [],
      readingTime: typeof readingTime === "number" ? readingTime : 5,
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/journal error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create field note" },
      { status: 500 }
    );
  }
}
