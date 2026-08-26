"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface LikeButtonProps {
  type: "trip" | "itinerary";
  id: string;
  /** Initial count from SSR (optional) */
  initialCount?: number;
}

export default function LikeButton({ type, id, initialCount }: LikeButtonProps) {
  const { user, openAuthModal } = useAuth();
  const [count, setCount] = useState(initialCount ?? 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchLikes = useCallback(async () => {
    try {
      const res = await fetch(`/api/likes?type=${type}&id=${encodeURIComponent(id)}`, { credentials: "include" });
      const data = await res.json();
      setCount(data.count ?? 0);
      setLiked(data.liked ?? false);
      setFetched(true);
    } catch {
      setFetched(true);
    }
  }, [type, id]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes, user]); // re-fetch when user logs in

  const handleLike = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    if (loading) return;

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setCount((c) => c + (newLiked ? 1 : -1));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    setLoading(true);
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type, id }),
      });
      const data = await res.json();
      if (res.ok) {
        setCount(data.count ?? count);
        setLiked(data.liked ?? newLiked);
      } else if (res.status === 401) {
        // Session expired — revert and open auth
        setLiked(!newLiked);
        setCount((c) => c + (newLiked ? -1 : 1));
        openAuthModal();
      }
    } catch {
      // Revert on network error
      setLiked(!newLiked);
      setCount((c) => c + (newLiked ? -1 : 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      title={liked ? "Unlike" : user ? "Like this trip" : "Sign in to like"}
      disabled={loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "0.5rem 1rem",
        borderRadius: "100px",
        border: `1.5px solid ${liked ? "rgba(233,133,154,0.5)" : "var(--border)"}`,
        background: liked ? "rgba(233,133,154,0.1)" : "transparent",
        color: liked ? "var(--accent-rose)" : "var(--text-muted)",
        cursor: loading ? "wait" : "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "all 0.2s",
        userSelect: "none",
        position: "relative",
      }}
    >
      <Heart
        size={16}
        fill={liked ? "currentColor" : "none"}
        style={{
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s",
          transform: animating ? "scale(1.5)" : "scale(1)",
          flexShrink: 0,
        }}
      />
      {fetched ? (
        <span>{count > 0 ? count : liked ? "1" : "0"}</span>
      ) : (
        <span style={{ opacity: 0.4 }}>…</span>
      )}

      {/* Ripple burst on like */}
      {animating && liked && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100px",
            border: "1.5px solid rgba(233,133,154,0.6)",
            animation: "rar-like-ripple 0.6s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes rar-like-ripple {
          0%  { transform: scale(1);   opacity: 1; }
          100%{ transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
