"use client";

import { useState, useCallback } from "react";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface BookmarkButtonProps {
  tripSlug: string;
  initialSaved?: boolean;
  /** Size variant */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Bookmark/save button for curated trips.
 * - Outline ↔ filled toggle
 * - Prompts sign-in modal if user is not authenticated
 * - Calls POST /api/saved-trips to persist
 */
export default function BookmarkButton({
  tripSlug,
  initialSaved = false,
  size = "md",
  className,
}: BookmarkButtonProps) {
  const { user, openAuthModal } = useAuth();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user) {
        openAuthModal();
        return;
      }

      if (loading) return;
      setLoading(true);

      // Optimistic update
      setSaved((prev) => !prev);

      try {
        const res = await fetch("/api/saved-trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ tripSlug }),
        });

        if (res.ok) {
          const data = await res.json();
          setSaved(data.saved);
        } else {
          // Revert on failure
          setSaved((prev) => !prev);
        }
      } catch {
        setSaved((prev) => !prev);
      } finally {
        setLoading(false);
      }
    },
    [user, openAuthModal, tripSlug, loading]
  );

  const iconSize = size === "sm" ? 14 : 16;
  const btnSize = size === "sm" ? 30 : 36;

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove from saved trips" : "Save trip"}
      title={saved ? "Remove from saved trips" : "Save trip"}
      disabled={loading}
      className={className}
      style={{
        width: btnSize,
        height: btnSize,
        borderRadius: "50%",
        background: saved ? "rgba(0,108,228,0.12)" : "rgba(255,255,255,0.92)",
        border: saved ? "1.5px solid rgba(0,108,228,0.3)" : "none",
        cursor: loading ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        transition: "transform 0.2s ease, background 0.2s ease",
        opacity: loading ? 0.6 : 1,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!loading) e.currentTarget.style.transform = "scale(1.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Bookmark
        size={iconSize}
        fill={saved ? "#006CE4" : "none"}
        color={saved ? "#006CE4" : "#9CA3AF"}
        strokeWidth={2}
      />
    </button>
  );
}
