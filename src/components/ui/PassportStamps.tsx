"use client";

import { Award, Compass, Lock, CheckCircle, Share2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { evaluateUserStamps, type UnlockedStampStatus } from "@/lib/passportStamps";

interface PassportStampsProps {
  savedTripSlugs: string[];
}

export default function PassportStamps({ savedTripSlugs }: PassportStampsProps) {
  const statuses = evaluateUserStamps(savedTripSlugs);
  const unlockedCount = statuses.filter((s) => s.unlocked).length;
  const progressPercent = Math.round((unlockedCount / statuses.length) * 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Raste Aur Raahein Traveler Passport",
          text: `I have unlocked ${unlockedCount} of ${statuses.length} regional traveler stamps exploring India on Raste Aur Raahein!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      alert(`You have unlocked ${unlockedCount} of ${statuses.length} traveler stamps across India!`);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* ── Official Passport Header Banner ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          padding: "1.75rem 2rem",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-lg, 16px)",
          border: "1px solid rgba(254, 187, 2, 0.4)",
          marginBottom: "2rem",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(254,187,2,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", zIndex: 1 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "rgba(254, 187, 2, 0.15)",
              border: "2px solid #FEBB02",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(254, 187, 2, 0.25)",
            }}
          >
            🇮🇳
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#FEBB02",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Award size={14} color="#FEBB02" /> Official Traveler Passport
              </span>
            </div>

            {/* High-contrast headline */}
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                margin: "0.25rem 0 0.35rem",
                fontFamily: "var(--font-serif)",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                textShadow: "0 2px 4px rgba(0,0,0,0.4)",
              }}
            >
              {unlockedCount} of {statuses.length} Regional Stamps Unlocked
            </h3>

            <p
              style={{
                fontSize: "0.88rem",
                color: "#CBD5E1",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Bookmark trips in each region to earn verified stamps and collect achievements across India.
            </p>

            {/* Progress bar in header */}
            <div style={{ marginTop: "0.9rem", maxWidth: "340px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  color: "#FEBB02",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                }}
              >
                <span>Passport Completion</span>
                <span>{progressPercent}% Unlocked</span>
              </div>
              <div
                style={{
                  height: "7px",
                  borderRadius: "4px",
                  background: "rgba(255, 255, 255, 0.15)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.max(progressPercent, 4)}%`,
                    background: "linear-gradient(90deg, #FEBB02 0%, #F59E0B 100%)",
                    borderRadius: "4px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleShare}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "0.65rem 1.25rem",
            borderRadius: "100px",
            border: "1.5px solid #FEBB02",
            background: "rgba(254, 187, 2, 0.12)",
            color: "#FEBB02",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
            backdropFilter: "blur(6px)",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FEBB02";
            e.currentTarget.style.color = "#0F172A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(254, 187, 2, 0.12)";
            e.currentTarget.style.color = "#FEBB02";
          }}
        >
          <Share2 size={15} /> Share Passport
        </button>
      </div>

      {/* ── Stamps Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {statuses.map(({ stamp, unlocked, progressCount, unlockedDate }) => {
          const tripsRemaining = Math.max(0, stamp.requiredCount - progressCount);
          const percent = Math.min(100, Math.round((progressCount / stamp.requiredCount) * 100));

          return (
            <div
              key={stamp.id}
              style={{
                position: "relative",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg, 16px)",
                border: unlocked ? `2px solid ${stamp.color}` : "1px solid #E2E8F0",
                background: "#FFFFFF",
                boxShadow: unlocked
                  ? `0 10px 28px ${stamp.color}20, 0 2px 8px rgba(0,0,0,0.04)`
                  : "0 2px 10px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.25rem",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div>
                {/* Stamp Emblem & Status Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Rubber stamp styled seal */}
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      background: unlocked ? `${stamp.color}15` : "#F8FAFC",
                      border: unlocked
                        ? `2.5px dashed ${stamp.color}`
                        : "2px dashed #CBD5E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                      transform: unlocked ? "rotate(-4deg)" : "none",
                      boxShadow: unlocked ? `0 0 12px ${stamp.color}25` : "none",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {stamp.icon}
                  </div>

                  {unlocked ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "0.25rem 0.7rem",
                        borderRadius: "100px",
                        background: `${stamp.color}15`,
                        color: stamp.color,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        border: `1px solid ${stamp.color}35`,
                      }}
                    >
                      <CheckCircle size={13} /> Issued
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "100px",
                        background: "#F1F5F9",
                        border: "1px solid #E2E8F0",
                        color: "#475569",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      <Lock size={12} color="#64748B" /> {progressCount} / {stamp.requiredCount} trips
                    </span>
                  )}
                </div>

                {/* Region Label */}
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: unlocked ? stamp.color : "#64748B",
                    fontWeight: 700,
                    marginBottom: "0.2rem",
                  }}
                >
                  {stamp.region}
                </div>

                {/* Stamp Title */}
                <h4
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    margin: "0 0 0.4rem",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {stamp.title}
                </h4>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#475569",
                    margin: "0 0 1rem",
                    lineHeight: 1.55,
                  }}
                >
                  {stamp.tagline}
                </p>

                {/* Mini Progress Bar for Locked Stamps */}
                {!unlocked && (
                  <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    <div
                      style={{
                        height: "5px",
                        borderRadius: "3px",
                        background: "#E2E8F0",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${percent}%`,
                          background: stamp.color,
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div
                style={{
                  borderTop: "1px solid #F1F5F9",
                  paddingTop: "0.85rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.78rem",
                }}
              >
                {unlocked ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: stamp.color, fontWeight: 600 }}>
                    <Sparkles size={14} />
                    <span>Unlocked · Verified Collector</span>
                  </div>
                ) : (
                  <div style={{ color: "#64748B", fontWeight: 500 }}>
                    Bookmark {tripsRemaining} more {stamp.region} {tripsRemaining === 1 ? "trip" : "trips"}
                  </div>
                )}

                <Link
                  href="/trips"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: unlocked ? stamp.color : "#006CE4",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                  }}
                >
                  Explore <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
