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
// NVIDIA model catalogue
// ---------------------------------------------------------------------------
interface NvidiaModelConfig {
  id: string;
  label: string;
  streaming: boolean;
  maxTokens: number;
  extraParams?: Record<string, unknown>;
}

const NVIDIA_MODELS: NvidiaModelConfig[] = [
  {
    id: "nvidia/nemotron-3.5-lightning-30b-a3b",
    label: "Nemotron 3.5 Lightning (30B)",
    streaming: false,
    maxTokens: 8192,
  },
  {
    id: "nvidia/nemotron-3-ultra-550b-a55b",
    label: "Nemotron Ultra (550B)",
    streaming: true,
    maxTokens: 16384,
    extraParams: { chat_template_kwargs: { enable_thinking: true } },
  },
  {
    id: "deepseek-ai/deepseek-v4-flash-0731",
    label: "DeepSeek v4 Flash",
    streaming: false,
    maxTokens: 16384,
    extraParams: { chat_template_kwargs: { thinking: true, reasoning_effort: "high" } },
  },
  {
    id: "nvidia/nemotron-3-nano-30b-a3b",
    label: "Nemotron Nano (30B)",
    streaming: true,
    maxTokens: 16384,
    extraParams: { reasoning_budget: 16384 },
  },
  {
    id: "nvidia/nemotron-3-super-120b-a12b",
    label: "Nemotron Super (120B)",
    streaming: true,
    maxTokens: 16384,
    extraParams: { chat_template_kwargs: { enable_thinking: true } },
  },
];

const DEFAULT_NVIDIA_MODEL_ID = NVIDIA_MODELS[0].id;

// ---------------------------------------------------------------------------
// Nvidia call helper (supports streaming + per-model extra params)
// ---------------------------------------------------------------------------
async function callNvidia(prompt: string, modelId: string = DEFAULT_NVIDIA_MODEL_ID): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY is not configured. Add it to .env.local.");
  }

  const config = NVIDIA_MODELS.find((m) => m.id === modelId) ?? NVIDIA_MODELS[0];

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  const baseParams = {
    model: config.id,
    messages: [{ role: "user" as const, content: prompt }],
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: config.maxTokens,
    ...(config.extraParams ?? {}),
  };

  let raw: string;

  if (config.streaming) {
    // Collect streaming chunks into a single string
    const stream = await openai.chat.completions.create({
      ...baseParams,
      stream: true,
    } as any);

    const parts: string[] = [];
    for await (const chunk of stream as any) {
      const delta = chunk.choices?.[0]?.delta;
      // Prefer content over reasoning_content (we only want the answer JSON)
      const piece: string = delta?.content ?? "";
      if (piece) parts.push(piece);
    }
    raw = parts.join("");
  } else {
    const completion = await openai.chat.completions.create({
      ...baseParams,
      stream: false,
    } as any);

    const choice = completion.choices[0];
    if (!choice) throw new Error("Nvidia returned no choices.");
    raw = (choice.message as any).content ?? "";
  }

  if (!raw.trim()) throw new Error("Nvidia returned an empty response.");

  // Strip <think>...</think> reasoning blocks embedded inline before the JSON
  const cleaned = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  return cleaned || raw;
}

// ---------------------------------------------------------------------------
// Groq call helper
// ---------------------------------------------------------------------------
async function callGroq(prompt: string, modelId: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured. Add it to .env.local.");
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const completion = await openai.chat.completions.create({
    model: modelId,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    // GROQ free tier: 8 000 TPM total (input + output).
    // Keep output budget low so the prompt itself (≈2 500–3 500 tokens)
    // plus the completion stays under the limit.
    max_tokens: 4096,
    stream: false,
  });

  const text = completion.choices[0]?.message?.content;
  if (!text?.trim()) throw new Error("Groq returned an empty response.");

  // Strip any accidental <think>...</think> blocks
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim() || text;
}

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
        let raw = "";
        let currentModelLabel = "";

        if (provider === "nvidia") {
          const nvidiaModelId = body.nvidiaModel ?? DEFAULT_NVIDIA_MODEL_ID;
          raw = await callNvidia(buildPrompt(body), nvidiaModelId);
          const cfg = NVIDIA_MODELS.find((m) => m.id === nvidiaModelId) ?? NVIDIA_MODELS[0];
          currentModelLabel = `NVIDIA · ${cfg.label}`;
        } else if (provider === "groq") {
          const groqModelId = body.groqModel ?? "openai/gpt-oss-20b";
          raw = await callGroq(buildGroqPrompt(body), groqModelId);
          const shortName = groqModelId.includes("/")
            ? groqModelId.split("/").pop()!
            : groqModelId;
          currentModelLabel = `Groq · ${shortName}`;
        } else {
          raw = await callGemini(buildPrompt(body));
          currentModelLabel = "Google Gemini Flash";
        }

        // Parse and validate
        let parsed: GeneratedItinerary;
        try {
          parsed = JSON.parse(raw);
        } catch {
          // Sometimes models wrap in markdown code fences despite instructions
          const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
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
