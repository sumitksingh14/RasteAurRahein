import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar, Wallet, Sparkles, Share2, ArrowLeft, Clock } from "lucide-react";
import { getItineraryBySlug } from "@/lib/savedItineraries";
import ShareItineraryButtons from "./ShareItineraryButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raste-aur-rahein.vercel.app";
  const pageUrl = `${siteUrl}/itineraries/${slug}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`;

  return {
    title: `${itinerary.title} — Raste Aur Raahein`,
    description: `A ${itinerary.days}-day itinerary to ${itinerary.destination}. ${itinerary.budget ? `Budget: ${itinerary.budget}.` : ""} AI-generated and shared on Raste Aur Raahein.`,
    openGraph: {
      title: itinerary.title,
      description: `${itinerary.days}-day itinerary · ${itinerary.destination}`,
      url: pageUrl,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: itinerary.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: itinerary.title,
      description: `${itinerary.days}-day itinerary to ${itinerary.destination}`,
      images: [ogImageUrl],
    },
  };
}

export default async function SharedItineraryPage({ params }: Props) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raste-aur-rahein.vercel.app";
  const pageUrl = `${siteUrl}/itineraries/${slug}`;

  let days: { dayNumber: number; title: string; summary?: string; activities?: { title: string; description?: string; time?: string; type?: string }[] }[] = [];
  let overview: string | undefined;
  let totalBudgetEstimate: string | undefined;
  let tags: string[] = [];

  try {
    const parsed = JSON.parse(itinerary.itineraryJson);
    days = parsed.days || [];
    overview = parsed.overview;
    totalBudgetEstimate = parsed.totalBudgetEstimate;
    tags = parsed.tags || [];
  } catch {
    // pass
  }

  const TYPE_EMOJI: Record<string, string> = {
    transport: "🚗", accommodation: "🏨", food: "🍴", activity: "⛺", sightseeing: "📸",
  };

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "var(--bg-primary, #111318)" }}>
      {/* Hero banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2a1a 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "3.5rem 0 2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle topo overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,108,228,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative" }}>
          <Link
            href="/ai-planner"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginBottom: "1.5rem", textDecoration: "none" }}
          >
            <ArrowLeft size={13} /> Back to AI Planner
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Sparkles size={14} style={{ color: "#FEBB02" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FEBB02" }}>
              AI-Generated Itinerary
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              maxWidth: 720,
            }}
          >
            {itinerary.title}
          </h1>

          {/* Meta pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={14} /> {itinerary.destination}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={14} /> {itinerary.days} days
            </span>
            {(itinerary.budget || totalBudgetEstimate) && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Wallet size={14} /> {itinerary.budget || totalBudgetEstimate}
              </span>
            )}
            {itinerary.pace && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Clock size={14} /> {itinerary.pace.charAt(0).toUpperCase() + itinerary.pace.slice(1)} pace
              </span>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{ padding: "0.2rem 0.7rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share buttons */}
          <ShareItineraryButtons url={pageUrl} title={itinerary.title} destination={itinerary.destination} days={itinerary.days} />
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: 800 }}>
        {/* Overview */}
        {overview && (
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary, rgba(255,255,255,0.7))",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              borderLeft: "3px solid #FEBB02",
              paddingLeft: "1.25rem",
              fontStyle: "italic",
            }}
          >
            {overview}
          </p>
        )}

        {/* Day-by-day */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {days.map((day) => (
            <div
              key={day.dayNumber}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {/* Day header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.25rem",
                  background: "rgba(0,108,228,0.1)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#006CE4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  D{day.dayNumber}
                </span>
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1rem", color: "#fff", margin: 0 }}>
                  {day.title}
                </h2>
              </div>

              <div style={{ padding: "1rem 1.25rem" }}>
                {day.summary && (
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary, rgba(255,255,255,0.6))", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {day.summary}
                  </p>
                )}

                {day.activities && day.activities.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {day.activities.map((act, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          padding: "0.6rem 0.75rem",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>
                          {TYPE_EMOJI[act.type || ""] || "📍"}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            {act.title}
                            {act.time && <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>{act.time}</span>}
                          </div>
                          {act.description && (
                            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "2px 0 0" }}>
                              {act.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "rgba(0,108,228,0.08)",
            border: "1px solid rgba(0,108,228,0.2)",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem", fontSize: "0.95rem" }}>
            Want to plan your own trip to India?
          </p>
          <Link href="/ai-planner" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={15} /> Try the AI Planner for free
          </Link>
        </div>
      </div>
    </div>
  );
}
