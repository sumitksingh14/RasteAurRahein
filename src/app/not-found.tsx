import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist. Find your next India adventure with Raste Aur Raahein.",
  robots: { index: false, follow: false },
};

const POPULAR_LINKS = [
  { href: "/trips", label: "Browse All Trips", emoji: "🗺️" },
  { href: "/road-conditions", label: "Road Conditions", emoji: "🛣️" },
  { href: "/guides", label: "Travel Guides", emoji: "📖" },
  { href: "/regions", label: "Explore Regions", emoji: "🏔️" },
  { href: "/ai-planner", label: "AI Trip Planner", emoji: "🤖" },
  { href: "/journal", label: "Field Notes", emoji: "📒" },
];

// 3D text shadow matching SilkPageHeader style
const SILK_3D_SHADOW = [
  "0 -1px 0 rgba(255,255,255,0.90)",
  "0 1px 0 rgba(180,183,205,0.70)",
  "0 2px 0 rgba(160,163,188,0.55)",
  "0 3px 0 rgba(140,143,172,0.40)",
  "0 4px 0 rgba(120,123,155,0.28)",
  "0 6px 8px rgba(80,85,130,0.18)",
  "0 8px 20px rgba(60,65,110,0.12)",
].join(", ");

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--bg-primary)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        fontFamily: "var(--font-sans)",
        textAlign: "center",
      }}
    >
      {/* 404 numeral */}
      <div
        aria-hidden="true"
        style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: "var(--text-primary)",
          textShadow: SILK_3D_SHADOW,
          marginBottom: "1rem",
          userSelect: "none",
        }}
      >
        404
      </div>

      {/* Eyebrow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "0.3rem 0.875rem",
          borderRadius: "9999px",
          background: "var(--bg-card)",
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.07), inset -3px -3px 6px rgba(255,255,255,0.55)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--accent-gold)",
          marginBottom: "1.5rem",
        }}
      >
        ✦ Lost on the Road?
      </div>

      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        This trail doesn&apos;t exist
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          lineHeight: 1.75,
          maxWidth: "46ch",
          marginBottom: "2.5rem",
        }}
      >
        The page you&apos;re looking for may have been moved, renamed, or never existed. But the best journeys often start by taking the wrong turn — let&apos;s get you back on track.
      </p>

      {/* Primary CTA */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 2rem",
            background: "var(--color-primary)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "0.9375rem",
            boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
          }}
        >
          🏠 Back to Home
        </Link>
        <Link
          href="/trips"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 2rem",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            borderRadius: "var(--radius-md)",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "0.9375rem",
            boxShadow: "var(--shadow-neo-raised)",
            border: "1.5px solid var(--border-accent)",
          }}
        >
          🗺️ Browse Trips
        </Link>
      </div>

      {/* Quick links grid */}
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: "var(--bg-card)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-neo-raised)",
          padding: "1.75rem",
        }}
      >
        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--accent-gold)",
            marginBottom: "1.25rem",
          }}
        >
          Popular Destinations
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.625rem",
          }}
        >
          {POPULAR_LINKS.map(({ href, label, emoji }) => (
            <Link
              key={href}
              href={href}
              className="nf-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                background: "var(--bg-card)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-neo-raised)",
                color: "var(--text-secondary)",
                fontWeight: 500,
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "all 0.2s ease",
                border: "1.5px solid transparent",
              }}
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </Link>
          ))}
        </div>
        <style>{`
          .nf-link:hover {
            color: var(--accent-gold) !important;
            border-color: var(--accent-gold) !important;
          }
        `}</style>
      </div>

      {/* Contact nudge */}
      <p style={{ marginTop: "2rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
        Think this is a bug?{" "}
        <Link href="/contact" style={{ color: "var(--accent-gold)", fontWeight: 600, textDecoration: "none" }}>
          Report it here
        </Link>
      </p>
    </div>
  );
}
