"use client";

import { useEffect } from "react";

interface ViewCountTrackerProps {
  slug: string;
}

/**
 * Invisible client component that fires a view count increment once per page load.
 * Silently no-ops if Upstash is not configured.
 */
export default function ViewCountTracker({ slug }: ViewCountTrackerProps) {
  useEffect(() => {
    if (!slug) return;
    fetch("/api/view-count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {
      // Non-critical — ignore errors
    });
  }, [slug]);

  return null;
}
