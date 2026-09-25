import type { ReactNode } from "react";

/**
 * SilkPageHeader — Silk Design System (Neomorphic / Soft UI)
 *
 * Implements the "Extruded Light" 3D type treatment from DESIGN.md:
 *   • Raised neomorphic background panel (clay surface)
 *   • Layered text-shadow stack gives heading a physical, lifted depth
 *   • Eyebrow badge styled as a neomorphic inset pill
 *   • No borders, no gradients — depth comes purely from shadow
 */

interface SilkPageHeaderProps {
  /** Short uppercase label shown above the heading (e.g. "✦ Explore") */
  eyebrow?: ReactNode;
  /** The main page title */
  heading: ReactNode;
  /** Optional subtitle / description paragraph */
  description?: ReactNode;
  /** Max-width for the inner container text column */
  maxWidth?: number | string;
  /** Extra JSX slotted below the description (e.g. search bar, filter row) */
  children?: ReactNode;
  /** Additional padding override */
  paddingBottom?: string;
}

/** Silk 3D extrusion text-shadow — extruded from clay surface #e8eaf0 */
const SILK_3D_TEXT_SHADOW = [
  // Top highlight — lighter than clay, simulates light hitting raised face
  "0 -1px 0 rgba(255,255,255,0.90)",
  // Thin edge definition
  "0 1px 0 rgba(180,183,205,0.70)",
  // Extrusion depth layers
  "0 2px 0 rgba(160,163,188,0.55)",
  "0 3px 0 rgba(140,143,172,0.40)",
  "0 4px 0 rgba(120,123,155,0.28)",
  "0 5px 0 rgba(100,103,138,0.18)",
  // Far shadow — diffuse depth
  "0 6px 8px rgba(80,85,130,0.18)",
  "0 8px 20px rgba(60,65,110,0.12)",
].join(", ");

export default function SilkPageHeader({
  eyebrow,
  heading,
  description,
  maxWidth = 640,
  children,
  paddingBottom = "3rem",
}: SilkPageHeaderProps) {
  return (
    <div
      style={{
        background: "#e8eaf0",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06), inset 0 -1px 0 rgba(99,102,241,0.08)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: "3.5rem",
          paddingBottom,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }}
      >
        {/* ── Eyebrow Badge ────────────────────────────────── */}
        {eyebrow && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.3rem 0.875rem",
              borderRadius: "9999px",
              background: "#e8eaf0",
              boxShadow:
                "inset 3px 3px 6px rgba(0,0,0,0.07), inset -3px -3px 6px rgba(255,255,255,0.55)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#6366f1",
              marginBottom: "1.25rem",
              userSelect: "none",
            }}
          >
            {eyebrow}
          </div>
        )}

        {/* ── 3D Heading ───────────────────────────────────── */}
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#1e1b4b",
            textShadow: SILK_3D_TEXT_SHADOW,
            marginBottom: description ? "1rem" : children ? "1.5rem" : 0,
            margin: `0 0 ${description || children ? "1rem" : "0"}`,
          }}
        >
          {heading}
        </h1>

        {/* ── Description ──────────────────────────────────── */}
        {description && (
          <p
            style={{
              color: "#4B5563",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "52ch",
              margin: `0 0 ${children ? "2rem" : "0"}`,
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        )}

        {/* ── Slot for search bar, filter row, etc. ────────── */}
        {children}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .silk-header-h1 {
            letter-spacing: -0.02em;
          }
        }
      `}</style>
    </div>
  );
}
