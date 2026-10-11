import type { QuickFacts, Trip } from "@/lib/types";

// Icon map — lightweight SVG inline, no extra dependency
const ICONS: Record<string, string> = {
  bestTime: "🗓️",
  durationDays: "⏱️",
  budgetRange: "💰",
  difficulty: "📈",
  nearestTown: "🏘️",
  baseLocation: "📍",
  idealFor: "👥",
  permitsRequired: "🪪",
  altitude: "⛰️",
  roadCondition: "🛣️",
  mobileNetwork: "📶",
};

const LABELS: Record<keyof QuickFacts, string> = {
  bestTime: "Best Time to Visit",
  durationDays: "Duration",
  budgetRange: "Budget (per person)",
  difficulty: "Difficulty",
  nearestTown: "Nearest Town",
  baseLocation: "Starting Point",
  idealFor: "Ideal For",
  permitsRequired: "Permits Required",
  altitude: "Max Altitude",
  roadCondition: "Road Condition",
  mobileNetwork: "Mobile Network",
};

const ESSENTIAL_KEYS: (keyof QuickFacts)[] = [
  "durationDays",
  "budgetRange",
  "bestTime",
  "altitude",
  "permitsRequired",
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#16a34a",
  Moderate: "#d97706",
  Hard: "#dc2626",
  Extreme: "#7c3aed",
};

interface QuickFactsBoxProps {
  quickFacts: QuickFacts;
  /** Optional — used to fill in bestTime/durationDays from top-level trip fields as fallback */
  trip?: Pick<Trip, "bestSuggestedMonth" | "itinerary" | "difficulty" | "totalBudget">;
}

/**
 * QuickFactsBox — renders a scannable, grid-based fact sheet at the top of
 * every trip article, below the title and above the prose body.
 *
 * Requirements:
 * - 5 essentials up front: duration, budget, best season, max altitude, permits.
 * - Remaining facts behind a "More details" disclosure.
 * - Pulls values strictly from trip data fields; no hard-coded text.
 */
export default function QuickFactsBox({ quickFacts, trip }: QuickFactsBoxProps) {
  // Merge fallbacks from top-level trip fields strictly when available in the trip data
  const facts: QuickFacts = {
    ...quickFacts,
    bestTime: quickFacts.bestTime ?? trip?.bestSuggestedMonth,
    durationDays: quickFacts.durationDays ?? trip?.itinerary?.length,
    budgetRange:
      quickFacts.budgetRange ??
      (trip?.totalBudget ? `₹${trip.totalBudget.toLocaleString()} per person` : undefined),
    difficulty: quickFacts.difficulty ?? trip?.difficulty,
  };

  // 1. Five essentials up front
  const essentialRows = ESSENTIAL_KEYS.filter(
    (k) => facts[k] !== undefined && facts[k] !== null && facts[k] !== ""
  );

  // 2. Remaining facts for "More details" disclosure
  const secondaryRows = (Object.keys(LABELS) as Array<keyof QuickFacts>).filter(
    (k) =>
      !ESSENTIAL_KEYS.includes(k) &&
      facts[k] !== undefined &&
      facts[k] !== null &&
      facts[k] !== ""
  );

  if (essentialRows.length === 0 && secondaryRows.length === 0) return null;

  const renderFactItem = (key: keyof QuickFacts) => {
    const value = facts[key];
    const isDifficulty = key === "difficulty";
    const diffColor = isDifficulty ? (DIFFICULTY_COLORS[value as string] ?? "#374151") : undefined;

    return (
      <div
        key={key}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.625rem",
          padding: "0.875rem 1.25rem",
          borderBottom: "1px solid var(--border, #e5e7eb)",
        }}
      >
        <span
          style={{ fontSize: "1.1rem", lineHeight: 1, marginTop: "1px", flexShrink: 0 }}
          aria-hidden="true"
        >
          {ICONS[key] ?? "•"}
        </span>
        <div>
          <dt
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--text-muted, #6b7280)",
              marginBottom: "0.2rem",
            }}
          >
            {LABELS[key]}
          </dt>
          <dd
            style={{
              margin: 0,
              color: isDifficulty ? diffColor : "var(--text-primary, #111827)",
              fontWeight: isDifficulty ? 700 : 600,
              lineHeight: 1.4,
            }}
          >
            {key === "durationDays" ? `${value} days` : String(value)}
          </dd>
        </div>
      </div>
    );
  };

  return (
    <aside
      aria-label="Quick Facts"
      style={{
        margin: "2rem 0",
        borderRadius: "1rem",
        border: "1px solid var(--border)",
        background: "var(--bg-secondary, #f9fafb)",
        overflow: "hidden",
        fontSize: "0.875rem",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.75rem 1.25rem",
          background: "linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Quick Facts
      </div>

      {/* Grid of Essential Facts (up front) */}
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
          gap: 0,
          margin: 0,
          padding: 0,
        }}
      >
        {essentialRows.map(renderFactItem)}
      </dl>

      {/* Remaining facts behind "More details" disclosure */}
      {secondaryRows.length > 0 && (
        <details
          className="quick-facts-disclosure"
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <summary
            style={{
              padding: "0.75rem 1.25rem",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--accent-gold, #FEBB02)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              userSelect: "none",
              outline: "none",
            }}
          >
            <span>More details ({secondaryRows.length} additional facts)</span>
            <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>▼</span>
          </summary>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
              gap: 0,
              margin: 0,
              padding: 0,
              borderTop: "1px solid var(--border)",
              background: "var(--bg-secondary)",
            }}
          >
            {secondaryRows.map(renderFactItem)}
          </dl>
        </details>
      )}

      {/* Footer disclaimer */}
      <p
        style={{
          margin: 0,
          padding: "0.5rem 1.25rem",
          fontSize: "0.68rem",
          color: "var(--text-muted, #9ca3af)",
          borderTop: "1px solid var(--border, #e5e7eb)",
          fontStyle: "italic",
        }}
      >
        Field-verified data · Budgets are per-person estimates · Conditions vary seasonally
      </p>
    </aside>
  );
}
