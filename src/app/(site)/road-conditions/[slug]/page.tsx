import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PASS_CONDITIONS,
  getPassBySlug,
  getStatusColor,
  getStatusLabel,
  isConditionStale,
  ROAD_SAFETY_DISCLAIMER,
  type PassStatus,
} from "@/lib/data/pass-conditions";
import { DEMO_TRIPS } from "@/lib/data/trips";
import NewsletterInline from "@/components/ui/NewsletterInline";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PASS_CONDITIONS.map((pass) => ({
    slug: pass.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pass = getPassBySlug(slug);

  if (!pass) {
    return {
      title: "Pass Not Found | Raste Aur Raahein",
    };
  }

  const statusStr = getStatusLabel(pass.status);
  const title = `${pass.name} Status 2026: ${statusStr} | Road Conditions & Travel Guide`;
  const description = `Live road status for ${pass.name} (${pass.elevation}m) in ${pass.region}. Current condition: ${pass.statusNote}. Typical opening months: ${pass.openingMonth}. Verified ${pass.lastVerified}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/road-conditions/${pass.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

const STATUS_BADGE_STYLE: Record<PassStatus, { bg: string; text: string; border: string }> = {
  open: { bg: "rgba(22, 163, 74, 0.12)", text: "#15803d", border: "rgba(22, 163, 74, 0.3)" },
  caution: { bg: "rgba(217, 119, 6, 0.12)", text: "#b45309", border: "rgba(217, 119, 6, 0.3)" },
  closed: { bg: "rgba(220, 38, 38, 0.12)", text: "#b91c1c", border: "rgba(220, 38, 38, 0.3)" },
};

export default async function PassDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pass = getPassBySlug(slug);

  if (!pass) {
    notFound();
  }

  const badge = STATUS_BADGE_STYLE[pass.status];
  const relatedTrips = DEMO_TRIPS.filter((t) => pass.relatedTripSlugs.includes(t.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    name: `${pass.name} Road Condition and Status`,
    text: pass.statusNote,
    dateModified: pass.lastVerified,
    category: "https://schema.org/RoadClosedAnnouncement",
    spatialCoverage: {
      "@type": "Place",
      name: pass.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: pass.location.lat,
        longitude: pass.location.lng,
        elevation: `${pass.elevation} m`,
      },
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://raste-aur-rahein.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Road Conditions",
        item: "https://raste-aur-rahein.vercel.app/road-conditions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pass.name,
        item: `https://raste-aur-rahein.vercel.app/road-conditions/${pass.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <article style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
        {/* Breadcrumb nav */}
        <nav
          aria-label="Breadcrumbs"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "1.25rem 1.5rem 0.5rem",
            fontSize: "0.8125rem",
            color: "var(--text-tertiary, #6b7280)",
          }}
        >
          <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <Link href="/" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/road-conditions" style={{ color: "var(--accent-gold, #b45309)", textDecoration: "none" }}>
                Road Conditions
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: "var(--text-primary, #111827)", fontWeight: 600 }}>
              {pass.name}
            </li>
          </ol>
        </nav>

        {/* Hero header */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)",
            color: "#fff",
            padding: "2.5rem 1.5rem 3rem",
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "9999px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: badge.bg,
                  color: "#fff",
                  border: `1px solid ${badge.border}`,
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: getStatusColor(pass.status),
                  }}
                />
                {getStatusLabel(pass.status)}
              </span>

              <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
                {pass.region} • {pass.elevation.toLocaleString()} m ({Math.round(pass.elevation * 3.28084).toLocaleString()} ft)
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                margin: "0 0 1rem",
                color: "#fff",
              }}
            >
              {pass.name} Status &amp; Road Conditions
            </h1>

            {/* Verification freshness strip */}
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0.625rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <span>
                <strong>Last Verified:</strong> {new Date(pass.lastVerified).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              {isConditionStale(pass.lastVerified) && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(245, 158, 11, 0.25)",
                    color: "#fde68a",
                    border: "1px solid rgba(245, 158, 11, 0.5)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: 700,
                  }}
                >
                  ⚠ May be outdated
                </span>
              )}
              <span style={{ opacity: 0.4 }}>•</span>
              <span>
                <strong>Source:</strong> {pass.lastVerifiedSource}
              </span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
          {/* Explicit Safety Advisory Disclaimer */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "0.5rem",
              background: "rgba(217, 119, 6, 0.08)",
              border: "1px solid rgba(217, 119, 6, 0.25)",
              color: "var(--text-secondary, #4b5563)",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            <strong style={{ color: "var(--text-primary, #111827)" }}>⚠ Safety Advisory:</strong>{" "}
            {ROAD_SAFETY_DISCLAIMER} Always check local police checkpoints and BRO stations before proceeding.
          </div>

          {/* Status Note Highlight */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "0.75rem",
              background: badge.bg,
              border: `1.5px solid ${badge.border}`,
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: badge.text, marginBottom: "0.5rem" }}>
              Current Field Advisory ({getStatusLabel(pass.status)})
            </div>
            <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.6, color: "var(--text-primary, #111827)", fontWeight: 500 }}>
              {pass.statusNote}
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--text-primary, #111827)" }}>
            Key Crossing Metrics &amp; Window
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <div style={{ padding: "1.25rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-tertiary, #6b7280)", fontWeight: 600 }}>Elevation</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-primary, #111827)" }}>{pass.elevation} m</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary, #4b5563)", marginTop: "0.25rem" }}>Oxygen level approx 58% of sea level</div>
            </div>

            <div style={{ padding: "1.25rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-tertiary, #6b7280)", fontWeight: 600 }}>Typical Season</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-primary, #111827)" }}>{pass.openingMonth} – {pass.closingMonth}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary, #4b5563)", marginTop: "0.25rem" }}>Subject to annual snowfall &amp; BRO clearance</div>
            </div>

            <div style={{ padding: "1.25rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-tertiary, #6b7280)", fontWeight: 600 }}>Vehicle Recommended</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-primary, #111827)" }}>{pass.vehicleRequired}</div>
            </div>

            <div style={{ padding: "1.25rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.5rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-tertiary, #6b7280)", fontWeight: 600 }}>Coordinates</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-primary, #111827)" }}>{pass.location.lat.toFixed(4)}° N, {pass.location.lng.toFixed(4)}° E</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary, #4b5563)", marginTop: "0.25rem" }}>Offline GPS maps essential</div>
            </div>
          </div>

          {/* Editorial overview & Route notes */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              About {pass.name} &amp; Terrain Profile
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-secondary, #374151)", marginBottom: "1.5rem" }}>
              {pass.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
              {/* Road surface */}
              <div style={{ padding: "1.25rem", border: "1px solid var(--border, #e5e7eb)", borderRadius: "0.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--text-primary, #111827)" }}>🛣️ Road Surface</h3>
                <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary, #4b5563)" }}>{pass.surface}</p>
              </div>

              {/* Fuel Strategy */}
              <div style={{ padding: "1.25rem", border: "1px solid var(--border, #e5e7eb)", borderRadius: "0.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--text-primary, #111827)" }}>⛽ Fuel Strategy</h3>
                <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-secondary, #4b5563)" }}>{pass.fuelNotes}</p>
              </div>
            </div>
          </section>

          {/* Hazards & Safety */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-primary, #111827)" }}>
              Field Hazards &amp; Safety Protocol
            </h2>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "1rem", color: "var(--text-secondary, #374151)" }}>
              {pass.typicalHazards.map((hazard, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>{hazard}</li>
              ))}
            </ul>
          </section>

          {/* Alternate Routes if Closed */}
          {pass.alternateRoute && (
            <section style={{ marginBottom: "3rem", padding: "1.5rem", background: "var(--bg-secondary, #f9fafb)", borderRadius: "0.75rem", border: "1px solid var(--border, #e5e7eb)" }}>
              <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.375rem", margin: "0 0 0.75rem", color: "var(--text-primary, #111827)" }}>
                🔄 What to Do If Closed: Alternate Route
              </h2>
              <p style={{ margin: "0 0 1rem", fontSize: "1rem", lineHeight: 1.6, color: "var(--text-secondary, #4b5563)" }}>
                {pass.alternateRoute}
              </p>
              {pass.alternateRouteSlug && (
                <Link
                  href={`/trips/${pass.alternateRouteSlug}`}
                  style={{ display: "inline-block", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-gold, #b45309)", textDecoration: "none" }}
                >
                  Read full alternate route field guide →
                </Link>
              )}
            </section>
          )}

          {/* Permits info */}
          {pass.permit && (
            <section style={{ marginBottom: "3rem", padding: "1.25rem 1.5rem", background: "rgba(217, 119, 6, 0.08)", borderRadius: "0.75rem", border: "1px solid rgba(217, 119, 6, 0.25)" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#b45309" }}>🪪 Permit Requirements</h3>
              <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-primary, #111827)" }}>{pass.permit}</p>
            </section>
          )}

          {/* Related Field Notes */}
          {relatedTrips.length > 0 && (
            <section style={{ marginBottom: "3.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", marginBottom: "1.25rem", color: "var(--text-primary, #111827)" }}>
                Expeditions Crossing {pass.name}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
                {relatedTrips.map((trip) => (
                  <Link
                    key={trip.slug}
                    href={`/trips/${trip.slug}`}
                    style={{
                      display: "block",
                      padding: "1.25rem",
                      borderRadius: "0.5rem",
                      border: "1px solid var(--border, #e5e7eb)",
                      background: "var(--bg-primary, #fff)",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-gold, #b45309)" }}>
                      {trip.bestSuggestedMonth ?? "Field Note"}
                    </span>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0.5rem 0", color: "var(--text-primary, #111827)" }}>
                      {trip.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary, #4b5563)", lineClamp: 2 }}>
                      {trip.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Email Alert Capture */}
          <div style={{ marginTop: "2rem" }}>
            <NewsletterInline
              title={`Get Live Himalayan Pass Alerts`}
              subtitle={`Receive verified status updates for ${pass.name}, Rohtang, Kunzum, and Baralacha La directly before your expedition. Unsubscribe anytime.`}
            />
          </div>

          {/* Back to all passes */}
          <div style={{ textAlign: "center", marginTop: "3rem", borderTop: "1px solid var(--border, #e5e7eb)", paddingTop: "2rem" }}>
            <Link
              href="/road-conditions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--accent-gold, #b45309)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ← Back to All Himalayan Passes &amp; Live Telemetry
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
