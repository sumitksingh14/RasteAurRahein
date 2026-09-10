import type { Metadata } from "next";
import { getAllTrips } from "@/lib/queries";
import TripsClient from "./TripsClient";

export const metadata: Metadata = {
  title: "India Travel Itineraries — All Trips | Raste Aur Raahein",
  description:
    "Browse detailed travel itineraries across India — Himalayan road trips, desert drives, coastal routes, and forest trails. Filter by region, season, and budget.",
  alternates: { canonical: "/trips" },
};


type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TripsPage(props: PageProps) {
  const sp = await props.searchParams;
  const trips = await getAllTrips();
  
  const initialQuery = typeof sp.query === 'string' ? sp.query : "";
  const initialTag = typeof sp.tag === 'string' ? sp.tag : (typeof sp.tags === 'string' ? sp.tags : "");
  const initialSeason = typeof sp.season === 'string' ? sp.season : "Any";
  const initialDurationIdx = typeof sp.durationIdx === 'string' ? parseInt(sp.durationIdx, 10) : 0;
  const initialBudgetIdx = typeof sp.budgetIdx === 'string' ? parseInt(sp.budgetIdx, 10) : 0;
  const initialRegion = typeof sp.region === 'string' ? sp.region : "Any";
  const initialSortBy = (sp.sortBy === "views" || sp.sortBy === "title" || sp.sortBy === "date") ? sp.sortBy : "date";

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          padding: "4rem 0 3rem",
          background:
            "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-gold)",
              marginBottom: "0.75rem",
            }}
          >
            ✦ Explore
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            India Trips
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.7, fontSize: "1rem" }}>
            {trips.length} documented adventures across India — search or browse by tag.
          </p>
        </div>
      </div>

      <TripsClient 
        trips={trips} 
        initialQuery={initialQuery}
        initialTag={initialTag}
        initialSeason={initialSeason}
        initialDurationIdx={initialDurationIdx}
        initialBudgetIdx={initialBudgetIdx}
        initialRegion={initialRegion}
        initialSortBy={initialSortBy}
      />
    </div>
  );
}
