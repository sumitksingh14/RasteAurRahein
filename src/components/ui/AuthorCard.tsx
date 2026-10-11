"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight, UserCheck } from "lucide-react";
import type { Author } from "@/lib/types";
import { format, parseISO } from "date-fns";

interface AuthorCardProps {
  author?: Author;
  lastVerified?: string;
  verifiedAt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function formatLastVerified(dateStr?: string): string | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (!trimmed) return null;
  // If already formatted like "May 2026"
  if (/^[A-Za-z]+ \d{4}$/.test(trimmed)) {
    return trimmed;
  }
  try {
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) {
      return format(d, "MMMM yyyy");
    }
  } catch {
    // ignore
  }
  return trimmed;
}

export default function AuthorCard({
  author,
  lastVerified,
  verifiedAt,
  className = "",
  style,
}: AuthorCardProps) {
  const authorName = author?.name || process.env.NEXT_PUBLIC_AUTHOR_NAME || "Sumit Singh";
  const authorPhoto = process.env.NEXT_PUBLIC_AUTHOR_PHOTO_URL || "/sumit-singh.png";
  const authorBio =
    author?.bio ||
    process.env.NEXT_PUBLIC_AUTHOR_BIO ||
    "Storyteller of Indian highways, high passes, and backcountry overland circuits. Documenting field-tested itineraries, honest costs, and live road telemetry across 60,000+ km of travel.";

  const verifiedBadge = formatLastVerified(lastVerified || verifiedAt);

  return (
    <section
      aria-label="About the author and guide verification"
      className={`author-card glass-card ${className}`}
      style={{
        padding: "clamp(1.25rem, 3vw, 1.75rem)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Author avatar */}
          <div
            style={{
              position: "relative",
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--border-accent)",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Image
              src={authorPhoto}
              alt={authorName}
              fill
              sizes="56px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {authorName}
              </span>
              <span
                title="Verified Route Explorer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "var(--accent-gold)",
                }}
              >
                <UserCheck size={16} />
              </span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Expedition Curator &amp; Travel Writer
            </div>
          </div>
        </div>

        {/* Last Verified Badge — renders only when field exists */}
        {verifiedBadge && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.4rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#34d399",
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={14} color="#34d399" />
            <span>Last verified: {verifiedBadge}</span>
          </div>
        )}
      </div>

      {/* Short bio */}
      <p
        style={{
          fontSize: "0.865rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          margin: 0,
          fontFamily: "var(--font-sans)",
        }}
      >
        {authorBio}
      </p>

      {/* Footer link to /about */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
        <Link
          href="/about"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "0.82rem",
            color: "var(--accent-gold)",
            fontWeight: 600,
            textDecoration: "none",
            transition: "gap 0.15s ease",
          }}
        >
          <span>Learn more about Sumit &amp; the Raste Aur Raahein expedition archive</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
