"use client";

import { useState } from "react";
import { Share2, Link2, CheckCircle, MessageCircle } from "lucide-react";

interface Props {
  url: string;
  title: string;
  destination: string;
  days: number;
}

export default function ShareItineraryButtons({ url, title, destination, days }: Props) {
  const [copied, setCopied] = useState(false);

  const waText = encodeURIComponent(
    `🗺️ Check out this ${days}-day AI itinerary to ${destination}!\n\n${title}\n\n${url}\n\nGenerated on Raste Aur Raahein 🏔️`
  );
  const waUrl = `https://wa.me/?text=${waText}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback — select a temp input
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "0.6rem 1.25rem",
          background: "#25D366",
          border: "none",
          borderRadius: "var(--radius-md)",
          color: "#fff",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.88rem",
          cursor: "pointer",
          textDecoration: "none",
          boxShadow: "0 2px 12px rgba(37,211,102,0.35)",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
      >
        <MessageCircle size={16} /> Share on WhatsApp
      </a>

      <button
        onClick={handleCopy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "0.6rem 1.25rem",
          background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.1)",
          border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.2)"}`,
          borderRadius: "var(--radius-md)",
          color: copied ? "#6ee7b7" : "rgba(255,255,255,0.85)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.88rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {copied ? <CheckCircle size={16} /> : <Link2 size={16} />}
        {copied ? "Copied!" : "Copy Link"}
      </button>

      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={() => navigator.share({ title, url })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "0.6rem 1.25rem",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "var(--radius-md)",
            color: "rgba(255,255,255,0.75)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
          }}
        >
          <Share2 size={16} /> Share
        </button>
      )}
    </div>
  );
}
