/**
 * Pure helper — no React, no "use client".
 * Can be safely imported from Server Components.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Auto-generates FAQ items from a trip's structured data fields.
 * Call from the server component and pass the result as the `items` prop to FAQSchema.
 */
export function buildTripFAQ({
  title,
  bestSuggestedMonth,
  totalBudget,
  startDate,
  endDate,
  country,
  tripType,
}: {
  title: string;
  bestSuggestedMonth?: string;
  totalBudget?: number;
  startDate?: string;
  endDate?: string;
  country?: string;
  tripType?: string;
}): FAQItem[] {
  const items: FAQItem[] = [];

  const durationDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : null;

  if (bestSuggestedMonth) {
    items.push({
      question: `When is the best time to visit for a ${title.split("—")[0].trim()} trip?`,
      answer: `The best time to visit is ${bestSuggestedMonth}. Weather and road conditions vary significantly by season — check the itinerary notes for season-specific advice.`,
    });
  }

  if (durationDays) {
    items.push({
      question: `How many days do you need for ${title.split("—")[0].trim()}?`,
      answer: `This itinerary covers ${durationDays} days. You can compress it to ${Math.max(
        durationDays - 2,
        1
      )}–${durationDays - 1} days by skipping optional stops, or extend it by adding rest days at key locations.`,
    });
  }

  if (totalBudget) {
    items.push({
      question: `What is the approximate budget for this trip?`,
      answer: `The estimated budget for this trip is ₹${totalBudget.toLocaleString()} for a group of 2–4 people, covering accommodation, fuel, food, and entry fees. Solo travellers should budget roughly 20–30% more.`,
    });
  }

  if (tripType) {
    items.push({
      question: `Is this trip suitable for beginners?`,
      answer: `This is classified as a${tripType === "Adventure" ? "n adventure" : ""} ${tripType.toLowerCase()} trip. ${
        tripType === "Adventure"
          ? "Some sections require prior experience or a reliable 4WD vehicle. Read the route notes carefully before booking."
          : "It is suitable for most travellers with basic fitness and planning."
      }`,
    });
  }

  if (country) {
    items.push({
      question: `Do I need a permit or special documentation?`,
      answer: `Permit requirements depend on the specific route. Check the itinerary notes for each day — restricted areas in ${country} may require Inner Line Permits (ILP) or Protected Area Permits (PAP) obtained in advance.`,
    });
  }

  return items;
}
