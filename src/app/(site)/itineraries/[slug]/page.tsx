import type { Metadata } from "next";
import { Suspense } from "react";
import { getItineraryBySlug } from "@/lib/savedItineraries";
import ItineraryViewClient from "./ItineraryViewClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let itinerary = null;
  try {
    itinerary = await getItineraryBySlug(slug);
  } catch {
    // ignore
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raste-aur-rahein.vercel.app";
  const pageUrl = `${siteUrl}/itineraries/${slug}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`;

  if (!itinerary) {
    return {
      title: "Travel Itinerary — Raste Aur Raahein",
      description: "Interactive AI-generated and customized travel itinerary on Raste Aur Raahein.",
      openGraph: {
        title: "Travel Itinerary — Raste Aur Raahein",
        description: "Interactive AI-generated and customized travel itinerary on Raste Aur Raahein.",
        url: pageUrl,
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Travel Itinerary" }],
      },
    };
  }

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
  let itinerary = null;
  try {
    itinerary = await getItineraryBySlug(slug);
  } catch {
    // ignore
  }

  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", paddingTop: "var(--nav-height)", background: "var(--bg-primary, #111318)" }}>
          <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                width: 36,
                height: 36,
                border: "3px solid rgba(255,255,255,0.1)",
                borderTopColor: "#006CE4",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              Loading itinerary…
            </p>
          </div>
        </div>
      }
    >
      <ItineraryViewClient slug={slug} initialServerItinerary={itinerary} />
    </Suspense>
  );
}
