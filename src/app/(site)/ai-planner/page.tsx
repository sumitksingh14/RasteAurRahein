import type { Metadata } from "next";
import AIPlanner from "./AIPlanner";

export const metadata: Metadata = {
  title: "AI Itinerary Planner",
  description:
    "Craft your perfect Indian adventure with AI. Describe your dream trip and get a personalised, day-by-day itinerary in seconds.",
};

export default function AIPlannerPage() {
  return <AIPlanner />;
}
