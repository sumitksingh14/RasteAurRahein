import type { Metadata } from "next";
import { getAllFieldNotes } from "@/lib/fieldNotes";
import FieldNoteCard from "@/components/ui/FieldNoteCard";
import type { FieldNoteCategory } from "@/lib/types";
import SilkPageHeader from "@/components/ui/SilkPageHeader";

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
      {/* Silk 3D Page header */}
      <SilkPageHeader
        eyebrow="✦ Field Notes"
        heading="Journal"
        description="Practical field notes from real journeys — gear that held up, budgets that didn&apos;t, roads that surprised us."
        maxWidth={860}
      />

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
