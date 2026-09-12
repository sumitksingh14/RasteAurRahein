"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, X, RefreshCw } from "lucide-react";
import type { TripAlert } from "@/lib/tripAlerts";

interface TripAlertBannerProps {
  slug: string;
  /** Optionally pre-load the alert from the server (SSR) */
  initialAlert?: TripAlert | null;
}

const STATUS_CONFIG = {
  open: {
    bg: "rgba(22,163,74,0.12)",
    border: "rgba(22,163,74,0.4)",
    text: "#15803d",
    icon: CheckCircle,
    label: "Route Open",
    badgeBg: "rgba(22,163,74,0.15)",
    badgeText: "#15803d",
  },
  caution: {
    bg: "rgba(217,119,6,0.12)",
    border: "rgba(217,119,6,0.4)",
    text: "#b45309",
    icon: AlertTriangle,
    label: "Caution",
    badgeBg: "rgba(217,119,6,0.15)",
    badgeText: "#b45309",
  },
  closed: {
    bg: "rgba(220,38,38,0.10)",
    border: "rgba(220,38,38,0.4)",
    text: "#b91c1c",
    icon: XCircle,
    label: "Route Closed",
    badgeBg: "rgba(220,38,38,0.15)",
    badgeText: "#b91c1c",
  },
} as const;

/**
 * Displays a road/trail condition alert banner on a trip detail page.
 * Fetches from /api/alerts?slug=... on the client side for freshness.
 * Falls back to `initialAlert` if provided (avoids extra round-trip).
 */
export default function TripAlertBanner({ slug, initialAlert }: TripAlertBannerProps) {
  const [alert, setAlert] = useState<TripAlert | null>(initialAlert ?? null);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(!initialAlert);

  useEffect(() => {
    if (initialAlert !== undefined) return; // already have data from server
    fetch(`/api/alerts?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setAlert(d.alert ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, initialAlert]);

  if (loading || !alert || dismissed) return null;

  const cfg = STATUS_CONFIG[alert.status];
  const Icon = cfg.icon;
  const updatedDate = new Date(alert.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      role="alert"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "var(--radius-md)",
        padding: "0.875rem 1.1rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        marginBottom: "1.5rem",
        position: "relative",
      }}
    >
      {/* Icon */}
      <Icon
        size={20}
        color={cfg.text}
        style={{ flexShrink: 0, marginTop: 2 }}
      />

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "0.3rem",
          }}
        >
          {/* Status badge */}
          <span
            style={{
              padding: "0.15rem 0.6rem",
              borderRadius: "100px",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: cfg.badgeBg,
              color: cfg.badgeText,
            }}
          >
            ● {cfg.label}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              color: cfg.text,
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <RefreshCw size={10} />
            Updated {updatedDate}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: cfg.text,
            lineHeight: 1.55,
          }}
        >
          {alert.message}
        </p>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss alert"
        style={{
          flexShrink: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: cfg.text,
          opacity: 0.6,
          padding: "2px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

/**
 * Compact badge for use on TripCard — fetched lazily client-side.
 */
export function TripAlertBadge({ slug }: { slug: string }) {
  const [alert, setAlert] = useState<TripAlert | null | "loading">("loading");

  useEffect(() => {
    fetch(`/api/alerts?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setAlert(d.alert ?? null))
      .catch(() => setAlert(null));
  }, [slug]);

  if (alert === "loading" || alert === null) return null;

  const cfg = STATUS_CONFIG[alert.status];
  if (alert.status === "open") return null; // "open" is the default — don't clutter cards

  return (
    <span
      title={alert.message}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "0.15rem 0.55rem",
        borderRadius: "100px",
        fontSize: "0.65rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        background: cfg.badgeBg,
        color: cfg.badgeText,
        border: `1px solid ${cfg.border}`,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      ● {cfg.label}
    </span>
  );
}
