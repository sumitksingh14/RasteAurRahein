/**
 * Enrichment Validation Pipeline
 *
 * Runs after each worker produces a candidate value, before it is stored as ai_filled.
 * Checks:
 *   1. Schema/type validation (field-specific)
 *   2. Citation presence (for cost/stay/route — factual claims need sources)
 *   3. Cross-check: never silently overwrite verified human-approved data
 *   4. Sanity bounds (field-specific)
 */

import type {
  TripFieldName,
  TripFieldStatus,
  EnrichedFieldValue,
  EnrichedCostValue,
  EnrichedStayValue,
  EnrichedRouteValue,
  EnrichedWeatherValue,
  EnrichedImageValue,
} from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  /** Adjusted confidence — may be reduced by validator if issues are found */
  confidence: number;
}

// ---------------------------------------------------------------------------
// Per-field schema checks
// ---------------------------------------------------------------------------
function validateCoverImage(value: unknown): string[] {
  const errors: string[] = [];
  const v = value as EnrichedImageValue;
  if (!v || !Array.isArray(v.images) || v.images.length === 0) {
    errors.push("images array is missing or empty");
  } else {
    for (const img of v.images) {
      if (!img.url) errors.push("image missing url");
      if (!img.unsplashId) errors.push("image missing unsplashId (attribution required)");
      if (!img.attribution?.photographerName) {
        errors.push("image missing photographer attribution");
      }
    }
  }
  return errors;
}

function validateGalleryImages(value: unknown): string[] {
  return validateCoverImage(value); // same shape
}

function validateWeatherSummary(value: unknown): string[] {
  const errors: string[] = [];
  const v = value as EnrichedWeatherValue;
  if (!v?.summary || typeof v.summary !== "string" || v.summary.length < 20) {
    errors.push("summary is missing or too short");
  }
  if (!Array.isArray(v?.bestMonths) || v.bestMonths.length === 0) {
    errors.push("bestMonths array is missing or empty");
  }
  if (typeof v?.confidence !== "number" || v.confidence < 0 || v.confidence > 1) {
    errors.push("confidence must be a number between 0 and 1");
  }
  return errors;
}

function validateStayRecommendations(
  value: unknown,
  citations: string[]
): string[] {
  const errors: string[] = [];
  const v = value as EnrichedStayValue;
  if (!v || !Array.isArray(v.stays) || v.stays.length === 0) {
    errors.push("stays array is missing or empty");
    return errors;
  }
  const validTypes = ["hotel", "homestay", "guesthouse", "camp", "resort"];
  const validBands = ["budget", "mid", "premium"];
  for (const stay of v.stays) {
    if (!stay.name) errors.push("stay missing name");
    if (!stay.town) errors.push(`stay "${stay.name}" missing town`);
    if (!validTypes.includes(stay.type)) {
      errors.push(`stay "${stay.name}" has invalid type: ${stay.type}`);
    }
    if (!validBands.includes(stay.priceBand)) {
      errors.push(`stay "${stay.name}" has invalid priceBand: ${stay.priceBand}`);
    }
  }
  if (citations.length === 0) {
    errors.push("stay recommendations require at least one citation URL");
  }
  return errors;
}

function validateRouteOptions(
  value: unknown,
  citations: string[]
): string[] {
  const errors: string[] = [];
  const v = value as EnrichedRouteValue;
  if (!v || !Array.isArray(v.routes) || v.routes.length === 0) {
    errors.push("routes array is missing or empty");
    return errors;
  }
  const validProfiles = ["driving-car", "cycling-regular", "foot-walking"];
  for (const route of v.routes) {
    if (!route.name) errors.push("route missing name");
    if (!validProfiles.includes(route.profile)) {
      errors.push(`route "${route.name}" has invalid profile`);
    }
    if (typeof route.distanceKm !== "number" || route.distanceKm <= 0) {
      errors.push(`route "${route.name}" has invalid distanceKm`);
    }
    if (!route.sourceUrl) {
      errors.push(`route "${route.name}" missing sourceUrl citation`);
    }
    if (!route.description || route.description.length < 20) {
      errors.push(`route "${route.name}" description too short`);
    }
  }
  if (citations.length === 0) {
    errors.push("route options require at least one citation URL");
  }
  return errors;
}

