"use client";

import WeatherTrackerWidget from "@/components/ui/WeatherTrackerWidget";
import { Cloud } from "lucide-react";

export default function WeatherPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "#F9FAFB" }}>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "4rem 0 3rem",
          background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 50%, #F9FAFB 100%)",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(0,108,228,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cloud size={22} color="#006CE4" />
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#006CE4",
              }}
            >
              ✦ Live Weather Tracker
            </div>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "#262729",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
              maxWidth: 680,
            }}
          >
            Weather Across India's Travel Destinations
          </h1>

          <p
            style={{
              color: "#6B7280",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: 580,
              marginBottom: "2rem",
            }}
          >
            Real-time conditions at 15 key hubs — from the Himalayas to the Konkan coast.
            Powered by Open-Meteo, updated every 10 minutes, no paywall.
          </p>

          {/* Quick region links */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { label: "🏔️ Himalayas", href: "/regions/himalayas" },
              { label: "🏜️ Rajasthan", href: "/regions/rajasthan" },
              { label: "🌊 Coastal", href: "/regions/coastal" },
              { label: "🌴 South India", href: "/regions/south-india" },
              { label: "🌿 Northeast", href: "/regions/northeast-india" },
            ].map((r) => (
              <a
                key={r.href}
                href={r.href}
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: "100px",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#006CE4";
                  e.currentTarget.style.color = "#006CE4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracker ── */}
      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="container">
          <WeatherTrackerWidget />
        </div>
      </section>
    </div>
  );
}
