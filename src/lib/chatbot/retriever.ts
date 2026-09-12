import { getKnowledgeCorpus } from "./corpus";
import type { KnowledgeChunk, PageContext, RetrievalResult } from "./types";

/**
 * Tokenize and normalize query strings for lexical/TF-IDF similarity scoring.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/**
 * Score a document chunk against a set of search tokens.
 * Applies boosts for title matches, slug matches, tag matches, and exact phrase occurrences.
 */
function scoreChunk(chunk: KnowledgeChunk, query: string, tokens: string[]): number {
  if (tokens.length === 0) return 0;

  const titleLower = chunk.title.toLowerCase();
  const contentLower = chunk.content.toLowerCase();
  const slugLower = (chunk.slug || "").toLowerCase();
  const queryLower = query.toLowerCase().trim();

  let score = 0;

  // Exact full-query phrase match boost
  if (queryLower.length > 3 && contentLower.includes(queryLower)) {
    score += 8.0;
  }
  if (queryLower.length > 3 && titleLower.includes(queryLower)) {
    score += 15.0;
  }

  // Token frequency & position weighting
  for (const token of tokens) {
    if (slugLower.includes(token)) {
      score += 6.0;
    }
    if (titleLower.includes(token)) {
      score += 4.0;
    }
    if (chunk.metadata?.tags && Array.isArray(chunk.metadata.tags)) {
      if (chunk.metadata.tags.some((tag: string) => tag.toLowerCase().includes(token))) {
        score += 3.5;
      }
    }

    // Count occurrences in content (with diminishing returns / sublinear scaling)
    let pos = 0;
    let occurrences = 0;
    while ((pos = contentLower.indexOf(token, pos)) !== -1) {
      occurrences++;
      pos += token.length;
      if (occurrences > 5) break;
    }
    if (occurrences > 0) {
      score += Math.log(1 + occurrences) * 1.5;
    }
  }

  // Boost overview chunks so high-level budget/season/duration are prioritized
  if (chunk.id.startsWith("trip-overview-")) {
    score += 4.0;
  }

  return score;
}

/**
 * Retrieve knowledge chunks grounded in the user's query and active page context.
 */
export function retrieveKnowledge(query: string, pageContext?: PageContext, topK = 5): RetrievalResult {
  const corpus = getKnowledgeCorpus();
  const queryTokens = tokenize(query);

  let prioritizedEntity: KnowledgeChunk | undefined;
  const contextChunks: KnowledgeChunk[] = [];
  const selectedIds = new Set<string>();

  // 1. Prioritize entity if on a trip or region page
  if (pageContext?.entitySlug) {
    const targetSlug = pageContext.entitySlug.toLowerCase();
    
    // Find matching primary overview chunk for this trip/region
    const primaryChunk = corpus.find(
      (c) =>
        c.slug?.toLowerCase() === targetSlug &&
        (c.id.startsWith("trip-overview-") || c.id.startsWith("region-"))
    );

    if (primaryChunk) {
      prioritizedEntity = primaryChunk;
      contextChunks.push(primaryChunk);
      selectedIds.add(primaryChunk.id);

      // Also add itinerary days chunks for this trip
      const relatedChunks = corpus.filter(
        (c) => c.slug?.toLowerCase() === targetSlug && !selectedIds.has(c.id)
      );
      for (const rel of relatedChunks) {
        contextChunks.push(rel);
        selectedIds.add(rel.id);
      }
    }
  } else if (pageContext?.route) {
    // If on a static page (e.g. /about, /weather, /contact, /ai-planner, /import)
    const matchedPage = corpus.find((c) => c.sourceType === "page" && c.url === pageContext.route);
    if (matchedPage && !selectedIds.has(matchedPage.id)) {
      prioritizedEntity = matchedPage;
      contextChunks.push(matchedPage);
      selectedIds.add(matchedPage.id);
    }
  }

  // 2. Score all remaining chunks against the user query
  const scoredChunks = corpus
    .filter((c) => !selectedIds.has(c.id))
    .map((chunk) => ({
      chunk,
      score: scoreChunk(chunk, query, queryTokens),
    }))
    .filter((item) => item.score > 0.5)
    .sort((a, b) => b.score - a.score);

  // Take top-K from similarity search
  for (const item of scoredChunks.slice(0, topK)) {
    contextChunks.push(item.chunk);
    selectedIds.add(item.chunk.id);

    // If a trip days chunk matched, make sure its overview is also included
    if (item.chunk.sourceType === "trip" && item.chunk.slug) {
      const overviewId = `trip-overview-${item.chunk.slug}`;
      if (!selectedIds.has(overviewId)) {
        const overviewChunk = corpus.find((c) => c.id === overviewId);
        if (overviewChunk) {
          contextChunks.unshift(overviewChunk);
          selectedIds.add(overviewId);
        }
      }
    }
  }

  // If query is broad or empty (or nothing scored well), ensure at least general overview chunks exist
  if (contextChunks.length === 0) {
    const fallback = corpus.filter((c) => c.sourceType === "page").slice(0, 3);
    for (const fb of fallback) {
      contextChunks.push(fb);
    }
  }

  return {
    chunks: contextChunks,
    prioritizedEntity,
  };
}

/**
 * Formats retrieved chunks into a clean context block for the system prompt.
 */
export function formatRetrievedContext(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) {
    return "No matching content found in the app.";
  }

  return chunks
    .map((chunk, idx) => {
      const header = `[SOURCE ${idx + 1}: ${chunk.title} | ${chunk.url}]`;
      return `${header}\n${chunk.content}`;
    })
    .join("\n\n---\n\n");
}
