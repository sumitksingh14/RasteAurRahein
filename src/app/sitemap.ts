import type { MetadataRoute } from "next";
import { getAllTrips } from "@/lib/queries";
import { REGIONS } from "@/lib/regions";
import { getTripImage } from "@/lib/data/tripImages";
import { PASS_CONDITIONS } from "@/lib/data/pass-conditions";

// Strip any trailing slash — prevents double-slashes in <loc> elements
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://raste-aur-rahein.vercel.app"
).replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/trips`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/road-conditions`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/regions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/weather`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/ai-planner`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/import`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Per-Pass Condition Pages
  const passRoutes: MetadataRoute.Sitemap = PASS_CONDITIONS.map((pass) => ({
    url: `${BASE_URL}/road-conditions/${pass.slug}`,
    lastModified: new Date(pass.lastVerified),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  // Guide Hub Pages
  const guideSlugs = [
    "spiti-vs-ladakh",
    "best-monsoon-road-trips-south-india",
    "kerala-waterfalls-guide",
    "himalayan-passes-explained",
  ];
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Region pages
  const regionRoutes: MetadataRoute.Sitemap = REGIONS.map((region) => ({
    url: `${BASE_URL}/regions/${region.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    ...(region.heroImage
      ? {
          images: [
            region.heroImage.startsWith("http")
              ? region.heroImage
              : `${BASE_URL}${region.heroImage}`,
          ] as string[],
        }
      : {}),
  }));

  // Trip detail pages (dynamic) — with image sitemap extension
  let tripRoutes: MetadataRoute.Sitemap = [];
  try {
    const trips = await getAllTrips();
    tripRoutes = trips
      .filter((t) => t.status === "published")
      .map((trip) => {
        const imageUrl = getTripImage(trip.slug);
        return {
          url: `${BASE_URL}/trips/${trip.slug}`,
          lastModified: trip._updatedAt ? new Date(trip._updatedAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.9,
          images: [
            imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`,
          ] as string[],
        };
      });
  } catch {
    // If trips can't be fetched at build time, sitemap still builds
  }

  return [...staticRoutes, ...passRoutes, ...guideRoutes, ...regionRoutes, ...tripRoutes];
}
