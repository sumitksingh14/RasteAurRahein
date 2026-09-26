import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Eye, MapPin, Tag, ArrowLeft, RefreshCw } from "lucide-react";
import { getTripBySlug, getAllTrips, DEMO_AUTHOR } from "@/lib/queries";
import TripTabs from "./TripTabs";
import ShareButton from "./ShareButton";
import TripCard from "@/components/ui/TripCard";
import ViewCountTracker from "@/components/ui/ViewCountTracker";
import ReadingProgress from "@/components/ui/ReadingProgress";
import TableOfContents from "@/components/ui/TableOfContents";
import PDFDownloadButton from "@/components/ui/PDFDownloadButton";
import AuthorSchema from "@/components/ui/AuthorSchema";
import FAQSchema from "@/components/ui/FAQSchema";
import { buildTripFAQ } from "@/lib/faqBuilder";
import LikeButton from "@/components/ui/LikeButton";
import TripRating from "@/components/ui/TripRating";
import CommentSection from "@/components/ui/CommentSection";
import { format } from "date-fns";
import { getSession } from "@/lib/session";
import { isTripSaved } from "@/lib/savedTrips";
import BookmarkButton from "@/components/ui/BookmarkButton";
import StartTripButton from "@/components/ui/StartTripButton";
import RemixTripButton from "@/components/ui/RemixTripButton";
import AddToCalendarButton from "@/components/ui/AddToCalendarButton";
import GPXDownloadButton from "@/components/ui/GPXDownloadButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import NewsletterInline from "@/components/ui/NewsletterInline";
import TripAlertBanner from "@/components/ui/TripAlertBanner";
import TripSchema from "@/components/ui/TripSchema";
import TravelerReviews from "@/components/ui/TravelerReviews";
import TripCTABlock from "@/components/ui/TripCTABlock";
import TripPartnerLinks from "@/components/ui/TripPartnerLinks";
import QuickFactsBox from "@/components/ui/QuickFactsBox";
import TripLeadCapture from "@/components/ui/TripLeadCapture";
import { getGuidesForTrip } from "@/lib/data/guides";

