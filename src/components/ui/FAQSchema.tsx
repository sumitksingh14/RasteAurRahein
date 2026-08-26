"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/lib/faqBuilder";

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

