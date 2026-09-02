import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { redis } from "@/lib/redis";

/** The hardcoded seed admin email — always has admin access regardless of Redis. */
export const SEED_ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "zsumitksingh@gmail.com";

/**
 * Returns true if the given email is admin.
 * Admin status is EITHER the seed env email OR stored in Redis `admins:index` set (by user ID).
 * This overload checks only by email (used in session-based auth).
 */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return email.toLowerCase() === SEED_ADMIN_EMAIL.toLowerCase();
}

/**
 * Checks Redis `admins:index` for a given userId.
 * Returns true if the user has been granted admin via the portal.
 */
export async function isAdminById(userId: string): Promise<boolean> {
  try {
    return await redis.sismember("admins:index", userId);
  } catch {
    return false;
  }
}

/**
 * Full admin check — either env email match OR Redis promoted admin.
 * Use this in API routes that have access to both email and userId.
 */
export async function isAdmin(
  email: string | undefined | null,
  userId?: string | undefined | null
): Promise<boolean> {
  if (isAdminEmail(email)) return true;
  if (userId) return isAdminById(userId);
  return false;
}

/**
 * Server helper — call at the top of any Server Component or API route.
 * Redirects to "/" if the current session is not an admin.
 */
export async function requireAdminSession() {
  const session = await getSession();
  const ok = await isAdmin(session?.email, session?.userId);
  if (!session || !ok) {
    redirect("/");
  }
  return session;
}

/**
 * API route helper — returns null when not admin.
 */
export async function getAdminSession() {
  const session = await getSession();
  if (!session) return null;
  const ok = await isAdmin(session.email, session.userId);
  if (!ok) return null;
  return session;
}
