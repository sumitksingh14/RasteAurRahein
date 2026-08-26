"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
  /** Show the visible accordion UI (default true) */
  showAccordion?: boolean;
}

/**
 * Dual-purpose component:
 *  1. Injects FAQPage JSON-LD for Google rich snippets.
 *  2. Renders a styled accordion FAQ section on the page.
 */
export default function FAQSchema({ items, showAccordion = true }: FAQSchemaProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx((prev) => (prev === idx ? null : idx));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visible accordion */}
      {showAccordion && items.length > 0 && (
        <section style={{ marginTop: "2.5rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "1rem",
            }}
          >
            ✦ Frequently Asked Questions
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            Quick Answers
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {items.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: "1px solid",
                    borderColor: isOpen ? "var(--border-accent)" : "var(--border)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    background: isOpen ? "var(--bg-card)" : "var(--bg-secondary)",
                    transition: "all var(--transition)",
                  }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: isOpen ? "var(--accent-gold)" : "var(--text-primary)",
                        fontFamily: "var(--font-sans)",
                        lineHeight: 1.4,
                        transition: "color var(--transition)",
                      }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        color: "var(--text-muted)",
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform var(--transition)",
                      }}
                    />
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? "600px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <p
                      style={{
                        padding: "0 1.25rem 1.25rem",
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

/**
 * Helper: auto-generates FAQ items from a trip's structured data.
 * Call this in the trip detail page instead of hardcoding questions.
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
      answer: `This itinerary covers ${durationDays} days. You can compress it to ${Math.max(durationDays - 2, 1)}–${durationDays - 1} days by skipping optional stops, or extend it by adding rest days at key locations.`,
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
