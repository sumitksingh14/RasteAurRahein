"use client";

import { useEffect, useState } from "react";
import { Check, X, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import type { Story } from "@/lib/stories";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchStories = () => {
    setLoading(true);
    fetch("/api/admin/stories")
      .then((r) => r.json())
      .then((d) => setStories(d.stories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    setProcessing(id);
    try {
      await fetch(`/api/admin/stories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setStories((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to completely delete this story?")) return;
    setProcessing(id);
    try {
      await fetch(`/api/admin/stories/${id}`, { method: "DELETE" });
      setStories((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading pending stories...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <BookOpen size={24} color="#006CE4" />
          Pending User Stories
        </h1>
        <button 
          onClick={fetchStories}
          className="btn"
          style={{ background: "#fff", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 8 }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {stories.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: 16, border: "1px dashed #E2E8F0" }}>
          <AlertCircle size={40} color="#94a3b8" style={{ margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.2rem", color: "#475569", margin: "0 0 0.5rem" }}>No pending stories</h3>
          <p style={{ color: "#94a3b8", margin: 0 }}>All caught up! New user submissions will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {stories.map((story) => (
            <div key={story.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem", color: "#0f172a" }}>{story.title}</h3>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "#64748b" }}>
                    <span>By <strong>{story.username}</strong></span>
                    <span>Trip: <a href={`/trips/${story.tripSlug}`} target="_blank" style={{ color: "#006CE4" }}>{story.tripSlug}</a></span>
                    <span>Submitted: {new Date(story.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button 
                    onClick={() => handleAction(story.id, "approved")}
                    disabled={processing === story.id}
                    style={{ background: "#F0FDF4", color: "#16a34a", border: "1px solid #86EFAC", padding: "0.5rem 1rem", borderRadius: 8, display: "flex", alignItems: "center", gap: 6, fontWeight: 600, cursor: "pointer" }}
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button 
                    onClick={() => handleAction(story.id, "rejected")}
                    disabled={processing === story.id}
                    style={{ background: "#FEF2F2", color: "#dc2626", border: "1px solid #FCA5A5", padding: "0.5rem 1rem", borderRadius: 8, display: "flex", alignItems: "center", gap: 6, fontWeight: 600, cursor: "pointer" }}
                  >
                    <X size={16} /> Reject
                  </button>
                  <button 
                    onClick={() => handleDelete(story.id)}
                    disabled={processing === story.id}
                    style={{ background: "transparent", color: "#64748b", border: "1px solid #E2E8F0", padding: "0.5rem 1rem", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: 8, border: "1px solid #F1F5F9", fontSize: "0.95rem", color: "#334155", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {story.body}
              </div>
              
              {story.photoUrl && (
                <div style={{ marginTop: "1rem" }}>
                  <a href={story.photoUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#006CE4", fontSize: "0.85rem" }}>
                    View attached photo ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
