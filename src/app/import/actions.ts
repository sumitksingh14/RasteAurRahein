"use server";

import { ImportService, ImportSegment, ImportResult } from "@/lib/services/ImportService";
import { SuggestionService, Suggestion } from "@/lib/services/SuggestionService";

// For v1 we focus on Paste Text, and we accept string content.
export async function parseItineraryAction(source: "paste_text" | "pdf", content: string): Promise<ImportResult> {
  return await ImportService.parseItinerary(source, content);
}

export async function confirmImportAction(tripId: string, segments: ImportSegment[]) {
  return await ImportService.confirmImport(tripId, segments);
}

export async function getSuggestionsAction(tripId: string, segments: ImportSegment[]): Promise<{ suggestions: Suggestion[] }> {
  return await SuggestionService.getSuggestions(tripId, segments);
}
