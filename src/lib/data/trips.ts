/**
 * Backward-compatibility re-export shim.
 *
 * All trip data has been split into per-region files for performance:
 *   src/lib/data/trips/himalayas.ts      — Himalayas, Ladakh, Spiti, Uttarakhand, J&K
 *   src/lib/data/trips/northeast.ts      — Northeast India (7 Sisters + Sikkim)
 *   src/lib/data/trips/coastal.ts        — Konkan, Goa, Andamans, Western Ghats
 *   src/lib/data/trips/central-india.ts  — Madhya Pradesh & Chhattisgarh
 *   src/lib/data/trips/south-india.ts    — Kerala, Karnataka, Tamil Nadu
 *   src/lib/data/trips/rajasthan.ts      — Rajasthan, Gujarat, UP Heritage, Ganga belt
 *   src/lib/data/trips/index.ts          — Barrel combining all regions
 *
 * ── ADDING A NEW TRIP ─────────────────────────────────────────────────────
 * 1. Add the trip object to the correct region file above.
 * 2. Add its slug → region mapping in src/lib/regions.ts (TRIP_REGION_MAP).
 * That's it — the trip appears everywhere automatically.
 */
export { DEMO_TRIPS } from "./trips/index";
