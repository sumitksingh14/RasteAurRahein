/**
 * Route Options Enrichment Worker (OpenRouteService)
 *
 * 1. Extracts origin/destination pairs from trip itinerary location data.
 * 2. Calls OpenRouteService API for real routing data (distance, duration, waypoints).
 * 3. LLM generates plain-language trade-off descriptions grounded in the routing data.
 *
 * The LLM NEVER invents distances or travel times — it only explains the retrieved data.
 */

import { LLMService } from "@/lib/services/LLMService";
import type { EnrichedRoute, EnrichedRouteValue } from "../types";
import type { Trip } from "@/lib/types";

const ENRICHMENT_LLM = (process.env.ENRICHMENT_LLM_PROVIDER ?? "gemini") as
  | "gemini"
  | "groq"
  | "nvidia"
  | "openai";

const ORS_API_KEY = process.env.ORS_API_KEY;
const ORS_BASE = "https://api.openrouteservice.org";

type OrsProfile = "driving-car" | "cycling-regular" | "foot-walking";

interface OrsRouteResult {
  distanceM: number;
  durationS: number;
  waypoints?: string[];
}

async function fetchOrsRoute(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number,
  profile: OrsProfile
): Promise<OrsRouteResult> {
  if (!ORS_API_KEY) {
    throw new Error("ORS_API_KEY is not configured. Add it to .env.local.");
  }

  const url = `${ORS_BASE}/v2/directions/${profile}/geojson`;
  const body = {
    coordinates: [
      [fromLon, fromLat],
      [toLon, toLat],
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: ORS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`ORS ${profile} route failed: ${res.status}`);
  }

  const data = await res.json();
  const feature = data?.features?.[0];
  if (!feature) throw new Error(`ORS returned no route for profile ${profile}`);

  const summary = feature.properties?.summary;
  return {
    distanceM: summary?.distance ?? 0,
    durationS: summary?.duration ?? 0,
  };
}

function extractLocations(
  trip: Trip
): { name: string; lat: number; lon: number }[] {
  const seen = new Set<string>();
  const locations: { name: string; lat: number; lon: number }[] = [];

  for (const day of trip.itinerary ?? []) {
    for (const act of day.activities ?? []) {
      if (act.location?.name && act.location.lat && act.location.lng) {
        const key = act.location.name;
        if (!seen.has(key)) {
          seen.add(key);
          locations.push({
            name: act.location.name,
            lat: act.location.lat,
            lon: act.location.lng,
          });
        }
      }
    }
  }

  return locations;
}

interface RouteWorkerResult {
  value: EnrichedRouteValue;
  tokensUsed: number;
}

export async function enrichRouteOptions(
  trip: Trip
): Promise<RouteWorkerResult> {
  const locations = extractLocations(trip);
  if (locations.length < 2) {
    throw new Error(
      "Trip has fewer than 2 geocoded locations — cannot compute routes."
    );
  }

  // Use first and last location as origin/destination
  const origin = locations[0];
  const destination = locations[locations.length - 1];
  const intermediateWaypoints = locations.slice(1, -1).map((l) => l.name);

  const routes: EnrichedRoute[] = [];
  const profiles: OrsProfile[] = ["driving-car", "foot-walking"];

  let totalTokens = 0;

  for (const profile of profiles) {
    try {
      const orsResult = await fetchOrsRoute(
        origin.lat,
        origin.lon,
        destination.lat,
        destination.lon,
        profile
      );

      const distanceKm = Math.round((orsResult.distanceM / 1000) * 10) / 10;
      const durationMin = Math.round(orsResult.durationS / 60);

      // LLM generates the description grounded in this real data
      const descPrompt = `
You are a travel route advisor. Write a 2–3 sentence description of this route for travellers.

Trip: "${trip.title}"
Route profile: ${profile}
Origin: ${origin.name}
Destination: ${destination.name}
Intermediate stops: ${intermediateWaypoints.join(", ") || "none"}
Distance: ${distanceKm} km
Estimated duration: ${durationMin} minutes

IMPORTANT: Do NOT invent different distances or durations than what is provided above.
Describe the route's character, what travellers will experience, and any practical notes.
Keep it factual and helpful.

Respond ONLY with a valid JSON object:
{
  "name": "<short route name>",
  "description": "<2-3 sentences>",
  "confidence": <0.0 to 1.0>
}
`.trim();

      const descRaw = await LLMService.generateContent(descPrompt, {
        model: ENRICHMENT_LLM,
        jsonMode: true,
      });
      totalTokens += Math.ceil((descPrompt.length + descRaw.length) / 4);

      const descParsed = JSON.parse(
        descRaw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim()
      ) as { name: string; description: string; confidence: number };

      const sourceUrl = `${ORS_BASE}/v2/directions/${profile}/geojson`;

      routes.push({
        name: descParsed.name || `${profile} route`,
        profile,
        distanceKm,
        durationMin,
        waypoints: [
          origin.name,
          ...intermediateWaypoints.slice(0, 3),
          destination.name,
        ],
        description: descParsed.description,
        sourceUrl,
      });
    } catch (err) {
      console.warn(`[routes worker] Profile ${profile} failed:`, err);
      // Continue with other profiles
    }
  }

  if (routes.length === 0) {
    throw new Error("All route profiles failed.");
  }

  return { value: { routes }, tokensUsed: totalTokens };
}
