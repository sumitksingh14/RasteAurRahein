"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Eye, Calendar, Tag } from "lucide-react";
import type { Trip } from "@/lib/types";
import { format } from "date-fns";

// Curated cover images from Unsplash (by slug, used as demo fallbacks)
const FALLBACK_IMAGES: Record<string, string> = {
  "spiti-valley":
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
  "rajasthan-desert-kingdom":
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80",
  "goa-beyond-beaches":
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80";

interface TripCardProps {
  trip: Trip;
  featured?: boolean;
  priority?: boolean;
}

export default function TripCard({ trip, featured = false, priority = false }: TripCardProps) {
  const imageSrc = FALLBACK_IMAGES[trip.slug] || DEFAULT_IMAGE;

  const dateLabel =
    trip.startDate && trip.endDate
      ? `${format(new Date(trip.startDate), "MMM yyyy")}`
      : trip.startDate
      ? format(new Date(trip.startDate), "MMM yyyy")
      : null;

  const durationDays =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : null;

  return (
    <Link
      href={`/trips/${trip.slug}`}
      id={`trip-card-${trip.slug}`}
      style={{
        display: "block",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg), var(--shadow-glow)";
        e.currentTarget.style.borderColor = "var(--border-accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Cover Image */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: featured ? 280 : 220,
        }}
      >
        <Image
          src={imageSrc}
          alt={trip.title}
          fill
          style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
          priority={priority}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Tags on image */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
          }}
        >
          {trip.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill" style={{ fontSize: "0.65rem" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Duration badge */}
        {durationDays && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "var(--bg-glass)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            {durationDays} {durationDays === 1 ? "day" : "days"}
          </div>
        )}

        {/* Bottom of image — location */}
        {trip.country && (
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
            }}
          >
            <MapPin size={13} />
            <span>{trip.country}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: featured ? "1.4rem" : "1.15rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
            lineHeight: 1.3,
          }}
        >
          {trip.title}
        </h3>

        {trip.excerpt && (
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {trip.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            flexWrap: "wrap",
          }}
        >
          {dateLabel && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={13} />
              {dateLabel}
            </span>
          )}
          {trip.readingTime && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} />
              {trip.readingTime} min read
            </span>
          )}
          {trip.viewCount !== undefined && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: "auto",
              }}
            >
              <Eye size={13} />
              {trip.viewCount.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
