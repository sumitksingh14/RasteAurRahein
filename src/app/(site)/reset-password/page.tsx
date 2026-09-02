"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Compass, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

type PageState = "verifying" | "invalid" | "form" | "success";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = use(searchParams);
  const { refresh } = useAuth();
  const router = useRouter();

  const [pageState, setPageState] = useState<PageState>("verifying");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Verify token on mount
  useEffect(() => {
    if (!token) { setPageState("invalid"); return; }

    fetch(`/api/auth/verify-reset-token?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        setPageState(data.valid ? "form" : "invalid");
        if (data.valid) setTimeout(() => inputRef.current?.focus(), 100);
      })
      .catch(() => setPageState("invalid"));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setPageState("success");
        await refresh();
        setTimeout(() => router.push("/"), 2200);
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Strength indicator
  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (password.length >= 12) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"][strength];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem 0.8rem 2.75rem",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        paddingTop: "calc(var(--nav-height) + 2rem)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem", justifyContent: "center" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Compass size={20} style={{ color: "#0a0a0f" }} />
          </div>
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--text-primary)", fontSize: "1.2rem" }}>
            Raste Aur Raahein
          </span>
        </div>

        {/* Card */}
        <div
          className="glass-card"
          style={{ padding: "2.5rem", borderRadius: "20px" }}
        >
          {/* ── VERIFYING ── */}
          {pageState === "verifying" && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <Loader size={32} style={{ color: "var(--accent-gold)", margin: "0 auto 1rem", display: "block", animation: "spin 1s linear infinite" }} />
              <p style={{ color: "var(--text-secondary)" }}>Verifying your reset link…</p>
            </div>
          )}

          {/* ── INVALID / EXPIRED ── */}
          {pageState === "invalid" && (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}>
                <AlertCircle size={28} style={{ color: "#ef4444" }} />
              </div>
              <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontSize: "1.4rem", marginBottom: "0.75rem" }}>
                Link expired
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                This password reset link has expired or already been used. Reset links are valid for 1 hour.
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0.75rem 1.75rem",
                  background: "var(--accent-gold-dim)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "100px",
                  color: "var(--accent-gold)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Back to home — request a new link
              </Link>
            </div>
          )}

          {/* ── FORM ── */}
          {pageState === "form" && (
            <>
              <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                Choose a new password
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.75rem", lineHeight: 1.65 }}>
                Pick something strong. You'll be signed in automatically after resetting.
              </p>

              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {/* Error */}
                {error && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "0.75rem 1rem",
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "10px", color: "#f87171", fontSize: "0.875rem",
                    animation: "rar-fadeIn 0.2s ease",
                  }}>
                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                    {error}
                  </div>
                )}

                {/* New password */}
                <div>
                  <div style={{ position: "relative" }}>
                    <Lock size={15} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                    <input
                      ref={inputRef}
                      type={showPass ? "text" : "password"}
                      placeholder="New password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      id="reset-password-new"
                      autoComplete="new-password"
                      style={{ ...inputStyle, paddingRight: "3rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password && (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            style={{
                              flex: 1,
                              height: 3,
                              borderRadius: 2,
                              background: n <= strength ? strengthColor : "var(--border)",
                              transition: "background 0.3s",
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: "0.72rem", color: strengthColor, fontWeight: 500 }}>
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div style={{ position: "relative" }}>
                  <Lock size={15} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                    id="reset-password-confirm"
                    autoComplete="new-password"
                    style={{
                      ...inputStyle,
                      paddingRight: "3rem",
                      borderColor: confirm && confirm !== password ? "var(--accent-rose)" : confirm && confirm === password ? "var(--accent-gold)" : "var(--border)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    marginTop: "0.25rem",
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
                    transition: "opacity 0.2s",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
                  }}
                >
                  {submitting ? "Resetting…" : "Set new password"}
                </button>
              </form>
            </>
          )}

          {/* ── SUCCESS ── */}
          {pageState === "success" && (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
                animation: "rar-scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                <CheckCircle size={30} style={{ color: "#4caf50" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                Password updated!
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                You're now signed in. Redirecting you home…
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes rar-fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes rar-scaleIn { from { transform:scale(0.5); opacity:0 } to { transform:scale(1); opacity:1 } }
      `}</style>
    </div>
  );
}
