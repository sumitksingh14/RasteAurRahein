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

// ─── Social Media Profiles ──────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  x: process.env.NEXT_PUBLIC_X_URL,
};

/**
 * Checks whether a URL is defined, valid, and not just a bare generic root domain.
 */
export function isValidSocialUrl(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    const path = parsed.pathname.replace(/^\/+|\/+$/g, "");
    return path.length > 0;
  } catch {
    return false;
  }
}

export interface SocialLinkItem {
  id: "instagram" | "x" | "youtube";
  label: string;
  href: string;
}

export function getActiveSocialLinks(): SocialLinkItem[] {
  const items: SocialLinkItem[] = [];
  if (isValidSocialUrl(SOCIAL_LINKS.instagram)) {
    items.push({
      id: "instagram",
      label: "Follow Raste Aur Raahein on Instagram",
      href: SOCIAL_LINKS.instagram!.trim(),
    });
  }
  if (isValidSocialUrl(SOCIAL_LINKS.x)) {
    items.push({
      id: "x",
      label: "Follow Raste Aur Raahein on X",
      href: SOCIAL_LINKS.x!.trim(),
    });
  }
  if (isValidSocialUrl(SOCIAL_LINKS.youtube)) {
    items.push({
      id: "youtube",
      label: "Subscribe to Raste Aur Raahein on YouTube",
      href: SOCIAL_LINKS.youtube!.trim(),
    });
  }
  return items;
}

export function getValidSocialUrls(): string[] {
  return getActiveSocialLinks().map((item) => item.href);
}
