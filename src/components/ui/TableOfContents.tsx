"use client";

import { useEffect, useRef, useState } from "react";
import { List } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";

interface TableOfContentsProps {
  days: ItineraryDay[];
}

/**
 * Sticky table of contents that links to each day's accordion heading.
 * Active day highlights as the user scrolls (IntersectionObserver).
 * Collapses to a compact toggle on mobile.
 */
export default function TableOfContents({ days }: TableOfContentsProps) {
  const [activeDay, setActiveDay] = useState<number | null>(
    days.length > 0 ? days[0].dayNumber : null
  );
  const [collapsed, setCollapsed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!days.length) return;

    const targets = days
      .map((d) => document.getElementById(`itinerary-day-${d.dayNumber}`))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          const dayNum = parseInt(id.replace("itinerary-day-", ""), 10);
          if (!isNaN(dayNum)) setActiveDay(dayNum);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [days]);

  const scrollToDay = (dayNumber: number) => {
    const el = document.getElementById(`itinerary-day-${dayNumber}`);
    if (!el) return;
    const navHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--nav-height"
        )
      ) || 64;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!days.length) return null;

  return (
    <div
      className="glass-card"
      style={{ padding: "1.25rem", marginBottom: "1.5rem" }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: collapsed ? 0 : "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          <List size={13} />
          Itinerary
        </div>
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▲
        </span>
      </button>

      {/* Day links */}
      {!collapsed && (
        <nav aria-label="Itinerary table of contents">
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
            {days.map((day) => {
              const isActive = activeDay === day.dayNumber;
              return (
                <li key={day._key}>
                  <button
                    onClick={() => scrollToDay(day.dayNumber)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "var(--radius-sm)",
                      background: isActive ? "var(--accent-gold-dim)" : "transparent",
                      border: "1px solid",
                      borderColor: isActive ? "var(--border-accent)" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all var(--transition)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: isActive ? "var(--accent-gold)" : "var(--text-muted)",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.04em",
                        minWidth: 36,
                      }}
                    >
                      Day {day.dayNumber}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: isActive ? "var(--accent-gold)" : "var(--text-secondary)",
                        fontWeight: isActive ? 600 : 400,
                        lineHeight: 1.35,
                      }}
                    >
                      {day.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
