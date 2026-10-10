import type { QuickFacts } from "./types";

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Auto-generates FAQ items from a trip's structured data fields.
 * Call from the server component and pass the result as the `items` prop to FAQSchema.
 * Generates FAQs strictly when real data is available (permits, best time, difficulty, budget).
 */
export function buildTripFAQ({
  title,
  bestSuggestedMonth,
  totalBudget,
  startDate,
  endDate,
  tripType,
  quickFacts,
  difficulty,
}: {
  title: string;
  bestSuggestedMonth?: string;
  totalBudget?: number;
  startDate?: string;
  endDate?: string;
  country?: string;
  tripType?: string;
  quickFacts?: QuickFacts;
  difficulty?: string;
}): FAQItem[] {
  const items: FAQItem[] = [];
  const cleanTitle = title.split("—")[0].trim();

  // 1. Best Time To Visit
  const bestTime = quickFacts?.bestTime || bestSuggestedMonth;
  if (bestTime) {
    items.push({
      question: `When is the best time to visit for a ${cleanTitle} trip?`,
      answer: `The recommended window is ${bestTime}. Weather and high-altitude road conditions vary significantly across seasons — check route notes before departing.`,
    });
  }

  // 2. Duration / Days
  const durationDays =
    quickFacts?.durationDays ||
    (startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : null);

  if (durationDays) {
    items.push({
      question: `How many days do you need for ${cleanTitle}?`,
      answer: `This itinerary covers ${durationDays} days to ensure safe travel pacing and adequate time at key stops without rushing.`,
    });
  }

  // 3. Permits & Documentation (Only when explicitly specified in quick facts)
  if (quickFacts?.permitsRequired && quickFacts.permitsRequired.trim().length > 0) {
    items.push({
      question: `Are permits required for ${cleanTitle}?`,
      answer: quickFacts.permitsRequired,
    });
  }

  // 4. Budget (Unified with Quick Facts & Card: per-person vs total)
  if (quickFacts?.budgetRange) {
    items.push({
      question: `What is the approximate budget for this trip?`,
      answer: `The estimated cost is ${quickFacts.budgetRange}. This covers accommodation, permits, local transport, and meals. Flights and personal gear are excluded.`,
    });
  } else if (totalBudget) {
    items.push({
      question: `What is the approximate budget for this trip?`,
      answer: `The estimated cost is ₹${totalBudget.toLocaleString("en-IN")} per person (excluding flights), covering accommodation, local fuel/transport, permits, and food.`,
    });
  }

  // 5. Difficulty & Suitability (No 'an adventure adventure' grammar bug; uses real data)
  const effectiveDifficulty = quickFacts?.difficulty || difficulty;
  if (effectiveDifficulty || tripType) {
    const diffDesc = effectiveDifficulty ? `${effectiveDifficulty} difficulty` : `${tripType} journey`;
    const altitudeInfo = quickFacts?.altitude ? ` with a maximum altitude of ${quickFacts.altitude}` : "";
    const idealForInfo = quickFacts?.idealFor ? ` It is best suited for ${quickFacts.idealFor.toLowerCase()}.` : "";
    items.push({
      question: `How difficult is this trip, and who is it ideal for?`,
      answer: `This route is rated as ${diffDesc}${altitudeInfo}.${idealForInfo} Proper hydration and route preparation are recommended.`,
    });
  }

  return items;
}

