import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllFieldNotes, getFieldNoteBySlug } from "@/lib/fieldNotes";
import type { FieldNoteCategory } from "@/lib/types";
import { Clock, ArrowLeft, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<FieldNoteCategory, string> = {
  "gear-review": "Gear Review",
  "budget-breakdown": "Budget Breakdown",
  "seasonal-advisory": "Seasonal Advisory",
  "trail-update": "Trail Update",
  "tips": "Tips",
};

const CATEGORY_COLORS: Record<FieldNoteCategory, string> = {
  "gear-review": "#0ea5e9",
  "budget-breakdown": "#16a34a",
  "seasonal-advisory": "#d97706",
  "trail-update": "#7c3aed",
  "tips": "#c9a84c",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getFieldNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `${note.title} | Journal — Raste Aur Raahein`,
    description: note.excerpt,
    alternates: { canonical: `/journal/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.excerpt,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const notes = await getAllFieldNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

function renderMarkdown(md: string): string {
  // 1. Process Markdown tables before any other replacements
  const html = md.replace(/(?:^\|[^\n]+\|(?:\r?\n|$))+/gm, (tableBlock) => {
    const lines = tableBlock.trim().split(/\r?\n/);
    const rows = lines
      .filter((line) => !/^\|[\s\-:|]+\|$/.test(line))
      .map((line, idx) => {
        const cells = line
          .split("|")
          .slice(1, -1)
          .map((c) =>
            c
              .trim()
              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
              .replace(/`([^`]+)`/g, "<code>$1</code>")
          );
        const tag = idx === 0 ? "th" : "td";
        const style =
          idx === 0
            ? "padding:0.6rem 0.85rem;border:1px solid var(--border);font-size:0.85rem;color:var(--text-primary);font-weight:600;background:var(--bg-secondary);text-align:left;"
            : "padding:0.55rem 0.85rem;border:1px solid var(--border);font-size:0.82rem;color:var(--text-secondary);";
        return `<tr>${cells.map((c) => `<${tag} style="${style}">${c}</${tag}>`).join("")}</tr>`;
      })
      .join("");
    return `<div style="overflow-x:auto;margin:1.5rem 0"><table style="width:100%;border-collapse:collapse;border:1px solid var(--border);border-radius:6px;overflow:hidden">${rows}</table></div>\n\n`;
  });

  return html
    .replace(/^### (.+)$/gm, '<h3 style="font-family:var(--font-serif);color:var(--text-primary);margin:1.75rem 0 0.5rem;font-size:1.15rem;font-weight:600">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-serif);color:var(--text-primary);margin:2.25rem 0 0.75rem;font-size:1.35rem;font-weight:600">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-family:var(--font-serif);color:var(--text-primary);margin:2rem 0 1rem;font-size:1.75rem;font-weight:700">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:var(--bg-secondary);padding:0.15rem 0.35rem;border-radius:4px;font-size:0.85em;border:1px solid var(--border)">$1</code>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border);margin:2rem 0"/>')
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:0.35rem 0;color:var(--text-secondary);line-height:1.6">$1</li>')
    .replace(/^- (.+)$/gm, '<li style="margin:0.35rem 0;color:var(--text-secondary);line-height:1.6">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (list) => `<ul style="padding-left:1.5rem;margin:1rem 0">${list}</ul>`)
    .replace(/\n\n/g, '</p><p style="color:var(--text-secondary);line-height:1.8;margin:0 0 1rem">')
    .replace(/^(.+)$/gm, (line) => (line.startsWith("<") ? line : line));
}

export default async function JournalSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const note = await getFieldNoteBySlug(slug);
  if (!note) notFound();

  const catColor = CATEGORY_COLORS[note.category];
  const catLabel = CATEGORY_LABELS[note.category];

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          padding: "3rem 0 2.5rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Link href="/journal" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "none" }}>
              <ArrowLeft size={13} /> Journal
            </Link>
            <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>/</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{catLabel}</span>
          </div>

          {/* Category badge */}
          <span
            style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              borderRadius: 100,
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: catColor,
              background: `${catColor}15`,
              border: `1px solid ${catColor}30`,
              marginBottom: "1rem",
            }}
          >
            {catLabel}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            {note.title}
          </h1>

          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            {note.excerpt}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {note.readingTime && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <Clock size={13} /> {note.readingTime} min read
              </div>
            )}
            {note.relatedTripSlug && (
              <Link
                href={`/trips/${note.relatedTripSlug}`}
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--accent-gold)", textDecoration: "none" }}
              >
                <ExternalLink size={12} /> View related trip →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ maxWidth: 780, paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div
          style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}
          dangerouslySetInnerHTML={{
            __html: `<p style="color:var(--text-secondary);line-height:1.8;margin:0 0 1rem">${renderMarkdown(note.body)}</p>`,
          }}
        />

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
              Tags
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {note.tags.map((tag) => (
                <span key={tag} className="tag-pill" style={{ fontSize: "0.72rem" }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Back to journal */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <Link
            href="/journal"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--accent-gold)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
