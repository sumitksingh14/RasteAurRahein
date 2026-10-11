"use client";

import { useState, useRef, useEffect } from "react";
import { Moon, Sun, SunMedium, Check } from "lucide-react";
import { useTheme, type Theme } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {
  variant?: "compact" | "segmented";
  className?: string;
}

const THEME_OPTIONS: Array<{
  key: Theme;
  label: string;
  sublabel: string;
  icon: typeof Moon;
}> = [
  { key: "dark", label: "Dark", sublabel: "Default night / low-glare", icon: Moon },
  { key: "outdoor", label: "Outdoor", sublabel: "High-contrast for bright sun", icon: SunMedium },
  { key: "light", label: "Light", sublabel: "Soft day view", icon: Sun },
];

export default function ThemeToggle({
  variant = "compact",
  className = "",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (variant === "segmented") {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
            color: "var(--text-muted, #9ca3af)",
          }}
        >
          Theme / Display
        </span>
        <div
          role="radiogroup"
          aria-label="Theme selection"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "6px",
            padding: "4px",
            background: "rgba(0, 0, 0, 0.15)",
            borderRadius: "var(--radius-sm, 12px)",
            border: "1px solid var(--border, rgba(255, 255, 255, 0.1))",
          }}
        >
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTheme(opt.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "0.55rem 0.6rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "var(--text-primary, #ffffff)" : "var(--text-muted, #9ca3af)",
                  background: isSelected
                    ? "var(--accent-gold-dim, rgba(99, 102, 241, 0.25))"
                    : "transparent",
                  border: isSelected
                    ? "1px solid var(--accent-gold, #6366f1)"
                    : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={14} style={{ color: isSelected ? "var(--accent-gold, #6366f1)" : "inherit" }} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact variant for Navbar header
  const currentOption = THEME_OPTIONS.find((o) => o.key === theme) || THEME_OPTIONS[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative" }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Current theme: ${currentOption.label}. Click to choose theme`}
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Theme: ${currentOption.label}`}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-primary, #374151)",
          background: "var(--bg-card, #e8eaf0)",
          border: "1px solid var(--border, rgba(99, 102, 241, 0.12))",
          cursor: "pointer",
          boxShadow: "var(--shadow-neo-raised)",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
      >
        <CurrentIcon size={16} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme options"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 210,
            background: "var(--bg-card, #1e1b4b)",
            border: "1px solid var(--border, rgba(255, 255, 255, 0.15))",
            borderRadius: "var(--radius-md, 16px)",
            padding: "0.5rem",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
            zIndex: 2100,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              padding: "0.35rem 0.65rem 0.5rem",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 700,
              color: "var(--text-muted, #818cf8)",
              borderBottom: "1px solid var(--border, rgba(255, 255, 255, 0.08))",
              marginBottom: "0.35rem",
            }}
          >
            Display Theme
          </div>

          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(opt.key);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "0.55rem 0.65rem",
                  borderRadius: "var(--radius-sm, 10px)",
                  background: isSelected ? "var(--accent-gold-dim, rgba(99, 102, 241, 0.15))" : "transparent",
                  border: "none",
                  color: isSelected ? "var(--accent-gold, #6366f1)" : "var(--text-primary, #ffffff)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Icon size={16} />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: isSelected ? 700 : 500 }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted, #9ca3af)", marginTop: 1 }}>
                      {opt.sublabel}
                    </div>
                  </div>
                </div>
                {isSelected && <Check size={15} style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
