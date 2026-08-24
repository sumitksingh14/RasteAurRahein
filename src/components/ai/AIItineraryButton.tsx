"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import AIItineraryModal from "./AIItineraryModal";

export default function AIItineraryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        id="ai-generate-btn"
        onClick={() => setOpen(true)}
        aria-label="Generate AI itinerary"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0.75rem 1.25rem",
          borderRadius: "100px",
          background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
          boxShadow: "0 8px 32px rgba(201,168,76,0.4), 0 2px 8px rgba(0,0,0,0.2)",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
          e.currentTarget.style.boxShadow = "0 16px 48px rgba(201,168,76,0.5), 0 4px 12px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.4), 0 2px 8px rgba(0,0,0,0.2)";
        }}
      >
        <Sparkles size={16} />
        AI Trip Planner
      </button>

      {open && <AIItineraryModal onClose={() => setOpen(false)} />}

      <style>{`
        @keyframes ai-pulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(201,168,76,0.4), 0 2px 8px rgba(0,0,0,0.2), 0 0 0 0 rgba(201,168,76,0.4); }
          50%       { box-shadow: 0 8px 32px rgba(201,168,76,0.4), 0 2px 8px rgba(0,0,0,0.2), 0 0 0 10px rgba(201,168,76,0); }
        }
        #ai-generate-btn {
          animation: ai-pulse 2.5s infinite;
        }
        #ai-generate-btn:hover {
          animation: none;
        }
      `}</style>
    </>
  );
}
