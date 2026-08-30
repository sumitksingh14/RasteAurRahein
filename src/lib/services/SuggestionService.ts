import { LLMService } from "./LLMService";
import type { ImportSegment } from "./ImportService";
import { DEMO_TRIPS } from "../queries";

export interface Suggestion {
  id: string;
  type: string;
  rationale: string;
  sourceType: "own_history" | "aggregated" | "friend";
  sourceTripId?: string;
  segment: ImportSegment;
}

export class SuggestionService {
  static async getSuggestions(tripId: string, importedSegments: ImportSegment[]): Promise<{ suggestions: Suggestion[] }> {
    // 1. Gather context from the imported segments (e.g. destinations, gaps)
    const destinations = Array.from(
      new Set(
        importedSegments
          .map((s) => s.location?.name)
          .filter(Boolean)
      )
    );

    if (destinations.length === 0) {
      return { suggestions: [] };
    }

    // 2. Query for similar trips using the destination (Mocking with DEMO_TRIPS)
    const candidateTrips = DEMO_TRIPS.filter((t) => 
      destinations.some((d) => t.title.includes(d as string) || t.tags?.includes(d as string))
    );

    if (candidateTrips.length === 0) {
      return { suggestions: [] };
    }

    // 3. Ask the LLM to cross-reference and generate suggestions
    const prompt = `
You are an expert travel assistant. The user just imported a new itinerary with the following segments:
${JSON.stringify(importedSegments, null, 2)}

We found the following past trips in our database that might be relevant:
${JSON.stringify(
  candidateTrips.map(t => ({
    id: t._id,
    title: t.title,
    activities: t.itinerary?.flatMap(day => day.activities)
  })), 
  null, 
  2
)}

Based ONLY on the past trips provided, identify potential gap-fillers, commonly-paired activities, or logistical warnings for the new itinerary.
Return a JSON array of suggestions matching this schema:
{
  "suggestions": [
    {
      "id": "<generate random uuid>",
      "type": "<e.g., activity, dining, lodging, logistics>",
      "rationale": "<Human readable rationale, e.g., 'Travelers to Spiti Valley often stopped at Chandratal Lake.'>",
      "sourceType": "aggregated",
      "sourceTripId": "<optional trip id from the past trips>",
      "segment": {
         "id": "<uuid>",
         "type": "activity",
         "source": "paste_text",
         "confidence": 0.9,
         "confirmationNumber": null,
         "provider": "Suggestion",
         "startDateTime": "<ISO 8601 estimate based on itinerary gap>",
         "endDateTime": null,
         "location": { "name": "<string>", "address": null, "lat": null, "lng": null },
         "details": { "notes": "<string>" },
         "rawSourceExcerpt": "Suggestion engine"
      }
    }
  ]
}

Output ONLY valid JSON matching this schema.
    `;

    const rawResponse = await LLMService.generateContent(prompt, { model: "gemini", jsonMode: true });

    try {
      let parsed = JSON.parse(rawResponse);
      return parsed as { suggestions: Suggestion[] };
    } catch {
      const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]) as { suggestions: Suggestion[] };
      }
      return { suggestions: [] };
    }
  }

  static async acceptSuggestion(tripId: string, suggestionId: string): Promise<boolean> {
    // Stub: accept logic
    return true;
  }

  static async dismissSuggestion(tripId: string, suggestionId: string, suppressSimilar: boolean): Promise<boolean> {
    // Stub: dismiss logic
    return true;
  }
}
