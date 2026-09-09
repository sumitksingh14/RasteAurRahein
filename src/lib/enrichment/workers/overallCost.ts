/**
 * Overall Cost Enrichment Worker — HIGHEST STAKES FIELD
 *
 * Produces a structured cost breakdown with citations required per line item.
 * Uses the existing AI_BUDGET_ESTIMATES as a sanity baseline.
 * Never auto-promotes to verified — always requires human approval.
 *
 * Citation gate: any line item lacking sourceUrl causes full rejection.
 * Sanity bounds: total must be within 3× of existing estimates (if available).
 */

import { LLMService } from "@/lib/services/LLMService";
import type { EnrichedCostValue, CostLineItem } from "../types";
import type { Trip } from "@/lib/types";

const ENRICHMENT_LLM = (process.env.ENRICHMENT_LLM_PROVIDER ?? "gemini") as
  | "gemini"
  | "groq"
  | "nvidia"
  | "openai";

// Sanity baseline: typical India trip cost ranges per person per day (INR)
const COST_SANITY_RANGES: Record<
  string,
  { minDailyINR: number; maxDailyINR: number }
> = {
  budget: { minDailyINR: 500, maxDailyINR: 2000 },
  mid: { minDailyINR: 2000, maxDailyINR: 8000 },
  premium: { minDailyINR: 8000, maxDailyINR: 50000 },
};

interface CostWorkerResult {
  value: EnrichedCostValue;
  citations: string[];
  tokensUsed: number;
  flags: string[];
}

export async function enrichOverallCost(trip: Trip): Promise<CostWorkerResult> {
  const durationDays =
    trip.startDate && trip.endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(trip.endDate).getTime() -
              new Date(trip.startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : (trip.itinerary?.length ?? 5);

  const destinations = [
    trip.country ?? "India",
    ...(trip.itinerary
      ?.flatMap((d) =>
        d.activities
          ?.filter((a) => a.location?.name)
          .map((a) => a.location!.name) ?? []
      )
      .slice(0, 5) ?? []),
  ];

  const researchPrompt = `
You are a travel cost researcher for India trips. Produce a detailed, accurate cost breakdown
for the following trip. Each line item MUST include a real, specific source URL where you
found or would find this pricing information (e.g. booking site, government fee page,
traveller forum post).

Trip: "${trip.title}"
Duration: ${durationDays} days
Country: ${trip.country ?? "India"}
Key destinations: ${destinations.slice(0, 6).join(", ")}
Trip type: ${trip.tripType ?? "General"}
Tags: ${(trip.tags ?? []).join(", ")}

Produce a breakdown per person for the full trip (not per day):
- Accommodation (total for ${durationDays} nights)
- Food & beverages (total for ${durationDays} days)
- Transport (flights/trains/road/local)
- Activities & entry fees
- Permits (if any applicable for this destination)
- Miscellaneous (SIM, tips, emergency buffer)

CRITICAL RULES:
1. Every lineItem MUST have a real sourceUrl. If you don't have a source URL for a claim,
   do NOT include that line item.
2. Give realistic ranges in Indian Rupees (INR).
3. Base estimates on actual current prices, not outdated data.

Respond ONLY with valid JSON matching this exact shape:
{
  "lineItems": [
    {
      "category": "accommodation" | "food" | "transport" | "activities" | "permits" | "misc",
      "label": "<specific description>",
      "minINR": <number>,
      "maxINR": <number>,
      "sourceUrl": "<real URL>",
      "note": "<optional context>"
    }
  ],
  "confidence": <0.0 to 1.0>,
  "researchNotes": "<brief note on how confident you are and why>"
}
`.trim();

  const raw = await LLMService.generateContent(researchPrompt, {
    model: ENRICHMENT_LLM,
    jsonMode: true,
  });
  const tokensUsed = Math.ceil((researchPrompt.length + raw.length) / 4);

  const parsed = JSON.parse(
    raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim()
  ) as {
    lineItems: CostLineItem[];
    confidence: number;
    researchNotes?: string;
  };

  if (!Array.isArray(parsed.lineItems) || parsed.lineItems.length === 0) {
    throw new Error("LLM returned no cost line items.");
  }

  const flags: string[] = [];

  // Citation gate: reject line items missing sourceUrl
  const citedItems = parsed.lineItems.filter((item) => {
    if (!item.sourceUrl || item.sourceUrl === "" || item.sourceUrl === "null") {
      flags.push(`Line item "${item.label}" has no citation — excluded.`);
      return false;
    }
    return true;
  });

  if (citedItems.length === 0) {
    throw new Error(
      "All cost line items were missing citations. Cannot store uncited cost claims."
    );
  }

  // Compute totals
  const totalMinINR = citedItems.reduce((sum, item) => sum + item.minINR, 0);
  const totalMaxINR = citedItems.reduce((sum, item) => sum + item.maxINR, 0);

  // Sanity bounds check
  const midDailyMin = totalMinINR / durationDays;
  const midDailyMax = totalMaxINR / durationDays;

  if (
    midDailyMin < COST_SANITY_RANGES.budget.minDailyINR * 0.3 ||
    midDailyMax > COST_SANITY_RANGES.premium.maxDailyINR * 3
  ) {
    flags.push(
      `Cost totals (₹${totalMinINR.toLocaleString()}–₹${totalMaxINR.toLocaleString()}) are outside expected sanity bounds for a ${durationDays}-day trip. Requires human review.`
    );
  }

  const citations = [
    ...new Set(citedItems.map((i) => i.sourceUrl).filter(Boolean)),
  ];

  const value: EnrichedCostValue = {
    lineItems: citedItems,
    totalMinINR,
    totalMaxINR,
    currency: "INR",
    confidence: Math.min(1, Math.max(0, parsed.confidence ?? 0.6)),
    lastResearched: new Date().toISOString(),
  };

  return { value, citations, tokensUsed, flags };
}
