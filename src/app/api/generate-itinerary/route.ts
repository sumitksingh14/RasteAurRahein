import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";

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
  /** Number of travelers */
  travelers?: number;
  pace?: "relaxed" | "moderate" | "packed";
  transportMode?: "self-drive" | "public-transport" | "flights" | "mixed";
  dietary?: "no-preference" | "vegetarian" | "vegan" | "jain" | "non-vegetarian";
  /** Free-text places/things to avoid */
  avoid?: string;
  model?: "gemini" | "nvidia" | "groq" | "openai";
  /** The specific NVIDIA model ID when model === "nvidia" */
  nvidiaModel?: string;
  /** The specific GROQ model ID when model === "groq" */
  groqModel?: string;
  /** The specific OpenAI model ID when model === "openai" */
  openaiModel?: string;
  /** If true, respond with NDJSON streamed progressively instead of a single JSON payload */
  stream?: boolean;
  /** User's detected or typed starting location (city / area) */
  origin?: string;
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

import { LLMService } from "@/lib/services/LLMService";

// Shared free-text preference lines appended to every prompt variant.
function buildPreferenceLines(req: GenerateRequest): string {
  const lines: string[] = [];
  if (req.origin) lines.push(`Starting from: ${req.origin} (plan the first day's travel from this origin)`);
  if (req.budget) lines.push(`Budget: ${req.budget}`);
  if (req.travelers && req.travelers > 0) {
    lines.push(`Travelers: ${req.travelers} ${req.travelers === 1 ? "person" : "people"}`);
  }
  if (req.pace) lines.push(`Pace: ${req.pace} (relaxed = fewer stops/day, packed = maximize activities)`);
  if (req.transportMode) lines.push(`Transport mode: ${req.transportMode}`);
  if (req.dietary && req.dietary !== "no-preference") lines.push(`Dietary requirement: ${req.dietary}`);
  if (req.highlights) lines.push(`Must-see / highlights: ${req.highlights}`);
  if (req.avoid) lines.push(`Avoid: ${req.avoid}`);
  return lines.map((l) => `- ${l}`).join("\n");
}

// Full prompt — used by Gemini & NVIDIA (no token-rate limits)
function buildPrompt(req: GenerateRequest): string {
  return `You are an expert Indian travel planner with deep knowledge of destinations across India and Southeast Asia.

Create a detailed, realistic day-by-day travel itinerary based on these inputs:
- Destination: ${req.destination}
- Duration: ${req.days} days
- Travel Style: ${req.style}
- Travel Month: ${req.month}
${buildPreferenceLines(req)}

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
- Respect the stated pace, dietary, transport and avoid preferences if given
- Generate exactly ${req.days} days

Return ONLY the JSON object, nothing else.`;
}

// Compact prompt — used by Groq (free tier: 8 000 TPM). Same schema,
// ~50% fewer tokens so input + 4 096 output stays under the cap.
function buildGroqPrompt(req: GenerateRequest): string {
  const extras = [
    req.origin && `Starting from: ${req.origin}`,
    req.budget && `Budget: ${req.budget}`,
    req.travelers && req.travelers > 0 && `Travelers: ${req.travelers}`,
    req.pace && `Pace: ${req.pace}`,
    req.transportMode && `Transport: ${req.transportMode}`,
    req.dietary && req.dietary !== "no-preference" && `Diet: ${req.dietary}`,
    req.highlights && `Highlights: ${req.highlights}`,
    req.avoid && `Avoid: ${req.avoid}`,
  ].filter(Boolean).join(" | ");

  return `Expert Indian travel planner. Output ONLY valid JSON, no markdown.
Destination: ${req.destination} | Days: ${req.days} | Style: ${req.style} | Month: ${req.month}${extras ? ` | ${extras}` : ""}

Return exactly this JSON structure (${req.days} days):
{"title":"<trip title>","destination":"${req.destination}","overview":"<2 sentences>","bestTimeToVisit":"<months>","totalBudgetEstimate":"<INR range>","tags":["t1","t2","t3"],"days":[{"dayNumber":1,"title":"<day title>","summary":"<1 sentence>","activities":[{"time":"9:00 AM","title":"<name>","description":"<detail>","notes":"<tip>","type":"transport|accommodation|food|activity|sightseeing"}]}]}

Rules: 4-6 activities/day with times. 1 meal+dish name/day. Transport & accommodation each night. Respect stated diet/transport/pace preferences if given. Name real places. Exactly ${req.days} days. JSON only.`;
}

