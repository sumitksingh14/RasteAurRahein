import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 503 });
  }

  try {
    const groq = new Groq({ apiKey });
    const result = await groq.models.list();

    // Return all active models with enough context for itinerary generation
    const models = result.data
      .filter((m: any) => m.active !== false && (m.context_window ?? 0) >= 8192)
      .map((m: any) => ({
        id: m.id as string,
        ownedBy: (m.owned_by ?? "Groq") as string,
        contextWindow: (m.context_window ?? 0) as number,
      }))
      .sort((a: any, b: any) => a.id.localeCompare(b.id));

    return NextResponse.json({ models });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
