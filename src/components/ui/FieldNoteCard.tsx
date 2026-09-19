"use client";

import Link from "next/link";
import type { FieldNote, FieldNoteCategory } from "@/lib/types";
import { Clock, BookOpen, ArrowRight } from "lucide-react";

const CATEGORY_META: Record<FieldNoteCategory, { label: string; color: string; bg: string }> = {
  "gear-review":        { label: "Gear Review",        color: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
  "budget-breakdown":   { label: "Budget Breakdown",    color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
  "seasonal-advisory":  { label: "Seasonal Advisory",   color: "#d97706", bg: "rgba(217,119,6,0.1)" },
  "trail-update":       { label: "Trail Update",        color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  "tips":               { label: "Tips",                color: "#c9a84c", bg: "rgba(201,168,76,0.1)" },
};

interface FieldNoteCardProps {
  note: FieldNote;
  priority?: boolean;
}

export default function FieldNoteCard({ note }: FieldNoteCardProps) {
  const cat = CATEGORY_META[note.category];

  return (
    <Link
      href={`/journal/${note.slug}`}
      style={{ textDecoration: "none" }}
    >
      <article
        className="glass-card"
        style={{
          padding: "1.5rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all var(--transition)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-accent)";
          e.currentTarget.style.background = "var(--bg-card-hover)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "var(--bg-glass)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Category badge */}
        <div style={{ marginBottom: "0.875rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.2rem 0.6rem",
              borderRadius: 100,
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: cat.color,
              background: cat.bg,
              border: `1px solid ${cat.color}30`,
            }}
          >
            {cat.label}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.05rem",
            color: "var(--text-primary)",
            marginBottom: "0.6rem",
            lineHeight: 1.35,
            flex: "none",
          }}
        >
          {note.title}
        </h2>

        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            flex: 1,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {note.excerpt}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border)",
            paddingTop: "0.75rem",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}
          >
            {note.readingTime ? (
              <>
                <Clock size={11} />
                {note.readingTime} min read
              </>
            ) : (
              <>
                <BookOpen size={11} />
                Field Note
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "0.72rem",
              color: "var(--accent-gold)",
              fontWeight: 600,
            }}
          >
            Read <ArrowRight size={11} />
          </div>
        </div>
      </article>
    </Link>
  );
}
