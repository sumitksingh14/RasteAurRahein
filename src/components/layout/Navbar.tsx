"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, User, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { REGIONS } from "@/lib/regions";
import { useAuth } from "@/components/providers/AuthProvider";

const navLinks = [
  { href: "/trips", label: "Find a Trip" },
  { href: "/regions", label: "Regions" },
  { href: "/about", label: "Share Stories" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, openAuthModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid #F3F4F6",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-sans)",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#006CE4",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            <img 
              src="/logo.png" 
              alt="Raste Aur Rahein Logo" 
              style={{ height: "40px", width: "auto", objectFit: "contain" }} 
            />
            Raste Aur Rahein
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.href === "/regions") {
                return (
                  <div key={link.href} className="nav-regions-wrapper" style={{ position: "relative" }}>
                    <Link
                      href="/regions"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: isActive ? "#006CE4" : "#374151",
                        transition: "color 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                        position: "relative",
                        paddingBottom: "4px",
                      }}
                    >
                      {link.label}
                      <ChevronDown size={13} style={{ opacity: 0.6 }} />
                      {isActive && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: -2,
                            left: 0,
                            right: 0,
                            height: 2,
                            background: "#006CE4",
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </Link>
                    {/* Dropdown */}
                    <div className="nav-regions-dropdown">
                      {REGIONS.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/regions/${r.slug}`}
                          style={{
                            display: "block",
                            padding: "0.6rem 1rem",
                            fontSize: "0.85rem",
                            color: "#374151",
                            borderRadius: "var(--radius-sm)",
                            transition: "all var(--transition)",
                            whiteSpace: "nowrap",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#006CE4";
                            e.currentTarget.style.background = "rgba(0,108,228,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#374151";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive ? "#006CE4" : "#374151",
                    transition: "color 0.2s ease",
                    position: "relative",
                    paddingBottom: "4px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#006CE4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "#006CE4"
                      : "#374151")
                  }
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "#006CE4",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* My Itineraries — logged-in only */}
            {user && (() => {
              const isActive = pathname.startsWith("/itineraries");
              return (
                <Link
                  href="/itineraries"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive ? "#006CE4" : "#374151",
                    transition: "color 0.2s ease",
                    position: "relative",
                    paddingBottom: "4px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#006CE4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "#006CE4" : "#374151")
                  }
                >
                  My Itineraries
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "#006CE4",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })()}
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Search */}
            <Link
              href="/trips"
              aria-label="Search trips"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#374151",
                transition: "all var(--transition)",
                border: "1px solid #E5E7EB",
                background: "#F9FAFB",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#006CE4";
                e.currentTarget.style.borderColor = "#006CE4";
                e.currentTarget.style.background = "rgba(0,108,228,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#374151";
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.background = "#F9FAFB";
              }}
            >
              <Search size={16} />
            </Link>

            {/* Auth */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setAvatarMenuOpen((o) => !o)}
                  title={user.username}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #006CE4, #FEBB02)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </button>
                {avatarMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "var(--radius-md)",
                      padding: "0.5rem",
                      minWidth: 160,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      zIndex: 2000,
                    }}
                  >
                    <div style={{ padding: "0.6rem 1rem", borderBottom: "1px solid #E5E7EB", marginBottom: "0.25rem" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#262729" }}>@{user.username}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{user.email}</div>
                    </div>
                    <button
                      onClick={async () => { await logout(); setAvatarMenuOpen(false); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "0.6rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: "none",
                        background: "transparent",
                        color: "#374151",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-sans)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                        e.currentTarget.style.color = "#006CE4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#374151";
                      }}
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                id="nav-sign-in-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "100px",
                  border: "1px solid #E5E7EB",
                  background: "#F9FAFB",
                  color: "#374151",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--transition)",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#006CE4";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#006CE4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                  e.currentTarget.style.color = "#374151";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                <User size={14} />
                Sign In
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              id="mobile-menu-btn"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#374151",
                border: "1px solid #E5E7EB",
                background: "#F9FAFB",
                cursor: "pointer",
              }}
              className="mobile-only"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity var(--transition)",
          }}
        />

        {/* Drawer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(320px, 85vw)",
            background: "#FFFFFF",
            borderLeft: "1px solid #E5E7EB",
            padding: "calc(var(--nav-height) + 2rem) 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform var(--transition)",
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "0.9rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#006CE4" : "#262729",
                  background: isActive ? "rgba(0,108,228,0.06)" : "transparent",
                  transition: "all var(--transition)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
            <Link
              href="/import"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#6B7280",
                fontSize: "0.875rem",
                padding: "0.5rem 0",
                textDecoration: "none",
              }}
            >
              Import Itinerary
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: none !important; }
        }
        /* Regions dropdown */
        .nav-regions-dropdown {
          display: none;
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 180px;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: var(--radius-md);
          padding: 0.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          z-index: 2000;
        }
        .nav-regions-wrapper:hover .nav-regions-dropdown {
          display: block;
        }
        .nav-regions-dropdown::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #FFFFFF;
          border-left: 1px solid #E5E7EB;
          border-top: 1px solid #E5E7EB;
          rotate: 45deg;
        }
      `}</style>
    </>
  );
}
