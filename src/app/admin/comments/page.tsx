"use client";

import { useEffect, useState } from "react";
import { Trash2, RefreshCw, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Comment {
  id: string;
  tripSlug: string;
  authorName: string;
  userId: string;
  body: string;
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/comments")
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (comment: Comment) => {
    if (!confirm("Delete this comment?")) return;
    setDeletingId(comment.id);
    await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripSlug: comment.tripSlug, commentId: comment.id }),
    });
    setDeletingId(null);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Comments</h1>
          <p style={{ color: "#64748b", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>{comments.length} total comments</p>
        </div>
        <button
          onClick={load}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.55rem 1rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "0.85rem" }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ color: "#64748b" }}>Loading comments…</div>
      ) : comments.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "3rem", textAlign: "center", color: "#94a3b8", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <MessageSquare size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>No comments yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {comments.map((c) => (
            <div
              key={c.id}
              style={{ background: "#fff", borderRadius: 14, padding: "1.25rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", gap: "1rem", alignItems: "flex-start" }}
            >
              {/* Avatar */}
              <div
                style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#006CE4,#FEBB02)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}
              >
                {c.authorName.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.875rem" }}>@{c.authorName}</span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    on{" "}
                    <Link href={`/trips/${c.tripSlug}`} target="_blank" style={{ color: "#006CE4", textDecoration: "none" }}>
                      /{c.tripSlug}
                    </Link>
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8", marginLeft: "auto" }}>
                    {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>{c.body}</p>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(c)}
                disabled={deletingId === c.id}
                style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, border: "1px solid #FEE2E2", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
