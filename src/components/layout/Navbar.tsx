"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { User, Menu, X, ChevronDown, LogOut, Shield, CloudSun, BookOpen, Mail, Map } from "lucide-react";
import { REGIONS } from "@/lib/regions";
import { useAuth } from "@/components/providers/AuthProvider";
import AIItineraryButton from "@/components/ai/AIItineraryButton";
import NavSearchBar from "@/components/ui/NavSearchBar";
import type { SearchIndexEntry } from "@/components/ui/NavSearchBar";

/** Primary desktop nav — ≤ 4 items so the bar never wraps */
const PRIMARY_NAV = [
  { href: "/trips", label: "Find a Trip" },
  { href: "/journal", label: "Journal" },
  { href: "/road-conditions", label: "Road Conditions" },
];

/** Secondary links moved into the "More" dropdown */
const MORE_NAV = [
  { href: "/weather", label: "Weather", icon: CloudSun },
  { href: "/regions", label: "All Regions", icon: Map },
  { href: "/about", label: "Share Stories", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

interface NavbarProps {
  /** Minimal trip index for the typeahead search — built server-side in layout */
  searchIndex?: SearchIndexEntry[];
}

export default function Navbar({ searchIndex = [] }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout, openAuthModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > 20);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setMoreOpen(false); }, [pathname]);

  // Close More dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


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
          backgroundColor: "#e8eaf0",
          borderBottom: "none",
          boxShadow: scrolled
            ? "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.60)"
            : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.25s ease",
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
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#6366f1",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <img 
              src="/logo.png" 
              alt="Raste Aur Rahein Logo" 
              width={49}
              height={36}
              style={{ height: "36px", width: "auto", objectFit: "contain", flexShrink: 0 }} 
            />
            Raste Aur Rahein
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
            }}
            className="desktop-nav"
          >
            {/* Regions hover dropdown */}
            <div className="nav-regions-wrapper" style={{ position: "relative" }}>
              <Link
                href="/regions"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: pathname.startsWith("/regions") ? "#6366f1" : "#374151",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "4px",
                }}
              >
                Regions
                <ChevronDown size={13} style={{ opacity: 0.6 }} />
                {pathname.startsWith("/regions") && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "#6366f1",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Link>
              {/* Hover dropdown */}
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
                      e.currentTarget.style.color = "#6366f1";
                      e.currentTarget.style.background = "rgba(99,102,241,0.06)";
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

            {/* Primary nav links */}
            {PRIMARY_NAV.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive ? "#6366f1" : "#374151",
                    transition: "color 0.2s ease",
                    position: "relative",
                    paddingBottom: "4px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "#6366f1" : "#374151")
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
                        background: "#6366f1",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* ── More dropdown ── */}
            <div ref={moreRef} style={{ position: "relative" }}>
              <button
                id="nav-more-btn"
                onClick={() => setMoreOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={moreOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: moreOpen ? "#6366f1" : "#374151",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 0 4px",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.2s ease",
                }}
              >
                More
                <ChevronDown
                  size={13}
                  style={{
                    opacity: 0.6,
                    transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              {moreOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: 200,
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "var(--radius-md)",
                    padding: "0.5rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                    zIndex: 2000,
                  }}
                >
                  {MORE_NAV.map(({ href, label, icon: Icon }) => {
                    const active = pathname.startsWith(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMoreOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "0.6rem 1rem",
                          fontSize: "0.875rem",
                          color: active ? "#6366f1" : "#374151",
                          borderRadius: "var(--radius-sm)",
                          transition: "all var(--transition)",
                          textDecoration: "none",
                          fontWeight: active ? 600 : 400,
                          background: active ? "rgba(99,102,241,0.06)" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#6366f1";
                          e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = active ? "#6366f1" : "#374151";
                          e.currentTarget.style.background = active ? "rgba(99,102,241,0.06)" : "transparent";
                        }}
                      >
                        <Icon size={15} style={{ opacity: 0.7 }} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dashboard — logged-in only */}
            {user && (() => {
              const isActive = pathname.startsWith("/dashboard");
              return (
                <Link
                  href="/dashboard"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive ? "#6366f1" : "#374151",
                    transition: "color 0.2s ease",
                    position: "relative",
                    paddingBottom: "4px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "#6366f1" : "#374151")
                  }
                >
                  Dashboard
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "#6366f1",
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
            {/* AI Trip Planner — admin only */}
            <AIItineraryButton />


            {/* Typeahead Search */}
            <NavSearchBar index={searchIndex} />


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
                    background: "linear-gradient(135deg, #6366f1, #7c3aed)",
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

                    {/* Admin Panel link — only for admin user */}
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setAvatarMenuOpen(false)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "0.6rem 1rem",
                          borderRadius: "var(--radius-sm)",
                          color: "#006CE4",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          fontFamily: "var(--font-sans)",
                          textDecoration: "none",
                          background: "rgba(0,108,228,0.05)",
                          marginBottom: "0.25rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(0,108,228,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(0,108,228,0.05)";
                        }}
                      >
                        <Shield size={14} />
                        Admin Panel
                      </Link>
                    )}
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
                  border: "none",
                  background: "#e8eaf0",
                  color: "#6366f1",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--transition)",
                  flexShrink: 0,
                  boxShadow: "var(--shadow-neo-raised)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#6366f1";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.40)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#e8eaf0";
                  e.currentTarget.style.color = "#6366f1";
                  e.currentTarget.style.boxShadow = "var(--shadow-neo-raised)";
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
                border: "none",
                background: "#e8eaf0",
                cursor: "pointer",
                boxShadow: "var(--shadow-neo-raised)",
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
            background: "#e8eaf0",
            borderLeft: "none",
            padding: "calc(var(--nav-height) + 2rem) 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform var(--transition)",
          }}
        >
          {/* All nav links in mobile drawer */}
          {[
            ...PRIMARY_NAV,
            { href: "/regions", label: "Regions" },
            ...MORE_NAV.map(({ href, label }) => ({ href, label })),
          ].map((link) => {
            const isActive = pathname.startsWith(link.href);
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
                  color: isActive ? "#6366f1" : "#262729",
                  background: isActive ? "rgba(99,102,241,0.10)" : "transparent",
                  transition: "all var(--transition)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}


          <Link
            href="/dashboard"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                setMenuOpen(false);
                openAuthModal();
              }
            }}
            style={{
              display: "block",
              padding: "0.9rem 1rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "1rem",
              fontFamily: "var(--font-sans)",
              fontWeight: pathname.startsWith("/dashboard") ? 700 : 500,
              color: pathname.startsWith("/dashboard") ? "#6366f1" : "#262729",
              background: pathname.startsWith("/dashboard") ? "rgba(99,102,241,0.10)" : "transparent",
              transition: "all var(--transition)",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>

          <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid rgba(99,102,241,0.12)" }}>
            <Link
              href="/import"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#68726b",
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
        @media (min-width: 1024px) {
          .mobile-only { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
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
