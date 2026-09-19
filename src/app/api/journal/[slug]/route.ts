import { NextRequest, NextResponse } from "next/server";
import { getFieldNoteBySlug } from "@/lib/fieldNotes";

interface Props {
  params: Promise<{ slug: string }>;
}

/** GET /api/journal/[slug] — get a single field note by slug */
export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const note = await getFieldNoteBySlug(slug);
    if (!note) {
      return NextResponse.json({ error: "Field note not found" }, { status: 404 });
    }

    return NextResponse.json({ note });
  } catch (err: any) {
    console.error("GET /api/journal/[slug] error:", err);
    return NextResponse.json({ error: "Failed to fetch field note" }, { status: 500 });
  }
}
