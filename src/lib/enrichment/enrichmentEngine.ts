/**
 * Enrichment Engine — Job Orchestrator
 *
 * Runs a single enrichment job:
 * 1. Acquires pending lock (prevents duplicates)
 * 2. Fetches trip data
 * 3. Calls the appropriate field worker
 * 4. Runs the validator (max 2 retries on schema/citation failure)
 * 5. Stores result as ai_filled (or auto-verified for weather_summary)
 * 6. Appends history entry
 * 7. Logs run summary (tokens, duration, outcome)
 * 8. Releases lock
 */

import { getTripBySlug } from "@/lib/queries";
import type { Trip } from "@/lib/types";
import {
  acquireLock,
  releaseLock,
  getFieldStatus,
  upsertFieldStatus,
  appendHistory,
  appendRunLog,
} from "./store";
import { validate, shouldAutoVerify } from "./validator";
import type { EnrichmentJob, TripFieldName, EnrichedFieldValue } from "./types";

// Workers
import { enrichWeatherSummary } from "./workers/weatherSummary";
import { enrichReferenceImages } from "./workers/referenceImages";
import { enrichRouteOptions } from "./workers/routeOptions";
import { enrichStayRecommendations } from "./workers/stayRecommendations";
import { enrichOverallCost } from "./workers/overallCost";

const MAX_RETRIES = 2;

