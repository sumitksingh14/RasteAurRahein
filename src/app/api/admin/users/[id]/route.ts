import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { redis } from "@/lib/redis";

type RouteContext = { params: Promise<{ id: string }> };

/** DELETE /api/admin/users/[id] — revoke a user account */
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await ctx.params;

  try {
    const hash = await redis.hgetall(`user:${id}`);
    if (!hash) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Remove lookup indexes
    if (hash.email) await redis.del(`user:email:${hash.email}`);
    if (hash.username) await redis.del(`user:username:${hash.username}`);

    // Remove user hash and index
    await redis.del(`user:${id}`);
    await redis.srem("users:index", id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin delete user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
