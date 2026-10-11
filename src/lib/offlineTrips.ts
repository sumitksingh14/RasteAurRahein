import type { Trip } from "@/lib/types";
import { extractTripWaypoints, generateGPXContent } from "@/lib/gpxExporter";
import { getTripImage } from "@/lib/data/tripImages";

export const OFFLINE_TRIPS_CACHE = "offline-trips-v1";
const OFFLINE_STORAGE_KEY = "rar_offline_trips_meta";

export interface SavedOfflineTripMeta {
  slug: string;
  title: string;
  savedAt: string;
  assetCount: number;
  approxSizeKb?: number;
}

/** Check if Cache API and Service Worker are available */
export function isOfflineStorageSupported(): boolean {
  return typeof window !== "undefined" && "caches" in window;
}

/** Retrieve metadata of all trips saved offline */
export function getSavedOfflineTrips(): SavedOfflineTripMeta[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(OFFLINE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Check if a specific trip is currently saved offline */
export async function isTripSavedOffline(slug: string): Promise<boolean> {
  if (!isOfflineStorageSupported()) return false;
  const list = getSavedOfflineTrips();
  const meta = list.find((t) => t.slug === slug);
  if (!meta) return false;

  try {
    const cache = await caches.open(OFFLINE_TRIPS_CACHE);
    const tripPage = await cache.match(`/trips/${slug}`);
    return !!tripPage;
  } catch {
    return false;
  }
}

/** Get estimated browser storage usage */
export async function getStorageQuota(): Promise<{
  quotaMb?: number;
  usageMb?: number;
  percentUsed?: number;
}> {
  if (typeof navigator !== "undefined" && navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      const quota = estimate.quota ? Math.round(estimate.quota / (1024 * 1024)) : undefined;
      const usage = estimate.usage ? Math.round(estimate.usage / (1024 * 1024)) : undefined;
      const percentUsed =
        estimate.quota && estimate.usage ? Math.round((estimate.usage / estimate.quota) * 100) : undefined;
      return { quotaMb: quota, usageMb: usage, percentUsed };
    } catch {
      // storage estimation not supported or denied
    }
  }
  return {};
}

/**
 * Cache a trip's HTML page, primary images, and generated GPX track for offline use.
 */
export async function saveTripOffline(
  trip: Trip
): Promise<{ success: boolean; error?: string; assetCount?: number }> {
  if (!isOfflineStorageSupported()) {
    return {
      success: false,
      error: "Offline storage is not supported by your browser.",
    };
  }

  try {
    const cache = await caches.open(OFFLINE_TRIPS_CACHE);
    const tripUrl = `/trips/${trip.slug}`;

    // 1. Fetch & cache the main HTML document
    const pageResponse = await fetch(tripUrl, {
      headers: { "x-offline-prefetch": "1" },
    });
    if (!pageResponse.ok) {
      throw new Error(`Failed to download page (HTTP ${pageResponse.status})`);
    }
    await cache.put(tripUrl, pageResponse.clone());

    // Also cache with full origin URL for compatibility
    if (typeof window !== "undefined") {
      const fullUrl = new URL(tripUrl, window.location.origin).toString();
      await cache.put(fullUrl, pageResponse);
    }

    let assetCount = 1;

    // 2. Collect images: destination photograph + icons
    const imageUrls: string[] = [
      getTripImage(trip.slug),
      "/icons/icon-192.png",
      "/icons/icon-512.png",
    ];

    // Deduplicate and filter URLs
    const uniqueImages = Array.from(new Set(imageUrls)).filter(
      (url) => Boolean(url) && (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/"))
    );

    // Fetch and cache each image safely (don't fail the whole save if 1 image fails)
    await Promise.all(
      uniqueImages.map(async (imgUrl) => {
        try {
          // Check if already in cache
          const existing = await cache.match(imgUrl);
          if (existing) {
            assetCount++;
            return;
          }
          const res = await fetch(imgUrl, { mode: "cors" });
          if (res.ok) {
            await cache.put(imgUrl, res);
            assetCount++;
          }
        } catch {
          // Non-fatal: ignore individual image fetch failures (e.g. CORS or 404)
        }
      })
    );

    // 3. Generate & cache offline GPX file
    try {
      const waypoints = extractTripWaypoints(trip);
      const gpxContent = generateGPXContent(
        trip.title,
        waypoints.length > 0
          ? waypoints
          : [
              {
                name: trip.title,
                lat: 32.2464,
                lng: 77.7667,
                desc: trip.title,
              },
            ]
      );
      const gpxResponse = new Response(gpxContent, {
        headers: {
          "Content-Type": "application/gpx+xml;charset=utf-8",
          "Cache-Control": "public, max-age=31536000",
        },
      });
      await cache.put(`/trips/${trip.slug}.gpx`, gpxResponse.clone());
      await cache.put(`/api/trips/${trip.slug}/gpx`, gpxResponse);
      assetCount++;
    } catch {
      // Non-fatal if GPX generation encounters error
    }

    // 4. Update metadata in localStorage
    const existingList = getSavedOfflineTrips().filter((t) => t.slug !== trip.slug);
    const newMeta: SavedOfflineTripMeta = {
      slug: trip.slug,
      title: trip.title,
      savedAt: new Date().toISOString(),
      assetCount,
      approxSizeKb: Math.round(assetCount * 120), // rough estimate ~120KB per cached asset
    };
    existingList.push(newMeta);
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(existingList));

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("rar:offline-trips-changed", {
          detail: { slug: trip.slug, action: "saved", meta: newMeta },
        })
      );
    }

    return { success: true, assetCount };
  } catch (err: unknown) {
    console.error("Failed to save trip offline:", err);
    let message = "Storage error: could not cache this trip.";
    if (err instanceof DOMException && err.name === "QuotaExceededError") {
      message = "Storage full! Your device has exceeded its offline cache quota. Please clear saved trips or device storage.";
    } else if (err instanceof Error) {
      message = err.message;
    }
    return { success: false, error: message };
  }
}

/**
 * Remove a trip and its cached assets from offline cache.
 */
export async function removeTripOffline(slug: string): Promise<boolean> {
  if (!isOfflineStorageSupported()) return false;

  try {
    const cache = await caches.open(OFFLINE_TRIPS_CACHE);
    await cache.delete(`/trips/${slug}`);
    await cache.delete(`/trips/${slug}.gpx`);
    await cache.delete(`/api/trips/${slug}/gpx`);

    if (typeof window !== "undefined") {
      const fullUrl = new URL(`/trips/${slug}`, window.location.origin).toString();
      await cache.delete(fullUrl);
    }

    // Update metadata
    const existingList = getSavedOfflineTrips().filter((t) => t.slug !== slug);
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(existingList));

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("rar:offline-trips-changed", {
          detail: { slug, action: "removed" },
        })
      );
    }

    return true;
  } catch (err) {
    console.error("Failed to remove trip from offline cache:", err);
    return false;
  }
}
