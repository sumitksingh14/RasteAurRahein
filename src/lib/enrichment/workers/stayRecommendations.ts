/**
 * Stay Recommendations Enrichment Worker
 *
 * 1. LLM generates a list of specific lodging suggestions for each major stop.
 * 2. Each suggestion is cross-checked against Nominatim (OSM) to confirm existence.
 * 3. Only verified lodgings (or those with source URLs) are stored.
 * 4. Citations required per stay — any uncited stay is flagged in the citation field.
 */

import { LLMService } from "@/lib/services/LLMService";
import type { EnrichedStay, EnrichedStayValue } from "../types";
import type { Trip } from "@/lib/types";

const ENRICHMENT_LLM = (process.env.ENRICHMENT_LLM_PROVIDER ?? "gemini") as
  | "gemini"
  | "groq"
  | "nvidia"
  | "openai";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const NOMINATIM_HEADERS = {
  "User-Agent": "RasteAurRahein/1.0 (travel blog enrichment engine)",
};

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}

async function nominatimSearch(
  query: string
): Promise<NominatimResult | null> {
  try {
    const url = new URL(`${NOMINATIM_BASE}/search`);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "0");

    // Nominatim rate limit: max 1 req/second
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const res = await fetch(url.toString(), { headers: NOMINATIM_HEADERS });
    if (!res.ok) return null;

    const results = (await res.json()) as NominatimResult[];
    return results[0] ?? null;
  } catch {
    return null;
  }
}

interface StayWorkerResult {
  value: EnrichedStayValue;
  citations: string[];
  tokensUsed: number;
}

export async function enrichStayRecommendations(
  trip: Trip
): Promise<StayWorkerResult> {
  // Extract major stops from itinerary
  const stops = (trip.itinerary ?? [])
    .map((day) => {
      const accAct = day.activities?.find(
        (a) => a.type === "accommodation" && a.location?.name
      );
      return accAct?.location?.name ?? day.title;
    })
    .filter(Boolean)
    .slice(0, 5); // Max 5 stops to limit API calls

  if (stops.length === 0) {
    throw new Error("No itinerary stops found for stay recommendations.");
  }

  // Step 1: LLM generates candidate stays
  const researchPrompt = `
You are a travel accommodation researcher for India. Suggest real, specific lodging options
for each stop in the following trip.

Trip: "${trip.title}"
Country: ${trip.country ?? "India"}
Stops: ${stops.join(", ")}

For each stop, suggest 2–3 specific lodging options (real places that exist).
Include budget, mid-range, and premium options where possible.
For each lodging provide a booking platform URL (MakeMyTrip, Booking.com, Airbnb, official site, etc.) if known.

Respond ONLY with valid JSON:
{
  "stays": [
    {
      "name": "<exact lodging name>",
      "town": "<town/area>",
      "type": "hotel" | "homestay" | "guesthouse" | "camp" | "resort",
      "priceBand": "budget" | "mid" | "premium",
      "priceRangeINR": [<min>, <max>],
      "bookingUrl": "<url or null>",
      "notes": "<1-sentence note or null>"
    }
  ]
}
`.trim();

  const raw = await LLMService.generateContent(researchPrompt, {
    model: ENRICHMENT_LLM,
    jsonMode: true,
  });
  const totalTokens = Math.ceil((researchPrompt.length + raw.length) / 4);

  const parsed = JSON.parse(
    raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim()
  ) as { stays: Omit<EnrichedStay, "nominatimVerified">[] };

  if (!Array.isArray(parsed.stays) || parsed.stays.length === 0) {
    throw new Error("LLM returned no stay suggestions.");
  }

  // Step 2: Nominatim verification for each suggested stay
  const verified: EnrichedStay[] = [];
  const citations: string[] = [];

  for (const stay of parsed.stays.slice(0, 10)) {
    const query = `${stay.name}, ${stay.town}, ${trip.country ?? "India"}`;
    const nominatimResult = await nominatimSearch(query);
    const nominatimVerified = nominatimResult !== null;

    const finalStay: EnrichedStay = {
      ...stay,
      nominatimVerified,
      sourceUrl: stay.bookingUrl ?? undefined,
    };

    // Only include stays that are verified OR have a booking URL
    if (nominatimVerified || stay.bookingUrl) {
      verified.push(finalStay);

      if (nominatimVerified) {
        const nominatimUrl = `${NOMINATIM_BASE}/search?q=${encodeURIComponent(query)}&format=json`;
        citations.push(nominatimUrl);
      }
      if (stay.bookingUrl) {
        citations.push(stay.bookingUrl);
      }
    }
  }

  if (verified.length === 0) {
    throw new Error(
      "No suggested stays could be verified via Nominatim or source URLs."
    );
  }

  return {
    value: { stays: verified },
    citations: [...new Set(citations)],
    tokensUsed: totalTokens,
  };
}
