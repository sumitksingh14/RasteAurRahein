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

const TIMELINE = [
  { year: "2019", title: "First solo trip — Leh Ladakh", description: "Took a bus from Manali to Leh. Got altitude sickness. Loved every second of it." },
  { year: "2020", title: "Started this blog", description: "Lockdown led to a lot of planning, a lot of writing about past trips, and eventually, Raste Aur Raahein." },
  { year: "2021", title: "Rajasthan circuit — 21 days", description: "Jaisalmer, Jodhpur, Udaipur, Jaipur. The desert in winter is something else." },
  { year: "2022", title: "Himachal Pradesh deep dive", description: "Spiti Valley, Kinnaur, Lahaul — 3 separate trips to understand one region properly." },
  { year: "2023", title: "South India coastal drive", description: "Goa to Kanyakumari on two wheels. 1800 km, 14 days, infinite filter coffee." },
  { year: "2024", title: "Still going…", description: "Next stop: Northeast India — Meghalaya, Arunachal Pradesh, Nagaland." },
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
                {DEMO_AUTHOR.name}
              </h1>
              <p
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                  fontWeight: 500,
                }}
              >
                Travel Writer · Photographer · Engineer
              </p>
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
              <p style={{ color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
                I built this blog because I couldn&apos;t find the kind of travel content I wanted to read — honest, detailed, with real itineraries and real costs. Everything here is first-hand.
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
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;The best itinerary is the one you&apos;ll actually follow — specific enough to navigate, flexible enough to wander.&rdquo;
          </blockquote>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "1.05rem" }}>
            I travel slow. I plan obsessively (you can see that from the itineraries here) but I build in room for detours, for bad weather, for conversations that take hours. I prefer local guesthouses to hotels, local buses to taxis where safety allows, and local food to anything designed for tourists.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.95rem" }}>
            This blog documents the planning as much as the travel itself — because I think the research and itinerary building is genuinely half the fun. Every trip here has a day-by-day breakdown, cost estimates, and honest notes on what worked and what didn&apos;t.
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
            The Timeline
          </h2>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
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

            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                  position: "relative",
                }}
              >
                {/* Year badge */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: i === TIMELINE.length - 1 ? "var(--accent-gold)" : "var(--bg-card)",
                    border: `1px solid ${i === TIMELINE.length - 1 ? "var(--accent-gold)" : "var(--border)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: i === TIMELINE.length - 1 ? "var(--bg-primary)" : "var(--text-muted)",
                      lineHeight: 1,
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                <div style={{ paddingTop: "0.6rem" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
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
