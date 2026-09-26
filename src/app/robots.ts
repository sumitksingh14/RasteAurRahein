import type { MetadataRoute } from "next";

// Strip any trailing slash so we never get double-slashes when concatenating paths.
// The env var is set to "https://raste-aur-rahein.vercel.app/" (with slash), which
// was causing "Sitemap: https://raste-aur-rahein.vercel.app//sitemap.xml".
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://raste-aur-rahein.vercel.app"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/offline/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