// NDJSON prompt — used for the streaming path so the client can render each
// day as soon as it arrives instead of waiting for the full JSON blob.
function buildStreamPrompt(req: GenerateRequest): string {
  return `You are an expert Indian travel planner with deep knowledge of destinations across India and Southeast Asia.

Create a detailed, realistic day-by-day itinerary for:
- Destination: ${req.destination}
- Duration: ${req.days} days
- Travel Style: ${req.style}
- Travel Month: ${req.month}
${buildPreferenceLines(req)}

CRITICAL OUTPUT FORMAT: Output strict newline-delimited JSON (NDJSON) — exactly one compact JSON object per line, no markdown, no code fences, no commentary, no blank lines, no trailing commas.

Line 1 — trip metadata:
{"type":"meta","title":"<descriptive trip title>","destination":"${req.destination}","overview":"<2-3 sentence overview>","bestTimeToVisit":"<best months>","totalBudgetEstimate":"<INR range>","tags":["tag1","tag2","tag3"]}

Then exactly ${req.days} lines, one per day, in order, each shaped like:
{"type":"day","dayNumber":1,"title":"<short evocative day title>","summary":"<1-2 sentence summary>","activities":[{"time":"9:00 AM","title":"<activity name>","description":"<specific detail — fees, travel time, tips>","notes":"<optional practical tip>","type":"transport|accommodation|food|activity|sightseeing"}]}

Guidelines:
- Each day: 4-7 realistic activities with specific times
- At least one meal recommendation per day with dish names
- Transport details between locations and an accommodation suggestion each night
- Name real hotels, restaurants, viewpoints, trails
- Respect the stated pace, dietary, transport and avoid preferences if given
- Output ONLY the NDJSON lines described above — nothing else`;
}

// Strip <think>...</think> reasoning blocks, holding back any text after an
// unclosed opening tag until its matching close arrives in a later chunk.
function stripUnclosedThink(raw: string): string {
  const withoutClosed = raw.replace(/<think>[\s\S]*?<\/think>/gi, "");
  const openIdx = withoutClosed.search(/<think>/i);
  return openIdx === -1 ? withoutClosed : withoutClosed.slice(0, openIdx);
}

// ---------------------------------------------------------------------------
// Rate limiting — per-user sliding window via Redis (fails open if Redis is
// not configured, so local/demo setups keep working without it)
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 10; // generations per window
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 1 hour

