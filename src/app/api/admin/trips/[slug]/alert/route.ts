import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getTripAlert, setTripAlert, deleteTripAlert } from "@/lib/tripAlerts";

type Params = { params: Promise<{ slug: string }> };

/** GET /api/admin/trips/:slug/alert — fetch current alert */
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { slug } = await params;
  const alert = await getTripAlert(slug);
  return NextResponse.json({ alert });
}

/** POST /api/admin/trips/:slug/alert — create or update alert */
export async function POST(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { slug } = await params;
  const body = await req.json();
  const { status, message } = body;

  if (!["open", "caution", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status. Use: open | caution | closed" }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  await setTripAlert({
    slug,
    status,
    message: message.trim(),
    updatedAt: new Date().toISOString(),
    updatedBy: session.username,
  });

  return NextResponse.json({ success: true });
}

/** DELETE /api/admin/trips/:slug/alert — remove alert */
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { slug } = await params;
  await deleteTripAlert(slug);
  return NextResponse.json({ success: true });
}
