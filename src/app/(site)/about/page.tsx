"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Camera, Code2, Mountain, ArrowRight, AtSign, Globe, Mail } from "lucide-react";
import { DEMO_AUTHOR } from "@/lib/queries";

const TRAVEL_STATS = [
  { value: "12+", label: "Countries", Icon: MapPin },
  { value: "48+", label: "Trips Documented", Icon: Mountain },
  { value: "60k+", label: "km Travelled", Icon: ArrowRight },
  { value: "200+", label: "Photos Published", Icon: Camera },
];

const JOURNEY_MILESTONES = [
  {
    step: "01",
    tag: "The Spark",
    title: "First Solo Trip — Leh Ladakh",
    description:
      "Took a bus from Manali to Leh across high Himalayan passes. Dealt with altitude sickness, rugged terrain, and loved every second of it.",
  },
  {
    tag: "Inception",
    step: "02",
    title: "Founding Raste Aur Raahein",
    description:
      "Deliberate planning and documenting past journeys led to a realization: travelers need raw, unfiltered notes, honest budgets, and real stories over glossy itineraries.",
  },
  {
    step: "03",
    tag: "Desert Circuit",
    title: "Rajasthan Circuit — 21 Days",
    description:
      "Jaisalmer, Jodhpur, Udaipur, and Jaipur. Navigating golden sand dunes, living forts, and remote desert outposts under vast winter skies.",
  },
  {
    step: "04",
    tag: "Trans-Himalayas",
    title: "Himachal Pradesh Deep Dive",
    description:
      "Spiti Valley, Kinnaur, and Lahaul — 3 separate journeys across rugged terrain and high passes to deeply understand trans-Himalayan mountain life.",
  },
  {
    step: "05",
    tag: "Coastal Trails",
    title: "South India Coastal Drive",
    description:
      "Goa to Kanyakumari on two wheels. 1,800 km along the Arabian Sea, 14 days, winding coastal hairpins, and endless local pit stops.",
  },
  {
    step: "06",
    tag: "Next Horizons",
    title: "Frontier Roads & Untold Trails",
    description:
      "Heading deeper into Northeast India — Meghalaya, Arunachal Pradesh, Nagaland, and high-altitude frontier passes waiting to be documented.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Photo */}
            <div style={{ position: "relative", maxWidth: 400 }}>
              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  position: "relative",
                }}
              >
                <Image
                  src="/sumit-singh.png"
                  alt={DEMO_AUTHOR.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              {/* Gold border accent */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  right: -16,
                  bottom: -16,
                  border: "1px solid var(--border-accent)",
                  borderRadius: "var(--radius-xl)",
                  zIndex: -1,
                }}
              />
            </div>

            {/* Bio */}
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
                ✦ About the Author
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.1,
                }}
              >
                Sumit Singh
              </h1>
              <p
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                Traveller · Photographer · IT Professional
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                  fontSize: "1.05rem",
                }}
              >
                Sumit Singh is a storyteller of roads and a builder of systems. As a travel writer and photographer, he captures the raw beauty of India’s untamed landscapes — from high-altitude deserts and forgotten monasteries to bustling bazaars and coastal trails. As an IT professional, he brings the same curiosity and problem-solving mindset to the digital world, navigating code and architecture with the precision of someone who has learned to read both maps and machines.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                  fontSize: "1.05rem",
                }}
              >
                Based in India and always en route somewhere, Sumit believes that journeys are not just about destinations but about the stories we collect along the way. His writing is rooted in honesty — detailed itineraries, real costs, and first-hand experiences that strip away the gloss of commercial travel.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                  fontSize: "1.05rem",
                }}
              >
                Raste Aur Raahein is his way of sharing those journeys: unfiltered, spontaneous, and deeply human. It’s a space for travelers who seek authenticity over luxury, connection over convenience, and the soul of India beyond the tourist trail.
              </p>

              {/* Social */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {[
                  { Icon: AtSign, href: "https://instagram.com", label: "Instagram" },
                  { Icon: Globe, href: "https://twitter.com", label: "Twitter" },
                  { Icon: Mail, href: "/contact", label: "Email" },
                  { Icon: Code2, href: "https://github.com", label: "GitHub" },
                ].map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)",
                      transition: "all var(--transition)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-gold)";
                      e.currentTarget.style.borderColor = "var(--border-accent)";
                      e.currentTarget.style.background = "var(--accent-gold-dim)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--bg-card)";
                    }}
                  >
                    <Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS
      ============================================================ */}
      <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {TRAVEL_STATS.map(({ value, label, Icon }) => (
              <div
                key={label}
                className="glass-card"
                style={{
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  transition: "all var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--bg-glass)";
                }}
              >
                <Icon
                  size={24}
                  style={{
                    color: "var(--accent-gold)",
                    margin: "0 auto 0.75rem",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TRAVEL PHILOSOPHY
      ============================================================ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
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
            ✦ Philosophy
          </div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: "1.5rem" }}>
            How I Travel
          </h2>
          <blockquote
            style={{
              borderLeft: "3px solid var(--accent-gold)",
              paddingLeft: "1.5rem",
              marginBottom: "2rem",
              fontFamily: "var(--font-serif)",
              fontSize: "1.35rem",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            &ldquo;The best itinerary is the one you&apos;ll actually follow — specific enough to navigate, flexible enough to wander.&rdquo;
          </blockquote>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: "1.35rem",
              fontSize: "1.05rem",
            }}
          >
            For me, travel is about balance: the discipline of planning and the freedom of detours. I travel slow, because the road deserves time. I plan obsessively — every route, every stay, every cost — but I always leave space for the unexpected: a sudden storm, a chance conversation, or a hidden trail that wasn&apos;t on the map.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: "1.35rem",
              fontSize: "1.05rem",
            }}
          >
            I choose local guesthouses over polished hotels, buses over taxis when safety allows, and food that locals eat rather than menus designed for tourists. These choices aren&apos;t about saving money; they&apos;re about staying close to the rhythm of the place.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: "1rem",
              fontSize: "1.05rem",
            }}
          >
            This blog is as much about the planning as the journey. I believe research and itinerary-building are half the fun, and half the story. That&apos;s why every trip here comes with a day-by-day breakdown, cost estimates, and honest notes on what worked — and what didn&apos;t. Because real journeys aren&apos;t perfect, and that&apos;s what makes them worth sharing.
          </p>
        </div>
      </section>

      {/* ============================================================
          TIMELINE
      ============================================================ */}
      <section
        style={{
          padding: "4rem 0 5rem",
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
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
            ✦ Journey So Far
          </div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: "3rem" }}>
            Key Milestones & Expeditions
          </h2>

          <div style={{ position: "relative" }}>
            {/* Vertical trail line */}
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 0,
                bottom: 0,
                width: 1,
                background: "var(--border)",
              }}
            />

            {JOURNEY_MILESTONES.map((item, i) => (
              <div
                key={item.step}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: i === JOURNEY_MILESTONES.length - 1 ? 0 : "2rem",
                  position: "relative",
                }}
              >
                {/* Step badge */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: i === JOURNEY_MILESTONES.length - 1 ? "var(--accent-gold)" : "var(--bg-card)",
                    border: `1px solid ${i === JOURNEY_MILESTONES.length - 1 ? "var(--accent-gold)" : "var(--border)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: i === JOURNEY_MILESTONES.length - 1 ? "#FFFFFF" : "var(--accent-gold)",
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                <div style={{ paddingTop: "0.35rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "9999px",
                        background: "var(--accent-gold-dim)",
                        color: "var(--accent-gold)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            Want to Collaborate?
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Open to travel writing collaborations, itinerary consultations, and photography projects.
          </p>
          <Link href="/contact" className="btn btn-primary" id="about-contact-btn">
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
