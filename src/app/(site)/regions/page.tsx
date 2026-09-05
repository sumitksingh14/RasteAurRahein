import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { REGIONS, filterTripsByRegion } from "@/lib/regions";
import { getAllTrips } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Explore by Region",
  description:
    "Browse travel itineraries, cost breakdowns, and trip guides organised by region — Himalayas, South India, Rajasthan, Coastal, and Northeast India.",
  openGraph: {
    title: "Explore by Region | Raste Aur Raahein",
    description:
      "Himalayas, South India, Rajasthan, Coastal, Northeast — find trips by where you want to go.",
  },
};

export default async function RegionsIndexPage() {
  const allTrips = await getAllTrips();

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* ── Header ── */}
      <section
        style={{
          padding: "5rem 0 3rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.35rem 0.9rem",
              background: "var(--accent-gold-dim)",
              border: "1px solid var(--border-accent)",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--accent-gold)",
              marginBottom: "1.25rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <MapPin size={12} />
            Where do you want to go?
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Explore by Region
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            Every trip documented on this blog organised by geography — from Himalayan
            cold deserts to South Indian coffee country.
          </p>
        </div>
      </section>

      {/* ── Region Cards ── */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
              gap: "1.75rem",
            }}
          >
            {REGIONS.map((region) => {
              const count = filterTripsByRegion(allTrips, region).length;
              return (
                <Link
                  key={region.slug}
                  href={`/regions/${region.slug}`}
                  style={{ display: "block", textDecoration: "none" }}
                  id={`region-card-${region.slug}`}
                >
                  <div
                    className="glass-card region-index-card"
                    style={{
                      overflow: "hidden",
                      borderRadius: "var(--radius-xl)",
                      transition: "transform var(--transition), box-shadow var(--transition)",
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={region.heroImage}
                        alt={region.heroAlt}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(0deg, rgba(10,10,15,0.7) 0%, transparent 55%)",
                        }}
                      />
                      {/* Trip count badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          padding: "0.35rem 0.8rem",
                          background: "var(--accent-gold-dim)",
                          border: "1px solid var(--border-accent)",
                          borderRadius: "100px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          color: "var(--accent-gold)",
                        }}
                      >
                        {count > 0 ? `${count} trip${count !== 1 ? "s" : ""}` : "Coming soon"}
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--accent-gold)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        ✦ Region Guide
                      </div>
                      <h2
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.4rem",
                          color: "var(--text-primary)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {region.headline}
                      </h2>
                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.875rem",
                          lineHeight: 1.65,
                          marginBottom: "1.25rem",
                        }}
                      >
                        {region.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "var(--accent-gold)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        Explore region <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .region-index-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 40px rgba(201,168,76,0.12) !important;
        }
      `}</style>
    </div>
  );
}
