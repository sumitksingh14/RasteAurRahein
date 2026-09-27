"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import AIItineraryModal from "./AIItineraryModal";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AIItineraryButton() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <button
        id="ai-generate-btn"
        onClick={() => setOpen(true)}
        aria-label="Generate AI itinerary"
        title="AI Trip Planner"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "0.45rem 0.9rem",
          borderRadius: "100px",
          background: "linear-gradient(135deg, #f59e0b, #f97316)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: 700,
          fontFamily: "var(--font-sans)",
          boxShadow: "var(--shadow-neo-raised)",
          transition: "all 0.25s ease",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(245,158,11,0.5)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-neo-raised)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <Sparkles size={13} />
        <span className="ai-btn-label">AI Trip Planner</span>
      </button>

      {open && <AIItineraryModal onClose={() => setOpen(false)} />}

      <style>{`
        @media (max-width: 480px) {
          .ai-btn-label { display: none; }
          #ai-generate-btn { padding: 0.45rem 0.6rem; }
        }
      `}</style>
    </>
  );
}
