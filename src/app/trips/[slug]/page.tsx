import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Eye, MapPin, Tag, ArrowLeft } from "lucide-react";
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

// Fallback hero images by slug — 1920px for full-bleed hero banner
const FALLBACK_IMAGES: Record<string, string> = {
  // Spiti Valley — Ki Monastery with Spiti Valley and Himalayan peaks (user photo)
  "spiti-valley": "/images/spiti-ki-monastery.jpg",
  // Mysore · Coorg · Wayanad · Ooty — Mysore Palace (user photo)
  "mysore-coorg-wayanad-ooty": "/images/mysore-palace.jpg",
  // Rajasthan Desert Kingdom — camel dunes, Jaisalmer fort
  "rajasthan-desert-kingdom":
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=85",
  // Goa Beyond Beaches — turquoise coastline
  "goa-beyond-beaches":
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=85",
  // Sikkim 7 Days — Gurudongmar Lake with Kanchenjunga peaks (user photo)
  "sikkim-7-days": "/images/sikkim-gurudongmar.jpg",
  // Meghalaya 5 Days — Dawki/Umngot River, crystal-clear turquoise water (user photo)
  "meghalaya-5-days": "/images/meghalaya-dawki-river.jpg",
  // Kerala 7 Days — backwaters, houseboat
  "kerala-7-days":
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85",
  // Munsiyari 6 Days — Khaliya Top meadows with Panchachuli peaks (user photo)
  "munsiyari-6-days": "/images/munsiyari-panchachuli.jpg",
  // Char Dham Yatra — Kedarnath temple with Himalayan peaks and pilgrims
  "char-dham-yatra-uttarakhand":
    "https://images.unsplash.com/photo-1712733900711-d0b929d0d7cc?w=1920&q=85",
  // Panch Kedar Trek 10 Days — high-altitude Kedar shrine above the clouds (user photo)
  "panch-kedar-trek-10-days": "/images/panch-kedar-temple.png",
  // Pune Konkan Coast Raigad — user-provided aerial Konkan coastline photo
  "pune-konkan-coast-raigad": "/images/konkan-coast.png",
};
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85";


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) return {};

  const durationDays =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : null;

  return {
    title: trip.title,
    description: trip.excerpt,
    keywords: trip.tags,
    openGraph: {
      title: trip.title,
      description: trip.excerpt,
      type: "article",
      publishedTime: trip._createdAt,
      authors: trip.author?.name ? [trip.author.name] : undefined,
      images: [
        {
          url: FALLBACK_IMAGES[trip.slug] || DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: trip.title,
      description: trip.excerpt || "A journey documented on Raste Aur Raahein.",
    },
  };
}

export async function generateStaticParams() {
  const trips = await getAllTrips();
  return trips.map((trip) => ({ slug: trip.slug }));
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params;
  const [trip, allTrips] = await Promise.all([
    getTripBySlug(slug),
    getAllTrips(),
  ]);

  if (!trip) notFound();

  const imageSrc = FALLBACK_IMAGES[trip.slug] || DEFAULT_IMAGE;

  const relatedTrips = allTrips
    .filter(
      (t) =>
        t.slug !== trip.slug &&
        t.tags?.some((tag) => trip.tags?.includes(tag))
    )
    .slice(0, 3);

  const durationDays =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : null;

  return (
    <article>
      <ViewCountTracker slug={trip.slug} />
      <ReadingProgress />
      {/* Author E-E-A-T schema — injected once per trip page */}
      <AuthorSchema author={trip.author ?? DEMO_AUTHOR} />
      {/* ============================================================
          HERO
      ============================================================ */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          minHeight: 480,
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
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 40%, rgba(10,10,15,0.2) 100%)",
          }}
        />

        {/* Content on hero */}
        <div
          className="container"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "3rem",
            paddingTop: "calc(var(--nav-height) + 2rem)",
          }}
        >
          {/* Back link */}
          <Link
            href="/trips"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              marginBottom: "auto",
              transition: "color var(--transition)",
            }}
          >
            <ArrowLeft size={14} />
            All Trips
          </Link>

          {/* Tags */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {trip.tags?.slice(0, 4).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              color: "white",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              maxWidth: 800,
            }}
          >
            {trip.title}
          </h1>

          {/* Meta bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.875rem",
              flexWrap: "wrap",
            }}
          >
            {trip.country && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={14} />
                {trip.country}
              </span>
            )}
            {trip.startDate && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Calendar size={14} />
                {format(new Date(trip.startDate), "MMMM yyyy")}
              </span>
            )}
            {durationDays && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Clock size={14} />
                {durationDays} days
              </span>
            )}
            {trip.viewCount !== undefined && (
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Eye size={14} />
                {trip.viewCount.toLocaleString()} views
              </span>
            )}
            <ShareButton title={trip.title} excerpt={trip.excerpt} />
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div
          className="trip-layout"
          style={{ alignItems: "start" }}
        >
          {/* Left — Tabs */}
          <div>
            {trip.excerpt && (
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "2.5rem",
                  fontStyle: "italic",
                  borderLeft: "3px solid var(--accent-gold)",
                  paddingLeft: "1.25rem",
                }}
              >
                {trip.excerpt}
              </p>
            )}
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
              <LikeButton type="trip" id={trip.slug} />
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

            {/* PDF Download */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <PDFDownloadButton trip={trip} />
            )}
          </aside>
        </div>
      </div>

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
                marginBottom: "2rem",
                fontSize: "1.75rem",
              }}
            >
              You Might Also Like
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
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
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </article>
  );
}
