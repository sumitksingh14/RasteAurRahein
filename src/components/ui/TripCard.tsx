"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, Heart, Flame } from "lucide-react";
import type { Trip } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import BookmarkButton from "@/components/ui/BookmarkButton";
import { TripAlertBadge } from "@/components/ui/TripAlertBanner";
import { getTripDummyLikes } from "@/lib/likes";
import { getTripImage } from "@/lib/data/tripImages";
import { trackRelatedTripClick } from "@/lib/analytics";

interface TripCardProps {
  trip: Trip;
  featured?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
  initialSaved?: boolean;
  relatedPosition?: 1 | 2 | 3 | 4;
  sourceSlug?: string;
}

// ── Difficulty badge config ────────────────────────────────────────────────
type Difficulty = "Easy" | "Moderate" | "Hard" | "Extreme";

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; bg: string; color: string }
> = {
  Easy: { label: "Easy", bg: "rgba(16,185,129,0.90)", color: "#fff" },
  Moderate: { label: "Moderate", bg: "rgba(245,158,11,0.92)", color: "#fff" },
  Hard: { label: "Hard", bg: "rgba(239,68,68,0.90)", color: "#fff" },
  Extreme: { label: "Extreme", bg: "rgba(124,58,237,0.92)", color: "#fff" },
};

export default function TripCard({
  trip,
  featured = false,
  priority = false,
  loading,
  initialSaved = false,
  relatedPosition,
  sourceSlug,
}: TripCardProps) {
  const imageSrc = getTripImage(trip.slug);
  const [isHovered, setIsHovered] = useState(false);
  const likes = trip.likes ?? getTripDummyLikes(trip.slug);

  // ── Duration ──────────────────────────────────────────────────────────────
  const durationDays =
    trip.quickFacts?.durationDays ??
    (trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : trip.itinerary?.length ?? null);

  const dateLabel =
    trip.startDate
      ? format(new Date(trip.startDate), "MMM yyyy")
      : null;

  const durationLabel = durationDays
    ? `${durationDays} days`
    : dateLabel ?? "Multi-day";

  // ── Best season ───────────────────────────────────────────────────────────
  // Reads from schema; never invented. Renders nothing when absent.
  const bestSeason = trip.quickFacts?.bestTime ?? trip.bestSuggestedMonth ?? null;

  // ── Difficulty ────────────────────────────────────────────────────────────
  // quickFacts is the authoritative source; trip.difficulty is legacy fallback
  const difficulty = (trip.quickFacts?.difficulty ?? trip.difficulty ?? null) as Difficulty | null;
  const diffConf = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;

  // ── Ideal for ─────────────────────────────────────────────────────────────
  // Short excerpt from quickFacts.idealFor or tripType — no invented values
  const idealFor = trip.quickFacts?.idealFor ?? trip.tripType ?? null;
  const idealForShort = idealFor ? idealFor.split(",")[0].trim() : null;

  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: isHovered
          ? "var(--shadow-neo-raised-lg)"
          : "var(--shadow-neo-raised)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`trip-card-${trip.slug}`}
    >
      {/* ── Image ────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: featured ? 260 : 220,
        }}
      >
        <Image
          src={imageSrc}
          alt={trip.title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.04)" : "scale(1)",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          quality={75}
          priority={priority}
          loading={priority ? "eager" : (loading ?? "lazy")}
        />

        {/* Bottom scrim for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.38) 0%, transparent 55%)",
          }}
        />

        {/* Bookmark — top right */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            zIndex: 2,
          }}
        >
          <BookmarkButton tripSlug={trip.slug} initialSaved={initialSaved} />
        </div>

        {/* Tags — top left */}
        {trip.tags && trip.tags.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              display: "flex",
              gap: "0.35rem",
              flexWrap: "wrap",
              zIndex: 2,
              maxWidth: "calc(100% - 3.5rem)",
            }}
          >
            {trip.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={`/trips?tag=${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  padding: "0.2rem 0.6rem",
                  borderRadius: "100px",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.92)",
                  color: "#6366f1",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                }}
              >
                {tag}
              </Link>
            ))}
            <TripAlertBadge slug={trip.slug} />
          </div>
        )}

        {/* Difficulty badge — bottom left, overlaid on image */}
        {diffConf && (
          <div
            style={{
              position: "absolute",
              bottom: "0.75rem",
              left: "0.75rem",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "0.2rem 0.6rem",
              borderRadius: "100px",
              fontSize: "0.65rem",
              fontWeight: 700,
              background: diffConf.bg,
              color: diffConf.color,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              backdropFilter: "blur(4px)",
            }}
          >
            <Flame size={10} />
            {diffConf.label}
          </div>
        )}
      </div>

      {/* ── Card Body ────────────────────────────────────────────────────── */}
      <Link
        href={`/trips/${trip.slug}`}
        onClick={() => {
          if (relatedPosition && sourceSlug) {
            trackRelatedTripClick(trip.slug, sourceSlug, relatedPosition);
          }
        }}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: featured ? "1.15rem" : "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.25rem",
              lineHeight: 1.35,
            }}
          >
            {trip.title}
          </h3>

          {/* Location */}
          <p
            style={{
              color: "#6366f1",
              fontSize: "0.82rem",
              fontWeight: 500,
              marginBottom: "0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <MapPin size={12} />
            {trip.country || "India"}
          </p>

          {/* Best season pill — only when data exists */}
          {bestSeason && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "0.2rem 0.65rem",
                borderRadius: "100px",
                fontSize: "0.7rem",
                fontWeight: 600,
                background: "rgba(99,102,241,0.10)",
                color: "#6366f1",
                marginBottom: "0.7rem",
                letterSpacing: "0.01em",
              }}
            >
              <CalendarDays size={11} />
              {bestSeason}
            </div>
          )}

          {/* Duration row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.4rem",
              marginBottom: "0.85rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#6366f1",
              }}
            >
              {durationLabel}
            </span>
            {trip.readingTime && (
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 400 }}>
                · {trip.readingTime} min read
              </span>
            )}
          </div>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderTop: "1px solid var(--border)",
              paddingTop: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {/* Best season (compact icon) if present, else idealFor */}
            {idealForShort && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "55%",
                }}
                title={idealFor ?? undefined}
              >
                {idealForShort}
              </span>
            )}

            {/* Likes — pushed right */}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.78rem",
                color: "#E11D48",
                fontWeight: 600,
                marginLeft: "auto",
                flexShrink: 0,
              }}
              title={`${likes} traveler likes`}
            >
              <Heart size={13} fill="#E11D48" color="#E11D48" />
              {likes}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
