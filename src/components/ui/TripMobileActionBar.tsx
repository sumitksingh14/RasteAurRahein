"use client";

import { useState, useEffect } from "react";
import { Download, Check, Loader2, Sparkles } from "lucide-react";
import type { Trip } from "@/lib/types";
import { extractTripWaypoints, generateGPXContent, downloadGPXFile } from "@/lib/gpxExporter";

interface TripMobileActionBarProps {
  trip: Trip;
}

export default function TripMobileActionBar({ trip }: TripMobileActionBarProps) {
  const [visible, setVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Only monitor on mobile/tablet viewports (< 768px)
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Appear once scrolled past the hero (~420px)
      const shouldShow = window.scrollY > 420;
      setVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadGPX = async () => {
    setDownloading(true);
    try {
      const waypoints = extractTripWaypoints(trip);
      const gpxContent = generateGPXContent(
        trip.title,
        waypoints.length > 0
          ? waypoints
          : [
              {
                name: trip.title,
                lat: 32.2464,
                lng: 77.7667,
                desc: trip.title,
              },
            ]
      );
      downloadGPXFile(`${trip.slug}-route.gpx`, gpxContent);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("Failed to download GPX:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePlanWithMe = () => {
    const planSection = document.getElementById("plan-trip");
    if (planSection) {
      planSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/ai-planner?destination=${encodeURIComponent(trip.title)}`;
    }
  };

  return (
    <>
      <div
        className="trip-mobile-action-bar"
        role="toolbar"
        aria-label="Trip quick actions"
        aria-hidden={!visible}
        style={{
          position: "fixed",
          bottom: "calc(var(--tab-bar-height, 64px) + env(safe-area-inset-bottom, 0px) + 12px)",
          left: "50%",
          transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(140%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          zIndex: 490,
          width: "calc(100% - 1.5rem)",
          maxWidth: "420px",
          background: "rgba(18, 20, 29, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "9999px",
          border: "1px solid rgba(254, 187, 2, 0.35)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 8px",
          gap: "8px",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
          boxSizing: "border-box",
        }}
      >
        {/* Left Action: Download GPX */}
        <button
          onClick={handleDownloadGPX}
          disabled={downloading}
          aria-label="Download trip GPX file"
          style={{
            flex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            minHeight: "42px",
            padding: "0 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            background: downloaded
              ? "rgba(16, 185, 129, 0.2)"
              : "rgba(255, 255, 255, 0.08)",
            color: downloaded ? "#34d399" : "#ffffff",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: downloading ? "wait" : "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}
        >
          {downloading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : downloaded ? (
            <Check size={15} color="#34d399" strokeWidth={2.5} />
          ) : (
            <Download size={15} strokeWidth={2.2} />
          )}
          <span>{downloaded ? "GPX Saved" : "Download GPX"}</span>
        </button>

        {/* Right Action: Plan with me */}
        <button
          onClick={handlePlanWithMe}
          aria-label="Plan custom trip with author or AI planner"
          style={{
            flex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            minHeight: "42px",
            padding: "0 12px",
            borderRadius: "9999px",
            border: "none",
            background: "linear-gradient(135deg, var(--accent-gold, #FEBB02) 0%, #e0a300 100%)",
            color: "#0a0a0f",
            fontSize: "0.82rem",
            fontWeight: 800,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(254, 187, 2, 0.35)",
            transition: "transform 0.15s ease",
          }}
        >
          <Sparkles size={15} />
          <span>Plan with me</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .trip-mobile-action-bar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
