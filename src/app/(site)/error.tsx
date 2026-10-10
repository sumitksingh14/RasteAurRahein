"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site error:", error);
  }, [error]);

  return (
    <div
      style={{
        background: "var(--bg-primary)",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        fontFamily: "var(--font-sans)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }} aria-hidden="true">
        😕
      </div>

      <div
        style={{
          display: "inline-flex",
          padding: "0.3rem 0.875rem",
          borderRadius: "9999px",
          background: "var(--bg-card)",
          boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.07), inset -3px -3px 6px rgba(255,255,255,0.55)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          textTransform: "uppercase" as const,
          letterSpacing: "0.1em",
          color: "var(--accent-gold)",
          marginBottom: "1.25rem",
        }}
      >
        ✦ Something went wrong
      </div>

      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "1rem",
          lineHeight: 1.3,
        }}
      >
        This Page Hit a Rough Patch
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          maxWidth: "44ch",
          marginBottom: "2rem",
          fontSize: "0.9375rem",
        }}
      >
        An error occurred while loading this page. This is usually temporary — try refreshing or head back to continue exploring.
      </p>

      {error.digest && (
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1.5rem", fontFamily: "monospace" }}>
          Reference: {error.digest}
        </p>
      )}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.75rem",
            background: "var(--color-primary)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontSize: "0.9rem",
            boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
            fontFamily: "inherit",
          }}
        >
          🔄 Try Again
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.75rem",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            borderRadius: "var(--radius-md)",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "0.9rem",
            boxShadow: "var(--shadow-neo-raised)",
            border: "1.5px solid var(--border-accent)",
          }}
        >
          🏠 Go Home
        </Link>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.75rem",
            background: "transparent",
            color: "var(--text-muted)",
            borderRadius: "var(--radius-md)",
            fontWeight: 500,
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          Report This Issue
        </Link>
      </div>
    </div>
  );
}
