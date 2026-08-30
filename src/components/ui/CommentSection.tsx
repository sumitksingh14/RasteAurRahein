"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, Send, User, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import type { TripComment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  tripSlug: string;
}

function CommentAvatar({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  // Pick a hue from name
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: `linear-gradient(135deg, hsl(${hue},65%,55%), hsl(${(hue + 60) % 360},65%,45%))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "0.75rem",
        fontFamily: "var(--font-sans)",
        flexShrink: 0,
        border: "2px solid rgba(255,255,255,0.15)",
      }}
    >
      {initials}
    </div>
  );
}

export default function CommentSection({ tripSlug }: CommentSectionProps) {
  const { user, openAuthModal } = useAuth();
  const [comments, setComments] = useState<TripComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?tripSlug=${encodeURIComponent(tripSlug)}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [tripSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuthModal(); return; }
    if (!body.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tripSlug, body: body.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [data.comment, ...prev]);
        setBody("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else if (res.status === 401) {
        openAuthModal();
      } else {
        setError(data.error || "Failed to post comment");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="comment-section" aria-label="Trip comments">
      {/* Header */}
      <div className="comment-section-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="comment-icon-wrap">
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 className="comment-section-title">Traveller Comments</h2>
            <p className="comment-section-count">
              {loading ? "Loading…" : `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
            </p>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <div className="comment-form-card glass-card">
        {user ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <CommentAvatar name={user.username} />
              <div style={{ flex: 1 }}>
                <div className="comment-author-label">@{user.username}</div>
                <textarea
                  ref={textareaRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Share your experience, tips, or questions about this trip…"
                  maxLength={1000}
                  rows={3}
                  className="comment-textarea"
                  disabled={submitting}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.625rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span className="comment-char-count" style={{ color: body.length > 900 ? "var(--accent-rose)" : "var(--text-muted)" }}>
                    {body.length}/1000
                  </span>
                  <button
                    type="submit"
                    disabled={submitting || !body.trim()}
                    className="comment-submit-btn"
                    id="comment-submit-btn"
                  >
                    {submitting ? (
                      <span className="comment-spinner" />
                    ) : (
                      <Send size={14} />
                    )}
                    {submitting ? "Posting…" : "Post Comment"}
                  </button>
                </div>
                {error && (
                  <div className="comment-error">
                    <AlertCircle size={13} />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="comment-success">
                    ✓ Comment posted!
                  </div>
                )}
              </div>
            </div>
          </form>
        ) : (
          <div className="comment-login-prompt">
            <div className="comment-login-icon">
              <User size={22} />
            </div>
            <div>
              <p className="comment-login-title">Join the conversation</p>
              <p className="comment-login-sub">Share your travel experiences and tips with fellow adventurers.</p>
            </div>
            <button
              onClick={openAuthModal}
              className="comment-login-btn"
              id="comment-login-btn"
            >
              Sign In to Comment
            </button>
          </div>
        )}
      </div>

      {/* Comment List */}
      {loading ? (
        <div className="comment-loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="comment-skeleton glass-card">
              <div className="skeleton-avatar" />
              <div style={{ flex: 1 }}>
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line medium" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="comment-empty glass-card">
          <span style={{ fontSize: "2rem" }}>🏕️</span>
          <p className="comment-empty-title">No comments yet</p>
          <p className="comment-empty-sub">Be the first to share your experience from this trip!</p>
        </div>
      ) : (
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item glass-card">
              <CommentAvatar name={comment.authorName} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="comment-author-name">@{comment.authorName}</span>
                    {user && user.id === comment.userId && (
                      <span className="comment-you-badge">You</span>
                    )}
                  </div>
                  <span className="comment-time">
                    <Clock size={11} />
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
