"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Users, MapPin, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface GroupPreview {
  id: string;
  name: string;
  organizerId: string;
  sourceTripSlug?: string;
  startDate?: string;
  memberCount?: number;
}

export default function JoinGroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { user, loading: authLoading, openAuthModal } = useAuth();
  const router = useRouter();

  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  // If not signed in, prompt auth modal
  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal();
    }
  }, [authLoading, user, openAuthModal]);

  const handleJoin = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    setJoining(true);
    setError("");
    try {
      const res = await fetch(`/api/group-trips/join/${token}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to join. The invite link may be expired.");
        return;
      }

      setJoined(true);
      setTimeout(() => {
        router.push(`/trips/group/${data.groupId}`);
      }, 1800);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  if (authLoading) {
    return (
      <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 size={24} style={{ animation: "spin 1s linear infinite", color: "#006CE4" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: "var(--nav-height)",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #EFF6FF 0%, #F9FAFB 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          border: "1px solid #E5E7EB",
          boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
          padding: "2.5rem 2rem",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}
      >
        {joined ? (
          <>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <CheckCircle size={40} color="#10B981" style={{ marginBottom: "1rem" }} />
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "#262729", marginBottom: "0.5rem" }}>
              You're in!
            </h1>
            <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
              Redirecting to the group trip…
            </p>
          </>
        ) : (
          <>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,108,228,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Users size={28} color="#006CE4" />
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "#262729", marginBottom: "0.5rem" }}>
              You've been invited!
            </h1>
            <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              {user
                ? `Join this group trip as @${user.username}.`
                : "Sign in to join this group trip."}
            </p>

            {error && (
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "var(--radius-sm)",
                  color: "#991B1B",
                  fontSize: "0.85rem",
                  marginBottom: "1.25rem",
                }}
              >
                {error}
              </div>
            )}

            <button
              onClick={handleJoin}
              disabled={joining || !user}
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.95rem",
                marginBottom: "1rem",
              }}
            >
              {joining ? (
                <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Joining…</>
              ) : (
                <><Users size={16} /> Join Group Trip</>
              )}
            </button>

            {!user && (
              <p style={{ fontSize: "0.82rem", color: "#9CA3AF" }}>
                Sign in first to join this trip.
              </p>
            )}

            <Link
              href="/trips"
              style={{ display: "block", fontSize: "0.82rem", color: "#9CA3AF", marginTop: "1rem", textDecoration: "none" }}
            >
              Browse trips instead
            </Link>
          </>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
