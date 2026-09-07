import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { getTripBySlug, updateTrip } from "@/lib/queries";
import { LLMService } from "@/lib/services/LLMService";
import type { ItineraryDay, Activity } from "@/lib/types";
import { randomUUID } from "crypto";

type RouteContext = { params: Promise<{ slug: string }> };

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface GeneratedActivity {
  time?: string;
  title: string;
  description?: string;
  notes?: string;
  type?: string;
  location?: { name: string; lat: number; lng: number };
}

interface GeneratedDay {
  dayNumber: number;
  title: string;
  summary?: string;
  activities: GeneratedActivity[];
}

interface GeneratedItinerary {
  title?: string;
  overview?: string;
  bestTimeToVisit?: string;
  totalBudgetEstimate?: string;
  tags?: string[];
  days: GeneratedDay[];
}

// ─────────────────────────────────────────────────────────────
// Prompt builders
// ─────────────────────────────────────────────────────────────
interface TripMeta {
  title: string;
  country?: string;
  tripType?: string;
  bestSuggestedMonth?: string;
  startDate?: string;
  endDate?: string;
  excerpt?: string;
  days: number;
}

function buildPrompt(trip: TripMeta): string {
  const extras: string[] = [];
  if (trip.country) extras.push(`- Country/Region: ${trip.country}`);
  if (trip.tripType) extras.push(`- Trip Type: ${trip.tripType}`);
  if (trip.bestSuggestedMonth) extras.push(`- Best month to visit: ${trip.bestSuggestedMonth}`);
  if (trip.excerpt) extras.push(`- Description: ${trip.excerpt}`);

  return `You are an expert Indian travel planner with deep knowledge of destinations across India and Southeast Asia.

Create a detailed, realistic day-by-day travel itinerary for the following trip:
- Trip Title: ${trip.title}
- Duration: ${trip.days} days
${extras.join("\n")}

CRITICAL: Return ONLY valid JSON, no markdown, no code blocks, no extra text. Return exactly this structure:
{
  "title": "${trip.title}",
  "destination": "${trip.country || trip.title}",
  "overview": "2–3 sentence trip overview",
  "bestTimeToVisit": "Best months to visit",
  "totalBudgetEstimate": "Realistic budget range in INR (e.g. ₹35,000–₹50,000 per person)",
  "tags": ["tag1", "tag2", "tag3"],
  "days": [
    {
      "dayNumber": 1,
      "title": "Short evocative day title",
      "summary": "1–2 sentence summary of the day's highlights",
      "activities": [
        {
          "time": "9:00 AM",
          "title": "Activity name (concise)",
          "description": "1–2 sentences of specific, useful detail",
          "notes": "Optional: a practical tip or warning",
          "type": "transport|accommodation|food|activity|sightseeing",
          "location": { "name": "Place name", "lat": 0.0, "lng": 0.0 }
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
- Include practical tips (best time to arrive, what to carry, booking advice)
- Generate exactly ${trip.days} days

Return ONLY the JSON object, nothing else.`;
}

function buildGroqPrompt(trip: TripMeta): string {
  const extras = [
    trip.country && `Country: ${trip.country}`,
    trip.tripType && `Type: ${trip.tripType}`,
    trip.bestSuggestedMonth && `Best month: ${trip.bestSuggestedMonth}`,
  ].filter(Boolean).join(" | ");

  return `Expert Indian travel planner. Output ONLY valid JSON, no markdown.
Trip: ${trip.title} | Days: ${trip.days}${extras ? ` | ${extras}` : ""}

Return exactly this JSON structure (${trip.days} days):
{"title":"${trip.title}","destination":"${trip.country || trip.title}","overview":"<2 sentences>","bestTimeToVisit":"<months>","totalBudgetEstimate":"<INR range>","tags":["t1","t2","t3"],"days":[{"dayNumber":1,"title":"<day title>","summary":"<1 sentence>","activities":[{"time":"9:00 AM","title":"<name>","description":"<detail>","notes":"<tip>","type":"transport|accommodation|food|activity|sightseeing","location":{"name":"<place>","lat":0.0,"lng":0.0}}]}]}

Rules: 4-6 activities/day with times. 1 meal+dish name/day. Transport & accommodation each night. Name real places. Exactly ${trip.days} days. JSON only.`;
}

// ─────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────

/**
 * POST /api/admin/trips/[slug]/generate
 * Triggers LLM generation of a full itinerary for an existing draft trip.
 */
