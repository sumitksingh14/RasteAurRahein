import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getTripBySlug, updateTrip, deleteTrip } from "@/lib/queries";

type RouteContext = { params: Promise<{ slug: string }> };

/** GET /api/admin/trips/[slug] — fetch single trip */
export async function GET(_req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug } = await ctx.params;
  const trip = await getTripBySlug(slug);
  if (!trip) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ trip });
}

/** PUT /api/admin/trips/[slug] — update trip fields */
export async function PUT(req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug } = await ctx.params;
  try {
    const updates = await req.json();
    const trip = await updateTrip(slug, updates);
    if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    return NextResponse.json({ trip });
  } catch (err) {
    console.error("Admin update trip error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE /api/admin/trips/[slug] — delete trip */
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug } = await ctx.params;
  await deleteTrip(slug);
  return NextResponse.json({ success: true });
}
