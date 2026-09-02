import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const adminStatus = await isAdmin(session.email, session.userId);
  return NextResponse.json({
    user: {
      id: session.userId,
      username: session.username,
      email: session.email,
      isAdmin: adminStatus,
    },
  });
}