export async function POST(_req: NextRequest, ctx: RouteContext) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { slug } = await ctx.params;
  const trip = await getTripBySlug(slug);
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 });

  // Compute number of days from dates, or fallback to 5
  let numDays = 5;
  if (trip.startDate && trip.endDate) {
    const diff =
      Math.ceil(
        (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    if (diff > 0 && diff <= 30) numDays = diff;
  }

  // Mark as generating
  await updateTrip(slug, { generationStatus: "generating" });

  const tripMeta: TripMeta = {
    title: trip.title,
    country: trip.country,
    tripType: trip.tripType,
    bestSuggestedMonth: trip.bestSuggestedMonth,
    startDate: trip.startDate,
    endDate: trip.endDate,
    excerpt: trip.excerpt,
    days: numDays,
  };

  const providersToTry: ("gemini" | "nvidia" | "groq" | "openai")[] = [
    "gemini",
    "nvidia",
    "groq",
    "openai",
  ];

  let generatedData: GeneratedItinerary | null = null;
  let lastError: unknown = null;
  let modelUsed = "";

  for (const provider of providersToTry) {
    try {
      const prompt =
        provider === "groq" ? buildGroqPrompt(tripMeta) : buildPrompt(tripMeta);

      let rawResponse = "";
      if (provider === "nvidia") {
        rawResponse = await LLMService.generateContent(prompt, {
          model: "nvidia",
          jsonMode: true,
        });
        modelUsed = "NVIDIA";
      } else if (provider === "groq") {
        rawResponse = await LLMService.generateContent(prompt, {
          model: "groq",
          jsonMode: true,
        });
        modelUsed = "Groq";
      } else if (provider === "openai") {
        rawResponse = await LLMService.generateContent(prompt, {
          model: "openai",
          jsonMode: true,
        });
        modelUsed = "OpenAI";
      } else {
        rawResponse = await LLMService.generateContent(prompt, {
          model: "gemini",
          jsonMode: true,
        });
        modelUsed = "Google Gemini";
      }

      let parsed: GeneratedItinerary;
      try {
        parsed = JSON.parse(rawResponse) as GeneratedItinerary;
      } catch {
        const match = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) {
          parsed = JSON.parse(match[1]) as GeneratedItinerary;
        } else {
          throw new Error(`[${provider}] Could not parse AI response as JSON.`);
        }
      }

      if (!parsed.days || !Array.isArray(parsed.days)) {
        throw new Error(`[${provider}] AI response missing 'days' array.`);
      }

      generatedData = parsed;
      break;
    } catch (err) {
      console.warn(
        `[admin/generate] Provider '${provider}' failed:`,
        err instanceof Error ? err.message : err
      );
      lastError = err;
    }
  }

  if (!generatedData) {
    await updateTrip(slug, { generationStatus: "failed" });
    const msg =
      lastError instanceof Error ? lastError.message : "All AI providers failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  // Convert generated days into ItineraryDay format
  const itinerary: ItineraryDay[] = generatedData.days.map((day: GeneratedDay) => ({
    _key: `gen-day-${day.dayNumber}-${randomUUID().slice(0, 6)}`,
    dayNumber: day.dayNumber,
    title: day.title,
    summary: day.summary,
    activities: (day.activities || []).map(
      (act: GeneratedActivity, idx: number) => {
        const activity: Activity = {
          _key: `act-${day.dayNumber}-${idx}-${randomUUID().slice(0, 4)}`,
          title: act.title,
          time: act.time,
          description: act.description,
          notes: act.notes,
          type: act.type as Activity["type"],
          location: act.location
            ? {
                name: act.location.name,
                lat: act.location.lat,
                lng: act.location.lng,
              }
            : undefined,
        };
        return activity;
      }
    ),
  }));

  // Parse budget estimate to a number
  let parsedBudget: number | undefined = trip.totalBudget;
  if (generatedData.totalBudgetEstimate && !parsedBudget) {
    const budgetMatch = generatedData.totalBudgetEstimate.match(/[\d,]+/);
    if (budgetMatch) {
      parsedBudget = parseInt(budgetMatch[0].replace(/,/g, ""), 10);
    }
  }

  // Merge AI-generated fields back into the trip
  const updatedTrip = await updateTrip(slug, {
    itinerary,
    generationStatus: "complete",
    bestSuggestedMonth:
      generatedData.bestTimeToVisit || trip.bestSuggestedMonth,
    tags: generatedData.tags?.length ? generatedData.tags : trip.tags,
    totalBudget: parsedBudget,
    excerpt: trip.excerpt || generatedData.overview || "",
  });

  return NextResponse.json({
    success: true,
    trip: updatedTrip,
    modelUsed,
    daysGenerated: itinerary.length,
  });
}
