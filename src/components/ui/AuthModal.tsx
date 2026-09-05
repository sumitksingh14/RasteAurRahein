"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

type Tab = "login" | "register";
type View = "auth" | "forgot" | "forgotSent";

interface FieldState {
  value: string;
  error: string;
  touched: boolean;
}

function useField(initial = "") {
  const [state, setState] = useState<FieldState>({ value: initial, error: "", touched: false });
  const set = (value: string) => setState((s) => ({ ...s, value, error: "" }));
  const touch = () => setState((s) => ({ ...s, touched: true }));
  const setError = (error: string) => setState((s) => ({ ...s, error, touched: true }));
  const reset = () => setState({ value: "", error: "", touched: false });
  return { ...state, set, touch, setError, reset };
}

// Member feature benefits shown on the left panel
const FEATURES = [
  { icon: "picture_as_pdf", label: "Export itineraries as PDF" },
  { icon: "favorite", label: "Like & save favourite trips" },
  { icon: "star", label: "Rate trips & share your experience" },
  { icon: "chat_bubble", label: "Comment and connect with travellers" },
  { icon: "map", label: "Access exclusive route maps" },
  { icon: "auto_awesome", label: "AI Trip Planner — generate itineraries" },
];

// Brand SVG logo — matching code.html exactly
function BrandLogo({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
        fill={color}
      />
    </svg>
  );
}