export interface EngineRunResult {
  outcome: "success" | "failed" | "skipped";
  message: string;
  tokensUsed: number;
  durationMs: number;
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------
export async function runEnrichment(
  job: EnrichmentJob
): Promise<EngineRunResult> {
  const startTime = Date.now();
  const { tripSlug, field } = job;

  // 1. Acquire lock
  const locked = await acquireLock(tripSlug, field);
  if (!locked) {
    return {
      outcome: "skipped",
      message: `Lock already held for ${tripSlug}:${field} — skipping to prevent duplicate run`,
      tokensUsed: 0,
      durationMs: Date.now() - startTime,
    };
  }

  try {
    // 2. Load trip
    const trip = await getTripBySlug(tripSlug);
    if (!trip) {
      throw new Error(`Trip not found: ${tripSlug}`);
    }

    // 3. Load existing status (for cross-check)
    const existing = await getFieldStatus(tripSlug, field);

    // Don't re-enrich if already verified (unless explicitly re-triggered)
    if (existing?.status === "verified" && job.priority !== "high") {
      return {
        outcome: "skipped",
        message: `Field ${field} is already verified — skipping nightly re-check`,
        tokensUsed: 0,
        durationMs: Date.now() - startTime,
      };
    }

    // 4. Run worker with retry loop
    let lastError: string = "";
    let totalTokens = 0;
    let succeededValue: EnrichedFieldValue | null = null;
    let succeededCitations: string[] = [];
    let succeededConfidence = 0;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const { value, citations, confidence, tokensUsed } = await callWorker(
          field,
          trip
        );
        totalTokens += tokensUsed;
        succeededCitations = citations;
        succeededConfidence = confidence;

        // 5. Validate
        const result = validate(
          field,
          value,
          citations,
          confidence,
          existing
        );

        if (result.valid) {
          succeededValue = value;
          succeededConfidence = result.confidence;
          break; // success
        } else {
          lastError = result.errors.join("; ");
          console.warn(
            `[enrichment] Validation failed for ${tripSlug}:${field} (attempt ${attempt + 1}):`,
            result.errors
          );
          if (attempt === MAX_RETRIES) {
            throw new Error(`Validation failed after ${MAX_RETRIES + 1} attempts: ${lastError}`);
          }
        }
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        if (attempt === MAX_RETRIES) {
          throw err;
        }
        // Brief wait before retry
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    if (!succeededValue) {
      throw new Error(`Worker produced no valid value after retries: ${lastError}`);
    }

    // 6. Determine final status
    const autoVerify = shouldAutoVerify(field, succeededConfidence);
    const newStatus = autoVerify ? "verified" : "ai_filled";

    // 7. Store the result
    const previousStatus = existing?.status ?? "missing";
    const previousValue = existing?.value ?? null;

    await upsertFieldStatus(tripSlug, field, {
      status: newStatus,
      value: succeededValue,
      sourceType: getSourceType(field),
      confidence: succeededConfidence,
      citations: succeededCitations,
      generatedAt: new Date().toISOString(),
      verifiedAt: autoVerify ? new Date().toISOString() : null,
      verifiedBy: autoVerify ? "system" : null,
      pendingReason: null,
    });

    // 8. Append history
    await appendHistory(
      tripSlug,
      field,
      previousValue,
      previousStatus,
      "system",
      `Enrichment run: ${newStatus}${autoVerify ? " (auto-verified)" : ""}`
    );

    const durationMs = Date.now() - startTime;

    // 9. Log run
    await appendRunLog({
      jobId: job.jobId,
      tripSlug,
      field,
      outcome: "success",
      durationMs,
      tokensUsed: totalTokens,
      toolCallCount: getToolCallCount(field),
      completedAt: new Date().toISOString(),
    });

    return {
      outcome: "success",
      message: `${field} enriched successfully → ${newStatus} (confidence: ${(succeededConfidence * 100).toFixed(0)}%)`,
      tokensUsed: totalTokens,
      durationMs,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    const durationMs = Date.now() - startTime;

    // Store failure reason
    await upsertFieldStatus(tripSlug, field, {
      status: "pending",
      pendingReason: errorMsg,
    });

    await appendRunLog({
      jobId: job.jobId,
      tripSlug,
      field,
      outcome: "failed",
      durationMs,
      tokensUsed: 0,
      toolCallCount: 0,
      error: errorMsg,
      completedAt: new Date().toISOString(),
    });

    console.error(`[enrichment] Job failed for ${tripSlug}:${field}:`, errorMsg);

    return {
      outcome: "failed",
      message: errorMsg,
      tokensUsed: 0,
      durationMs,
    };
  } finally {
    await releaseLock(tripSlug, field);
  }
}

// ---------------------------------------------------------------------------
// Worker dispatch
// ---------------------------------------------------------------------------
async function callWorker(
  field: TripFieldName,
  trip: Trip
): Promise<{ value: EnrichedFieldValue; citations: string[]; confidence: number; tokensUsed: number }> {
  switch (field) {
    case "weather_summary": {
      const result = await enrichWeatherSummary(trip.slug);
      return {
        value: result.value,
        citations: [],
        confidence: result.value.confidence,
        tokensUsed: result.tokensUsed,
      };
    }

    case "cover_image":
    case "gallery_images": {
      const locationNames = (trip.itinerary as { activities?: { location?: { name: string } }[] }[] ?? [])
        .flatMap((d) => d.activities?.map((a) => a.location?.name).filter(Boolean) ?? []) as string[];

      const result = await enrichReferenceImages(
        trip.slug,
        trip.title,
        trip.country,
        trip.tags,
        locationNames
      );
      return {
        value: result.value,
        citations: result.value.images.map((img) => img.attribution.unsplashUrl),
        confidence: 0.85,
        tokensUsed: result.tokensUsed,
      };
    }

    case "route_options": {
      const result = await enrichRouteOptions(trip);
      return {
        value: result.value,
        citations: result.value.routes.map((r) => r.sourceUrl),
        confidence: 0.8,
        tokensUsed: result.tokensUsed,
      };
    }

    case "stay_recommendations": {
      const result = await enrichStayRecommendations(trip);
      return {
        value: result.value,
        citations: result.citations,
        confidence: 0.7,
        tokensUsed: result.tokensUsed,
      };
    }

    case "overall_cost": {
      const result = await enrichOverallCost(trip);
      return {
        value: result.value,
        citations: result.citations,
        confidence: result.value.confidence,
        tokensUsed: result.tokensUsed,
      };
    }

    default:
      throw new Error(`Unknown field: ${field}`);
  }
}

function getSourceType(field: TripFieldName): "api" | "llm" | "llm+search" {
  switch (field) {
    case "weather_summary":
      return "api";
    case "cover_image":
    case "gallery_images":
      return "llm+search";
    case "route_options":
      return "llm+search";
    case "stay_recommendations":
      return "llm+search";
    case "overall_cost":
      return "llm+search";
    default:
      return "llm";
  }
}

function getToolCallCount(field: TripFieldName): number {
  switch (field) {
    case "weather_summary":
      return 1; // 1 Open-Meteo call + 1 LLM call
    case "cover_image":
    case "gallery_images":
      return 4; // 1 LLM (queries) + 3 Unsplash + 1 LLM (selection)
    case "route_options":
      return 3; // 2 ORS calls + 2 LLM (descriptions)
    case "stay_recommendations":
      return 6; // 1 LLM + ~5 Nominatim calls
    case "overall_cost":
      return 1; // 1 LLM
    default:
      return 1;
  }
}
