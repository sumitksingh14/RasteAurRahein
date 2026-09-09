"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Calendar, X, Loader2 } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface StartTripButtonProps {
  tripSlug?: string;
  itineraryId?: string;
  tripTitle: string;
}

/**
 * "Start a Trip" button that:
 * 1. Prompts sign-in if not authenticated
 * 2. Opens a small inline drawer to name and date the group trip
 * 3. Creates the group via POST /api/group-trips
 * 4. Navigates to the group page
 */
export default function StartTripButton({
  tripSlug,
  itineraryId,
  tripTitle,
}: StartTripButtonProps) {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState(tripTitle);
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    setDrawerOpen(true);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Please enter a trip name.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/group-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          sourceTripSlug: tripSlug,
          sourceItineraryId: itineraryId,
          startDate,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Failed to create group trip.");
        return;
      }

      const data = await res.json();
      router.push(`/trips/group/${data.group.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-outline"
        id={`start-trip-btn-${tripSlug || itineraryId}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "0.5rem 1.25rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          borderRadius: "100px",
          border: "1.5px solid #006CE4",
          background: "rgba(0,108,228,0.05)",
          color: "#006CE4",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontFamily: "var(--font-sans)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#006CE4";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,108,228,0.05)";
          e.currentTarget.style.color = "#006CE4";
        }}
      >
        <Users size={15} />
        Start a Trip
      </button>

      {/* ── Inline drawer ── */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              maxWidth: 460,
              padding: "1.75rem",
              boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setDrawerOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid #E5E7EB",
                background: "#F9FAFB",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={15} />
            </button>

            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0,108,228,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Users size={18} color="#006CE4" />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#262729",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Start a Group Trip
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                  Invite friends and plan together
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="group-trip-name"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.35rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Trip name
                </label>
                <input
                  id="group-trip-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Spiti Valley 2027"
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1.5px solid #E5E7EB",
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-sans)",
                    color: "#262729",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#006CE4")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                />
              </div>

              <div>
                <label
                  htmlFor="group-trip-date"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.35rem",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Planned start date{" "}
                  <span style={{ fontWeight: 400, color: "#9CA3AF" }}>(optional)</span>
                </label>
                <input
                  id="group-trip-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1.5px solid #E5E7EB",
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-sans)",
                    color: "#262729",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#006CE4")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                />
              </div>

              {error && (
                <div
                  style={{
                    padding: "0.65rem 0.85rem",
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "var(--radius-sm)",
                    color: "#991B1B",
                    fontSize: "0.82rem",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                onClick={handleCreate}
                disabled={loading}
                className="btn btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  width: "100%",
                  padding: "0.7rem",
                  fontSize: "0.9rem",
                  marginTop: "0.25rem",
                }}
              >
                {loading ? (
                  <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Creating…</>
                ) : (
                  <><Users size={15} /> Create Group Trip</>
                )}
              </button>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      )}
    </>
  );
}
