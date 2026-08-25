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
  model?: "gemini" | "nvidia";
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

// ---------------------------------------------------------------------------
// Gemini call helper
// ---------------------------------------------------------------------------
async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Add it to .env.local.");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}

// ---------------------------------------------------------------------------
// Nvidia call helper
// ---------------------------------------------------------------------------
async function callNvidia(prompt: string): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY is not configured. Add it to .env.local.");
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  const completion = await openai.chat.completions.create({
    model: "nvidia/nemotron-3.5-lightning-30b-a3b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 8192,
    stream: false,
  } as any);

  const choice = completion.choices[0];
  if (!choice) throw new Error("Nvidia returned no choices.");

  // The model may return reasoning in `reasoning_content` and the actual
  // answer in `content`. Strip any inline <think>…</think> blocks too.
  const raw: string =
    (choice.message as any).content ?? "";

  if (!raw.trim()) throw new Error("Nvidia returned an empty response.");

  // Strip <think>...</think> reasoning blocks that the model sometimes
  // embeds inline before the JSON answer.
  const cleaned = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  return cleaned || raw;
}

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------
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

    const prompt = buildPrompt(body);
    const useNvidia = body.model === "nvidia";
    const modelUsed = useNvidia
      ? "NVIDIA Nemotron 3.5 Lightning"
      : "Google Gemini Flash";
    const raw = useNvidia ? await callNvidia(prompt) : await callGemini(prompt);

    // Parse and validate
    let itinerary: GeneratedItinerary;
    try {
      itinerary = JSON.parse(raw);
    } catch {
      // Sometimes Gemini wraps in markdown code fences despite instructions
      const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        itinerary = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Could not parse AI response as JSON.");
      }
    }

    if (!itinerary.days || !Array.isArray(itinerary.days)) {
      throw new Error("AI response missing 'days' array.");
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
