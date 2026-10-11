"use client";

import React from "react";
import { Lightbulb, AlertTriangle, FileText, Coins, Info } from "lucide-react";

export type CalloutVariant = "tip" | "warning" | "permit" | "cost" | "info";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const VARIANT_CONFIG: Record<
  CalloutVariant,
  {
    color: string;
    bg: string;
    border: string;
    defaultTitle: string;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  }
> = {
  tip: {
    color: "var(--accent-gold, #FEBB02)",
    bg: "rgba(254, 187, 2, 0.08)",
    border: "rgba(254, 187, 2, 0.28)",
    defaultTitle: "Traveler Tip",
    icon: Lightbulb,
  },
  warning: {
    color: "#f87171", // Soft red / alert coral
    bg: "rgba(239, 68, 68, 0.09)",
    border: "rgba(239, 68, 68, 0.32)",
    defaultTitle: "Caution & Road Advisory",
    icon: AlertTriangle,
  },
  permit: {
    color: "#a78bfa", // Soft purple / permit violet
    bg: "rgba(139, 92, 246, 0.09)",
    border: "rgba(139, 92, 246, 0.32)",
    defaultTitle: "Permit & Checkpost Requirement",
    icon: FileText,
  },
  cost: {
    color: "#34d399", // Emerald / mint
    bg: "rgba(16, 185, 129, 0.09)",
    border: "rgba(16, 185, 129, 0.32)",
    defaultTitle: "Cost & Cash Advisory",
    icon: Coins,
  },
  info: {
    color: "var(--accent-teal, #38bdf8)",
    bg: "rgba(56, 189, 248, 0.08)",
    border: "rgba(56, 189, 248, 0.28)",
    defaultTitle: "Information",
    icon: Info,
  },
};

/**
 * Heuristically infers the most relevant callout variant from text content
 * if no explicit variant is provided.
 */
export function inferCalloutVariant(text: string): CalloutVariant {
  const lower = text.toLowerCase();
  if (
    lower.includes("permit") ||
    lower.includes("inner line") ||
    lower.includes("ilp") ||
    lower.includes("checkpost") ||
    lower.includes("entry pass") ||
    lower.includes("restricted area")
  ) {
    return "permit";
  }
  if (
    lower.includes("caution") ||
    lower.includes("danger") ||
    lower.includes("warning") ||
    lower.includes("hazard") ||
    lower.includes("ams") ||
    lower.includes("altitude sickness") ||
    lower.includes("landslide") ||
    lower.includes("risk") ||
    lower.includes("avoid") ||
    lower.includes("closed")
  ) {
    return "warning";
  }
  if (
    lower.includes("cash") ||
    lower.includes("atm") ||
    lower.includes("fee") ||
    lower.includes("cost") ||
    lower.includes("price") ||
    lower.includes("ticket") ||
    lower.includes("budget") ||
    lower.includes("toll")
  ) {
    return "cost";
  }
  return "tip";
}

export default function Callout({
  variant = "tip",
  title,
  children,
  icon,
  className = "",
  style,
}: CalloutProps) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.tip;
  const IconComponent = config.icon;

  return (
    <aside
      className={`callout-card callout-${variant} ${className}`}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderLeft: `4px solid ${config.color}`,
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem 1rem",
        marginTop: "0.6rem",
        marginBottom: "0.6rem",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
      role={variant === "warning" ? "alert" : "note"}
    >
      <div
        style={{
          color: config.color,
          flexShrink: 0,
          marginTop: title ? "2px" : "1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        {icon || <IconComponent size={16} />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: config.color,
              marginBottom: "0.2rem",
              fontFamily: "var(--font-sans)",
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            fontSize: "0.825rem",
            color: "var(--text-secondary)",
            lineHeight: 1.55,
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
