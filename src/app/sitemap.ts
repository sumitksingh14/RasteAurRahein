import type { MetadataRoute } from "next";
import { getAllTrips } from "@/lib/queries";
import { REGIONS } from "@/lib/regions";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasteaurrahein.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/trips`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/regions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/weather`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/ai-planner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/import`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Region pages
  const regionRoutes: MetadataRoute.Sitemap = REGIONS.map((region) => ({
    url: `${BASE_URL}/regions/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Trip detail pages (dynamic)
  let tripRoutes: MetadataRoute.Sitemap = [];
  try {
    const trips = await getAllTrips();
    tripRoutes = trips
      .filter((t) => t.status === "published")
      .map((trip) => ({
        url: `${BASE_URL}/trips/${trip.slug}`,
        lastModified: trip._updatedAt ? new Date(trip._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));
  } catch {
    // If trips can't be fetched at build time, sitemap still builds
  }

  return [...staticRoutes, ...regionRoutes, ...tripRoutes];
}
