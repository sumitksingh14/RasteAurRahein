/**
 * Site configuration, social profile links, and feature flags.
 */

// ─── Public View Count Display ──────────────────────────────────────────────
export const SHOW_PUBLIC_VIEW_COUNTS =
  process.env.NEXT_PUBLIC_SHOW_PUBLIC_VIEW_COUNTS === "true";

export const SHOW_VIEWS_MIN = Number(
  process.env.NEXT_PUBLIC_SHOW_VIEWS_MIN || "1000"
);

/**
 * Returns true only if the public view counts feature flag is enabled
 * and the count passes the minimum social proof threshold.
 */
export function shouldDisplayPublicViewCount(viewCount?: number | null): boolean {
  if (!SHOW_PUBLIC_VIEW_COUNTS) return false;
  if (typeof viewCount !== "number" || isNaN(viewCount)) return false;
  return viewCount >= SHOW_VIEWS_MIN;
}