import { getTripImage } from "@/lib/data/tripImages";


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) return {};

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://raste-aur-rahein.vercel.app"
  ).replace(/\/$/, "");

  // Clamp description to 155 chars for Google snippet display
  const rawDescription = trip.excerpt ?? "";
  const description =
    rawDescription.length > 155
      ? rawDescription.slice(0, 152) + "…"
      : rawDescription || "A detailed travel itinerary on Raste Aur Raahein.";

  const imageUrl = getTripImage(trip.slug);
  // Make image absolute so OG scrapers (Slack, Twitter, etc.) don't 404
  const absoluteImage = imageUrl.startsWith("http")
    ? imageUrl
    : `${siteUrl}${imageUrl}`;

  return {
    title: `${trip.title} — Raste Aur Raahein`,
    description,
    keywords: trip.tags,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: `/trips/${trip.slug}`,
    },
    openGraph: {
      title: `${trip.title} — Raste Aur Raahein`,
      description,
      type: "article",
      siteName: "Raste Aur Raahein",
      publishedTime: trip._createdAt,
      modifiedTime: trip._updatedAt || trip._createdAt,
      authors: trip.author?.name ? [trip.author.name] : ["Sumit Singh"],
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${trip.title} — Raste Aur Raahein`,
      description,
      images: [absoluteImage],
    },
  };
}


export async function generateStaticParams() {
  const trips = await getAllTrips();
  return trips.map((trip) => ({ slug: trip.slug }));
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params;
  const [trip, allTrips, session] = await Promise.all([
    getTripBySlug(slug),
    getAllTrips(),
    getSession(),
  ]);

  if (!trip) notFound();

  // Server-side bookmark state (false for signed-out users)
  const initialSaved = session
    ? await isTripSaved(session.userId, trip.slug)
    : false;

  const imageSrc = getTripImage(trip.slug);

  // Ranked related trips: calculate tag overlap + category match
  const relatedTrips = allTrips
    .filter((t) => t.slug !== trip.slug)
    .map((t) => {
      let score = 0;
      if (t.tripType && trip.tripType && t.tripType.toLowerCase() === trip.tripType.toLowerCase()) {
        score += 3;
      }
      if (t.bestSuggestedMonth && trip.bestSuggestedMonth && t.bestSuggestedMonth === trip.bestSuggestedMonth) {
        score += 2;
      }
      const sharedTags = t.tags?.filter((tag) => trip.tags?.includes(tag))?.length || 0;
      score += sharedTags * 2;
      return { trip: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.trip)
    .slice(0, 4);

  const relatedGuides = getGuidesForTrip(trip.slug);

  const durationDays =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : trip.itinerary?.length || null;

  return (
    <article data-trip-region={trip.tags?.[0] || "Himachal"}>
      <ViewCountTracker slug={trip.slug} />
      <ReadingProgress />
      <TripSchema trip={trip} />
      {/* Author E-E-A-T schema — injected once per trip page */}
      <AuthorSchema author={trip.author ?? DEMO_AUTHOR} />
      {/* ============================================================
          HERO
      ============================================================ */}
      <div
        className="trip-hero-section"
        style={{
          position: "relative",
          minHeight: "68vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageSrc}
          alt={trip.title}
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDhwVFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAUAB4DASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAABQMEBgL/xAAlEAABBAEDBAMBAAAAAAAAAAABAAIDEQQhMUFRExRhkaH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARESIf/aAAwDAQACEQMRAD8AxiNcPuQJqy1b2RWQcS3GVNO5yTzRVN8lryWYjUKTRDlvAL9zIoCuCq2U1VG6OcurGgkKYMQhPWnlixU3FvuXv2xhRShVrQFWEJIqKCLkqVyT0H//2Q=="
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.65) 45%, rgba(10,10,15,0.25) 100%)",
          }}
        />

        {/* Content on hero */}
        <div
          className="container trip-hero-content"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingTop: "calc(var(--nav-height) + 1.5rem)",
            paddingBottom: "2.5rem",
          }}
        >
          {/* Breadcrumb + Back link row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/trips"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.85rem",
                transition: "color var(--transition)",
              }}
            >
              <ArrowLeft size={14} />
              All Trips
            </Link>
            <div className="trip-breadcrumb-hide-mobile">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: trip.tripType || trip.country || "Trips", href: "/trips" },
                  { label: trip.title },
                ]}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.85rem" }}>
            {trip.tags?.slice(0, 4).map((tag) => (
              <span key={tag} className="tag-pill" style={{ fontSize: "0.72rem", padding: "0.2rem 0.6rem" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "white",
              fontSize: "clamp(1.75rem, 5.5vw, 3.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "1rem",
              maxWidth: 820,
            }}
          >
            {trip.title}
          </h1>

          {/* Meta bar — text facts */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem 1.25rem",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.82rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            {trip.country && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={13} color="#FEBB02" />
                {trip.country}
              </span>
            )}
            {trip.startDate && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Calendar size={13} />
                {format(new Date(trip.startDate), "MMMM yyyy")}
              </span>
            )}
            {durationDays && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Clock size={13} color="#FEBB02" />
                {durationDays} days
              </span>
            )}
            {(trip.viewCount ?? 0) > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Eye size={13} />
                {trip.viewCount!.toLocaleString()} views
              </span>
            )}
            {trip._updatedAt && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <RefreshCw size={12} />
                Updated {format(new Date(trip._updatedAt), "MMM yyyy")}
              </span>
            )}
          </div>

          {/* Hero Action Toolbar */}
          <div className="trip-hero-actions">
            <div className="trip-hero-actions-primary">
              <StartTripButton tripSlug={trip.slug} tripTitle={trip.title} />
              <RemixTripButton trip={trip} />
            </div>
            <div className="trip-hero-actions-secondary">
              <div className="trip-hero-tools">
                <BookmarkButton tripSlug={trip.slug} initialSaved={initialSaved} />
                <ShareButton title={trip.title} excerpt={trip.excerpt} />
              </div>
              <AddToCalendarButton trip={trip} />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <div
        className="container"
        style={{
          paddingTop: "2rem",
          paddingBottom: "calc(var(--mobile-tab-height, 60px) + 4rem)",
        }}
      >
        {/* Mobile Quick Facts Bar — visible on mobile (< 900px) */}
        <div className="trip-mobile-quick-facts">
          <div className="quick-fact-item">
            <span className="qf-label">DURATION</span>
            <span className="qf-value">{durationDays ? `${durationDays} Days` : "Multi-day"}</span>
          </div>
          <div className="quick-fact-item">
            <span className="qf-label">BUDGET</span>
            <span className="qf-value">{trip.totalBudget ? `₹${trip.totalBudget.toLocaleString()}` : "–"}</span>
          </div>
          <div className="quick-fact-item">
            <span className="qf-label">BEST SEASON</span>
            <span className="qf-value">{trip.bestSuggestedMonth || "Year-round"}</span>
          </div>
          <div className="quick-fact-item">
            <span className="qf-label">TYPE / REGION</span>
            <span className="qf-value">{trip.tripType || trip.country || "Adventure"}</span>
          </div>
        </div>

        <div
          className="trip-layout"
          style={{ alignItems: "start", width: "100%", maxWidth: "100%" }}
        >
          {/* Left — Tabs */}
          <div style={{ minWidth: 0, width: "100%", maxWidth: "100%" }}>
            <TripAlertBanner slug={trip.slug} />
            
            {/* Quick Facts box — single source of truth from trip.quickFacts */}
            <QuickFactsBox
              quickFacts={trip.quickFacts ?? {}}
              trip={{
                bestSuggestedMonth: trip.bestSuggestedMonth,
                itinerary: trip.itinerary,
                difficulty: trip.difficulty,
              }}
            />

            {/* Direct answer paragraph — Snippet-Winning Answer First Block */}
            {trip.excerpt && (
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "var(--bg-secondary, #f9fafb)",
                  borderLeft: "4px solid var(--accent-gold, #b45309)",
                  borderRadius: "0 0.5rem 0.5rem 0",
                  margin: "1.5rem 0 2rem",
                }}
              >
                <p
                  style={{
                    fontSize: "1.0625rem",
                    color: "var(--text-primary, #111827)",
                    lineHeight: 1.7,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {trip.excerpt}
                </p>
              </div>
            )}

            {/* Lead capture: Free GPX track & route map */}
            <TripLeadCapture trip={trip} />

            <TripTabs trip={trip} />

            {/* FAQ — auto-generated from trip structured data */}
            <FAQSchema
              items={buildTripFAQ({
                title: trip.title,
                bestSuggestedMonth: trip.bestSuggestedMonth,
                totalBudget: trip.totalBudget,
                startDate: trip.startDate,
                endDate: trip.endDate,
                country: trip.country,
                tripType: trip.tripType,
              })}
            />
          </div>

          {/* Right — Sidebar */}
          <aside
            style={{
              position: "sticky",
              top: "calc(var(--nav-height) + 2rem)",
            }}
          >
            {/* Table of Contents */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <TableOfContents days={trip.itinerary} />
            )}

            {/* Like button */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Did this help you plan?
              </div>
              <LikeButton type="trip" id={trip.slug} initialCount={trip.likes} />
            </div>

            {/* Trip Rating */}
            <TripRating tripSlug={trip.slug} />
            {/* Trip overview card */}
            <div
              className="glass-card"
              style={{ padding: "1.5rem", marginBottom: "1.5rem" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  marginBottom: "1.25rem",
                }}
              >
                Trip Overview
              </h3>

              {[
                { label: "Destination", value: trip.country || "India" },
                { label: "Duration", value: durationDays ? `${durationDays} days` : "–" },
                { label: "Type", value: trip.tripType || "–" },
                {
                  label: "Budget",
                  value:
                    trip.totalBudget
                      ? `₹${trip.totalBudget.toLocaleString()}`
                      : "–",
                },
                {
                  label: "Best Suggested Month to Visit",
                  value: trip.bestSuggestedMonth || "–",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.625rem 0",
                    borderBottom: "1px solid var(--border)",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      textAlign: "right",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}

              {/* Tags */}
              {trip.tags && trip.tags.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "0.75rem",
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <Tag size={11} />
                    Tags
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {trip.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/trips?tag=${encodeURIComponent(tag)}`}
                        className="tag-pill"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author card */}
            {trip.author && (
              <div className="glass-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--bg-primary)",
                      fontFamily: "var(--font-serif)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {trip.author.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {trip.author.name}
                    </div>
                    <Link
                      href="/about"
                      style={{ fontSize: "0.75rem", color: "var(--accent-gold)" }}
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Partner / affiliate links */}
            <div className="glass-card" style={{ padding: "1.25rem", marginTop: "1rem" }}>
              <TripPartnerLinks tripSlug={trip.slug} country={trip.country} />
            </div>

            {/* PDF Download — auth gate handled inside component */}
            <PDFDownloadButton trip={trip} />
          </aside>
        </div>
      </div>

      {/* ============================================================
          RECIPROCAL FEATURED IN GUIDES
      ============================================================ */}
      {relatedGuides.length > 0 && (
        <section
          style={{
            borderTop: "1px solid var(--border)",
            padding: "3.5rem 0 0",
            background: "var(--bg-secondary)",
          }}
        >
          <div className="container">
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--accent-gold, #b45309)",
                display: "inline-block",
                marginBottom: "0.5rem",
              }}
            >
              ✦ Curated Playbooks
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
                fontSize: "1.5rem",
              }}
            >
              Featured in In-Depth Guides
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  style={{
                    display: "block",
                    padding: "1.25rem",
                    borderRadius: "0.75rem",
                    background: "var(--bg-primary, #fff)",
                    border: "1px solid var(--border, #e5e7eb)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--accent-gold, #b45309)" }}>
                    {guide.category} • {guide.readTime}
                  </span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0.35rem 0 0.5rem", color: "var(--text-primary, #111827)" }}>
                    {guide.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary, #4b5563)", lineHeight: 1.5 }}>
                    {guide.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          RELATED TRIPS
      ============================================================ */}
      {relatedTrips.length > 0 && (
        <section
          style={{
            borderTop: "1px solid var(--border)",
            padding: "4rem 0",
            background: "var(--bg-secondary)",
          }}
        >
          <div className="container">
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                fontSize: "1.75rem",
              }}
            >
              Continue the Journey: Related Field Notes
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginBottom: "2rem" }}>
              Explore connecting overland circuits, sister valleys, and seasonal alternates.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                gap: "1.25rem",
              }}
            >
              {relatedTrips.map((t) => (
                <TripCard key={t._id} trip={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          NEWSLETTER CTA — between related trips and comments
      ============================================================ */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <NewsletterInline variant="card" source="trip-page" />
        </div>
      </section>

      {/* ============================================================
          TRAVELER REVIEWS
      ============================================================ */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <TravelerReviews tripSlug={trip.slug} />
        </div>
      </section>

      {/* ============================================================
          CUSTOM PLANNING CTA
      ============================================================ */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <TripCTABlock trip={trip} />
        </div>
      </section>

      {/* ============================================================
          COMMENTS
      ============================================================ */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <CommentSection tripSlug={trip.slug} />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .trip-layout {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .trip-layout > * {
            min-width: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </article>
  );
}
