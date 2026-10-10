import type { Metadata } from "next";
import Link from "next/link";
import {
  PASS_CONDITIONS,
  getStatusColor,
  getStatusLabel,
  isConditionStale,
  ROAD_SAFETY_DISCLAIMER,
} from "@/lib/data/pass-conditions";
import type { PassStatus } from "@/lib/data/pass-conditions";
import NewsletterInline from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "Himalayan Road Conditions & Pass Status — Route Advisory | Raste Aur Raahein",
  description:
    "Curated, field-verified status of Kunzum Pass, Rohtang, Baralacha La, Zoji La, and Sela Pass. Advisory data based on recent traveler reports and seasonal norms.",
  alternates: { canonical: "/road-conditions" },
  openGraph: {
    title: "Himalayan Pass Status — Route Advisory | Raste Aur Raahein",
    description:
      "Pass status and route advisories for Kunzum, Rohtang, Baralacha La, Zoji La, and Sela Pass.",
    type: "website",
  },
};

const STATUS_BG: Record<PassStatus, string> = {
  open: "rgba(22,163,74,0.1)",
  caution: "rgba(217,119,6,0.1)",
  closed: "rgba(220,38,38,0.1)",
};

export default function RoadConditionsPage() {
  const now = new Date();
  const pageUpdated = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)",
          padding: "3.5rem 1.5rem 3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Topography decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 19px)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            display: "inline-block",
            padding: "0.3rem 0.9rem",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.2)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fde68a",
            marginBottom: "1rem",
          }}
        >
          ⛰ Telemetry Corridor
        </span>
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 900,
            fontFamily: "var(--font-serif)",
            lineHeight: 1.2,
            margin: "0 0 1rem",
            maxWidth: 680,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Himalayan Road Conditions & Pass Status
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "1rem",
            lineHeight: 1.65,
            maxWidth: 560,
            margin: "0 auto 1.5rem",
          }}
        >
          Manually curated field reports — not API-scraped. Updated after every expedition
          and cross-referenced with BRO advisories and Himachal PWD bulletins.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#34d399",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Page data reviewed: {pageUpdated}
        </div>
      </section>

      <div className="container" style={{ maxWidth: 940, paddingTop: "3rem", paddingBottom: "5rem" }}>

        {/* Disclaimer */}
        <div
          style={{
            background: "rgba(217,119,6,0.08)",
            border: "1px solid rgba(217,119,6,0.25)",
            borderRadius: "0.75rem",
            padding: "1rem 1.25rem",
            fontSize: "0.82rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          <strong style={{ color: "var(--text-primary)" }}>⚠ Safety Advisory:</strong> {ROAD_SAFETY_DISCLAIMER} Official
          road status changes quickly due to sudden snowfall, landslides, or administrative closures. Check with{" "}
          <a href="https://www.bro.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-gold)", textDecoration: "underline" }}>
            BRO (bro.gov.in)
          </a>{" "}
          or the local District Magistrate office before commencing high-altitude travel.
        </div>

        {/* Status Cards */}
        <h2
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            fontFamily: "var(--font-serif)",
            marginBottom: "1.25rem",
            color: "var(--text-primary)",
          }}
        >
          Himalayan Pass Status &amp; Advisory
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {PASS_CONDITIONS.map((pass) => {
            const color = getStatusColor(pass.status);
            const label = getStatusLabel(pass.status);
            const isStale = isConditionStale(pass.lastVerified);
            const verifiedDate = new Date(pass.lastVerified).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <Link
                key={pass.slug}
                href={`/road-conditions/${pass.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    borderLeft: `3px solid ${color}`,
                    background: STATUS_BG[pass.status],
                    transition: "all var(--transition)",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {/* Status badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color,
                        }}
                      >
                        <span
                          style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }}
                        />
                        {label}
                      </span>
                      {isStale && (
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            color: "#b45309",
                            background: "rgba(245, 158, 11, 0.2)",
                            border: "1px solid rgba(245, 158, 11, 0.4)",
                            padding: "1px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          ⚠ May be outdated
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      {pass.elevation.toLocaleString()} m
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-serif)",
                      color: "var(--text-primary)",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {pass.name}
                  </h3>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.55, flex: 1 }}>
                    {pass.statusNote}
                  </p>

                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-muted)",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "0.625rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Last verified: {verifiedDate}</span>
                    <span style={{ color: "var(--accent-gold)", fontWeight: 600 }}>Details →</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Status legend */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
            padding: "1rem 1.25rem",
            background: "var(--bg-secondary)",
            borderRadius: "0.75rem",
            border: "1px solid var(--border)",
          }}
        >
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", alignSelf: "center" }}>
            Status Key:
          </span>
          {(["open", "caution", "closed"] as PassStatus[]).map((s) => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: getStatusColor(s), display: "inline-block" }} />
              <strong style={{ color: getStatusColor(s) }}>{getStatusLabel(s)}</strong>
              {s === "open" && " — road passable without restrictions"}
              {s === "caution" && " — open with conditions (ice, one-way windows, damage)"}
              {s === "closed" && " — impassable; take alternate route"}
            </span>
          ))}
        </div>

        {/* Related guides */}
        <h2
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            fontFamily: "var(--font-serif)",
            marginBottom: "1rem",
            color: "var(--text-primary)",
          }}
        >
          Related Guides
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {[
            { href: "/guides/himalayan-passes-explained", label: "Himalayan Passes Explained" },
            { href: "/guides/spiti-vs-ladakh", label: "Spiti vs Ladakh — Honest Comparison" },
            { href: "/trips/spiti-valley", label: "Spiti Valley Field Notes" },
            { href: "/trips/leh-ladakh-9-days", label: "Leh–Ladakh 9-Day Itinerary" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: 9999,
                border: "1px solid var(--border)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                background: "var(--bg-secondary)",
                transition: "all var(--transition)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Email capture */}
        <div
          style={{
            borderRadius: "1rem",
            border: "1px solid var(--border)",
            padding: "2rem",
            background: "var(--bg-secondary)",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: "var(--font-serif)",
              marginBottom: "0.4rem",
              color: "var(--text-primary)",
            }}
          >
            Get weekly pass status updates by email
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Every Friday during the Himalayan season (May–October), we send a one-page pass
            condition digest — Kunzum, Rohtang, Baralacha, Zoji La, and Sela. No fluff.
          </p>
          <NewsletterInline variant="strip" source="road-conditions-page" />
          <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
            Your email is used only to send the weekly pass digest and occasional expedition field notes.
            Unsubscribe any time. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
}
