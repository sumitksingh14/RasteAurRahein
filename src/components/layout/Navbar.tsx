"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Compass, Sun, Moon, Search, ChevronDown, LogOut, User } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { REGIONS } from "@/lib/regions";
import { useAuth } from "@/components/providers/AuthProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips / Itineraries" },
  { href: "/regions", label: "Regions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, openAuthModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <nav
        className={pathname === "/" && !scrolled ? "force-dark" : ""}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          transition: "all var(--transition)",
          backgroundColor: scrolled
            ? "var(--bg-glass)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
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
              gap: "10px",
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bg-primary)",
                flexShrink: 0,
              }}
            >
              <Compass size={18} />
            </span>
            Raste Aur Raahein
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

              // Regions gets a dropdown
              if (link.href === "/regions") {
                return (
                  <div key={link.href} className="nav-regions-wrapper" style={{ position: "relative" }}>
                    <Link
                      href="/regions"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: isActive ? "var(--accent-gold)" : "var(--text-secondary)",
                        transition: "color var(--transition)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {link.label}
                      <ChevronDown size={13} style={{ opacity: 0.6 }} />
                      {isActive && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: -4,
                            left: 0,
                            right: 0,
                            height: 2,
                            background: "var(--accent-gold)",
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
                            color: "var(--text-secondary)",
                            borderRadius: "var(--radius-sm)",
                            transition: "all var(--transition)",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--accent-gold)";
                            e.currentTarget.style.background = "var(--accent-gold-dim)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-secondary)";
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
                    color: isActive ? "var(--accent-gold)" : "var(--text-secondary)",
                    transition: "color var(--transition)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "var(--accent-gold)"
                      : "var(--text-secondary)")
                  }
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--accent-gold)",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* My Travel Itineraries — visible only when logged in */}
            {user && (() => {
              const isActive = pathname.startsWith("/itineraries");
              return (
                <Link
                  href="/itineraries"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: isActive ? "var(--accent-gold)" : "var(--text-secondary)",
                    transition: "color var(--transition)",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "var(--accent-gold)"
                      : "var(--text-secondary)")
                  }
                >
                  My Itineraries
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--accent-gold)",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })()}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                color: "var(--text-secondary)",
                transition: "all var(--transition)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <Search size={16} />
            </Link>

            {/* Auth button */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setAvatarMenuOpen((o) => !o)}
                  title={user.username}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0a0a0f",
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
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.5rem",
                      minWidth: 160,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      zIndex: 2000,
                    }}
                  >
                    <div style={{ padding: "0.6rem 1rem", borderBottom: "1px solid var(--border)", marginBottom: "0.25rem" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>@{user.username}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{user.email}</div>
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
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-sans)",
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
                  padding: "0.45rem 1rem",
                  borderRadius: "100px",
                  border: "1px solid var(--border-accent)",
                  background: "var(--accent-gold-dim)",
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--transition)",
                  flexShrink: 0,
                }}
              >
                <User size={13} />
                Sign In
              </button>
            )}

            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              id="theme-toggle-btn"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-gold)",
                transition: "all var(--transition)",
                border: "1px solid var(--border-accent)",
                background: "var(--accent-gold-dim)",
                cursor: "pointer",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile menu toggle — hidden since MobileTabBar handles mobile nav */}
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
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
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
            background: "rgba(0,0,0,0.6)",
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
            background: "var(--bg-secondary)",
            borderLeft: "1px solid var(--border)",
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
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-serif)",
                  color: isActive ? "var(--accent-gold)" : "var(--text-primary)",
                  background: isActive ? "var(--accent-gold-dim)" : "transparent",
                  transition: "all var(--transition)",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <Link
              href="/import"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                padding: "0.5rem 0",
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
          /* Hamburger hidden on mobile — MobileTabBar handles nav */
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
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 0.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
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
          background: var(--bg-card);
          border-left: 1px solid var(--border);
          border-top: 1px solid var(--border);
          rotate: 45deg;
        }
      `}</style>
    </>
  );
}
