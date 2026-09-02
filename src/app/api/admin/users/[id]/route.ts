import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, SEED_ADMIN_EMAIL } from "@/lib/admin";
import { redis } from "@/lib/redis";
import bcrypt from "bcryptjs";

type RouteContext = { params: Promise<{ id: string }> };

/** PATCH /api/admin/users/[id] — toggle admin role OR reset password */
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await ctx.params;

  try {
    const hash = await redis.hgetall(`user:${id}`);
    if (!hash) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();

    // --- Toggle admin role ---
    if ("isAdmin" in body) {
      // Prevent demoting the seed admin
      if (
        hash.email &&
        hash.email.toLowerCase() === SEED_ADMIN_EMAIL.toLowerCase() &&
        !body.isAdmin
      ) {
        return NextResponse.json(
          { error: "Cannot remove admin from the primary admin account" },
          { status: 400 }
        );
      }
      if (body.isAdmin) {
        await redis.sadd("admins:index", id);
      } else {
        await redis.srem("admins:index", id);
      }
      return NextResponse.json({ success: true, isAdmin: !!body.isAdmin });
    }

    // --- Reset password ---
    if ("newPassword" in body) {
      if (!body.newPassword || body.newPassword.length < 8) {
        return NextResponse.json(
          { error: "New password must be at least 8 characters" },
          { status: 400 }
        );
      }
      const passwordHash = await bcrypt.hash(body.newPassword, 12);
      await redis.hset(`user:${id}`, { passwordHash });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  } catch (err) {
    console.error("Admin PATCH user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE /api/admin/users/[id] — revoke a user account */
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await ctx.params;

  try {
    const hash = await redis.hgetall(`user:${id}`);
    if (!hash) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Protect the seed admin from deletion
    if (
      hash.email &&
      hash.email.toLowerCase() === SEED_ADMIN_EMAIL.toLowerCase()
    ) {
      return NextResponse.json(
        { error: "Cannot delete the primary admin account" },
        { status: 400 }
      );
    }

    // Remove lookup indexes
    if (hash.email) await redis.del(`user:email:${hash.email}`);
    if (hash.username) await redis.del(`user:username:${hash.username}`);

    // Remove user hash, main index, and admin index
    await redis.del(`user:${id}`);
    await redis.srem("users:index", id);
    await redis.srem("admins:index", id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin delete user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
