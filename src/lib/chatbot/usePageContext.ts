"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { PageContext } from "./types";

export interface PageContextWithPrompts extends PageContext {
  suggestedPrompts: string[];
}

export function usePageContext(): PageContextWithPrompts {
  const pathname = usePathname() || "/";

  return useMemo(() => {
    let entityType: "trip" | "region" | "page" = "page";
    let entitySlug: string | null = null;
    let suggestedPrompts: string[] = [];

    if (pathname.startsWith("/trips/")) {
      entityType = "trip";
      entitySlug = pathname.replace("/trips/", "").split("/")[0] || null;
      suggestedPrompts = [
        "What's the best season for this trip?",
        "What is the total estimated budget?",
        "What are the key stops and highlights?",
        "Are there other trips in this region?",
      ];
    } else if (pathname.startsWith("/regions/")) {
      entityType = "region";
      entitySlug = pathname.replace("/regions/", "").split("/")[0] || null;
      suggestedPrompts = [
        "What trips are documented in this region?",
        "When is the best time of year to visit?",
        "What terrain and roads should I expect?",
      ];
    } else if (pathname === "/ai-planner") {
      suggestedPrompts = [
        "What parameters can I customize in the AI Planner?",
        "Can I plan a trip with specific dietary requirements?",
        "Does the planner suggest realistic budgets?",
      ];
    } else if (pathname === "/import") {
      suggestedPrompts = [
        "What formats can I import here?",
        "How do I import a Google My Maps route?",
        "Can I upload GPX files from Strava or Garmin?",
      ];
    } else if (pathname === "/weather") {
      suggestedPrompts = [
        "When are high Himalayan passes open?",
        "When is the best monsoon season in the Western Ghats?",
        "What is the best winter desert circuit?",
      ];
    } else if (pathname === "/about") {
      suggestedPrompts = [
        "Who founded Raste Aur Raahein?",
        "What is the travel philosophy of this blog?",
        "How are the itineraries documented?",
      ];
    } else if (pathname === "/contact") {
      suggestedPrompts = [
        "How do I submit or suggest a new route?",
        "Can I download GPX files for routes?",
        "How do I get in touch with Sumit?",
      ];
    } else {
      // Default / Home
      suggestedPrompts = [
        "Recommend a high-altitude road trip",
        "What are the best monsoon trips?",
        "How does the AI Trip Planner work?",
        "Tell me about Raste Aur Raahein",
      ];
    }

    return {
      route: pathname,
      entityType,
      entitySlug,
      suggestedPrompts,
    };
  }, [pathname]);
}
