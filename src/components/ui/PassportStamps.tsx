"use client";

import { Award, Compass, Lock, CheckCircle, Share2 } from "lucide-react";
import { evaluateUserStamps, type UnlockedStampStatus } from "@/lib/passportStamps";

interface PassportStampsProps {
  savedTripSlugs: string[];
}

export default function PassportStamps({ savedTripSlugs }: PassportStampsProps) {
  const statuses = evaluateUserStamps(savedTripSlugs);
  const unlockedCount = statuses.filter((s) => s.unlocked).length;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Raste Aur Raahein Traveler Passport",
        text: `I have unlocked ${unlockedCount} regional traveler stamps exploring India on Raste Aur Raahein!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`You have unlocked ${unlockedCount} traveler stamps across India!`);
    }
  };

  return (
    <div>
      {/* Passport Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
          color: "#fff",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(254,187,2,0.3)",
          marginBottom: "2rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(254,187,2,0.15)",
              border: "1.5px solid #FEBB02",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            🇮🇳
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FEBB02", fontWeight: 700 }}>
                Official Traveler Passport
              </span>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0.15rem 0 0", fontFamily: "var(--font-serif)" }}>
              {unlockedCount} of {statuses.length} Regional Stamps Unlocked
            </h3>
          </div>
        </div>

        <button
          onClick={handleShare}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "0.5rem 1rem",
            borderRadius: "100px",
            border: "1px solid rgba(254,187,2,0.5)",
            background: "rgba(254,187,2,0.1)",
            color: "#FEBB02",
            fontSize: "0.82rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Share2 size={13} /> Share Passport
        </button>
      </div>

      {/* Stamps Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {statuses.map(({ stamp, unlocked, progressCount, unlockedDate }) => {
          return (
            <div
              key={stamp.id}
              style={{
                position: "relative",
                padding: "1.5rem",
                borderRadius: "var(--radius-md)",
                border: "1.5px solid",
                borderColor: unlocked ? stamp.color : "var(--border)",
                background: unlocked ? "var(--bg-card)" : "var(--bg-secondary)",
                opacity: unlocked ? 1 : 0.72,
                boxShadow: unlocked ? `0 4px 16px ${stamp.color}15` : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
                transition: "all 0.2s ease",
              }}
            >
              <div>
                {/* Stamp Emblem */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: unlocked ? `${stamp.color}18` : "var(--border)",
                      border: `2px dashed ${unlocked ? stamp.color : "var(--text-muted)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                    }}
                  >
                    {stamp.icon}
                  </div>

                  {unlocked ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "100px",
                        background: `${stamp.color}15`,
                        color: stamp.color,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      <CheckCircle size={12} /> Issued
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "100px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      <Lock size={11} /> {progressCount}/{stamp.requiredCount} trips
                    </span>
                  )}
                </div>

                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 600 }}>
                  {stamp.region}
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: "0.2rem 0 0.4rem", fontFamily: "var(--font-serif)" }}>
                  {stamp.title}
                </h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                  {stamp.tagline}
                </p>
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                <span>
                  {unlocked ? `Unlocked ${unlockedDate}` : `Bookmark ${stamp.requiredCount - progressCount} more ${stamp.region} trip`}
                </span>
                <Compass size={14} color={unlocked ? stamp.color : "var(--text-muted)"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
