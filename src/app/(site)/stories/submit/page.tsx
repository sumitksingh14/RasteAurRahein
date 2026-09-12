"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Send, Image as ImageIcon, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import type { Trip } from "@/lib/types";

export default function SubmitStoryPage() {
  const { user, loading, openAuthModal } = useAuth();
  const router = useRouter();
  
  const [trips, setTrips] = useState<Trip[]>([]);
  const [fetchingTrips, setFetchingTrips] = useState(true);
  
  const [form, setForm] = useState({
    tripSlug: "",
    title: "",
    body: "",
    photoUrl: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Only logged in users can submit
    if (!loading && !user) {
      openAuthModal();
      router.push("/");
    }
  }, [user, loading, router, openAuthModal]);

  useEffect(() => {
    fetch("/api/trips") // assuming /api/trips exists or we fetch from a public endpoint
      .then((r) => r.json())
      .then((d) => setTrips(d.trips || []))
      .catch(() => {})
      .finally(() => setFetchingTrips(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Failed to submit story");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) return <div style={{ minHeight: "100vh" }} />;

  if (success) {
    return (
      <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", padding: "3rem 2rem", borderRadius: "var(--radius-lg)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", textAlign: "center", maxWidth: 440 }}>
          <CheckCircle size={48} color="#10b981" style={{ margin: "0 auto 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "#0f172a", marginBottom: "1rem" }}>Story Submitted!</h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            Thank you for sharing your experience. Our team will review your story before publishing it to the community.
          </p>
          <button onClick={() => router.push("/dashboard")} className="btn btn-primary" style={{ width: "100%" }}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0", 
    background: "#F8FAFC", fontSize: "0.95rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box"
  };

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "#F9FAFB" }}>
      <div className="container" style={{ maxWidth: 720, padding: "3rem 1rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", color: "#0f172a", marginBottom: "0.5rem" }}>
          Share Your Journey
        </h1>
        <p style={{ color: "#64748b", fontSize: "1rem", marginBottom: "2.5rem" }}>
          Inspire others by sharing your personal experience, photos, and tips from one of our curated routes.
        </p>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.5rem", color: "#dc2626", display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "2.5rem", borderRadius: "var(--radius-lg)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
              <MapPin size={14} /> Which trip did you take?
            </label>
            <select 
              style={inputStyle} 
              value={form.tripSlug} 
              onChange={(e) => setForm({ ...form, tripSlug: e.target.value })}
              required
            >
              <option value="" disabled>Select a route...</option>
              {fetchingTrips ? (
                <option disabled>Loading trips...</option>
              ) : (
                trips.map(t => <option key={t.slug} value={t.slug}>{t.title}</option>)
              )}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
              Story Title
            </label>
            <input 
              style={inputStyle} 
              placeholder="E.g. A Magical Winter in Spiti"
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
              Your Story
            </label>
            <textarea 
              style={{ ...inputStyle, minHeight: 200, resize: "vertical" }} 
              placeholder="Tell us about the highlights, challenges, and memorable moments..."
              value={form.body} 
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
              <ImageIcon size={14} /> Photo URL (Optional)
            </label>
            <input 
              style={inputStyle} 
              type="url"
              placeholder="Link to a photo (Imgur, Google Drive, etc.)"
              value={form.photoUrl} 
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="btn btn-primary"
            style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0.85rem" }}
          >
            {submitting ? "Submitting..." : <><Send size={16} /> Submit for Review</>}
          </button>
        </form>
      </div>
    </div>
  );
}
