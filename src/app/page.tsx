import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Compass, BookOpen, TrendingUp } from "lucide-react";
import { getFeaturedTrips, getAllTrips, DEMO_AUTHOR } from "@/lib/queries";
import TripCard from "@/components/ui/TripCard";

export const metadata: Metadata = {
  title: "Raste Aur Raahein — Travel Blog by Sumit Singh",
  description:
    "Portfolio-style travel blog documenting high-altitude treks, desert roads, and off-the-beaten-path adventures across India and beyond.",
};

const HERO_STATS = [
  { value: "12+", label: "Countries" },
  { value: "48+", label: "Trips" },
  { value: "60k+", label: "km Travelled" },
  { value: "200+", label: "Photos Published" },
];

const TAGS = [
  "Himalayas", "Solo", "Adventure", "Budget", "Rajasthan",
  "Trekking", "Food", "Culture", "Beaches", "Monsoon",
];

export default async function HomePage() {
  const [featuredTrips, allTrips] = await Promise.all([
    getFeaturedTrips(),
    getAllTrips(),
  ]);

  const latestTrips = [...allTrips]
    .sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div>
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section
        className="force-dark"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Image
            src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=1920&q=85"
            alt="Snowy mountain landscape"
            fill
            style={{ objectFit: "cover" }}
            className="animate-ken-burns"
            priority
            quality={85}
          />
          {/* Multi-layer gradient for legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(3,15,20,0.9) 0%, rgba(6,22,29,0.6) 50%, rgba(10,30,40,0.3) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 20% 50%, rgba(137,180,250,0.15) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "calc(var(--nav-height) + 4rem)",
            paddingBottom: "6rem",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.4rem 1rem",
              background: "var(--accent-gold-dim)",
              border: "1px solid var(--border-accent)",
              borderRadius: "100px",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--accent-gold)",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <Compass size={13} />
            Travel · Stories · Itineraries
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              maxWidth: "800px",
            }}
          >
            Every{" "}
            <span className="gradient-text">Road</span>
            {" "}Has a{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent-gold-light)" }}>Story</span>
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 560,
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            High-altitude deserts, ancient monasteries, and roads no map can prepare
            you for. Welcome to Raste Aur Raahein — a curated record of journeys
            worth reliving.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/trips" className="btn btn-primary" id="hero-explore-btn">
              Explore Trips
              <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn btn-outline" id="hero-about-btn"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
            >
              About Me
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "4rem",
              flexWrap: "wrap",
            }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="glass-card" style={{ padding: "1.5rem", minWidth: "160px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            animation: "fadeInUp 1s ease 1s both",
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))",
            }}
          />
          scroll
        </div>
      </section>

      {/* ========================================================
          FEATURED TRIPS
      ======================================================== */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "3rem",
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
                ✦ Featured
              </div>
              <h2 style={{ color: "var(--text-primary)" }}>Trips Worth Reading</h2>
            </div>
            <Link
              href="/trips"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--accent-gold)",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "gap var(--transition)",
              }}
              className="view-all-link"
            >
              View All Trips <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featuredTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} featured priority />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT BLURB
      ======================================================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Author photo */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  maxWidth: 380,
                }}
              >
                <Image
                  src="/sumit-singh.png"
                  alt={DEMO_AUTHOR.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(0deg, rgba(10,10,15,0.4) 0%, transparent 50%)",
                  }}
                />
              </div>
              {/* Floating stat card */}
              <div
                className="glass-card"
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  right: "-1rem",
                  padding: "1rem 1.25rem",
                  textAlign: "center",
                  minWidth: 120,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  5+
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Years on the Road
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
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
                ✦ About Me
              </div>
              <h2 style={{ color: "var(--text-primary)", marginBottom: "1.25rem" }}>
                Hi, I&apos;m {DEMO_AUTHOR.name}
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                  fontSize: "1.05rem",
                }}
              >
                {DEMO_AUTHOR.bio}
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "0.95rem" }}>
                This blog is my attempt to document those trips in a way that&apos;s actually useful — not just pretty Instagram shots, but real itineraries, honest cost breakdowns, and the kind of tips you only learn by making mistakes.
              </p>
              <Link href="/about" className="btn btn-outline" id="about-read-more-btn">
                <BookOpen size={16} />
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          POPULAR TAGS
      ======================================================== */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              Browse by tag
            </span>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {TAGS.map((tag) => (
                <Link
                  key={tag}
                  href={`/trips?tag=${encodeURIComponent(tag)}`}
                  className="tag-pill"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          LATEST POSTS
      ======================================================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "3rem",
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
                ✦ Latest
              </div>
              <h2 style={{ color: "var(--text-primary)" }}>Recent Adventures</h2>
            </div>
            <Link
              href="/trips"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--accent-gold)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              <TrendingUp size={15} />
              All Posts
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {latestTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CTA BANNER
      ======================================================== */}
      <section
        style={{
          padding: "5rem 0",
          background:
            "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.4rem 1rem",
              background: "var(--accent-gold-dim)",
              border: "1px solid var(--border-accent)",
              borderRadius: "100px",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--accent-gold)",
              marginBottom: "1.5rem",
            }}
          >
            <MapPin size={13} />
            Import your own trip
          </div>
          <h2
            style={{
              color: "var(--text-primary)",
              marginBottom: "1rem",
              maxWidth: 600,
              margin: "0 auto 1rem",
            }}
          >
            Have a Trip? Import Your Itinerary
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "2rem",
              maxWidth: 480,
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Paste your HTML from Google Docs, TripIt, or any planner — we&apos;ll
            parse it into a beautiful, structured trip page automatically.
          </p>
          <Link href="/import" className="btn btn-primary" id="import-cta-btn">
            Import Itinerary
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
