"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Lock, LogIn } from "lucide-react";

export default function LoginPrompt({
  message = "You need to be signed in to access this page.",
}: {
  message?: string;
}) {
  const { openAuthModal } = useAuth();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "3.5rem 2rem",
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius-lg, 16px)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(0, 108, 228, 0.15)",
          color: "#006CE4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.25rem",
        }}
      >
        <Lock size={26} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.4rem",
          color: "var(--text-primary, #FFFFFF)",
          marginBottom: "0.5rem",
        }}
      >
        Sign in required
      </h3>
      <p
        style={{
          color: "var(--text-secondary, #9CA3AF)",
          fontSize: "0.95rem",
          maxWidth: 420,
          margin: "0 auto 1.5rem",
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>
      <button
        type="button"
        onClick={() => openAuthModal()}
        className="btn btn-primary"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "0.6rem 1.5rem",
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        <LogIn size={16} />
        Sign In / Register
      </button>
    </div>
  );
}
