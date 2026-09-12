import type { Trip } from "@/lib/types";

import { HIMALAYA_TRIPS } from "./himalayas";
import { NORTHEAST_TRIPS } from "./northeast";
import { COASTAL_TRIPS } from "./coastal";
import { CENTRAL_INDIA_TRIPS } from "./central-india";
import { SOUTH_INDIA_TRIPS } from "./south-india";
import { RAJASTHAN_TRIPS } from "./rajasthan";

/**
 * Combined trip dataset from all regions.
 *
 * ── ADDING A TRIP ─────────────────────────────────────────────────────────
 * 1. Add the trip object to the correct region file:
 *    Himalayas / Uttarakhand / J&K  →  trips/himalayas.ts
 *    Northeast India (7 Sisters)    →  trips/northeast.ts
 *    Konkan / Goa / Andamans        →  trips/coastal.ts
 *    MP / Chhattisgarh              →  trips/central-india.ts
 *    Kerala / Karnataka / TN        →  trips/south-india.ts
 *    Rajasthan / Gujarat / UP       →  trips/rajasthan.ts
 *
 * 2. Add its slug → region(s) in src/lib/regions.ts  TRIP_REGION_MAP.
 *
 * The trip then automatically appears on /trips, in sitemaps,
 * in the chatbot corpus, and on regional filter pages.
 */
export const DEMO_TRIPS: Trip[] = [
  ...HIMALAYA_TRIPS,
  ...NORTHEAST_TRIPS,
  ...COASTAL_TRIPS,
  ...CENTRAL_INDIA_TRIPS,
  ...SOUTH_INDIA_TRIPS,
  ...RAJASTHAN_TRIPS,
];

// Named region exports for direct region-scoped access
export {
  HIMALAYA_TRIPS,
  NORTHEAST_TRIPS,
  COASTAL_TRIPS,
  CENTRAL_INDIA_TRIPS,
  SOUTH_INDIA_TRIPS,
  RAJASTHAN_TRIPS,
};
