"use client";

import { useEffect, useState } from "react";
import { User, Calendar } from "lucide-react";
import type { Story } from "@/lib/stories";

export default function TripStories({ tripSlug }: { tripSlug: string }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trips/${tripSlug}/stories`)
      .then((r) => r.json())
      .then((d) => setStories(d.stories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tripSlug]);

  if (loading) {
    return <div style={{ color: "var(--text-muted)", padding: "2rem", textAlign: "center" }}>Loading stories...</div>;
  }

  if (stories.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>No stories yet</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Be the first to share your experience on this route!</p>
        <a href="/stories/submit" className="btn btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
          Write a Story
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-serif)", color: "var(--text-primary)", margin: 0 }}>
          Traveller Stories
        </h3>
        <a href="/stories/submit" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", textDecoration: "none" }}>
          Share Yours
        </a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {stories.map((story) => (
          <div key={story.id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            {story.photoUrl && (
              <div style={{ width: "100%", height: 250, backgroundImage: `url(${story.photoUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            )}
            <div style={{ padding: "1.5rem" }}>
              <h4 style={{ fontSize: "1.25rem", color: "var(--text-primary)", margin: "0 0 1rem", lineHeight: 1.4 }}>
                {story.title}
              </h4>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: "1.5rem" }}>
                {story.body}
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid var(--border)", paddingTop: "1rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <User size={14} /> {story.username}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={14} /> {new Date(story.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
