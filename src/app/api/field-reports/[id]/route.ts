import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/admin";
import { updateReportStatus, deleteReport, getReportById } from "@/lib/fieldReports";

interface Params {
  params: Promise<{ id: string }>;
}

/** PATCH /api/field-reports/[id] — admin: approve or reject */
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session || !(await isAdmin(session.email, session.userId))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "status must be approved or rejected" }, { status: 400 });
  }

  const ok = await updateReportStatus(id, status);
  if (!ok) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  return NextResponse.json({ success: true, id, status });
}

/** DELETE /api/field-reports/[id] — admin or own report */
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const report = await getReportById(id);
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const adminOk = await isAdmin(session.email, session.userId);
  if (report.userId !== session.userId && !adminOk) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await deleteReport(id);
  return NextResponse.json({ success: true });
}
