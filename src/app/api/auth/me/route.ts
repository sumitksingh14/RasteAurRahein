import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdminEmail } from "@/lib/admin";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({
    user: {
      id: session.userId,
      username: session.username,
      email: session.email,
      isAdmin: isAdminEmail(session.email),
    },
  });
}
