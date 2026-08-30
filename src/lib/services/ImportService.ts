import { LLMService } from "./LLMService";

export interface ImportSegment {
  id: string;
  type: "flight" | "lodging" | "car_rental" | "activity" | "train" | "cruise" | "other";
  source: "paste_text" | "pdf";
  confidence: number;
  confirmationNumber: string | null;
  provider: string;
  startDateTime: string;
  endDateTime: string | null;
  location: {
    name: string;
    address: string | null;
    lat: number | null;
    lng: number | null;
  };
  destinationLocation?: {
    name: string;
    address: string | null;
    lat: number | null;
    lng: number | null;
  };
  details: {
    flightNumber?: string | null;
    seat?: string | null;
    roomType?: string | null;
    passengers?: string[];
    notes?: string | null;
  };
  rawSourceExcerpt: string;
}

export interface ImportResult {
  segments: ImportSegment[];
  warnings: string[];
}

export class ImportService {
  static async parseItinerary(source: "paste_text" | "pdf", content: string): Promise<ImportResult> {
    const prompt = `
You are an advanced itinerary parsing assistant. Your goal is to extract structured travel data from the provided text and output it as a JSON object strictly matching the schema below.

Text to parse:
"""
${content}
"""

Requirements:
- Normalize the data into an array of segments.
- Each segment must have a "type" which is one of: "flight", "lodging", "car_rental", "activity", "train", "cruise", "other".
- Estimate a "confidence" score between 0.0 and 1.0 for each segment. Be strict; if a time or location is missing, lower the confidence.
- Try to infer standard ISO 8601 timestamps (with timezones if possible, otherwise assume UTC and we will adjust).
- Preserve the exact raw text snippet used as "rawSourceExcerpt" for debugging.

JSON Schema:
{
  "segments": [
    {
      "id": "<generate a random string or UUID>",
      "type": "<one of the valid types>",
      "source": "${source}",
      "confidence": <float>,
      "confirmationNumber": "<string or null>",
      "provider": "<string, e.g. airline name, hotel name>",
      "startDateTime": "<ISO 8601>",
      "endDateTime": "<ISO 8601 or null>",
      "location": {
        "name": "<string>",
        "address": "<string or null>",
        "lat": null,
        "lng": null
      },
      "destinationLocation": {
        "name": "<string>",
        "address": "<string or null>",
        "lat": null,
        "lng": null
      },
      "details": {
        "flightNumber": "<string or null>",
        "seat": "<string or null>",
        "roomType": "<string or null>",
        "passengers": ["<string>"],
        "notes": "<string or null>"
      },
      "rawSourceExcerpt": "<string>"
    }
  ],
  "warnings": ["<any issues encountered while parsing, e.g. ambiguous dates>"]
}

Output ONLY valid JSON matching this schema. Do not include markdown code blocks.
`;

    // We can use any LLM model that supports JSON. Let's use Gemini by default as it is fast and has a large context window.
    const rawResponse = await LLMService.generateContent(prompt, { model: "gemini", jsonMode: true });

    try {
      let parsed = JSON.parse(rawResponse);
      return parsed as ImportResult;
    } catch {
      // Fallback if markdown block is present
      const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]) as ImportResult;
      }
      throw new Error("Failed to parse LLM response into JSON");
    }
  }

  static async confirmImport(tripId: string, segments: ImportSegment[]): Promise<{ savedSegmentIds: string[] }> {
    // In a real implementation, this would save to the database using src/lib/queries.ts
    // For now, return stub response
    return { savedSegmentIds: segments.map((s) => s.id) };
  }
}