function validateOverallCost(
  value: unknown,
  citations: string[]
): string[] {
  const errors: string[] = [];
  const v = value as EnrichedCostValue;
  if (!v || !Array.isArray(v.lineItems) || v.lineItems.length === 0) {
    errors.push("lineItems array is missing or empty");
    return errors;
  }

  const validCategories = [
    "accommodation",
    "food",
    "transport",
    "activities",
    "permits",
    "misc",
  ];

  for (const item of v.lineItems) {
    if (!validCategories.includes(item.category)) {
      errors.push(`line item "${item.label}" has invalid category`);
    }
    if (typeof item.minINR !== "number" || item.minINR < 0) {
      errors.push(`line item "${item.label}" has invalid minINR`);
    }
    if (typeof item.maxINR !== "number" || item.maxINR < item.minINR) {
      errors.push(`line item "${item.label}" has invalid maxINR`);
    }
    if (!item.sourceUrl) {
      errors.push(
        `line item "${item.label}" is missing a sourceUrl — cost claims require citations`
      );
    }
  }

  if (typeof v.totalMinINR !== "number" || v.totalMinINR <= 0) {
    errors.push("totalMinINR is missing or invalid");
  }
  if (typeof v.totalMaxINR !== "number" || v.totalMaxINR < v.totalMinINR) {
    errors.push("totalMaxINR is missing or less than totalMinINR");
  }

  // Absolute citation gate for cost
  if (citations.length === 0) {
    errors.push(
      "cost estimates require at least one citation URL — no uncited cost claims allowed"
    );
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Cross-check: never overwrite verified human data silently
// ---------------------------------------------------------------------------
function checkNoOverwrite(
  existing: TripFieldStatus | null | undefined
): { blocked: boolean; reason: string } {
  if (!existing) return { blocked: false, reason: "" };
  if (existing.status === "verified") {
    return {
      blocked: true,
      reason: `Field is already human-verified (verifiedBy: ${existing.verifiedBy ?? "unknown"} at ${existing.verifiedAt}). Will not overwrite with AI data. Flag for review instead.`,
    };
  }
  return { blocked: false, reason: "" };
}

// ---------------------------------------------------------------------------
// Main validation entry point
// ---------------------------------------------------------------------------
export function validate(
  field: TripFieldName,
  value: EnrichedFieldValue,
  citations: string[],
  proposedConfidence: number,
  existing: TripFieldStatus | null | undefined
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let confidence = proposedConfidence;

  // 1. Cross-check: refuse to overwrite verified
  const overwriteCheck = checkNoOverwrite(existing);
  if (overwriteCheck.blocked) {
    return {
      valid: false,
      errors: [overwriteCheck.reason],
      warnings: [],
      confidence: 0,
    };
  }

  // 2. Schema validation per field
  let schemaErrors: string[] = [];
  switch (field) {
    case "cover_image":
      schemaErrors = validateCoverImage(value);
      break;
    case "gallery_images":
      schemaErrors = validateGalleryImages(value);
      break;
    case "weather_summary":
      schemaErrors = validateWeatherSummary(value);
      break;
    case "stay_recommendations":
      schemaErrors = validateStayRecommendations(value, citations);
      break;
    case "route_options":
      schemaErrors = validateRouteOptions(value, citations);
      break;
    case "overall_cost":
      schemaErrors = validateOverallCost(value, citations);
      break;
  }

  errors.push(...schemaErrors);

  // 3. Citation presence check for factual claim fields
  const citationRequiredFields: TripFieldName[] = [
    "stay_recommendations",
    "route_options",
    "overall_cost",
  ];
  if (citationRequiredFields.includes(field) && citations.length === 0) {
    errors.push(`Field "${field}" requires at least one citation URL.`);
  }

  // 4. Confidence degradation for warnings
  if (schemaErrors.length > 0 && errors.length === schemaErrors.length) {
    // All errors are schema-level — already invalid
  }

  // Reduce confidence if citations are sparse
  if (
    citationRequiredFields.includes(field) &&
    citations.length > 0 &&
    citations.length < 2
  ) {
    warnings.push("Only 1 citation provided — consider adding more sources.");
    confidence = Math.min(confidence, 0.75);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    confidence,
  };
}

// ---------------------------------------------------------------------------
// Auto-promotion check — can this field be promoted to "verified" without human?
// ---------------------------------------------------------------------------
export function shouldAutoVerify(
  field: TripFieldName,
  confidence: number
): boolean {
  // Only weather summary can be auto-verified (it's backed entirely by real API data)
  const AUTO_VERIFY_THRESHOLD = 0.9;
  return field === "weather_summary" && confidence >= AUTO_VERIFY_THRESHOLD;
}
