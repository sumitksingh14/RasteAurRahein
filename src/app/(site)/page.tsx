import type { Metadata } from "next";
import Link from "next/link";
import { getAllTrips } from "@/lib/queries";
import HomepageFilters from "@/components/ui/HomepageFilters";
import HeroSearchBar from "@/components/ui/HeroSearchBar";
import BrandStorySection from "@/components/ui/BrandStorySection";
import PlanTripCTA from "@/components/ui/PlanTripCTA";

export const revalidate = 3600; // Hourly ISR revalidation to update daily featured rotations

export const metadata: Metadata = {
  title: "India Trip Itineraries — Raste Aur Raahein",
  description:
    "Authentic guides, high-altitude treks, and open-highway road trips curated by Sumit Singh. Detailed itineraries, honest budgets, and GPS routes for India's greatest adventures.",
  keywords: [
    "India Trip Itineraries",
    "India travel blog",
    "Himalayan road trip",
    "Spiti Valley itinerary",
    "Leh Ladakh guide",
    "offbeat India destinations",
    "adventure travel India",
    "travel itinerary India",
    "high altitude road trip",
    "Sumit Singh travel",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "India Trip Itineraries",
    title: "India Trip Itineraries — Raste Aur Raahein",
    description:
      "Detailed travel itineraries, honest budgets, and route maps for India's greatest road trips and treks.",
    type: "website",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "India Trip Itineraries — Raste Aur Raahein",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Trip Itineraries — Raste Aur Raahein",
    description:
      "Authentic travel guides for India — high altitudes, open highways, and roads less taken.",
    images: ["/icons/icon-512.png"],
  },
};

function UploadIconSvg() {
  return (
    <svg fill="currentColor" height={18} viewBox="0 0 256 256" width={18} xmlns="http://www.w3.org/2000/svg">
      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-72-56h32a8,8,0,0,0,0-16H136V112a8,8,0,0,0-16,0v32H96a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0Z" />
    </svg>
  );
}

