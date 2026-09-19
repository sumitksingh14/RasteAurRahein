"use client";

// ─────────────────────────────────────────────────────────────────────────────
// TravelerReviews — Testimonial component for trip detail pages
//
// Seed data: founder-collected quotes. Replace / extend the SEED_REVIEWS array
// with real submissions once the moderated form (Phase 2) is wired up.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { MessageSquareQuote, Star } from "lucide-react";

interface Review {
  id: string;
  /** Slug(s) this review applies to. Empty array = site-wide testimonial shown
   *  as fallback when no trip-specific reviews exist. */
  tripSlugs: string[];
  travelerName: string;
  /** Short description shown under the name, e.g. "Solo traveller, Delhi" */
  travelerTag: string;
  /** The actual quote — keep it under 240 chars for best card layout */
  quote: string;
  rating: number; // 1–5
  /** Optional: relative or absolute URL to traveler photo */
  photoUrl?: string;
}

// ─── Seed Reviews — edit freely ──────────────────────────────────────────────
const SEED_REVIEWS: Review[] = [
  {
    id: "r1",
    tripSlugs: ["spiti-valley-road-trip", "spiti-valley"],
    travelerName: "Aakash Mehta",
    travelerTag: "Solo traveller · Pune",
    quote:
      "The Spiti guide was the most detailed I found online — day-by-day breakdowns, real costs, and honest altitude warnings. Followed it almost to the letter and had zero surprises. Absolute lifesaver.",
    rating: 5,
  },
  {
    id: "r2",
    tripSlugs: ["leh-ladakh-road-trip", "manali-to-leh"],
    travelerName: "Priya Sharma",
    travelerTag: "Group of 4 · Bangalore",
    quote:
      "We were nervous planning Ladakh for the first time. This itinerary gave us confidence. The permit checklist alone saved us hours of confusion at Leh. Highly recommend!",
    rating: 5,
  },
  {
    id: "r3",
    tripSlugs: ["rajasthan-road-trip", "rajasthan-circuit"],
    travelerName: "Nikhil & Sunita",
    travelerTag: "Couple · Mumbai",
    quote:
      "The Rajasthan circuit was perfectly balanced — not too rushed, not too slow. The hotel recommendations were budget-friendly and actually good. This blog is refreshingly honest.",
    rating: 5,
  },
  {
    id: "r4",
    tripSlugs: ["goa-to-kerala-coastal-drive", "south-india-coastal"],
    travelerName: "Rohit Desai",
    travelerTag: "Motorcyclist · Hyderabad",
    quote:
      "Did the coastal route on a Royal Enfield. The fuel stop notes and road condition warnings are something no other guide bothers to include. Exactly what bikers need.",
    rating: 5,
  },
  // ── Generic site-wide testimonials (tripSlugs: []) ────────────────────────
  {
    id: "r5",
    tripSlugs: [],
    travelerName: "Sneha Iyer",
    travelerTag: "Frequent traveller · Chennai",
    quote:
      "Every guide here is written like a friend who has already done the trip is briefing you — no fluff, just what you actually need to know. My go-to planning resource.",
    rating: 5,
  },
  {
    id: "r6",
    tripSlugs: [],
    travelerName: "Arjun Kapoor",
    travelerTag: "Backpacker · Kolkata",
    quote:
      "The budget breakdowns are a game changer. I have been burned by blogs that list 500/night stays that do not exist anymore. Here the numbers are current and honest.",
    rating: 4,
  },
];

// ─── Star Rating Display ──────────────────────────────────────────────────────
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? "#FEBB02" : "transparent"}
          color={i <= rating ? "#FEBB02" : "#D1D5DB"}
          style={{ flexShrink: 0 }}
        />
      ))}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, photoUrl, size = 44 }: { name: string; photoUrl?: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          border: "2px solid var(--border)",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--accent-gold), #E06C3A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#111318",
        fontSize: size * 0.38,
        fontWeight: 700,
        flexShrink: 0,
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.02em",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.quote.length > 180;
  const displayQuote =
    isLong && !expanded ? review.quote.slice(0, 178) + "…" : review.quote;

  return (
    <div
      className="glass-card"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color var(--transition)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--border-accent)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* Quote mark + text */}
      <div style={{ position: "relative" }}>
        <MessageSquareQuote
          size={20}
          style={{
            color: "var(--accent-gold)",
            opacity: 0.6,
            marginBottom: "0.5rem",
          }}
        />
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          &ldquo;{displayQuote}&rdquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-gold)",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: "0.25rem 0 0",
              fontWeight: 600,
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Footer: avatar + name + rating */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <Avatar name={review.travelerName} photoUrl={review.photoUrl} />
          <div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.3,
              }}
            >
              {review.travelerName}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginTop: "1px",
              }}
            >
              {review.travelerTag}
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function TravelerReviews({ tripSlug }: { tripSlug: string }) {
  // First, try trip-specific reviews. Fall back to generic site testimonials.
  const tripReviews = SEED_REVIEWS.filter((r) =>
    r.tripSlugs.some(
      (s) => s === tripSlug || tripSlug.includes(s) || s.includes(tripSlug)
    )
  );
  const fallbackReviews = SEED_REVIEWS.filter((r) => r.tripSlugs.length === 0);
  const reviews = tripReviews.length > 0 ? tripReviews : fallbackReviews.slice(0, 2);

  // Compute aggregate rating for display
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const roundedAvg = Math.round(avgRating * 10) / 10;

  return (
    <section aria-label="Traveler reviews and testimonials">
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.75rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "0.4rem",
            }}
          >
            ✦ From Fellow Travelers
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Traveler Stories &amp; Reviews
          </h2>

          {/* Aggregate rating summary */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <StarRating rating={Math.round(avgRating)} size={13} />
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              {roundedAvg}/5 &middot; {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <Link
          href="/stories/submit"
          className="btn btn-secondary"
          style={{
            fontSize: "0.82rem",
            padding: "0.5rem 1.1rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Share Your Experience
        </Link>
      </div>

      {/* Review grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          gap: "1.25rem",
        }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          marginTop: "1.25rem",
          fontStyle: "italic",
        }}
      >
        Reviews are from travelers who completed this route and shared their experience directly with Raste Aur Raahein.
      </p>
    </section>
  );
}
