"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Calendar, Heart, BedDouble, Users, Maximize2 } from "lucide-react";
import type { Trip } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";

// Curated cover images from Unsplash — one per trip slug
const FALLBACK_IMAGES: Record<string, string> = {
  "spiti-valley": "/images/spiti-ki-monastery.jpg",
  "mysore-coorg-wayanad-ooty": "/images/mysore-palace.jpg",
  "rajasthan-desert-kingdom":
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
  "goa-beyond-beaches":
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
  "sikkim-7-days": "/images/sikkim-gurudongmar.jpg",
  "meghalaya-5-days": "/images/meghalaya-dawki-river.jpg",
  "kerala-7-days":
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
  "munsiyari-6-days": "/images/munsiyari-panchachuli.jpg",
  "char-dham-yatra-uttarakhand":
    "https://images.unsplash.com/photo-1712733900711-d0b929d0d7cc?w=800&q=80",
  "panch-kedar-trek-10-days": "/images/panch-kedar-temple.png",
  "pune-konkan-coast-raigad": "/images/konkan-coast.png",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80";

interface TripCardProps {
  trip: Trip;
  featured?: boolean;
  priority?: boolean;
}

export default function TripCard({ trip, featured = false, priority = false }: TripCardProps) {
  const imageSrc = FALLBACK_IMAGES[trip.slug] || DEFAULT_IMAGE;
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: isHovered
          ? "0 8px 32px rgba(0,0,0,0.14)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`trip-card-${trip.slug}`}
    >
      {/* Image */}
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
          priority={priority}
        />

        {/* Subtle bottom gradient for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.30) 0%, transparent 50%)",
          }}
        />

        {/* Heart / Save button — top right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((l) => !l);
          }}
          aria-label={liked ? "Remove from saved" : "Save trip"}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "transform 0.2s ease",
            zIndex: 2,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Heart
            size={16}
            fill={liked ? "#FEBB02" : "none"}
            color={liked ? "#FEBB02" : "#9CA3AF"}
            strokeWidth={2}
          />
        </button>

        {/* Tags */}
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
            }}
          >
            {trip.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.2rem 0.6rem",
                  borderRadius: "100px",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.92)",
                  color: "#006CE4",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Image dots indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "5px",
            zIndex: 2,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? 20 : 7,
                height: 7,
                borderRadius: "100px",
                background: i === 0 ? "#FEBB02" : "rgba(255,255,255,0.6)",
                transition: "width 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <Link
        href={`/trips/${trip.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: featured ? "1.15rem" : "1rem",
              fontWeight: 700,
              color: "#262729",
              marginBottom: "0.3rem",
              lineHeight: 1.35,
            }}
          >
            {trip.title}
          </h3>

          {/* Location — yellow text */}
          <p
            style={{
              color: "#FEBB02",
              fontSize: "0.82rem",
              fontWeight: 500,
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <MapPin size={12} />
            {trip.country || "India"}
          </p>

          {/* Price / Duration row — blue price */}
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
                color: "#006CE4",
              }}
            >
              {durationDays ? `${durationDays} days` : dateLabel ? dateLabel : "Multi-day"}
            </span>
            {trip.readingTime && (
              <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 400 }}>
                · {trip.readingTime} min read
              </span>
            )}
          </div>

          {/* Details row — icons for beds/sleeps/size */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              borderTop: "1px solid #F3F4F6",
              paddingTop: "0.75rem",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.78rem",
                color: "#374151",
                fontWeight: 500,
              }}
            >
              <BedDouble size={14} color="#6B7280" />
              {durationDays ? `${durationDays} days` : "Multi-day"}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.78rem",
                color: "#374151",
                fontWeight: 500,
              }}
            >
              <Users size={14} color="#6B7280" />
              Solo / Group
            </span>
            {trip.viewCount !== undefined && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.78rem",
                  color: "#374151",
                  fontWeight: 500,
                  marginLeft: "auto",
                }}
              >
                <Maximize2 size={13} color="#6B7280" />
                {trip.viewCount.toLocaleString()} views
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