export default async function HomePage() {
  const allTrips = await getAllTrips();
  const tripCount = allTrips.length;

  // Derive top trending trips dynamically from real trip list
  const trendingTrips = [
    allTrips.find((t) => /spiti/i.test(t.title) || /spiti/i.test(t.slug)),
    allTrips.find((t) => /ladakh/i.test(t.title) || /ladakh/i.test(t.slug)),
    allTrips.find((t) => /dawki|meghalaya/i.test(t.title) || /dawki|meghalaya/i.test(t.slug)),
  ]
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((t) => {
      const cleanName = t.title.split("—")[0].trim().replace(/^[0-9]+\s+Days\s+in\s+/i, "");
      return { label: cleanName, query: cleanName };
    });

  return (
    <div
      style={{
        background: "#e8eaf0",
        minHeight: "100vh",
        paddingTop: "var(--nav-height)",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* ── LIVE TELEMETRY TICKER BAR ──────────────────────────────── */}
      <div
        style={{
          width: "100%",
          background: "#1e1b4b",
          color: "#fff",
          padding: "0.625rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
        className="homepage-ticker"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/road-conditions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#d97706",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#fde68a",
                fontSize: "0.6875rem",
              }}
            >
              Telemetry Corridor:
            </span>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "rgba(255,255,255,0.75)",
              flexWrap: "nowrap",
              overflow: "hidden",
            }}
            className="ticker-passes"
          >
            <Link
              href="/road-conditions"
              style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
            >
              Spiti, Kinnaur &amp; Zanskar Status
            </Link>
            <span style={{ opacity: 0.3 }}>•</span>
            <Link
              href="/road-conditions/kunzum-pass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                }}
              />
              Kunzum Pass: Clear
            </Link>
            <span style={{ opacity: 0.3 }}>•</span>
            <Link
              href="/road-conditions/rohtang-pass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                }}
              />
              Rohtang: Active
            </Link>
            <span style={{ opacity: 0.3 }}>•</span>
            <Link
              href="/road-conditions/baralacha-la"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#fbbf24",
                  display: "inline-block",
                }}
              />
              Baralacha La: Caution (Icing)
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }} className="ticker-right">
          <Link
            href="/road-conditions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              background: "rgba(255,255,255,0.1)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fde68a",
              textDecoration: "none",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Himalayan Pass Status
          </Link>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.6875rem" }}>Lat 32.2464° N</span>
        </div>
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "580px",
          padding: "4rem 1.5rem 3rem",
          overflow: "hidden",
          backgroundImage:
            'linear-gradient(rgba(30,27,75,0.50) 0%, rgba(30,27,75,0.80) 100%), url("/images/hero-mount-kailash.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
          backgroundRepeat: "no-repeat",
          gap: "1.5rem",
          margin: "1rem 1rem 0",
          borderRadius: "1rem",
        }}
      >
        {/* Badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            padding: "0.375rem 1rem",
            fontSize: "0.6875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          Curated Field Notes &amp; Expeditions
        </span>

        {/* Heading */}
        <div style={{ textAlign: "center", maxWidth: "720px" }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.033em",
              margin: "0 0 0.875rem",
              textShadow: "0 2px 16px rgba(0,0,0,0.25)",
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            Raste Aur Raahein: Untold Roads, Unseen Stories
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              fontWeight: 400,
              lineHeight: 1.65,
              margin: 0,
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            Authentic guides, high-altitude treks, and open-highway road trips curated by Sumit Singh.
          </p>
        </div>

        {/* Search bar + trending links — interactive client component */}
        <HeroSearchBar trendingTrips={trendingTrips} />
      </section>

      {/* ── BRAND STORY ──────────────────────────────────────────────── */}
      <BrandStorySection />

      {/* ── FILTER BAR + TRIP CARDS (client-side, filterable) ─────────── */}
      <HomepageFilters allTrips={allTrips} tripCount={tripCount} />

      {/* ── HIGH-CONVERTING CLEAR CTA SECTION ──────────────────────── */}
      <PlanTripCTA />

      {/* ── IMPORT ITINERARY CTA ─────────────────────────────────────── */}
      <div style={{ padding: "0 1.5rem 2.5rem" }}>
        <div
          style={{
            borderRadius: "1rem",
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
            padding: "2.5rem 3rem",
            display: "flex",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(24,40,30,0.25)",
          }}
        >
          {/* Decorative topography circles */}
          <div
            style={{
              position: "absolute",
              right: "-40px",
              bottom: "-40px",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          >
            <svg width="340" height="340" viewBox="0 0 100 100" fill="none" stroke="white">
              <circle cx="50" cy="50" r="10" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="50" strokeWidth="0.5" />
            </svg>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1.5rem",
              maxWidth: "560px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "0.875rem",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fde68a",
                flexShrink: 0,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M237.66,133.66l-32,32a8,8,0,0,1-11.32-11.32L212.69,136H128a8,8,0,0,1-7.79-6.17l-17.5-70H88a16,16,0,1,1,0-16H105.91a16,16,0,0,1,15.57,12.34L136.66,120H212.69L194.34,101.66a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,237.66,133.66ZM152,192H64.31l18.35-18.34a8,8,0,0,0-11.32-11.32l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L64.31,208H152a8,8,0,0,0,0-16Zm16-144a16,16,0,1,0-16-16A16,16,0,0,0,168,48Z" />
              </svg>
            </div>
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#fde68a",
                  marginBottom: "0.375rem",
                }}
              >
                Cartography &amp; Route Telemetry
              </span>
              <h3
                style={{
                  margin: "0 0 0.5rem",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "'Source Serif 4', Georgia, serif",
                }}
              >
                Have your own raw itinerary to import?
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.65,
                }}
              >
                Upload GPX tracks, Google MyMaps links, or day-by-day notes to generate an interactive route profile with elevation and homestay checkpoints.
              </p>
            </div>
          </div>

          <Link
            href="/import"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              borderRadius: "0.875rem",
              background: "#6366f1",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap" as const,
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
              boxShadow: "0 4px 16px rgba(99,102,241,0.40)",
              transition: "background 0.2s ease",
            }}
          >
            <UploadIconSvg />
            Import Itinerary
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .homepage-ticker { display: none !important; }
          .ticker-passes { display: none !important; }
        }
        @media (max-width: 900px) {
          .ticker-right { display: none !important; }
        }
      `}</style>
    </div>
  );
}
