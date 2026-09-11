"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const STORAGE_KEY = "rar_newsletter_dismissed";
const COOLDOWN_DAYS = 30; // re-show after N days if not subscribed

/**
 * Exit-intent newsletter popup.
 *
 * Triggers when:
 *  - User moves mouse out of the document (mouseleave on <html>)
 *  - User has been on the page for at least 20 seconds
 *  - Not dismissed within the last 30 days
 *  - Has not already subscribed (localStorage flag)
 *
 * Mount once in the root layout inside <body>.
 */
export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const readyRef = useRef(false); // becomes true after 20s dwell time

  const shouldShow = useCallback((): boolean => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return true;
      const { dismissed, subscribed, ts } = JSON.parse(raw);
      if (subscribed) return false;
      if (dismissed) {
        const daysSince = (Date.now() - ts) / (1000 * 60 * 60 * 24);
        return daysSince >= COOLDOWN_DAYS;
      }
      return true;
    } catch {
      return true;
    }
  }, []);

  const dismiss = (subscribed = false) => {
    setVisible(false);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dismissed: true, subscribed, ts: Date.now() })
      );
    } catch {
      /* localStorage blocked — ignore */
    }
  };

  useEffect(() => {
    // Wait 20 seconds before arming the exit-intent
    const timer = setTimeout(() => {
      readyRef.current = true;
    }, 20_000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!readyRef.current) return;
      if (e.clientY > 10) return; // only trigger when cursor leaves via top edge
      if (shouldShow()) setVisible(true);
    };

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldShow]);

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
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      window.gtag?.("event", "newsletter_signup", {
        method: "exit_intent_popup",
        event_category: "engagement",
      });

      // Dismiss after 2.5s so user can see the success state
      setTimeout(() => dismiss(true), 2500);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => dismiss()}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 0.25s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nl-popup-title"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem",
        }}
      >
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-accent)",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem 2rem",
            maxWidth: 480,
            width: "100%",
            position: "relative",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Close */}
          <button
            id="nl-popup-close"
            onClick={() => dismiss()}
            aria-label="Close newsletter popup"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-muted)",
            }}
          >
            <X size={15} />
          </button>

          {/* Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <Mail size={24} color="#0a0a0f" />
          </div>

          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--accent-gold)",
              marginBottom: "0.5rem",
            }}
          >
            ✦ Before you go
          </p>

          <h2
            id="nl-popup-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.6rem",
              color: "var(--text-primary)",
              lineHeight: 1.25,
              marginBottom: "0.875rem",
            }}
          >
            Want the next trip in your inbox?
          </h2>

          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            Real itineraries, honest budgets, and route maps — whenever
            a new adventure gets documented on Raste Aur Raahein. Zero filler.
          </p>

          {status === "success" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
                fontSize: "0.92rem",
                fontWeight: 500,
              }}
            >
              <CheckCircle size={20} />
              Subscribed! Check your inbox for a welcome message.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoFocus
                aria-label="Email address"
                style={{
                  padding: "0.8rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                id="nl-popup-subscribe-btn"
                disabled={status === "loading"}
                style={{
                  padding: "0.85rem 1.5rem",
                  borderRadius: "var(--radius-md, 12px)",
                  background: "#006CE4",
                  border: "none",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
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
                  <Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <>Subscribe Free <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p style={{ fontSize: "0.8rem", color: "#ef4444", marginTop: "0.5rem" }}>{errorMsg}</p>
          )}

          <button
            onClick={() => dismiss()}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              cursor: "pointer",
              marginTop: "1rem",
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "0.25rem",
            }}
          >
            No thanks, I&apos;ll miss out
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}
