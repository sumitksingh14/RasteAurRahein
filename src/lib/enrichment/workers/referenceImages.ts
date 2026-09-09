/**
 * Reference Images Enrichment Worker (Unsplash API)
 *
 * 1. LLM generates targeted Unsplash search queries from trip metadata.
 * 2. Fetches real photos from the Unsplash API.
 * 3. LLM selects the best 1–3 images from the returned candidates.
 * 4. Validates licensing (all Unsplash photos are freely usable with attribution).
 * 5. Stores images with full attribution as required by Unsplash API guidelines.
 *
 * IMPORTANT: AI-generated images of real places are NEVER used.
 * Only real licensed photographs from Unsplash are stored.
 */

import { LLMService } from "@/lib/services/LLMService";
import type { EnrichedImage, EnrichedImageValue } from "../types";

const ENRICHMENT_LLM = (process.env.ENRICHMENT_LLM_PROVIDER ?? "gemini") as
  | "gemini"
  | "groq"
  | "nvidia"
  | "openai";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE = "https://api.unsplash.com";

interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    regular: string;
    thumb: string;
    small: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  width: number;
  height: number;
}

async function searchUnsplash(
  query: string,
  perPage = 10
): Promise<UnsplashPhoto[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error(
      "UNSPLASH_ACCESS_KEY is not configured. Add it to .env.local."
    );
  }

  const url = new URL(`${UNSPLASH_BASE}/search/photos`);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("Unsplash API rate limit exceeded or invalid key.");
    }
    throw new Error(`Unsplash search failed: ${res.status}`);
  }

  const data = await res.json();
  return (data.results ?? []) as UnsplashPhoto[];
}

interface ImagesWorkerResult {
  value: EnrichedImageValue;
  tokensUsed: number;
}

export async function enrichReferenceImages(
  tripSlug: string,
  tripTitle: string,
  tripCountry: string | undefined,
  tripTags: string[] | undefined,
  locationNames: string[]
): Promise<ImagesWorkerResult> {
  let totalTokens = 0;

  // Step 1: Generate search queries
  const queryPrompt = `
You are a travel photo researcher. Generate 3 specific, high-quality Unsplash search queries
to find beautiful, representative landscape/travel photos for the following trip.

Trip: "${tripTitle}"
Country: ${tripCountry ?? "India"}
Tags: ${(tripTags ?? []).join(", ")}
Key locations: ${locationNames.slice(0, 5).join(", ")}

Rules:
- Make queries specific to the actual geography (e.g. "Pangong Tso lake Ladakh" not just "lake")
- Focus on landscape/scenic queries that would show what a traveller would actually see
- Each query should target a different aspect (landscape, culture, architecture, nature)

Respond ONLY with valid JSON:
{
  "queries": ["<query1>", "<query2>", "<query3>"]
}
`.trim();

  const queryRaw = await LLMService.generateContent(queryPrompt, {
    model: ENRICHMENT_LLM,
    jsonMode: true,
  });
  totalTokens += Math.ceil((queryPrompt.length + queryRaw.length) / 4);

  const queryParsed = JSON.parse(
    queryRaw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim()
  ) as { queries: string[] };

  if (!Array.isArray(queryParsed.queries) || queryParsed.queries.length === 0) {
    throw new Error("LLM returned invalid search queries shape");
  }

  // Step 2: Search Unsplash for each query
  const allPhotos: (UnsplashPhoto & { query: string })[] = [];
  for (const query of queryParsed.queries.slice(0, 3)) {
    try {
      const photos = await searchUnsplash(query, 5);
      allPhotos.push(...photos.map((p) => ({ ...p, query })));
    } catch (err) {
      console.warn(`[images worker] Unsplash query "${query}" failed:`, err);
    }
  }

  if (allPhotos.length === 0) {
    throw new Error("No photos found from Unsplash for the given queries.");
  }

  // Step 3: LLM selects best 1–3 photos from candidates
  const candidateList = allPhotos.map((p, i) => ({
    index: i,
    id: p.id,
    description: p.description ?? p.alt_description ?? "(no description)",
    width: p.width,
    height: p.height,
    aspectRatio: (p.width / p.height).toFixed(2),
    query: p.query,
  }));

  const selectionPrompt = `
You are a travel content editor. From the following Unsplash photo candidates, select the
best 1 to 3 images for the trip "${tripTitle}".

Choose photos that:
- Are clearly landscape/scenic orientation (aspectRatio > 1.0)
- Are most relevant to the actual trip destinations
- Represent variety (not all the same subject)
- Have descriptive alt text (not empty)

Candidates:
${JSON.stringify(candidateList, null, 2)}

Respond ONLY with valid JSON:
{
  "selected": [<index>, <index>],
  "reasoning": "<brief reason>"
}
`.trim();

  const selectionRaw = await LLMService.generateContent(selectionPrompt, {
    model: ENRICHMENT_LLM,
    jsonMode: true,
  });
  totalTokens += Math.ceil((selectionPrompt.length + selectionRaw.length) / 4);

  const selectionParsed = JSON.parse(
    selectionRaw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim()
  ) as { selected: number[]; reasoning: string };

  if (!Array.isArray(selectionParsed.selected)) {
    throw new Error("LLM returned invalid photo selection shape");
  }

  // Step 4: Build final image records with attribution
  const selectedPhotos = selectionParsed.selected
    .filter((idx) => idx >= 0 && idx < allPhotos.length)
    .slice(0, 3)
    .map((idx) => allPhotos[idx]);

  if (selectedPhotos.length === 0) {
    throw new Error("LLM selected no valid photos.");
  }

  const images: EnrichedImage[] = selectedPhotos.map((photo) => ({
    url: photo.urls.regular,
    thumbUrl: photo.urls.thumb,
    alt:
      photo.alt_description ??
      photo.description ??
      `Photo from ${tripTitle}`,
    unsplashId: photo.id,
    attribution: {
      photographerName: photo.user.name,
      photographerUrl: photo.user.links.html,
      unsplashUrl: photo.links.html,
    },
  }));

  return {
    value: { images },
    tokensUsed: totalTokens,
  };
}
