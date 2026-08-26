"use client";

import { useState, useEffect, useRef } from "react";
import { X, Eye, EyeOff, User, Mail, Lock, Compass, AlertCircle, CheckCircle } from "lucide-react";
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

export default function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const { refresh } = useAuth();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const username = useField();
  const email = useField();
  const password = useField();

  // Reset on tab switch
  useEffect(() => {
    username.reset();
    email.reset();
    password.reset();
    setGlobalError("");
    setSuccess(false);
    setShowPass(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 120);
    }
  }, [open]);

  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const validate = (): boolean => {
    let ok = true;
    if (tab === "register") {
      if (username.value.length < 3) { username.setError("At least 3 characters"); ok = false; }
      else if (!/^[a-zA-Z0-9_.-]+$/.test(username.value)) { username.setError("Letters, numbers, _ . - only"); ok = false; }
    }
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.setError("Enter a valid email"); ok = false;
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
        : { email: email.value, password: password.value };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
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

  const inputStyle = (field: FieldState): React.CSSProperties => ({
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.75rem",
    borderRadius: "10px",
    border: `1.5px solid ${field.touched && field.error ? "var(--accent-rose)" : field.touched && !field.error ? "var(--accent-gold)" : "var(--border)"}`,
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: field.touched && !field.error ? "0 0 0 3px rgba(201,168,76,0.12)" : "none",
  });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          background: "rgba(5,5,10,0.75)",
          backdropFilter: "blur(10px)",
          animation: "rar-fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === "login" ? "Sign in" : "Create account"}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9001,
          width: "min(440px, calc(100vw - 2rem))",
          animation: "rar-slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Glass card */}
        <div
          style={{
            background: "linear-gradient(145deg, rgba(20,20,30,0.96) 0%, rgba(12,12,20,0.98) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)",
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Compass size={18} style={{ color: "#0a0a0f" }} />
              </div>
              <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--text-primary)", fontSize: "1.15rem" }}>
                Raste Aur Raahein
              </span>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
              <X size={20} />
            </button>
          </div>

          {/* Tab switcher */}
          <div style={{
            display: "flex",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "10px",
            padding: "4px",
            marginBottom: "1.75rem",
            position: "relative",
          }}>
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "0.55rem",
                  borderRadius: "7px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  transition: "all 0.22s",
                  background: tab === t ? "rgba(201,168,76,0.18)" : "transparent",
                  color: tab === t ? "var(--accent-gold)" : "var(--text-muted)",
                  boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
                }}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Success state */}
          {success ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.25rem",
                animation: "rar-scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                <CheckCircle size={28} style={{ color: "#4caf50" }} />
              </div>
              <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {tab === "login" ? "Welcome back!" : "Account created!"}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "4px" }}>Signing you in…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Global error */}
              {globalError && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "0.75rem 1rem",
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "10px", color: "#f87171", fontSize: "0.875rem",
                  animation: "rar-fadeIn 0.2s ease",
                }}>
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  {globalError}
                </div>
              )}

              {/* Username (register only) */}
              {tab === "register" && (
                <div>
                  <div style={{ position: "relative" }}>
                    <User size={15} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                    <input
                      ref={firstInputRef}
                      type="text"
                      placeholder="Username"
                      value={username.value}
                      onChange={(e) => username.set(e.target.value)}
                      onBlur={username.touch}
                      id="auth-username"
                      autoComplete="username"
                      style={inputStyle(username)}
                    />
                  </div>
                  {username.touched && username.error && (
                    <p style={{ color: "var(--accent-rose)", fontSize: "0.75rem", marginTop: "4px", marginLeft: "2px" }}>{username.error}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <div style={{ position: "relative" }}>
                  <Mail size={15} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input
                    ref={tab === "login" ? firstInputRef : undefined}
                    type="email"
                    placeholder="Email address"
                    value={email.value}
                    onChange={(e) => email.set(e.target.value)}
                    onBlur={email.touch}
                    id="auth-email"
                    autoComplete="email"
                    style={inputStyle(email)}
                  />
                </div>
                {email.touched && email.error && (
                  <p style={{ color: "var(--accent-rose)", fontSize: "0.75rem", marginTop: "4px", marginLeft: "2px" }}>{email.error}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div style={{ position: "relative" }}>
                  <Lock size={15} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password (min. 8 characters)"
                    value={password.value}
                    onChange={(e) => password.set(e.target.value)}
                    onBlur={password.touch}
                    id="auth-password"
                    autoComplete={tab === "login" ? "current-password" : "new-password"}
                    style={{ ...inputStyle(password), paddingRight: "3rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {password.touched && password.error && (
                  <p style={{ color: "var(--accent-rose)", fontSize: "0.75rem", marginTop: "4px", marginLeft: "2px" }}>{password.error}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.9rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  background: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-rose) 100%)",
                  color: "#0a0a0f",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  opacity: submitting ? 0.7 : 1,
                  transition: "opacity 0.2s, transform 0.15s",
                  transform: submitting ? "scale(0.98)" : "scale(1)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
                }}
              >
                {submitting ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
              </button>

              {/* Switch tab link */}
              <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setTab(tab === "login" ? "register" : "login")}
                  style={{ color: "var(--accent-gold)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-sans)", fontSize: "0.875rem" }}
                >
                  {tab === "login" ? "Create one" : "Sign in"}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes rar-fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes rar-slideUp { from { opacity:0; transform:translate(-50%,-47%) } to { opacity:1; transform:translate(-50%,-50%) } }
        @keyframes rar-scaleIn { from { transform:scale(0.5); opacity:0 } to { transform:scale(1); opacity:1 } }
      `}</style>
    </>
  );
}
