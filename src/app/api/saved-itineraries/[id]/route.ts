import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { deleteItinerary } from "@/lib/savedItineraries";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteItinerary(session.userId, id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Not found or not authorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
