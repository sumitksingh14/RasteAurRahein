import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Smartphone, ArrowRight } from "lucide-react";
import { getFeaturedTrips, getAllTrips, DEMO_AUTHOR } from "@/lib/queries";
import TripCard from "@/components/ui/TripCard";
import HeroSearch from "@/components/ui/HeroSearch";

export const metadata: Metadata = {
  title: "Raste Aur Raahein — Travel Blog by Sumit Singh",
  description:
    "Portfolio-style travel blog documenting high-altitude treks, desert roads, and off-the-beaten-path adventures across India and beyond.",
};

const TRIP_TYPES = ["Treks", "Road Trips", "Destinations", "Itineraries"];

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
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* ========================================================
          HERO SECTION — Large rounded card with search overlay
      ======================================================== */}
      <section
        style={{
          background: "#F7F7F7",
          paddingTop: "calc(var(--nav-height) + 1.5rem)",
          paddingBottom: "3rem",
        }}
      >
        <div className="container">
          {/* Hero Card */}
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              height: "min(560px, 60vw)",
              minHeight: "380px",
            }}
          >
            {/* Background image */}
            <Image
              src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=1920&q=85"
              alt="Stunning travel destination"
              fill
              style={{ objectFit: "cover" }}
              className="animate-ken-burns"
              priority
              quality={85}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
              }}
            />

            {/* Hero Text */}
            <div
              style={{
                position: "absolute",
                top: "2.5rem",
                left: "2.5rem",
                zIndex: 2,
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.2,
                  marginBottom: "0.75rem",
                  maxWidth: "520px",
                }}
              >
                Find your next great<br />Indian adventure
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1rem",
                  maxWidth: "400px",
                  lineHeight: 1.6,
                }}
              >
                Curated itineraries from high-altitude treks to coastal drives — every road has a story.
              </p>
            </div>

            {/* Search Bar Card — sits on bottom of hero card */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* ========================================================
          TRY HOSTING — "Share Your Journey" section
      ======================================================== */}
      <section style={{ background: "#FFFFFF", padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="hosting-grid"
          >
            {/* Text side */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "#262729",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}
              >
                Share Your Journey With Us
              </h2>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                  maxWidth: "420px",
                }}
              >
                Have an incredible trip story? Import your itinerary or write about your adventures and inspire thousands of fellow travellers across India.
              </p>
              <Link
                href="/import"
                id="hosting-cta-btn"
                className="btn btn-primary"
              >
                Import Your Itinerary
              </Link>
            </div>

            {/* Image side */}
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
                alt="Beautiful apartment interior"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED TRIPS — Property listing card grid
      ======================================================== */}
      <section style={{ background: "#F7F7F7", padding: "4rem 0" }}>
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#262729",
                marginBottom: "0.5rem",
                lineHeight: 1.2,
              }}
            >
              Featured Trips
              <br />
              <span style={{ color: "#262729" }}>Worth Reading</span>
            </h2>
            {/* Yellow underline accent */}
            <div
              style={{
                width: 48,
                height: 4,
                borderRadius: "2px",
                background: "#FEBB02",
                marginTop: "0.75rem",
              }}
            />
          </div>

          <div className="trip-grid">
            {featuredTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} featured priority />
            ))}
          </div>

          {/* View all link */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/trips"
              className="btn btn-outline"
            >
              View All Trips <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          DISCOVER MORE — About the blog (blue heading, yellow accent)
      ======================================================== */}
      <section style={{ background: "#FFFFFF", padding: "5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="hosting-grid"
          >
            {/* Text */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "#006CE4",
                  marginBottom: "0.5rem",
                  lineHeight: 1.25,
                }}
              >
                Discover More<br />
                About Indian Travel
              </h2>
              {/* Yellow underline */}
              <div
                style={{
                  width: 48,
                  height: 4,
                  borderRadius: "2px",
                  background: "#FEBB02",
                  marginBottom: "1.5rem",
                  marginTop: "0.75rem",
                }}
              />
              <p
                style={{
                  color: "#4B5563",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                From high-altitude Himalayan treks to Kerala backwaters and Rajasthan desert drives — Raste Aur Raahein documents real, honest travel experiences with detailed itineraries, cost breakdowns, and the kind of tips you only learn the hard way.
              </p>
              <Link
                href="/about"
                id="discover-more-btn"
                className="btn btn-primary"
              >
                Discover More
              </Link>
            </div>

            {/* Image */}
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"
                alt="Beautiful travel destination"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          LATEST POSTS
      ======================================================== */}
      <section style={{ background: "#F7F7F7", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#262729",
                marginBottom: "0.5rem",
              }}
            >
              Recent Adventures
            </h2>
            <div
              style={{
                width: 48,
                height: 4,
                borderRadius: "2px",
                background: "#FEBB02",
                marginTop: "0.75rem",
              }}
            />
          </div>

          <div className="trip-grid">
            {latestTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT AUTHOR — Author blurb with photo
      ======================================================== */}
      <section style={{ background: "#FFFFFF", padding: "5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "3rem",
              alignItems: "center",
              maxWidth: "900px",
            }}
            className="author-grid"
          >
            {/* Author photo */}
            <div
              style={{
                position: "relative",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "4px solid #FEBB02",
                boxShadow: "0 8px 32px rgba(254,187,2,0.2)",
              }}
              className="author-photo"
            >
              <Image
                src="/sumit-singh.png"
                alt={DEMO_AUTHOR.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="180px"
              />
            </div>

            {/* Text */}
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#FEBB02",
                  marginBottom: "0.5rem",
                }}
              >
                ✦ About the Author
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "1.75rem",
                  color: "#262729",
                  marginBottom: "1rem",
                }}
              >
                Hi, I&apos;m {DEMO_AUTHOR.name}
              </h2>
              <p
                style={{
                  color: "#4B5563",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                  fontSize: "0.95rem",
                }}
              >
                {DEMO_AUTHOR.bio}
              </p>
              <p style={{ color: "#6B7280", lineHeight: 1.75, marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                This blog documents real trips with honest cost breakdowns, detailed day-by-day itineraries, and the kind of tips you only learn by making mistakes.
              </p>
              <Link
                href="/about"
                className="btn btn-outline"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          DOWNLOAD APP / PWA SECTION
      ======================================================== */}
      <section style={{ background: "#F7F7F7", padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "center",
            }}
            className="app-download-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "#262729",
                  marginBottom: "0.5rem",
                }}
              >
                Take Raste Aur Raahein<br />With You Everywhere
              </h2>
              <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Install our app for offline access to all itineraries and trip guides
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/import"
                  id="import-trip-btn"
                  className="btn btn-primary"
                >
                  <Smartphone size={16} />
                  Import Itinerary
                </Link>
                <Link
                  href="/trips"
                  id="explore-all-btn"
                  className="btn btn-primary"
                >
                  <MapPin size={16} />
                  Browse Trips
                </Link>
              </div>
            </div>

            {/* Decorative stats */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                textAlign: "center",
              }}
              className="app-stats"
            >
              {[
                { value: "12+", label: "States Covered" },
                { value: "48+", label: "Trip Guides" },
                { value: "60k+", label: "km Documented" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "1.25rem 2rem",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    minWidth: "150px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 800,
                      fontSize: "1.75rem",
                      color: "#006CE4",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .animate-ken-burns {
          animation: kenBurns 14s ease-in-out infinite alternate;
        }
        @media (max-width: 767px) {
          .hosting-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .author-grid {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
          }
          .app-download-grid {
            grid-template-columns: 1fr !important;
          }
          .app-stats {
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
