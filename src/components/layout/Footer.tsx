"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { REGIONS } from "@/lib/regions";
import { useAuth } from "@/components/providers/AuthProvider";
import NewsletterInline from "@/components/ui/NewsletterInline";
import { getActiveSocialLinks } from "@/lib/site-config";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/trips", label: "Find a Trip" },
  { href: "/journal", label: "Field Notes" },
  { href: "/contact", label: "Contact Us" },
  { href: "/import", label: "Import Itinerary" },
];

const helpLinks = [
  { href: "/journal", label: "Field Notes & Journal" },
  { href: "/import", label: "How To Import?" },
  { href: "/faq", label: "FAQs" },
  { href: "/about", label: "Why Us?" },
  { href: "/contact", label: "Contact Us" },
  { href: "/trips", label: "Travel Guides" },
];

// Social link icons as simple SVGs to avoid extra icon library dependency
function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}
function RssIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}


export default function Footer() {
  const { user } = useAuth();

  return (
    <footer
      style={{
        background: "#e8eaf0",
        borderTop: "1px solid rgba(99,102,241,0.15)",
        marginTop: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 0",
        }}
      >
        {/* Main grid */}
        <div className="footer-main-grid" style={{ marginBottom: "2.5rem" }}>
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1e1b4b",
                textDecoration: "none",
                letterSpacing: "-0.02em",
              }}
            >
              <Image
                src="/logo.png"
                alt="Raste Aur Rahein Logo"
                width={806}
                height={592}
                style={{ width: "auto", height: "32px", objectFit: "contain", flexShrink: 0, borderRadius: "6px" }}
              />
              Raste Aur Raahein
            </Link>
            <p
              style={{
                color: "#4B5563",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: 280,
                margin: 0,
              }}
            >
              Documenting high-altitude deserts, ancient monasteries, and roads less taken — one trip at a time.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {getActiveSocialLinks().map(({ id, href, label }) => {
                const Icon =
                  id === "x"
                    ? TwitterIcon
                    : id === "youtube"
                    ? YoutubeIcon
                    : id === "github"
                    ? GithubIcon
                    : InstagramIcon;
                return (
                  <a
                    key={id}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer me"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4B5563",
                      background: "#e8eaf0",
                      border: "1px solid rgba(99,102,241,0.15)",
                      transition: "all 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1e1b4b";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "#1e1b4b";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#e8eaf0";
                      e.currentTarget.style.color = "#4B5563";
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
                    }}
                  >
                    <Icon />
                  </a>
                );
              })}
              <Link
                href="/sitemap.xml"
                aria-label="View Sitemap"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4B5563",
                  background: "#e8eaf0",
                  border: "1px solid rgba(99,102,241,0.15)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1e1b4b";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "#1e1b4b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#e8eaf0";
                  e.currentTarget.style.color = "#4B5563";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
                }}
              >
                <RssIcon />
              </Link>
            </div>
          </div>

          {/* Company column */}
          <div>
            <h4
              style={{
                fontSize: "0.6875rem",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
                color: "#1e1b4b",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 1.25rem",
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0, margin: 0 }}>
              {companyLinks
                .filter((link) => link.href !== "/itineraries" || user)
                .map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#4B5563",
                        fontSize: "0.875rem",
                        transition: "color 0.2s ease",
                        textDecoration: "none",
                        fontWeight: 400,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              {REGIONS.slice(0, 3).map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/regions/${r.slug}`}
                    style={{
                      color: "#4B5563",
                      fontSize: "0.875rem",
                      transition: "color 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Field Guidance column */}
          <div>
            <h4
              style={{
                fontSize: "0.6875rem",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
                color: "#1e1b4b",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 1.25rem",
              }}
            >
              Field Guidance
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0, margin: 0 }}>
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      color: "#4B5563",
                      fontSize: "0.875rem",
                      transition: "color 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4
              style={{
                fontSize: "0.6875rem",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
                color: "#6366f1",
                marginBottom: "0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              ✦ Stay Updated &amp; Dispatches
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: "0.8125rem",
                color: "#4B5563",
                lineHeight: 1.6,
              }}
            >
              New itineraries straight to your inbox. No sponsored fluff, unsubscribe anytime.
            </p>
            <NewsletterInline variant="strip" source="footer" />

            {/* Contact links below newsletter */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem", padding: 0, margin: 0 }}>
              <li>
                <Link
                  href="/contact"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#4B5563",
                    fontSize: "0.8125rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  <Mail size={14} color="#6366f1" />
                  Contact Us / Get in Touch
                </Link>
              </li>
              <li>
                <span
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    color: "#4B5563",
                    fontSize: "0.8125rem",
                  }}
                >
                  <MapPin size={14} color="#6366f1" style={{ flexShrink: 0, marginTop: "2px" }} />
                  New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(99,102,241,0.15)",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "#7c3aed", fontSize: "0.8rem", margin: 0 }}>
            © {new Date().getFullYear()} Raste Aur Raahein · All rights reserved
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link
              href="/privacy-policy"
              style={{ color: "#4B5563", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(99,102,241,0.15)" }}>•</span>
            <Link
              href="/terms"
              style={{ color: "#4B5563", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
            >
              Terms &amp; Conditions
            </Link>
            <span style={{ color: "rgba(99,102,241,0.15)" }}>•</span>
            <Link
              href="/faq"
              style={{ color: "#4B5563", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
            >
              FAQs
            </Link>
            <span style={{ color: "rgba(99,102,241,0.15)" }}>•</span>
            <span style={{ color: "#4B5563", fontSize: "0.8rem" }}>60k+ km Documented</span>
            <span style={{ color: "rgba(99,102,241,0.15)" }}>•</span>
            <p style={{ color: "#4B5563", fontSize: "0.8rem", margin: 0 }}>
              Built with ♥ by{" "}
              <a
                href="https://github.com/sumitksingh14"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}
              >
                Sumit Singh
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 580px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