async function checkRateLimit(userId: string): Promise<{ limited: boolean; retryAfterSeconds: number }> {
  try {
    const key = `ratelimit:generate-itinerary:${userId}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    if (count <= RATE_LIMIT_MAX) return { limited: false, retryAfterSeconds: 0 };
    const ttl = await redis.ttl(key);
    return { limited: true, retryAfterSeconds: ttl > 0 ? ttl : RATE_LIMIT_WINDOW_SECONDS };
  } catch (err) {
    console.warn("[generate-itinerary] rate limit check skipped:", err instanceof Error ? err.message : err);
    return { limited: false, retryAfterSeconds: 0 };
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You must be signed in to generate an itinerary." }, { status: 401 });
  }

  const rateLimit = await checkRateLimit(session.userId);
  if (rateLimit.limited) {
    return NextResponse.json(
      {
        error: `You've reached the generation limit (${RATE_LIMIT_MAX}/hour). Try again in ${Math.ceil(
          rateLimit.retryAfterSeconds / 60
        )} min.`,
      },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

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

  if (body.stream) {
    return handleStreamingGenerate(body);
  }

  try {
    const requestedModel = body.model || "gemini";
    const providersToTry = [requestedModel];
    if (requestedModel === "nvidia") providersToTry.push("gemini", "groq", "openai");
    else if (requestedModel === "groq") providersToTry.push("gemini", "nvidia", "openai");
    else if (requestedModel === "openai") providersToTry.push("gemini", "groq", "nvidia");
    else providersToTry.push("groq", "nvidia", "openai");

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
        } else if (provider === "openai") {
          const openaiModelId = body.openaiModel ?? "gpt-4o";
          rawResponse = await LLMService.generateContent(prompt, { model: "openai", specificModelId: openaiModelId, jsonMode: true });
          currentModelLabel = `OpenAI · ${openaiModelId}`;
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

// ---------------------------------------------------------------------------
// Streaming handler — responds with NDJSON (one JSON object per line) so the
// client can render trip metadata and each day as soon as it's generated.
// ---------------------------------------------------------------------------
function handleStreamingGenerate(body: GenerateRequest): Response {
  const requestedModel = body.model || "gemini";
  const providersToTry = [requestedModel];
  if (requestedModel === "nvidia") providersToTry.push("gemini", "groq", "openai");
  else if (requestedModel === "groq") providersToTry.push("gemini", "nvidia", "openai");
  else if (requestedModel === "openai") providersToTry.push("gemini", "groq", "nvidia");
  else providersToTry.push("groq", "nvidia", "openai");

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) => controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      let sentToClient = false;

      for (const provider of providersToTry) {
        try {
          const prompt = buildStreamPrompt(body);
          let generator;
          let modelLabel: string;

          if (provider === "nvidia") {
            const nvidiaModelId = body.nvidiaModel;
            generator = LLMService.generateContentStream(prompt, { model: "nvidia", specificModelId: nvidiaModelId });
            modelLabel = `NVIDIA · ${nvidiaModelId || "default"}`;
          } else if (provider === "groq") {
            const groqModelId = body.groqModel ?? "llama3-70b-8192";
            generator = LLMService.generateContentStream(prompt, { model: "groq", specificModelId: groqModelId });
            modelLabel = `Groq · ${groqModelId}`;
          } else if (provider === "openai") {
            const openaiModelId = body.openaiModel ?? "gpt-4o";
            generator = LLMService.generateContentStream(prompt, { model: "openai", specificModelId: openaiModelId });
            modelLabel = `OpenAI · ${openaiModelId}`;
          } else {
            generator = LLMService.generateContentStream(prompt, { model: "gemini" });
            modelLabel = "Google Gemini Flash";
          }

          // Peek the first chunk before committing to this provider, so a
          // provider that fails immediately can still fall back to the next.
          const first = await generator.next();
          if (first.done) throw new Error(`[${provider}] returned no output.`);

          sentToClient = true;
          send({ type: "model", label: provider !== requestedModel ? `${modelLabel} (Fallback)` : modelLabel });

          let rawBuffer = first.value;
          let processedCleanLen = 0;
          let lineBuffer = "";
          let linesSeen = 0;

          const flush = (finalFlush: boolean) => {
            const clean = stripUnclosedThink(rawBuffer);
            lineBuffer += clean.slice(processedCleanLen);
            processedCleanLen = clean.length;
            const lines = lineBuffer.split("\n");
            lineBuffer = finalFlush ? "" : (lines.pop() ?? "");
            if (finalFlush && lineBuffer.trim()) lines.push(lineBuffer);
            for (const rawLine of lines) {
              const line = rawLine.trim();
              if (!line) continue;
              try {
                send(JSON.parse(line));
                linesSeen++;
              } catch {
                // partial or malformed line — skip it
              }
            }
          };

          flush(false);
          for await (const chunk of generator) {
            rawBuffer += chunk;
            flush(false);
          }
          flush(true);

          if (linesSeen === 0) throw new Error(`[${provider}] produced no parseable output.`);

          send({ type: "done" });
          controller.close();
          return;
        } catch (err) {
          console.warn(`[generate-itinerary:stream] provider '${provider}' failed:`, err instanceof Error ? err.message : err);
          if (sentToClient) {
            // Already streamed partial content for this provider — switching
            // providers now would produce a conflicting result, so bail out.
            send({ type: "error", message: err instanceof Error ? err.message : "Generation failed mid-stream." });
            controller.close();
            return;
          }
          // Otherwise, fall through and try the next provider.
        }
      }

      send({ type: "error", message: "All AI providers failed to generate a valid itinerary." });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
