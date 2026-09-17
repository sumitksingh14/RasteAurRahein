import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/admin";
import { updateSubmissionStatus } from "@/lib/tripSubmissions";

interface Params { params: Promise<{ id: string }> }

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

  const ok = await updateSubmissionStatus(id, status);
  if (!ok) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

  return NextResponse.json({ success: true, id, status });
}
