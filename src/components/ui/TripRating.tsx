"use client";

import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface TripRatingProps {
  tripSlug: string;
}

export default function TripRating({ tripSlug }: TripRatingProps) {
  const { user, openAuthModal } = useAuth();
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchRating = useCallback(async () => {
    try {
      const res = await fetch(`/api/ratings?tripSlug=${encodeURIComponent(tripSlug)}`, {
        credentials: "include",
      });
      const data = await res.json();
      setAverage(data.average ?? 0);
      setCount(data.count ?? 0);
      setUserRating(data.userRating ?? null);
    } catch {
      // silently fail
    } finally {
      setFetched(true);
    }
  }, [tripSlug]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating, user]);

  const handleRate = async (rating: number) => {
    if (!user) { openAuthModal(); return; }
    if (loading) return;

    setLoading(true);
    // Optimistic
    const prev = userRating;
    setUserRating(rating);

    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tripSlug, rating }),
      });
      const data = await res.json();
      if (res.ok) {
        setAverage(data.average ?? 0);
        setCount(data.count ?? 0);
        setUserRating(data.userRating ?? rating);
      } else if (res.status === 401) {
        setUserRating(prev);
        openAuthModal();
      }
    } catch {
      setUserRating(prev);
    } finally {
      setLoading(false);
    }
  };

  const displayRating = hovered ?? userRating ?? 0;

  return (
    <div className="trip-rating-widget glass-card">
      <div className="trip-rating-label">Rate this Trip</div>

      {/* Stars */}
      <div
        className="trip-rating-stars"
        role="group"
        aria-label="Rate this trip from 1 to 5 stars"
        onMouseLeave={() => setHovered(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayRating;
          return (
            <button
              key={star}
              id={`rate-star-${star}`}
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHovered(star)}
              disabled={loading}
              className={`trip-rating-star-btn ${filled ? "filled" : ""}`}
            >
              <Star
                size={24}
                fill={filled ? "currentColor" : "none"}
                strokeWidth={filled ? 0 : 1.5}
              />
            </button>
          );
        })}
      </div>

      {/* Stats */}
      {fetched && (
        <div className="trip-rating-stats">
          {count > 0 ? (
            <>
              <span className="trip-rating-avg">{average.toFixed(1)}</span>
              <span className="trip-rating-count">
                ({count} {count === 1 ? "review" : "reviews"})
              </span>
            </>
          ) : (
            <span className="trip-rating-none">No ratings yet — be the first!</span>
          )}
        </div>
      )}

      {userRating && !hovered && (
        <div className="trip-rating-user-label">
          Your rating: {userRating} ★ — {["", "Poor", "Fair", "Good", "Great", "Excellent"][userRating]}
        </div>
      )}
      {!user && (
        <button
          onClick={openAuthModal}
          className="trip-rating-signin-prompt"
        >
          Sign in to rate
        </button>
      )}
    </div>
  );
}
