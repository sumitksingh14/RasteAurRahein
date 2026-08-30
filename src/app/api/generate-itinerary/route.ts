import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface GenerateRequest {
  destination: string;
  days: number;
  style: string;
  month: string;
  highlights?: string;
  budget?: string;
  model?: "gemini" | "nvidia" | "groq";
  /** The specific NVIDIA model ID when model === "nvidia" */
  nvidiaModel?: string;
  /** The specific GROQ model ID when model === "groq" */
  groqModel?: string;
}

interface GeneratedActivity {
  time?: string;
  title: string;
  description?: string;
  notes?: string;
  type?: string;
}

interface GeneratedDay {
  dayNumber: number;
  title: string;
  summary?: string;
  activities: GeneratedActivity[];
}

interface GeneratedItinerary {
  title: string;
  destination: string;
  days: GeneratedDay[];
  overview?: string;
  bestTimeToVisit?: string;
  totalBudgetEstimate?: string;
  tags?: string[];
}

import { LLMService, LLMModelProvider } from "@/lib/services/LLMService";

// Full prompt — used by Gemini & NVIDIA (no token-rate limits)
function buildPrompt(req: GenerateRequest): string {
  return `You are an expert Indian travel planner with deep knowledge of destinations across India and Southeast Asia.

Create a detailed, realistic day-by-day travel itinerary based on these inputs:
- Destination: ${req.destination}
- Duration: ${req.days} days
- Travel Style: ${req.style}
- Travel Month: ${req.month}
${req.budget ? `- Budget: ${req.budget}` : ""}
${req.highlights ? `- Must-see / highlights: ${req.highlights}` : ""}

CRITICAL: Return ONLY valid JSON, no markdown, no code blocks, no extra text. Return exactly this structure:
{
  "title": "Descriptive trip title (e.g. '7 Days in Coorg — Coffee, Treks & Waterfalls')",
  "destination": "${req.destination}",
  "overview": "2–3 sentence trip overview",
  "bestTimeToVisit": "Best months to visit",
  "totalBudgetEstimate": "Realistic budget range in INR (e.g. ₹35,000–₹50,000 per person)",
  "tags": ["tag1", "tag2", "tag3"],
  "days": [
    {
      "dayNumber": 1,
      "title": "Short evocative day title (e.g. 'Arrival & Abbey Falls')",
      "summary": "1–2 sentence summary of the day's highlights",
      "activities": [
        {
          "time": "9:00 AM",
          "title": "Activity name (concise)",
          "description": "1–2 sentences of specific, useful detail — entry fees, travel time, insider tips",
          "notes": "Optional: a practical tip or warning",
          "type": "transport|accommodation|food|activity|sightseeing"
        }
      ]
    }
  ]
}

Guidelines:
- Each day should have 4–7 realistic activities with specific times
- Include at least one meal recommendation per day with dish names
- Include transport details between locations
- Include accommodation suggestion for each night
- Be specific: name real hotels, restaurants, viewpoints, trails
- For multi-destination trips, plan logical routes without unnecessary backtracking
- Include practical tips (best time to arrive, what to carry, booking advice)
- Make the itinerary feel premium and well-researched, not generic
- Generate exactly ${req.days} days

Return ONLY the JSON object, nothing else.`;
}

// Compact prompt — used by Groq (free tier: 8 000 TPM). Same schema,
// ~50% fewer tokens so input + 4 096 output stays under the cap.
function buildGroqPrompt(req: GenerateRequest): string {
  return `Expert Indian travel planner. Output ONLY valid JSON, no markdown.
Destination: ${req.destination} | Days: ${req.days} | Style: ${req.style} | Month: ${req.month}${req.budget ? ` | Budget: ${req.budget}` : ""}${req.highlights ? ` | Highlights: ${req.highlights}` : ""}

Return exactly this JSON structure (${req.days} days):
{"title":"<trip title>","destination":"${req.destination}","overview":"<2 sentences>","bestTimeToVisit":"<months>","totalBudgetEstimate":"<INR range>","tags":["t1","t2","t3"],"days":[{"dayNumber":1,"title":"<day title>","summary":"<1 sentence>","activities":[{"time":"9:00 AM","title":"<name>","description":"<detail>","notes":"<tip>","type":"transport|accommodation|food|activity|sightseeing"}]}]}

Rules: 4-6 activities/day with times. 1 meal+dish name/day. Transport & accommodation each night. Name real places. Exactly ${req.days} days. JSON only.`;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateRequest;

    const { destination, days, style, month } = body;
    if (!destination?.trim()) {
      return NextResponse.json({ error: "destination is required" }, { status: 400 });
    }
    if (!days || days < 1 || days > 30) {
      return NextResponse.json({ error: "days must be between 1 and 30" }, { status: 400 });
    }
    if (!style || !month) {
      return NextResponse.json({ error: "style and month are required" }, { status: 400 });
    }

    const requestedModel = body.model || "gemini";
    const providersToTry = [requestedModel];
    if (requestedModel === "nvidia") providersToTry.push("gemini", "groq");
    else if (requestedModel === "groq") providersToTry.push("gemini", "nvidia");
    else providersToTry.push("groq", "nvidia");

    let itinerary: GeneratedItinerary | null = null;
    let modelUsed = "";
    let lastError: any = null;

    for (const provider of providersToTry) {
      try {
        let rawResponse = "";
        let currentModelLabel = "";
        const prompt = provider === "groq" ? buildGroqPrompt(body) : buildPrompt(body);

        if (provider === "nvidia") {
          const nvidiaModelId = body.nvidiaModel;
          rawResponse = await LLMService.generateContent(prompt, { model: "nvidia", specificModelId: nvidiaModelId, jsonMode: true });
          currentModelLabel = `NVIDIA · ${nvidiaModelId || "default"}`;
        } else if (provider === "groq") {
          const groqModelId = body.groqModel ?? "llama3-70b-8192";
          rawResponse = await LLMService.generateContent(prompt, { model: "groq", specificModelId: groqModelId, jsonMode: true });
          currentModelLabel = `Groq · ${groqModelId}`;
        } else {
          rawResponse = await LLMService.generateContent(prompt, { model: "gemini", jsonMode: true });
          currentModelLabel = "Google Gemini Flash";
        }

        // Parse and validate
        let parsed: GeneratedItinerary;
        try {
          parsed = JSON.parse(rawResponse);
        } catch {
          // Sometimes models wrap in markdown code fences despite instructions
          const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[1]);
          } else {
            throw new Error(`[${provider}] Could not parse AI response as JSON.`);
          }
        }

        if (!parsed.days || !Array.isArray(parsed.days)) {
          throw new Error(`[${provider}] AI response missing 'days' array.`);
        }

        // Success!
        itinerary = parsed;
        modelUsed = currentModelLabel;
        if (provider !== requestedModel) {
          modelUsed += " (Fallback)";
        }
        break; // Stop trying if successful
      } catch (err) {
        console.warn(`[generate-itinerary] Provider '${provider}' failed:`, err instanceof Error ? err.message : String(err));
        lastError = err;
      }
    }

    if (!itinerary) {
      throw lastError || new Error("All AI providers failed to generate a valid itinerary.");
    }

    return NextResponse.json({
      success: true,
      itinerary,
      modelUsed,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[generate-itinerary]", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
