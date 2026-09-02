import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

/** The hardcoded admin email — also readable from env so CI/CD can override. */
const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "zsumitksingh@gmail.com";

/** Returns true if the given email belongs to the admin. */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Server helper — call at the top of any Server Component or API route.
 * Redirects to "/" if the current session is not an admin.
 * Returns the session payload so callers don't need a second getSession() call.
 */
export async function requireAdminSession() {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    redirect("/");
  }
  return session;
}

/**
 * API route helper — returns null when not admin.
 * Callers check for null and return 403.
 */
export async function getAdminSession() {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) return null;
  return session;
}
