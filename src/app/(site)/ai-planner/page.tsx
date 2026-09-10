import type { Metadata } from "next";
import AIPlanner from "./AIPlanner";

export const metadata: Metadata = {
  title: "AI Travel Itinerary Planner for India — Raste Aur Raahein",
  description:
    "Craft a personalised day-by-day India travel itinerary with AI. Enter your destination, trip length, and budget — get a complete plan in seconds.",
  alternates: { canonical: "/ai-planner" },
};


export default function AIPlannerPage() {
  return <AIPlanner />;
}
