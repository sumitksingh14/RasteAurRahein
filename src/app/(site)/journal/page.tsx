import type { Metadata } from "next";
import { getAllFieldNotes } from "@/lib/fieldNotes";
import FieldNoteCard from "@/components/ui/FieldNoteCard";
import type { FieldNoteCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Journal — Field Notes, Gear Reviews & Travel Advisories | Raste Aur Raahein",
  description:
    "In-depth field notes from the road: honest gear reviews, real budget breakdowns, seasonal travel advisories, and trail updates from across India.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal | Raste Aur Raahein",
    description: "Field notes, gear reviews, budget breakdowns and seasonal advisories from real India travel.",
    type: "website",
  },
};

const CATEGORY_LABELS: Record<FieldNoteCategory | "all", string> = {
  all: "All Notes",
  "gear-review": "Gear Reviews",
  "budget-breakdown": "Budget Breakdowns",
  "seasonal-advisory": "Seasonal Advisories",
  "trail-update": "Trail Updates",
  tips: "Tips",
};

export default async function JournalPage() {
  const notes = await getAllFieldNotes();

  const byCat: Partial<Record<FieldNoteCategory, number>> = {};
  for (const n of notes) {
    byCat[n.category] = (byCat[n.category] ?? 0) + 1;
  }

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          padding: "4rem 0 3rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 860 }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "0.75rem",
            }}
          >
            ✦ Field Notes
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Journal
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.7, fontSize: "1rem" }}>
            Practical field notes from real journeys — gear that held up, budgets that didn't, roads that surprised us.
          </p>
        </div>
      </div>

      {/* Notes grid */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 1100 }}>
        {notes.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "4rem 0" }}>
            No field notes yet. Check back soon.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
              gap: "1.5rem",
            }}
          >
            {notes.map((note) => (
              <FieldNoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
