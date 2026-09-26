/**
 * Unified Analytics Utility for "Raste Aur Raahein"
 *
 * Wraps Google Analytics 4 (GA4) gtag.js calls with strict type safety,
 * parameter validation, internal traffic exclusion, and safety fallbacks.
 *
 * Rules:
 * 1. NEVER inline window.gtag in UI components. Call these helper methods instead.
 * 2. Event names are strictly lowercase_snake_case.
 * 3. Does not fire in SSR environments or when GA4 ID is absent.
 */

type GtagFunction = (...args: unknown[]) => void;

function getGtag(): GtagFunction | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: GtagFunction }).gtag;
}

// Check if user is marked as internal developer/editor
function isInternalTraffic(): boolean {
  if (typeof window === "undefined") return true;

  // Local development exclusion
  if (process.env.NODE_ENV === "development") {
    // Return false only if explicitly testing analytics locally via window.__FORCE_ANALYTICS__
    return !(window as unknown as { __FORCE_ANALYTICS__?: boolean }).__FORCE_ANALYTICS__;
  }

  // LocalStorage opt-out flag for site editors/authors
  try {
    if (localStorage.getItem("rr_internal_user") === "true") {
      return true;
    }
  } catch {
    // Ignore storage errors in private browsing
  }

  return false;
}

/**
 * Low-level event dispatcher to window.gtag
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean | undefined | null> = {}
): void {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  if (isInternalTraffic()) {
    return;
  }

  // Sanitize undefined/null parameters
  const cleanParams: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(eventParams)) {
    if (value !== undefined && value !== null) {
      cleanParams[key] = value;
    }
  }

  gtag("event", eventName, cleanParams);
}

/**
 * 1. email_signup — fired on successful GPX / Route Report / Newsletter submission.
 * Parameters:
 *  - source: 'article_gpx' | 'road_conditions' | 'newsletter'
 */
export function trackEmailSignup(
  source: "article_gpx" | "road_conditions" | "newsletter",
  additionalMeta?: { trip_slug?: string; route_report_optin?: boolean }
): void {
  trackEvent("email_signup", {
    source,
    trip_slug: additionalMeta?.trip_slug,
    route_report_optin: additionalMeta?.route_report_optin,
  });
}

/**
 * 2. gpx_download — fired on clicking or triggering a GPX download.
 * Parameters:
 *  - trip_slug: Slug of the trip article
 *  - trip_title: Title of the trip article
 */
export function trackGpxDownload(tripSlug: string, tripTitle?: string): void {
  trackEvent("gpx_download", {
    trip_slug: tripSlug,
    trip_title: tripTitle,
  });
}

/**
 * 3. itinerary_import — fired when a user successfully parses or imports an itinerary.
 * Parameters:
 *  - import_type: 'gpx' | 'mymaps' | 'notes'
 */
export function trackItineraryImport(importType: "gpx" | "mymaps" | "notes"): void {
  trackEvent("itinerary_import", {
    import_type: importType,
  });
}

/**
 * 4. outbound_click — for external map links, homestay links, or government portals.
 * Parameters:
 *  - label: Descriptive name of the target
 *  - destination_url: External destination URL
 */
export function trackOutboundClick(label: string, destinationUrl?: string): void {
  trackEvent("outbound_click", {
    label,
    destination_url: destinationUrl,
  });
}

/**
 * 5. related_trip_click — measures internal-linking health under "Continue the Journey"
 * Parameters:
 *  - trip_slug: Target trip slug
 *  - source_slug: Origin trip slug
 *  - position: Order index (1 to 4)
 */
export function trackRelatedTripClick(
  tripSlug: string,
  sourceSlug: string,
  position: 1 | 2 | 3 | 4
): void {
  trackEvent("related_trip_click", {
    trip_slug: tripSlug,
    source_slug: sourceSlug,
    position,
  });
}

/**
 * Helper to mark current browser as an internal editor / author.
 * Can be run in browser console: `window.setInternalAuthor(true)`
 */
if (typeof window !== "undefined") {
  (window as unknown as { setInternalAuthor: (enabled: boolean) => void }).setInternalAuthor = (
    enabled: boolean
  ) => {
    if (enabled) {
      localStorage.setItem("rr_internal_user", "true");
    } else {
      localStorage.removeItem("rr_internal_user");
    }
  };
}