export default function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const { refresh } = useAuth();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [view, setView] = useState<View>("auth");
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const forgotRef = useRef<HTMLInputElement>(null);
  const forgotIdentifier = useField();

  const username = useField();
  const email = useField();
  const identifier = useField();
  const password = useField();

  useEffect(() => {
    username.reset(); email.reset(); identifier.reset(); password.reset();
    setGlobalError(""); setSuccess(false); setShowPass(false); setView("auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (view === "forgot") setTimeout(() => forgotRef.current?.focus(), 80);
  }, [view]);

  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const validate = (): boolean => {
    let ok = true;
    if (tab === "register") {
      if (username.value.trim().length < 2) { username.setError("Please enter your full name"); ok = false; }
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.setError("Enter a valid email"); ok = false; }
    } else {
      if (!identifier.value.trim()) { identifier.setError("Enter your email address"); ok = false; }
    }
    if (password.value.length < 8) { password.setError("At least 8 characters required"); ok = false; }
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const endpoint = tab === "register" ? "/api/auth/register" : "/api/auth/login";
      const body = tab === "register"
        ? { username: username.value.trim(), email: email.value, password: password.value }
        : { identifier: identifier.value.trim(), password: password.value };
      const res = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setGlobalError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
        await refresh();
        setTimeout(onClose, 950);
      }
    } catch {
      setGlobalError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgot = async () => {
    if (!forgotIdentifier.value.trim()) { setGlobalError("Please enter your username or email"); return; }
    setSubmitting(true); setGlobalError("");
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: forgotIdentifier.value.trim() }),
      });
      setView("forgotSent");
    } catch { setGlobalError("Network error — please try again."); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(34,23,16,0.55)",
          backdropFilter: "blur(8px)",
          animation: "rar2-fade 0.22s ease",
        }}
      />

      {/* Full-page modal container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === "login" ? "Sign in to Raste Aur Raahein" : "Create your account"}
        style={{
          position: "fixed", inset: 0, zIndex: 9001,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0.75rem",
          pointerEvents: "none",
        }}
      >
        {/* Split-screen card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: "auto",
            width: "min(1100px, 100%)",
            height: "min(680px, 96vh)",
            display: "flex",
            borderRadius: "1.25rem",
            overflow: "hidden",
            boxShadow: "0 48px 120px rgba(34,23,16,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
            animation: "rar2-up 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            background: "#fff",
          }}
        >
          {/* ══════════════════════════════════════
              LEFT PANEL — forest image + quote
          ══════════════════════════════════════ */}
          <div
            className="rar2-left-panel"
            style={{
              flex: "0 0 55%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "2.5rem 3rem",
              overflow: "hidden",
              background: "#221710",
            }}
          >
            {/* Background image */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIIc4VPVm7kXNFgdG-eEDHVs7a7GVPe6j3h78HFH28EyIRyOw3KXDRU75eubVO5fDXsf5DQQ2fN2T-xS2Fkgi6Ob7-GaODMXHCaaCXO_JWmIse4qYP6U9VtWkilfHXejDdkTbtxeMwq_WN8fShiXB03m7d8iVnfHG2Wp6zGDle7xxAauctWoZAjWepNN4zugqMJwW0_1lS0-1zE9I2EbdRRY-EjbelP-EVLded9VNXDMyqAwY1piyEAw')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 1s ease-out",
            }} />
            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(34,23,16,0.92) 0%, rgba(34,23,16,0.35) 45%, rgba(34,23,16,0.42) 100%)",
            }} />

            {/* Top: back link */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <a
                href="/"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.04em",
                  textDecoration: "none",
                  background: "rgba(34,23,16,0.4)",
                  backdropFilter: "blur(12px)",
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_back</span>
                Back to Journal
              </a>
            </div>

            {/* Bottom: quote + features */}
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Curated Footprints pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "0.3rem 0.85rem", borderRadius: "9999px",
                background: "rgba(212,95,17,0.2)", border: "1px solid rgba(212,95,17,0.35)",
                backdropFilter: "blur(8px)", marginBottom: "1rem",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#d45f11",
                  animation: "rar2-pulse 2s infinite",
                }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>
                  Curated Footprints
                </span>
              </div>

              {/* Quote */}
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1.55rem",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.38,
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
              }}>
                "The road isn't merely path or gravel, but the stillness found between footsteps."
              </h1>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 32, height: 2, background: "#d45f11", borderRadius: 1 }} />
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontWeight: 500, letterSpacing: "0.04em" }}>
                  Sumit Singh — Raste Aur Raahein
                </p>
              </div>

              {/* Member features */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.1rem" }}>
                <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.65rem" }}>
                  Member Benefits
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
                  {FEATURES.map((f) => (
                    <div key={f.icon} style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "0.9rem", color: "#d45f11", flexShrink: 0 }}>
                        {f.icon}
                      </span>
                      <span style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.78)", fontWeight: 500 }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT PANEL — form
          ══════════════════════════════════════ */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2rem 2.75rem 1.5rem",
            overflowY: "auto",
            background: "#f8f7f6",
          }}>
            {/* Brand header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ color: "#d45f11", width: 22, height: 22, flexShrink: 0 }}>
                  <BrandLogo size={22} color="#d45f11" />
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1.05rem", fontWeight: 700,
                  color: "#221710", letterSpacing: "-0.01em",
                }}>
                  Raste Aur Raahein
                </span>
              </div>
              {/* Mobile back */}
              <a
                href="/"
                className="rar2-mobile-back"
                style={{
                  display: "none", alignItems: "center", gap: "4px",
                  fontSize: "0.75rem", fontWeight: 700,
                  color: "rgba(34,23,16,0.6)", textDecoration: "none",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "0.9rem" }}>arrow_back</span>
                Back
              </a>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 420, width: "100%", margin: "0 auto", gap: "1.25rem" }}>

              {success ? (
                /* Success state */
                <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(212,95,17,0.1)", border: "2px solid #d45f11",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    animation: "rar2-scale 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "2rem", color: "#d45f11" }}>check_circle</span>
                  </div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#221710", marginBottom: "0.5rem" }}>
                    {tab === "login" ? "Welcome back!" : "Account created!"}
                  </h2>
                  <p style={{ color: "rgba(34,23,16,0.6)", fontSize: "0.875rem" }}>Signing you in…</p>
                </div>

              ) : view === "auth" ? (
                <>
                  {/* Heading */}
                  <div>
                    <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.75rem", fontWeight: 700, color: "#221710", letterSpacing: "-0.02em", marginBottom: "0.35rem" }}>
                      {tab === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p style={{ fontSize: "0.84rem", color: "rgba(34,23,16,0.6)", lineHeight: 1.55 }}>
                      {tab === "login"
                        ? "Sign in to access your travel journals, high-res galleries, and saved mountain trails."
                        : "Join the community of explorers — plan, save, and share your journeys."}
                    </p>
                  </div>

                  {/* Segmented tab switcher — matching code.html */}
                  <div style={{
                    display: "flex", height: 44, width: "100%",
                    alignItems: "center", borderRadius: "0.75rem",
                    background: "#fff", border: "1px solid rgba(34,23,16,0.08)",
                    padding: "4px", gap: "4px",
                  }}>
                    {(["login", "register"] as Tab[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                          flex: 1, height: "100%",
                          borderRadius: "0.625rem", border: "none",
                          cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "0.84rem", fontWeight: 600,
                          transition: "all 0.2s",
                          background: tab === t ? "#fff" : "transparent",
                          color: tab === t ? "#221710" : "rgba(34,23,16,0.5)",
                          boxShadow: tab === t ? "0 1px 4px rgba(34,23,16,0.12)" : "none",
                        }}
                      >
                        {t === "login" ? "Sign In" : "Create Account"}
                      </button>
                    ))}
                  </div>

                  {/* Global error */}
                  {globalError && (
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: "8px",
                      padding: "0.75rem 1rem",
                      background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "0.75rem", color: "#dc2626", fontSize: "0.83rem",
                      animation: "rar2-fade 0.2s ease",
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>error</span>
                      {globalError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    {/* Full name (register only) */}
                    {tab === "register" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        <label htmlFor="auth-username" style={labelCss}>Full Name</label>
                        <div style={{ position: "relative" }}>
                          <input
                            ref={firstInputRef}
                            id="auth-username"
                            type="text"
                            placeholder="Sumit Singh"
                            value={username.value}
                            onChange={(e) => username.set(e.target.value)}
                            onBlur={username.touch}
                            autoComplete="name"
                            style={inputCss(username)}
                          />
                          <span className="material-symbols-outlined" style={iconCss}>person</span>
                        </div>
                        {username.touched && username.error && <p style={errCss}>{username.error}</p>}
                      </div>
                    )}

                    {/* Email */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <label htmlFor="auth-email" style={labelCss}>Email Address</label>
                      <div style={{ position: "relative" }}>
                        {tab === "login" ? (
                          <input
                            ref={firstInputRef}
                            id="auth-email"
                            type="text"
                            placeholder="sumit@example.com"
                            value={identifier.value}
                            onChange={(e) => identifier.set(e.target.value)}
                            onBlur={identifier.touch}
                            autoComplete="username"
                            style={inputCss(identifier)}
                          />
                        ) : (
                          <input
                            id="auth-email"
                            type="email"
                            placeholder="sumit@example.com"
                            value={email.value}
                            onChange={(e) => email.set(e.target.value)}
                            onBlur={email.touch}
                            autoComplete="email"
                            style={inputCss(email)}
                          />
                        )}
                        <span className="material-symbols-outlined" style={iconCss}>mail</span>
                      </div>
                      {tab === "login" && identifier.touched && identifier.error && <p style={errCss}>{identifier.error}</p>}
                      {tab === "register" && email.touched && email.error && <p style={errCss}>{email.error}</p>}
                    </div>

                    {/* Password */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label htmlFor="auth-password" style={labelCss}>Password</label>
                        {tab === "login" && (
                          <button
                            type="button"
                            onClick={() => { setGlobalError(""); setView("forgot"); }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#d45f11", fontSize: "0.75rem", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 0 }}
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          id="auth-password"
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={password.value}
                          onChange={(e) => password.set(e.target.value)}
                          onBlur={password.touch}
                          autoComplete={tab === "login" ? "current-password" : "new-password"}
                          style={{ ...inputCss(password), paddingRight: "3rem" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass((s) => !s)}
                          aria-label="Toggle password visibility"
                          style={{
                            position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)",
                            background: "none", border: "none", cursor: "pointer",
                            color: "rgba(34,23,16,0.4)", display: "flex", padding: 0,
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#221710")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(34,23,16,0.4)")}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "1.15rem" }}>
                            {showPass ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                      {password.touched && password.error && <p style={errCss}>{password.error}</p>}
                    </div>

                    {/* Remember me */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.1rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.55rem", cursor: "pointer", userSelect: "none" }}>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          style={{
                            width: 16, height: 16, borderRadius: 4,
                            accentColor: "#d45f11", cursor: "pointer",
                          }}
                        />
                        <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "rgba(34,23,16,0.7)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Remember my session
                        </span>
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="auth-submit-btn"
                      disabled={submitting}
                      style={{
                        width: "100%", height: 48, marginTop: "0.25rem",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                        background: submitting ? "rgba(212,95,17,0.6)" : "#d45f11",
                        color: "#fff",
                        border: "none", borderRadius: "0.75rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.03em",
                        cursor: submitting ? "not-allowed" : "pointer",
                        boxShadow: "0 4px 16px rgba(212,95,17,0.35)",
                        transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
                        transform: submitting ? "scale(0.98)" : "scale(1)",
                      }}
                      onMouseEnter={(e) => { if (!submitting) (e.currentTarget.style.background = "#bd520d"); }}
                      onMouseLeave={(e) => { if (!submitting) (e.currentTarget.style.background = "#d45f11"); }}
                    >
                      <span>
                        {submitting ? "Please wait…" : tab === "login" ? "Sign In to Explorer" : "Create Travel Account"}
                      </span>
                      {!submitting && (
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>
                      )}
                    </button>
                  </form>

                  {/* Legal */}
                  <p style={{ fontSize: "0.69rem", textAlign: "center", color: "rgba(34,23,16,0.5)", lineHeight: 1.65, paddingTop: "0.25rem" }}>
                    By continuing, you agree to Raste Aur Raahein's{" "}
                    <a href="/terms" style={{ textDecoration: "underline", color: "inherit", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#221710")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(34,23,16,0.5)")}
                    >Terms of Journey</a>{" "}and{" "}
                    <a href="/privacy" style={{ textDecoration: "underline", color: "inherit", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#221710")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(34,23,16,0.5)")}
                    >Privacy Dispatch</a>.
                  </p>
                </>

              ) : view === "forgot" ? (
                /* ── FORGOT PASSWORD VIEW ── */
                <div style={{ animation: "rar2-fade 0.22s ease" }}>
                  <button
                    onClick={() => { setView("auth"); forgotIdentifier.reset(); setGlobalError(""); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "6px",
                      color: "rgba(34,23,16,0.6)", fontSize: "0.8rem", fontWeight: 600,
                      fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 0, marginBottom: "1.5rem",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_back</span>
                    Back to sign in
                  </button>

                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#221710", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                    Reset your password
                  </h2>
                  <p style={{ color: "rgba(34,23,16,0.6)", fontSize: "0.84rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    Enter your username or email and we'll send a reset link to your registered address.
                  </p>

                  {globalError && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.7rem 1rem", marginBottom: "1rem", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.75rem", color: "#dc2626", fontSize: "0.83rem" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "1rem", flexShrink: 0 }}>error</span>
                      {globalError}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1.1rem" }}>
                    <label htmlFor="forgot-id" style={labelCss}>Username or Email</label>
                    <div style={{ position: "relative" }}>
                      <input
                        ref={forgotRef}
                        id="forgot-id"
                        type="text"
                        placeholder="Username or email address"
                        value={forgotIdentifier.value}
                        onChange={(e) => { forgotIdentifier.set(e.target.value); setGlobalError(""); }}
                        autoComplete="username"
                        style={{ ...inputCss({ value: forgotIdentifier.value, error: "", touched: false }), paddingRight: "1rem" }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleForgot}
                    disabled={submitting}
                    style={{
                      width: "100%", height: 48,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      background: submitting ? "rgba(212,95,17,0.6)" : "#d45f11",
                      color: "#fff", border: "none", borderRadius: "0.75rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", fontWeight: 700,
                      cursor: submitting ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 16px rgba(212,95,17,0.3)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => { if (!submitting) (e.currentTarget.style.background = "#bd520d"); }}
                    onMouseLeave={(e) => { if (!submitting) (e.currentTarget.style.background = "#d45f11"); }}
                  >
                    {submitting ? "Sending…" : "Send Reset Link"}
                    {!submitting && <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>arrow_forward</span>}
                  </button>
                </div>

              ) : (
                /* ── FORGOT SENT VIEW ── */
                <div style={{ textAlign: "center", padding: "2.5rem 0", animation: "rar2-fade 0.22s ease" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(212,95,17,0.1)", border: "2px solid #d45f11",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    animation: "rar2-scale 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "2rem", color: "#d45f11" }}>mark_email_read</span>
                  </div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#221710", marginBottom: "0.75rem" }}>
                    Check your inbox
                  </h2>
                  <p style={{ color: "rgba(34,23,16,0.6)", fontSize: "0.84rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                    If an account exists for <strong style={{ color: "#221710" }}>{forgotIdentifier.value}</strong>,
                    you'll receive a reset link shortly. Check your spam folder too.
                  </p>
                  <button
                    onClick={() => { setView("auth"); forgotIdentifier.reset(); }}
                    style={{
                      background: "none", border: "1.5px solid rgba(34,23,16,0.15)", borderRadius: "9999px",
                      padding: "0.6rem 1.75rem", cursor: "pointer", color: "#221710",
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.875rem", fontWeight: 600,
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#d45f11")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(34,23,16,0.15)")}
                  >
                    ← Back to sign in
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(34,23,16,0.07)",
              display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center",
              gap: "0.5rem",
            }}>
              <span style={{ fontSize: "0.72rem", color: "rgba(34,23,16,0.45)" }}>© 2025 Raste Aur Raahein</span>
              <div style={{ display: "flex", gap: "1.25rem" }}>
                {[["Stories", "/"], ["Galleries", "/trips"], ["Journalist Bio", "/about"]].map(([label, href]) => (
                  <a
                    key={label} href={href}
                    style={{ fontSize: "0.72rem", color: "rgba(34,23,16,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d45f11")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(34,23,16,0.45)")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Material Symbols + Plus Jakarta Sans */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes rar2-fade   { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rar2-up     { from { opacity: 0; transform: scale(0.96) translateY(14px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes rar2-scale  { from { transform: scale(0.45); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes rar2-pulse  { 0%, 100% { opacity: 1 } 50% { opacity: 0.45 } }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 1.25rem;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }

        /* Hide left panel on small screens */
        @media (max-width: 768px) {
          .rar2-left-panel { display: none !important; }
          .rar2-mobile-back { display: inline-flex !important; }
        }

        /* Input focus ring */
        input:focus { outline: none; }
      `}</style>
    </>
  );
}

/* ── Shared inline style helpers ── */
const labelCss: React.CSSProperties = {
  fontSize: "0.68rem",
  fontWeight: 700,
  color: "rgba(34,23,16,0.65)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

function inputCss(field: { touched?: boolean; error?: string; value?: string }): React.CSSProperties {
  const hasError = field.touched && field.error;
  const isValid = field.touched && !field.error && field.value;
  return {
    width: "100%",
    height: 48,
    padding: "0 2.75rem 0 1rem",
    borderRadius: "0.75rem",
    border: `1.5px solid ${hasError ? "rgba(220,38,38,0.5)" : isValid ? "rgba(212,95,17,0.5)" : "rgba(34,23,16,0.14)"}`,
    background: "#fff",
    color: "#221710",
    fontSize: "0.875rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    boxShadow: hasError ? "0 0 0 3px rgba(220,38,38,0.08)" : isValid ? "0 0 0 3px rgba(212,95,17,0.1)" : "none",
  };
}

const iconCss: React.CSSProperties = {
  position: "absolute",
  right: "0.85rem",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "1.1rem",
  color: "rgba(34,23,16,0.35)",
  pointerEvents: "none",
};

const errCss: React.CSSProperties = {
  color: "#dc2626",
  fontSize: "0.72rem",
  marginTop: "3px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};
