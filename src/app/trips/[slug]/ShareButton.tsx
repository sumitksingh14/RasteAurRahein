"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => {});
    }
  };

  return (
    <button
      id="share-trip-btn"
      onClick={handleShare}
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "0.5rem 1rem",
        borderRadius: "var(--radius-sm)",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.1)",
        color: "white",
        fontSize: "0.8rem",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        backdropFilter: "blur(8px)",
        transition: "all var(--transition)",
      }}
    >
      <Share2 size={13} />
      Share
    </button>
  );
}
