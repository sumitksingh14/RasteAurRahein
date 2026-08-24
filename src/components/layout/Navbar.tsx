"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Compass, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips/Itineraries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <span className="gradient-text" style={{ display: "none" }}>
              Raste
            </span>
            <span style={{ display: "block" }}>Raste Aur Raahein</span>
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
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}
