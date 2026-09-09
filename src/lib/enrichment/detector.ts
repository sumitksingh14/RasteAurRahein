/**
 * Detects which enrichment fields are missing for a given trip.
 *
 * Rules per field:
 *   cover_image         — trip.coverImage is undefined/null
 *   gallery_images      — trip.gallery is empty or undefined
 *   overall_cost        — trip.totalBudget is undefined, OR no line-item breakdown in DB
 *   stay_recommendations — no stay suggestions found in any itinerary activity notes
 *   route_options       — trip has ≥2 location-tagged activities but no route data in DB
 *   weather_summary     — trip has no weather coord mapping (or always re-enrich on first visit)
 */

import type { Trip } from "@/lib/types";
import type { TripFieldName, TripFieldStatus } from "./types";
import { TRIP_WEATHER_COORDS } from "@/lib/weatherCoords";

export const ALL_FIELD_NAMES: TripFieldName[] = [
  "cover_image",
  "gallery_images",
  "overall_cost",
  "stay_recommendations",
  "route_options",
  "weather_summary",
];

/**
 * Returns the list of fields that are structurally missing from a trip.
 * Does NOT check Redis — purely inspects the Trip object.
 */
export function detectMissingFields(trip: Trip): TripFieldName[] {
  const missing: TripFieldName[] = [];

  // cover_image: missing if no coverImage asset
  if (!trip.coverImage?.asset?._ref) {
    missing.push("cover_image");
  }

  // gallery_images: missing if gallery is empty
  if (!trip.gallery || trip.gallery.length === 0) {
    missing.push("gallery_images");
  }

  // overall_cost: missing if totalBudget is not set
  if (!trip.totalBudget) {
    missing.push("overall_cost");
  }

  // stay_recommendations: missing if no itinerary accommodation activities have notes
  const hasStayNotes = trip.itinerary?.some((day) =>
    day.activities?.some(
      (act) => act.type === "accommodation" && act.notes
    )
  );
  if (!hasStayNotes) {
    missing.push("stay_recommendations");
  }

  // route_options: missing if ≥2 distinct named locations in itinerary
  const locations = (trip.itinerary ?? [])
    .flatMap((day) => day.activities ?? [])
    .map((act) => act.location?.name)
    .filter(Boolean);
  const uniqueLocations = new Set(locations);
  if (uniqueLocations.size >= 2) {
    missing.push("route_options");
  }

  // weather_summary: missing if we have a coord entry for this trip
  // (if no coord entry, weather can't be fetched — skip)
  if (TRIP_WEATHER_COORDS[trip.slug]) {
    missing.push("weather_summary");
  }

  return missing;
}

/**
 * Merges structural completeness (trip object) with stored Redis statuses
 * to produce a unified completeness map per field.
 *
 * Returns all fields for the trip with the effective status:
 *   - If in Redis with a non-missing status → use Redis status
 *   - If structurally missing and not in Redis → "missing"
 *   - If structurally present and not in Redis → "verified" (already has real data)
 */
export function mergeCompletenessMap(
  trip: Trip,
  storedStatuses: TripFieldStatus[]
): Record<TripFieldName, { status: TripFieldStatus["status"]; inRedis: boolean }> {
  const structurallyMissing = new Set(detectMissingFields(trip));
  const byField = Object.fromEntries(
    storedStatuses.map((s) => [s.field, s])
  ) as Partial<Record<TripFieldName, TripFieldStatus>>;

  return Object.fromEntries(
    ALL_FIELD_NAMES.map((field) => {
      const stored = byField[field];
      if (stored) {
        return [field, { status: stored.status, inRedis: true }];
      }
      // Not in Redis
      const isMissing = structurallyMissing.has(field);
      return [field, { status: isMissing ? "missing" : "verified", inRedis: false }];
    })
  ) as Record<TripFieldName, { status: TripFieldStatus["status"]; inRedis: boolean }>;
}
