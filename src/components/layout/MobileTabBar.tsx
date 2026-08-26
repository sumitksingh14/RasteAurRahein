"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Map, Compass, MoreHorizontal, BookOpen, Mail, Upload, X, User } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const PRIMARY_TABS = [
  { to: "/", icon: Home, label: "Home", exact: true },
  { to: "/trips", icon: Map, label: "Trips", exact: false },
  { to: "/regions", icon: Compass, label: "Regions", exact: false },
];

const MORE_LINKS = [
  { href: "/about", icon: BookOpen, label: "About" },
  { href: "/contact", icon: Mail, label: "Contact" },
  { href: "/import", icon: Upload, label: "Import Trip" },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const { user, openAuthModal, logout } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close more drawer on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [moreOpen]);

  function isActive(to: string, exact: boolean) {
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  }

  // Check if any "more" link is the active route
  const moreIsActive = MORE_LINKS.some((l) => pathname.startsWith(l.href));

  return (
    <>
      {/* More drawer backdrop */}
      <div
        className="tab-more-backdrop"
        aria-hidden={!moreOpen}
        onClick={() => setMoreOpen(false)}
      />

      {/* More drawer */}
      <div
        className="tab-more-drawer"
        aria-hidden={!moreOpen}
        role="dialog"
        aria-label="More navigation"
      >
        {/* Drawer handle */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "var(--border)",
            margin: "-0.5rem auto 1.25rem",
          }}
        />

        {/* Close button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}
          >
            More
          </span>
          <button
            onClick={() => setMoreOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              padding: "0.25rem",
            }}
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {MORE_LINKS.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`tab-more-drawer-link${pathname.startsWith(href) ? " active" : ""}`}
            onClick={() => setMoreOpen(false)}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: pathname.startsWith(href) ? "var(--accent-gold-dim)" : "var(--bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "1px solid var(--border)",
              }}
            >
              <Icon size={16} />
            </span>
            {label}
          </Link>
        ))}

        {/* Auth row */}
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {user ? (
            <button
              onClick={async () => {
                await logout();
                setMoreOpen(false);
              }}
              className="tab-more-drawer-link"
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#0a0a0f",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </span>
              <span>
                <span style={{ display: "block", fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 500 }}>
                  @{user.username}
                </span>
                <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Sign out
                </span>
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                openAuthModal();
                setMoreOpen(false);
              }}
              className="tab-more-drawer-link"
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--accent-gold-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent-gold)",
                }}
              >
                <User size={16} />
              </span>
              <span style={{ fontSize: "0.9rem", color: "var(--accent-gold)", fontWeight: 600 }}>
                Sign In
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <nav className="mobile-tab-bar" aria-label="Mobile navigation">
        {PRIMARY_TABS.map(({ to, icon: Icon, label, exact }) => {
          const active = isActive(to, exact);
          return (
            <Link
              key={to}
              href={to}
              className={`tab-bar-item${active ? " active" : ""}`}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          className={`tab-bar-item${moreIsActive && !moreOpen ? " active" : moreOpen ? " active" : ""}`}
          onClick={() => setMoreOpen((o) => !o)}
          aria-label="More navigation"
          aria-expanded={moreOpen}
        >
          {moreOpen ? (
            <X size={21} strokeWidth={2.2} />
          ) : (
            <MoreHorizontal size={21} strokeWidth={1.8} />
          )}
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
