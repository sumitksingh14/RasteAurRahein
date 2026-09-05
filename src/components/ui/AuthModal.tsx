"use client";

import { useState, useEffect, useRef } from "react";
import {
  Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle,
  ArrowLeft, FileDown, Heart, MessageCircle, Star, Map, Sparkles, X
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

type Tab = "login" | "register";

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

// Features available after login
const MEMBER_FEATURES = [
  { icon: <FileDown size={15} />, label: "Export itineraries as PDF", color: "#c9a84c" },
  { icon: <Heart size={15} />, label: "Like & save favourite trips", color: "#f9a8d4" },
  { icon: <Star size={15} />, label: "Rate trips & share your experience", color: "#fbbf24" },
  { icon: <MessageCircle size={15} />, label: "Comment and connect with travellers", color: "#5eead4" },
  { icon: <Map size={15} />, label: "Access exclusive route maps", color: "#60a5fa" },
  { icon: <Sparkles size={15} />, label: "AI Trip Planner — generate itineraries", color: "#a78bfa" },
];

export default function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const { refresh } = useAuth();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [view, setView] = useState<"auth" | "forgot" | "forgotSent">("auth");
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    if (open) setTimeout(() => firstInputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = (): boolean => {
    let ok = true;
    if (tab === "register") {
      if (username.value.length < 3) { username.setError("At least 3 characters"); ok = false; }
      else if (!/^[a-zA-Z0-9_.-]+$/.test(username.value)) { username.setError("Letters, numbers, _ . - only"); ok = false; }
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.setError("Enter a valid email"); ok = false; }
    } else {
      if (!identifier.value.trim()) { identifier.setError("Enter your email address"); ok = false; }
    }
    if (password.value.length < 8) { password.setError("At least 8 characters"); ok = false; }
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
        ? { username: username.value, email: email.value, password: password.value }
        : { identifier: identifier.value.trim(), password: password.value };
      const res = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setGlobalError(data.error || "Something went wrong");
      } else {
        setSuccess(true);
        await refresh();
        setTimeout(onClose, 900);
      }
    } catch {
      setGlobalError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 2.75rem 0.8rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid #e2e2e2",
    background: "#fff",
    color: "#1a1a1a",
    fontSize: "0.9rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  const inputStyle = (field: FieldState): React.CSSProperties => ({
    ...inputBase,
    borderColor: field.touched && field.error ? "#ef4444" : field.touched && !field.error ? "#c9a84c" : "#e2e2e2",
    boxShadow: field.touched && !field.error ? "0 0 0 3px rgba(201,168,76,0.12)" : "none",
  });

  return (
    <>
      {/* Full-screen overlay */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          animation: "am-fadeIn 0.2s ease",
        }}
        onClick={onClose}
      />

      {/* Split panel container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === "login" ? "Sign in" : "Create account"}
        style={{
          position: "fixed", inset: 0, zIndex: 9001,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "min(1000px, 100%)",
            height: "min(640px, 95vh)",
            display: "flex",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            animation: "am-slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── LEFT PANEL — Forest photo + quote ── */}
          <div
            style={{
              flex: "0 0 45%",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundImage: "url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%)",
            }} />

            {/* Back to journal link */}
            <a
              href="/"
              style={{
                position: "absolute", top: "1.5rem", left: "1.5rem",
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: "rgba(255,255,255,0.85)", fontSize: "0.78rem", fontWeight: 500,
                textDecoration: "none", zIndex: 2,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              <ArrowLeft size={13} /> Back to Journal
            </a>

            {/* Bottom quote content */}
            <div style={{ position: "relative", zIndex: 2, padding: "2rem" }}>
              {/* Tag pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(201,168,76,0.25)", border: "1px solid rgba(201,168,76,0.5)",
                borderRadius: "100px", padding: "0.3rem 0.75rem",
                marginBottom: "1rem",
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#c9a84c",
                }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#c9a84c", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Curated Footprints
                </span>
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.4,
                marginBottom: "1.25rem",
              }}>
                "The road isn't merely path or gravel, but the stillness found between footsteps."
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 28, height: 2, background: "#c9a84c" }} />
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                  Sumit Singh — Raste Aur Raahein
                </span>
              </div>

              {/* Member features list (only when in login/register view) */}
              {view === "auth" && (
                <div style={{ marginTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "0.6rem" }}>
                    Member benefits
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {MEMBER_FEATURES.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                        <span style={{ color: f.color, flexShrink: 0 }}>{f.icon}</span>
                        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT PANEL — Form ── */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            {/* Top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.5rem 2rem 0",
            }}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "7px",
                  background: "#c9a84c",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "#fff" }}>RR</span>
                </div>
                <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: "#1a1a1a", fontSize: "0.95rem" }}>
                  Raste Aur Raahein
                </span>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  background: "#f4f4f4", border: "none", borderRadius: "50%",
                  width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#888",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e8e8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f4f4f4")}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Main form area */}
            <div style={{ flex: 1, padding: "2rem 2rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>

              {/* ── SUCCESS STATE ── */}
              {success ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(201,168,76,0.12)", border: "2px solid #c9a84c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    animation: "am-scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    <CheckCircle size={30} style={{ color: "#c9a84c" }} />
                  </div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#1a1a1a", marginBottom: "0.5rem" }}>
                    {tab === "login" ? "Welcome back!" : "Account created!"}
                  </h2>
                  <p style={{ color: "#888", fontSize: "0.875rem" }}>Signing you in…</p>
                </div>

              ) : view === "auth" ? (
                <>
                  {/* Heading */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.35rem" }}>
                      {tab === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p style={{ color: "#888", fontSize: "0.84rem", lineHeight: 1.5 }}>
                      {tab === "login"
                        ? "Sign in to access your travel journals, high-res galleries, and saved mountain trails."
                        : "Join the community of explorers. Start your journey today."}
                    </p>
                  </div>

                  {/* Tab switcher */}
                  <div style={{
                    display: "flex", borderRadius: "100px",
                    background: "#f3f3f3", padding: "3px",
                    marginBottom: "1.5rem", width: "100%",
                  }}>
                    {(["login", "register"] as Tab[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                          flex: 1, padding: "0.55rem 1rem",
                          borderRadius: "100px", border: "none", cursor: "pointer",
                          fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600,
                          transition: "all 0.22s",
                          background: tab === t ? "#fff" : "transparent",
                          color: tab === t ? "#1a1a1a" : "#888",
                          boxShadow: tab === t ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                        }}
                      >
                        {t === "login" ? "Sign In" : "Create Account"}
                      </button>
                    ))}
                  </div>

                  {/* Global error */}
                  {globalError && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "0.7rem 1rem", marginBottom: "1rem",
                      background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "10px", color: "#ef4444", fontSize: "0.84rem",
                      animation: "am-fadeIn 0.2s ease",
                    }}>
                      <AlertCircle size={14} style={{ flexShrink: 0 }} />
                      {globalError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    {/* Username (register only) */}
                    {tab === "register" && (
                      <div>
                        <label style={labelStyle}>USERNAME</label>
                        <div style={{ position: "relative" }}>
                          <input
                            ref={firstInputRef}
                            type="text"
                            placeholder="explorer_sumit"
                            value={username.value}
                            onChange={(e) => username.set(e.target.value)}
                            onBlur={username.touch}
                            id="auth-username"
                            autoComplete="username"
                            style={inputStyle(username)}
                          />
                          <User size={14} style={iconStyle} />
                        </div>
                        {username.touched && username.error && <p style={errStyle}>{username.error}</p>}
                      </div>
                    )}

                    {/* Email / Identifier */}
                    <div>
                      <label style={labelStyle}>EMAIL ADDRESS</label>
                      <div style={{ position: "relative" }}>
                        {tab === "login" ? (
                          <input
                            ref={firstInputRef}
                            type="text"
                            placeholder="sumit@example.com"
                            value={identifier.value}
                            onChange={(e) => identifier.set(e.target.value)}
                            onBlur={identifier.touch}
                            id="auth-identifier"
                            autoComplete="username"
                            style={inputStyle(identifier)}
                          />
                        ) : (
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={email.value}
                            onChange={(e) => email.set(e.target.value)}
                            onBlur={email.touch}
                            id="auth-email"
                            autoComplete="email"
                            style={inputStyle(email)}
                          />
                        )}
                        <Mail size={14} style={iconStyle} />
                      </div>
                      {tab === "login" && identifier.touched && identifier.error && <p style={errStyle}>{identifier.error}</p>}
                      {tab === "register" && email.touched && email.error && <p style={errStyle}>{email.error}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                        <label style={{ ...labelStyle, margin: 0 }}>PASSWORD</label>
                        {tab === "login" && (
                          <button
                            type="button"
                            onClick={() => { setGlobalError(""); setView("forgot"); }}
                            style={{
                              background: "none", border: "none", cursor: "pointer",
                              color: "#c9a84c", fontSize: "0.75rem", fontWeight: 600,
                              fontFamily: "var(--font-sans)", padding: 0,
                            }}
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPass ? "text" : "password"}
                          placeholder={tab === "login" ? "••••••••••••" : "Min. 8 characters"}
                          value={password.value}
                          onChange={(e) => password.set(e.target.value)}
                          onBlur={password.touch}
                          id="auth-password"
                          autoComplete={tab === "login" ? "current-password" : "new-password"}
                          style={{ ...inputStyle(password), paddingRight: "3rem" }}
                        />
                        <Lock size={14} style={iconStyle} />
                        <button
                          type="button"
                          onClick={() => setShowPass((s) => !s)}
                          style={{
                            position: "absolute", right: "0.9rem", top: "50%",
                            transform: "translateY(-50%)", background: "none", border: "none",
                            cursor: "pointer", color: "#aaa", display: "flex", padding: 0,
                          }}
                        >
                          {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                      {password.touched && password.error && <p style={errStyle}>{password.error}</p>}
                    </div>

                    {/* Remember me (login only) */}
                    {tab === "login" && (
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <div
                          onClick={() => setRememberMe((r) => !r)}
                          style={{
                            width: 18, height: 18, borderRadius: "5px", flexShrink: 0,
                            border: `2px solid ${rememberMe ? "#c9a84c" : "#d0d0d0"}`,
                            background: rememberMe ? "#c9a84c" : "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.15s", cursor: "pointer",
                          }}
                        >
                          {rememberMe && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span style={{ fontSize: "0.82rem", color: "#555", fontFamily: "var(--font-sans)" }}>
                          Remember my session
                        </span>
                      </label>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      id="auth-submit-btn"
                      style={{
                        marginTop: "0.25rem",
                        padding: "0.9rem",
                        borderRadius: "100px",
                        border: "none",
                        cursor: submitting ? "not-allowed" : "pointer",
                        background: submitting ? "#c9a84c99" : "linear-gradient(135deg, #c9a84c 0%, #b8912e 100%)",
                        color: "#fff",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        transition: "opacity 0.2s, transform 0.15s",
                        transform: submitting ? "scale(0.98)" : "scale(1)",
                        boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                      }}
                    >
                      {submitting
                        ? "Please wait…"
                        : tab === "login"
                          ? <>Sign In to Explorer <span style={{ fontSize: "1rem" }}>→</span></>
                          : <>Create Explorer Account <span style={{ fontSize: "1rem" }}>→</span></>
                      }
                    </button>
                  </form>

                  {/* Legal */}
                  <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#aaa", marginTop: "1rem", lineHeight: 1.6 }}>
                    By continuing, you agree to Raste Aur Raahein's{" "}
                    <a href="/terms" style={{ color: "#c9a84c", textDecoration: "underline" }}>Terms of Journey</a>
                    {" "}and{" "}
                    <a href="/privacy" style={{ color: "#c9a84c", textDecoration: "underline" }}>Privacy Dispatch</a>.
                  </p>
                </>

              ) : view === "forgot" ? (
                /* ── FORGOT PASSWORD ── */
                <div style={{ animation: "am-fadeIn 0.2s ease" }}>
                  <button
                    onClick={() => { setView("auth"); forgotIdentifier.reset(); setGlobalError(""); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#888", fontSize: "0.8rem", fontFamily: "var(--font-sans)",
                      display: "flex", alignItems: "center", gap: "4px",
                      padding: 0, marginBottom: "1.5rem",
                    }}
                  >
                    <ArrowLeft size={13} /> Back to sign in
                  </button>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#1a1a1a", marginBottom: "0.5rem" }}>
                    Reset your password
                  </h2>
                  <p style={{ color: "#888", fontSize: "0.84rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    Enter your username or email and we'll send a reset link to your registered address.
                  </p>

                  {globalError && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0.7rem 1rem", marginBottom: "1rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", color: "#ef4444", fontSize: "0.84rem" }}>
                      <AlertCircle size={14} style={{ flexShrink: 0 }} />
                      {globalError}
                    </div>
                  )}

                  <label style={labelStyle}>USERNAME OR EMAIL</label>
                  <div style={{ position: "relative", marginBottom: "1rem" }}>
                    <input
                      ref={forgotRef}
                      type="text"
                      placeholder="Username or email address"
                      value={forgotIdentifier.value}
                      onChange={(e) => { forgotIdentifier.set(e.target.value); setGlobalError(""); }}
                      id="forgot-identifier"
                      autoComplete="username"
                      style={{ ...inputBase, paddingLeft: "1rem" }}
                    />
                  </div>

                  <button
                    onClick={async () => {
                      if (!forgotIdentifier.value.trim()) { setGlobalError("Please enter your username or email"); return; }
                      setSubmitting(true); setGlobalError("");
                      try {
                        await fetch("/api/auth/forgot-password", {
                          method: "POST", headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ identifier: forgotIdentifier.value.trim() }),
                        });
                        setView("forgotSent");
                      } catch { setGlobalError("Network error — please try again"); }
                      finally { setSubmitting(false); }
                    }}
                    disabled={submitting}
                    style={{
                      width: "100%", padding: "0.9rem", borderRadius: "100px", border: "none",
                      cursor: submitting ? "not-allowed" : "pointer",
                      background: "linear-gradient(135deg, #c9a84c 0%, #b8912e 100%)",
                      color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700,
                      fontSize: "0.9rem", opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Sending…" : "Send Reset Link →"}
                  </button>
                </div>

              ) : (
                /* ── FORGOT SENT ── */
                <div style={{ textAlign: "center", padding: "2rem 0", animation: "am-fadeIn 0.2s ease" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(201,168,76,0.1)", border: "2px solid #c9a84c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    animation: "am-scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    <CheckCircle size={28} style={{ color: "#c9a84c" }} />
                  </div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#1a1a1a", marginBottom: "0.75rem" }}>
                    Check your inbox
                  </h2>
                  <p style={{ color: "#888", fontSize: "0.84rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                    If an account exists for <strong style={{ color: "#555" }}>{forgotIdentifier.value}</strong>,
                    you'll receive a reset link shortly. Check your spam folder if it doesn't arrive.
                  </p>
                  <button
                    onClick={() => { setView("auth"); forgotIdentifier.reset(); }}
                    style={{
                      background: "none", border: "1.5px solid #e2e2e2", borderRadius: "100px",
                      padding: "0.6rem 1.75rem", color: "#555", cursor: "pointer",
                      fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600,
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e2e2")}
                  >
                    ← Back to sign in
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              borderTop: "1px solid #f0f0f0",
              padding: "1rem 2rem",
              display: "flex", flexWrap: "wrap",
              justifyContent: "space-between", alignItems: "center",
              gap: "0.5rem",
            }}>
              <span style={{ fontSize: "0.72rem", color: "#bbb" }}>© 2025 Raste Aur Raahein</span>
              <div style={{ display: "flex", gap: "1.25rem" }}>
                {["Stories", "Galleries", "Journalist Bio"].map((item) => (
                  <a key={item} href={item === "Stories" ? "/" : item === "Galleries" ? "/trips" : "/about"}
                    style={{ fontSize: "0.72rem", color: "#bbb", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes am-fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes am-slideUp {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes am-scaleIn { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }

        /* Responsive: stack on mobile */
        @media (max-width: 640px) {
          .am-left-panel { display: none !important; }
        }
      `}</style>
    </>
  );
}

// Shared style helpers
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.68rem",
  fontWeight: 700,
  color: "#aaa",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "0.35rem",
  fontFamily: "var(--font-sans)",
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  right: "0.9rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#bbb",
  pointerEvents: "none",
};

const errStyle: React.CSSProperties = {
  color: "#ef4444",
  fontSize: "0.72rem",
  marginTop: "4px",
  marginLeft: "2px",
};
