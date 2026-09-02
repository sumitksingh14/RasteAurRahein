import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { redis } from "@/lib/redis";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

/** GET /api/admin/users — list all registered users */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    // All user id's are stored as values in user:email:* and user:username:* keys.
    // The most reliable index: scan user:email:* keys via SMEMBERS of a user index,
    // but since we don't maintain an explicit set, iterate user:email:* via hkeys trick.
    // We stored user ids in a set "users:index" — if it exists use it, otherwise fall back.
    const ids = await redis.smembers("users:index");
    const users: AdminUser[] = [];

    for (const id of ids) {
      const hash = await redis.hgetall(`user:${id}`);
      if (!hash) continue;
      users.push({
        id: hash.id || id,
        username: hash.username || "",
        email: hash.email || "",
        createdAt: hash.createdAt || "",
      });
    }

    // Sort newest first
    users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ users });
  } catch (err) {
    console.error("Admin users error:", err);
    return NextResponse.json({ users: [] });
  }
}
