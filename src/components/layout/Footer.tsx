"use client";

import Link from "next/link";
import { Compass, AtSign, Globe, Mail, Video } from "lucide-react";
import { useState } from "react";
import { REGIONS } from "@/lib/regions";

const quickLinks = [
  { href: "/trips", label: "All Trips" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/import", label: "Import Itinerary" },
  { href: "/itineraries", label: "My Travel Itineraries" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setNewsletterState("success");
        setEmail("");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setNewsletterState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setNewsletterState("error");
    }
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        padding: "4rem 0 2rem",
        marginTop: "4rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--bg-primary)",
                  flexShrink: 0,
                }}
              >
                <Compass size={16} />
              </span>
              Raste Aur Raahein
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              Documenting high-altitude deserts, ancient monasteries, and roads less taken — one trip at a time.
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                { Icon: AtSign, href: "https://instagram.com", label: "Instagram" },
                { Icon: Globe, href: "https://twitter.com", label: "Twitter" },
                { Icon: Video, href: "https://youtube.com", label: "YouTube" },
                { Icon: Mail, href: "/contact", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    width: 36,
                    height: 36,
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
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Navigate
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      transition: "color var(--transition)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Regions
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {REGIONS.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/regions/${r.slug}`}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      transition: "color var(--transition)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* India trips */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              India Trips
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <Link
                    href="/trips"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      transition: "color var(--transition)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    Explore all India trips
                  </Link>
                </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Stay Updated
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1rem" }}>
              New trip stories, itineraries, and travel tips — straight to your inbox.
            </p>
            {newsletterState === "success" ? (
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--accent-gold-dim)",
                  border: "1px solid var(--border-accent)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>✓</div>
                <p style={{ color: "var(--accent-gold)", fontSize: "0.875rem", fontWeight: 600 }}>
                  You&apos;re subscribed!
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "4px" }}>
                  Check your inbox for a welcome email.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  id="newsletter-email"
                  required
                  disabled={newsletterState === "loading"}
                  style={{
                    padding: "0.65rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: `1px solid ${newsletterState === "error" ? "var(--accent-rose)" : "var(--border)"}`,
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-sans)",
                    outline: "none",
                    width: "100%",
                    opacity: newsletterState === "loading" ? 0.6 : 1,
                  }}
                />
                {newsletterState === "error" && errorMsg && (
                  <p style={{ color: "var(--accent-rose)", fontSize: "0.75rem", margin: 0 }}>
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={newsletterState === "loading"}
                  style={{ width: "100%", justifyContent: "center", padding: "0.65rem", opacity: newsletterState === "loading" ? 0.7 : 1 }}
                >
                  {newsletterState === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Sumit Singh · Raste Aur Raahein
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Built with ♥ using Next.js & Sanity
          </p>
        </div>
      </div>
    </footer>
  );
}
