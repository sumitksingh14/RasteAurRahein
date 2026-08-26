"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Map, Compass, MoreHorizontal, BookOpen, Mail, Upload, X, User, Sparkles } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import AIItineraryModal from "@/components/ai/AIItineraryModal";

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
  const [aiModalOpen, setAiModalOpen] = useState(false);

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

        {/* AI Trip Planner button in More drawer */}
        <button
          className="tab-more-drawer-link"
          onClick={() => {
            setAiModalOpen(true);
            setMoreOpen(false);
          }}
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
              border: "1px solid var(--border)",
              color: "var(--accent-gold)",
            }}
          >
            <Sparkles size={16} />
          </span>
          <span style={{ color: "var(--accent-gold)", fontWeight: 600 }}>AI Trip Planner</span>
        </button>

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

      {/* Tab Bar — floating-circle design */}
      {(() => {
        // Determine which tab index is active (0-based, 3 = More)
        const activeIndex = PRIMARY_TABS.findIndex(({ to, exact }) => isActive(to, exact));
        const resolvedIndex = activeIndex === -1 ? (moreIsActive || moreOpen ? 3 : -1) : activeIndex;
        return (
          <nav
            className="mobile-tab-bar"
            aria-label="Mobile navigation"
            data-active={resolvedIndex}
          >
            {/* Sliding background bar with cutout bubble */}
            <div className="tab-bar-back" aria-hidden="true" />

            {PRIMARY_TABS.map(({ to, icon: Icon, label, exact }, idx) => {
              const active = isActive(to, exact);
              return (
                <Link
                  key={to}
                  href={to}
                  className={`tab-bar-item${active ? " active" : ""}`}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="tab-bar-circle">
                    <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                  </span>
                  <span className="tab-bar-label">{label}</span>
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
              <span className="tab-bar-circle">
                {moreOpen ? (
                  <X size={20} strokeWidth={2.2} />
                ) : (
                  <MoreHorizontal size={20} strokeWidth={1.8} />
                )}
              </span>
              <span className="tab-bar-label">More</span>
            </button>
          </nav>
        );
      })()}

      {aiModalOpen && <AIItineraryModal onClose={() => setAiModalOpen(false)} />}
    </>
  );
}
