/**
 * Core types for the Self-Learning Trip Data Enrichment Engine.
 *
 * Status machine:
 *   missing → pending (lock acquired, job started)
 *   pending → ai_filled (worker succeeded + validation passed)
 *   pending → missing  (worker failed after retries)
 *   ai_filled → verified (human approved)
 *   ai_filled → stale   (new data signals the value may be outdated)
 *   verified  → stale   (re-check triggered, e.g. after 90 days or reader flag)
 *   stale     → pending (nightly sweep re-queues it)
 */

export type TripFieldName =
  | "cover_image"
  | "gallery_images"
  | "overall_cost"
  | "stay_recommendations"
  | "route_options"
  | "weather_summary";

export type FieldStatus =
  | "missing"
  | "pending"
  | "ai_filled"
  | "verified"
  | "stale";

export type SourceType = "manual" | "llm" | "llm+search" | "api";

// ---------------------------------------------------------------------------
// Cover image / gallery
// ---------------------------------------------------------------------------
export interface EnrichedImage {
  url: string;
  thumbUrl: string;
  alt: string;
  unsplashId: string;
  attribution: {
    photographerName: string;
    photographerUrl: string;
    unsplashUrl: string;
  };
}

export interface EnrichedImageValue {
  images: EnrichedImage[];
}

// ---------------------------------------------------------------------------
// Overall cost
// ---------------------------------------------------------------------------
export interface CostLineItem {
  category: "accommodation" | "food" | "transport" | "activities" | "permits" | "misc";
  label: string;
  minINR: number;
  maxINR: number;
  sourceUrl: string;
  note?: string;
}

export interface EnrichedCostValue {
  lineItems: CostLineItem[];
  totalMinINR: number;
  totalMaxINR: number;
  currency: string;
  confidence: number;
  lastResearched: string; // ISO date
}

// ---------------------------------------------------------------------------
// Stay recommendations
// ---------------------------------------------------------------------------
export interface EnrichedStay {
  name: string;
  town: string;
  type: "hotel" | "homestay" | "guesthouse" | "camp" | "resort";
  priceBand: "budget" | "mid" | "premium";
  priceRangeINR?: [number, number];
  bookingUrl?: string;
  nominatimVerified: boolean;
  sourceUrl?: string;
  notes?: string;
}

export interface EnrichedStayValue {
  stays: EnrichedStay[];
}

// ---------------------------------------------------------------------------
// Route options
// ---------------------------------------------------------------------------
export interface EnrichedRoute {
  name: string;
  profile: "driving-car" | "cycling-regular" | "foot-walking";
  distanceKm: number;
  durationMin: number;
  waypoints: string[]; // place names
  description: string; // LLM-generated plain-language trade-off description
  sourceUrl: string;   // ORS API call URL
}

export interface EnrichedRouteValue {
  routes: EnrichedRoute[];
}

// ---------------------------------------------------------------------------
// Weather summary
// ---------------------------------------------------------------------------
export interface EnrichedWeatherValue {
  summary: string;        // 2-sentence natural language
  bestMonths: string[];   // e.g. ["June", "September"]
  confidence: number;
  forecastDate: string;   // ISO date the forecast was fetched
}

// ---------------------------------------------------------------------------
// Union of all field values
// ---------------------------------------------------------------------------
export type EnrichedFieldValue =
  | EnrichedImageValue
  | EnrichedCostValue
  | EnrichedStayValue
  | EnrichedRouteValue
  | EnrichedWeatherValue;

// ---------------------------------------------------------------------------
// TripFieldStatus — the main record stored in Redis
// ---------------------------------------------------------------------------
export interface TripFieldStatus {
  id: string;           // "{tripSlug}:{field}"
  tripSlug: string;
  field: TripFieldName;
  status: FieldStatus;
  value: EnrichedFieldValue | null;
  sourceType: SourceType;
  confidence: number;   // 0–1
  citations: string[];  // source URLs used for this value
  generatedAt: string | null;   // ISO
  verifiedAt: string | null;    // ISO
  verifiedBy: string | null;    // userId
  pendingReason: string | null; // last failure reason
  reportCount: number;          // number of reader "report issue" flags
}

// ---------------------------------------------------------------------------
// TripFieldHistory — append-only audit log entry
// ---------------------------------------------------------------------------
export interface TripFieldHistory {
  id: string;
  tripFieldStatusId: string;
  previousValue: EnrichedFieldValue | null;
  previousStatus: FieldStatus;
  changedAt: string;
  changedBy: string; // userId or "system"
  reason: string;
}

// ---------------------------------------------------------------------------
// Enrichment job (queue item)
// ---------------------------------------------------------------------------
export interface EnrichmentJob {
  jobId: string;
  tripSlug: string;
  field: TripFieldName;
  priority: "high" | "normal"; // high = on-demand, normal = nightly sweep
  enqueuedAt: string;
  attempt: number; // retry count
}

// ---------------------------------------------------------------------------
// Enrichment run log entry (for the admin dashboard)
// ---------------------------------------------------------------------------
export interface EnrichmentRunLog {
  jobId: string;
  tripSlug: string;
  field: TripFieldName;
  outcome: "success" | "failed" | "skipped";
  durationMs: number;
  tokensUsed: number;
  toolCallCount: number;
  error?: string;
  completedAt: string;
}
