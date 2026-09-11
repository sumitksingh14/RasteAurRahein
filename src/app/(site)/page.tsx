import type { Metadata } from "next";
import Link from "next/link";
import { getAllTrips } from "@/lib/queries";
import HomepageFilters from "@/components/ui/HomepageFilters";
import HeroSearchBar from "@/components/ui/HeroSearchBar";
import BrandStorySection from "@/components/ui/BrandStorySection";

export const metadata: Metadata = {
  title: "Raste Aur Raahein — Raw Journeys Across India",
  description:
    "Authentic guides, high-altitude treks, and open-highway road trips curated by Sumit Singh.",
};

// ── SVG Icon helpers for Import CTA ─────────────────────────────────────────
function RouteIconSvg({ size = 24 }: { size?: number }) {
  return (
    <svg fill="currentColor" height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M237.66,133.66l-32,32a8,8,0,0,1-11.32-11.32L212.69,136H128a8,8,0,0,1-7.79-6.17l-17.5-70H88a16,16,0,1,1,0-16H105.91a16,16,0,0,1,15.57,12.34L136.66,120H212.69L194.34,101.66a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,237.66,133.66ZM152,192H64.31l18.35-18.34a8,8,0,0,0-11.32-11.32l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L64.31,208H152a8,8,0,0,0,0-16Zm16-144a16,16,0,1,0-16-16A16,16,0,0,0,168,48Z" />
    </svg>
  );
}

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
    allTrips.find((t) => /meghalaya/i.test(t.title) || /meghalaya/i.test(t.slug)),
  ]
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((t) => {
      const cleanName = t.title.split("—")[0].trim().replace(/^[0-9]+\s+Days\s+in\s+/i, "");
      return { label: cleanName, query: cleanName };
    });

  return (
    <div
      style={{
        background: "#fcfaf8",
        minHeight: "100vh",
        paddingTop: "var(--nav-height)",
        fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif",
      }}
    >

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "520px",
          padding: "3.5rem 1.5rem 2.5rem",
          overflow: "hidden",
          backgroundImage:
            'linear-gradient(rgba(27,19,13,0.38) 0%, rgba(27,19,13,0.68) 100%), url("/images/hero-mount-kailash.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
          backgroundRepeat: "no-repeat",
          gap: "1.5rem",
          borderRadius: "0.75rem",
          margin: "1rem",
        }}
      >
        {/* Badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "9999px",
            background: "rgba(212,95,17,0.9)",
            padding: "0.25rem 0.875rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#fff",
          }}
        >
          Curated Field Notes &amp; Expeditions
        </span>

        {/* Heading */}
        <div style={{ textAlign: "center", maxWidth: "640px" }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.033em",
              margin: "0 0 0.75rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            Raste Aur Raahein: Untold Roads, Unseen Stories
          </h1>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>
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


      {/* ── IMPORT ITINERARY CTA ─────────────────────────────────────── */}
      <div style={{ padding: "1.5rem 1.5rem 2.5rem" }}>
        <div
          style={{
            borderRadius: "0.75rem",
            border: "1px solid #e7d9cf",
            background: "#fff",
            padding: "1.5rem 2rem",
            display: "flex",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.75rem",
                background: "#f3ece7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d45f11",
                flexShrink: 0,
              }}
            >
              <RouteIconSvg size={24} />
            </div>
            <div>
              <h3 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "#1b130d" }}>
                Have your own raw itinerary to import?
              </h3>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "#9a6b4c", maxWidth: "480px", lineHeight: 1.6 }}>
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
              padding: "0.75rem 1.25rem",
              borderRadius: "0.75rem",
              background: "#f3ece7",
              color: "#1b130d",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap" as const,
              flexShrink: 0,
            }}
          >
            <UploadIconSvg />
            Import Itinerary
          </Link>
        </div>
      </div>

    </div>
  );
}

