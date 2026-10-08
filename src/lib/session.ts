import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_JWT_SECRET || "fallback-secret-change-me";
const COOKIE_NAME = "rar_session";
// No maxAge → session cookie; browser clears it when the window/tab is closed.

export interface SessionPayload {
  userId: string;
  username: string;
  email: string;
}

/** Sign a JWT and set it as an HTTP-only session cookie.
 *  Omitting maxAge/expires makes the cookie a browser session cookie —
 *  it is automatically deleted when the browser window is closed.
 */
export async function createSession(payload: SessionPayload): Promise<void> {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // No maxAge / expires → session cookie (cleared on browser close)
    path: "/",
  });
}

/** Read and verify the session cookie → payload or null */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

/** Clear the session cookie (logout) */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Read session from a raw cookie header string (for middleware / API routes) */
export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}
