"use client";

import { useState, useRef } from "react";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

interface NewsletterInlineProps {
  /** Visual variant — 'card' shows a boxed card, 'strip' is a compact horizontal layout */
  variant?: "card" | "strip";
  /** Source label sent to GA4 */
  source?: string;
}

/**
 * Inline newsletter signup form.
 * Connects to the existing /api/newsletter endpoint (Resend).
 *
 * Usage:
 *   <NewsletterInline variant="card" source="trip-page" />
 *   <NewsletterInline variant="strip" source="footer" />
 */
export default function NewsletterInline({
  variant = "card",
  source = "inline",
}: NewsletterInlineProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading" || status === "success") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");

      // GA4 custom event
      window.gtag?.("event", "newsletter_signup", {
        method: source,
        event_category: "engagement",
      });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (variant === "strip") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            marginBottom: "0.25rem",
          }}
        >
          ✦ Newsletter
        </p>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          New itineraries straight to your inbox. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#22c55e",
              fontSize: "0.88rem",
              fontWeight: 500,
            }}
          >
            <CheckCircle size={16} />
            You&apos;re in! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-label="Email address"
              style={{
                flex: 1,
                padding: "0.55rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Subscribe to newsletter"
              style={{
                padding: "0.6rem 1.1rem",
                borderRadius: "var(--radius-sm, 8px)",
                background: "#006CE4",
                border: "none",
                color: "#FFFFFF",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600,
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0, 108, 228, 0.25)",
              }}
              onMouseEnter={(e) => {
                if (status !== "loading") {
                  e.currentTarget.style.background = "#0057B8";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 108, 228, 0.35)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (status !== "loading") {
                  e.currentTarget.style.background = "#006CE4";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 108, 228, 0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {status === "loading" ? (
                <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <>Subscribe <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: "0.25rem" }}>{errorMsg}</p>
        )}
      </div>
    );
  }

  // Card variant (used on trip pages mid-content)
  return (
    <div
      style={{
        background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)",
        border: "1px solid var(--border-accent)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem 2rem",
        marginTop: "2.5rem",
        marginBottom: "2.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(0, 108, 228, 0.1)",
            border: "1.5px solid rgba(0, 108, 228, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Mail size={18} color="#006CE4" />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#006CE4",
            }}
          >
            ✦ Stay in the Loop
          </div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Get new itineraries in your inbox
          </h3>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.92rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: "1.25rem",
        }}
      >
        Honest trip reports, cost breakdowns, and route maps — delivered whenever
        a new journey gets documented. No filler, no spam.
      </p>

      {status === "success" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0.875rem 1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "#22c55e",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          <CheckCircle size={18} />
          You&apos;re subscribed! A welcome email is on its way.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}
        >
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address for newsletter"
            style={{
              flex: "1 1 220px",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md, 12px)",
              border: "1px solid var(--border)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              fontSize: "0.92rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            id="newsletter-subscribe-btn"
            disabled={status === "loading"}
            style={{
              padding: "0.75rem 1.6rem",
              borderRadius: "var(--radius-md, 12px)",
              background: "#006CE4",
              border: "none",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.92rem",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 14px rgba(0, 108, 228, 0.28)",
            }}
            onMouseEnter={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.background = "#0057B8";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 108, 228, 0.38)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.background = "#006CE4";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 108, 228, 0.28)";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {status === "loading" ? (
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <>Subscribe Free <ArrowRight size={15} /></>
            )}
          </button>
        </form>
      )}
      {status === "error" && (
        <p style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.5rem" }}>{errorMsg}</p>
      )}

      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          marginTop: "0.75rem",
        }}
      >
        No spam. Unsubscribe anytime by replying to any email.
      </p>
    </div>
  );
}
