"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VIEWED_TRIPS_KEY = "rar_viewed_trips";
const LAST_REGION_KEY = "rar_last_viewed_region";

export default function TripViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Check if on a trip detail page: /trips/[slug]
    const match = pathname.match(/^\/trips\/([^/]+)$/);
    if (!match) return;

    const slug = match[1];
    // Exclude reserved routes under /trips
    if (["group", "archive", "categories", "regions", "planner"].includes(slug)) {
      return;
    }

    try {
      const stored = localStorage.getItem(VIEWED_TRIPS_KEY);
      const trips: string[] = stored ? JSON.parse(stored) : [];

      if (!trips.includes(slug)) {
        trips.push(slug);
        localStorage.setItem(VIEWED_TRIPS_KEY, JSON.stringify(trips));
      }

      // Try reading region from DOM data attribute or breadcrumb if available
      const regionEl = document.querySelector("[data-trip-region]");
      const region = regionEl?.getAttribute("data-trip-region") || "Himachal";
      localStorage.setItem(LAST_REGION_KEY, region);

      // If user has viewed 2 or more trips, trigger install nudge
      if (trips.length >= 2) {
        window.dispatchEvent(
          new CustomEvent("rar:trigger-install-nudge", {
            detail: {
              count: trips.length,
              region,
              slug,
            },
          })
        );
      }
    } catch {
      // localStorage may fail in restricted/private modes
    }
  }, [pathname]);

  return null;
}
