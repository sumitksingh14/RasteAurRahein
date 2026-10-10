"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your analytics/error tracking here
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          background: "#e8eaf0",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            ⚠️
          </div>

          <div
            style={{
              display: "inline-flex",
              padding: "0.3rem 0.875rem",
              borderRadius: "9999px",
              background: "#e8eaf0",
              boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.07), inset -3px -3px 6px rgba(255,255,255,0.55)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              color: "#6366f1",
              marginBottom: "1.25rem",
            }}
          >
            ✦ Something went wrong
          </div>

          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#1e1b4b",
              marginBottom: "1rem",
              lineHeight: 1.3,
            }}
          >
            An Unexpected Error Occurred
          </h1>

          <p
            style={{
              color: "#4B5563",
              lineHeight: 1.75,
              marginBottom: "2rem",
              fontSize: "0.9375rem",
            }}
          >
            Something went wrong on our end. Our team has been notified. Please try again or head back to the homepage.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6B7280",
                marginBottom: "1.5rem",
                fontFamily: "monospace",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                background: "#6366f1",
                color: "#fff",
                borderRadius: "16px",
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
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                background: "#e8eaf0",
                color: "#4B5563",
                borderRadius: "16px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9rem",
                boxShadow: "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.60)",
                border: "1.5px solid rgba(99,102,241,0.28)",
              }}
            >
              🏠 Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
