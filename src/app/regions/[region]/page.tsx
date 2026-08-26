import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { getAllTrips } from "@/lib/queries";
import { REGIONS, filterTripsByRegion } from "@/lib/regions";
import TripCard from "@/components/ui/TripCard";

interface Props {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region: slug } = await params;
  const region = REGIONS.find((r) => r.slug === slug);
  if (!region) return {};

  return {
    title: region.label,
    description: region.description,
    openGraph: {
      title: `${region.headline} | Raste Aur Raahein`,
      description: region.description,
      type: "website",
      images: [{ url: region.heroImage, width: 1200, height: 630, alt: region.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${region.headline} | Raste Aur Raahein`,
      description: region.description,
    },
  };
}

export default async function RegionHubPage({ params }: Props) {
  const { region: slug } = await params;
  const region = REGIONS.find((r) => r.slug === slug);
  if (!region) notFound();

  const allTrips = await getAllTrips();
  const regionTrips = filterTripsByRegion(allTrips, region);
  const relatedRegions = REGIONS.filter((r) => region.related.includes(r.slug));

  // Region hub page JSON-LD
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: region.headline,
    description: region.description,
    url: `https://rasteaurrahein.com/regions/${region.slug}`,
    about: {
      "@type": "Place",
      name: region.label,
      description: region.intro,
    },
  };

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* ── Hero ── */}
      <section
        className="force-dark"
        style={{
          position: "relative",
          height: "60vh",
          minHeight: 420,
          overflow: "hidden",
        }}
      >
        <Image
          src={region.heroImage}
          alt={region.heroAlt}
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={85}
        />
        {/* Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.2) 100%)",
          }}
        />

        {/* Hero content */}
        <div
          className="container"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "3.5rem",
            paddingTop: "calc(var(--nav-height) + 2rem)",
          }}
        >
          {/* Breadcrumb */}
          <Link
            href="/trips"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
              marginBottom: "auto",
              transition: "color var(--transition)",
            }}
          >
            <ArrowLeft size={13} />
            All Trips
          </Link>

          {/* Eyebrow */}
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
              marginBottom: "1rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            <MapPin size={12} />
            Region Guide
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1rem",
              maxWidth: 700,
            }}
          >
            {region.headline}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 580,
            }}
          >
            {region.description}
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div
            style={{
              borderLeft: "3px solid var(--accent-gold)",
              paddingLeft: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}
            >
              {region.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ── Trip Grid ── */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--accent-gold)",
                  marginBottom: "0.5rem",
                }}
              >
                ✦ {region.label}
              </div>
              <h2 style={{ color: "var(--text-primary)" }}>
                {regionTrips.length > 0
                  ? `${regionTrips.length} Trip${regionTrips.length !== 1 ? "s" : ""}`
                  : "Trips Coming Soon"}
              </h2>
            </div>
            <Link
              href={`/trips?tag=${encodeURIComponent(region.tags[0])}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--accent-gold)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Browse All <ArrowRight size={14} />
            </Link>
          </div>

          {regionTrips.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {regionTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          ) : (
            <div
              className="glass-card"
              style={{ padding: "4rem 2rem", textAlign: "center" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗺️</div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                }}
              >
                Itineraries for {region.label} coming soon
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  maxWidth: 400,
                  margin: "0 auto 1.5rem",
                }}
              >
                We're documenting trips to this region. In the meantime, browse
                all published trips below.
              </p>
              <Link href="/trips" className="btn btn-outline">
                Browse All Trips
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Related Regions ── */}
      {relatedRegions.length > 0 && (
        <section
          style={{
            borderTop: "1px solid var(--border)",
            padding: "4rem 0",
            background: "var(--bg-secondary)",
          }}
        >
          <div className="container">
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "1.5rem",
              }}
            >
              Explore Other Regions
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {relatedRegions.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/regions/${rel.slug}`}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <div
                    className="glass-card"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "var(--radius-md)",
                      aspectRatio: "16/9",
                    }}
                  >
                    <Image
                      src={rel.heroImage}
                      alt={rel.heroAlt}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="region-card-img"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(0deg, rgba(10,10,15,0.85) 0%, transparent 55%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "1rem 1.25rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          color: "var(--accent-gold)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "4px",
                        }}
                      >
                        Region
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontFamily: "var(--font-serif)",
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        {rel.label}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .region-card-img:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
