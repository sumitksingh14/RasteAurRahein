"use client";

import Link from "next/link";
import { AtSign, Globe, Video, Phone, Mail, MapPin, Share2 } from "lucide-react";

import { REGIONS } from "@/lib/regions";
import { useAuth } from "@/components/providers/AuthProvider";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/trips", label: "Find a Trip" },
  { href: "/contact", label: "Contact Us" },
  { href: "/import", label: "Import Itinerary" },
];

const helpLinks = [
  { href: "/trips", label: "Find a Trip" },
  { href: "/import", label: "How To Import?" },
  { href: "/about", label: "Why Us?" },
  { href: "/contact", label: "FAQs" },
  { href: "/trips", label: "Travel Guides" },
];

const socialLinks = [
  { Icon: AtSign, href: "https://instagram.com", label: "Instagram" },
  { Icon: Globe, href: "https://twitter.com", label: "Twitter" },
  { Icon: Video, href: "https://youtube.com", label: "YouTube" },
  { Icon: Share2, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer
      style={{
        background: "#F7F7F7",
        borderTop: "1px solid #E5E7EB",
        marginTop: "0",
        paddingTop: "3.5rem",
        paddingBottom: "0",
      }}
    >
      <div className="container">
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-sans)",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#006CE4",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              <img
                src="/logo.png"
                alt="Raste Aur Rahein Logo"
                style={{ height: "40px", width: "auto", objectFit: "contain" }}
              />
              Raste Aur Rahein
            </Link>
            <p
              style={{
                color: "#FEBB02",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: 260,
                fontWeight: 500,
              }}
            >
              Documenting high-altitude deserts, ancient monasteries, and roads less taken — one trip at a time.
            </p>

            {/* Social icons */}
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                marginTop: "1.5rem",
              }}
            >
              {socialLinks.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#262729",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    transition: "all var(--transition)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#006CE4";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#006CE4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.color = "#262729";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                >
                  <Icon size={17} />
                </Link>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                color: "#262729",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {companyLinks
                .filter((link) => link.href !== "/itineraries" || user)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#4B5563",
                        fontSize: "0.9rem",
                        transition: "color var(--transition)",
                        textDecoration: "none",
                        fontWeight: 400,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#006CE4")}
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
                      fontSize: "0.9rem",
                      transition: "color var(--transition)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#006CE4")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Center column */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                color: "#262729",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Help Center
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      color: "#4B5563",
                      fontSize: "0.9rem",
                      transition: "color var(--transition)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#006CE4")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info column */}
          <div>
            <h4
              style={{
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                color: "#262729",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Contact Info
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <a
                  href="tel:+919196191109"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#4B5563",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#006CE4")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  <Phone size={15} color="#6B7280" /> Phone: +91 91961 91109
                </a>
              </li>
              <li>
                <a
                  href="mailto:zsumitksingh@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#4B5563",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#006CE4")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  <Mail size={15} color="#6B7280" /> Email: hello@rasteauraahein.com
                </a>
              </li>
              <li>
                <span
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    color: "#4B5563",
                    fontSize: "0.875rem",
                  }}
                >
                  <MapPin size={15} color="#6B7280" style={{ flexShrink: 0, marginTop: "2px" }} />
                  New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Raste Aur Raahein · All rights reserved
          </p>
          <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>
            Built with ♥ by{" "}
            <a
              href="https://github.com/sumitksingh14"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#006CE4", fontWeight: 600, textDecoration: "none" }}
            >
              @Sumit Singh
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
