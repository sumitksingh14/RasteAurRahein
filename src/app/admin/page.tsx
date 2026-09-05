"use client";

import { useEffect, useState } from "react";
import { MapPin, MessageSquare, Users, Eye, Heart, TrendingUp, FileText, Globe } from "lucide-react";
import Link from "next/link";

interface Summary {
  totalTrips: number;
  publishedTrips: number;
  draftTrips: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalUsers: number;
}

interface TripStat {
  slug: string;
  title: string;
  status: string;
  viewCount: number;
  likes: number;
  commentCount: number;
}

function StatCard({
  label, value, icon: Icon, color, href,
}: {
  label: string; value: number | string; icon: React.ElementType; color: string; href?: string;
}) {
  const card = (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: href ? "pointer" : "default",
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseEnter={(e) => {
        if (href) {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.10)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={22} color="#fff" />
      </div>
      <div>
        <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
  if (href) return <Link href={href} style={{ textDecoration: "none" }}>{card}</Link>;
  return card;
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [topViews, setTopViews] = useState<TripStat[]>([]);
  const [topLikes, setTopLikes] = useState<TripStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => {
        setSummary(d.summary);
        setTopViews(d.topByViews || []);
        setTopLikes(d.topByLikes || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ color: "#64748b", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>
          Welcome back, Sumit. Here&apos;s what&apos;s happening on your blog.
        </p>
      </div>

      {loading ? (
        <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Loading analytics…</div>
      ) : summary ? (
        <>
          {/* Stat grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <StatCard label="Total Trips" value={summary.totalTrips} icon={MapPin} color="linear-gradient(135deg,#006CE4,#3B82F6)" href="/admin/trips" />
            <StatCard label="Published" value={summary.publishedTrips} icon={Globe} color="linear-gradient(135deg,#10b981,#34d399)" href="/admin/trips" />
            <StatCard label="Drafts" value={summary.draftTrips} icon={FileText} color="linear-gradient(135deg,#f59e0b,#fbbf24)" href="/admin/trips" />
            <StatCard label="Total Views" value={summary.totalViews} icon={Eye} color="linear-gradient(135deg,#8b5cf6,#a78bfa)" />
            <StatCard label="Total Likes" value={summary.totalLikes} icon={Heart} color="linear-gradient(135deg,#ef4444,#f87171)" />
            <StatCard label="Comments" value={summary.totalComments} icon={MessageSquare} color="linear-gradient(135deg,#06b6d4,#22d3ee)" href="/admin/comments" />
            <StatCard label="Users" value={summary.totalUsers} icon={Users} color="linear-gradient(135deg,#ec4899,#f9a8d4)" href="/admin/users" />
          </div>

          {/* Top trips tables */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Top by views */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                <TrendingUp size={18} color="#006CE4" />
                <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Top by Views</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {topViews.map((t, i) => (
                  <div key={t.slug} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", width: 20 }}>#{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/trips/${t.slug}`} style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.title}
                      </Link>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", flexShrink: 0 }}>
                      <Eye size={12} style={{ display: "inline", marginRight: 3 }} />
                      {t.viewCount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top by likes */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                <Heart size={18} color="#ef4444" />
                <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Top by Likes</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {topLikes.map((t, i) => (
                  <div key={t.slug} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", width: 20 }}>#{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/trips/${t.slug}`} style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.title}
                      </Link>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", flexShrink: 0 }}>
                      <Heart size={12} style={{ display: "inline", marginRight: 3 }} />
                      {t.likes}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "#ef4444" }}>Failed to load analytics.</p>
      )}
    </div>
  );
}
