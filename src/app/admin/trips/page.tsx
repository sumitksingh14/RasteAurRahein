"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, Globe, FileText, RefreshCw } from "lucide-react";

interface Trip {
  _id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  country?: string;
  startDate?: string;
  tags?: string[];
  viewCount?: number;
  _updatedAt: string;
}

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/trips")
      .then((r) => r.json())
      .then((d) => setTrips(d.trips || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    await fetch(`/api/admin/trips/${slug}`, { method: "DELETE" });
    setDeletingSlug(null);
    load();
  };

  const handleToggleStatus = async (trip: Trip) => {
    setTogglingSlug(trip.slug);
    const newStatus = trip.status === "published" ? "draft" : "published";
    await fetch(`/api/admin/trips/${trip.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setTogglingSlug(null);
    load();
  };

  const pillStyle = (status: string) => ({
    padding: "3px 10px",
    borderRadius: 100,
    fontSize: "0.72rem",
    fontWeight: 600,
    background: status === "published" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
    color: status === "published" ? "#059669" : "#d97706",
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Trips</h1>
          <p style={{ color: "#64748b", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>
            {trips.length} total · {trips.filter((t) => t.status === "published").length} published
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={load}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.55rem 1rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "0.85rem" }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <Link
            href="/admin/trips/new"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.55rem 1.2rem", borderRadius: 10, background: "linear-gradient(135deg,#006CE4,#3B82F6)", color: "#fff", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}
          >
            <Plus size={16} /> New Trip
          </Link>
        </div>
      </div>

      {loading ? (
        <div style={{ color: "#64748b" }}>Loading trips…</div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                {["Title", "Status", "Country", "Dates", "Views", "Updated", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, idx) => (
                <tr
                  key={trip.slug}
                  style={{ borderBottom: idx < trips.length - 1 ? "1px solid #F1F5F9" : "none" }}
                >
                  <td style={{ padding: "0.9rem 1rem" }}>
                    <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.875rem" }}>{trip.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>/{trip.slug}</div>
                  </td>
                  <td style={{ padding: "0.9rem 1rem" }}>
                    <span style={pillStyle(trip.status)}>
                      {trip.status === "published" ? <Globe size={11} style={{ display: "inline", marginRight: 3 }} /> : <FileText size={11} style={{ display: "inline", marginRight: 3 }} />}
                      {trip.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.85rem", color: "#475569" }}>{trip.country || "—"}</td>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.8rem", color: "#64748b", whiteSpace: "nowrap" }}>
                    {trip.startDate ? trip.startDate : "—"}
                  </td>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.85rem", color: "#475569" }}>
                    {(trip.viewCount || 0).toLocaleString()}
                  </td>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.78rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {new Date(trip._updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "0.9rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {/* View */}
                      <Link href={`/trips/${trip.slug}`} target="_blank" title="View trip" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", textDecoration: "none" }}>
                        <Eye size={14} />
                      </Link>
                      {/* Toggle status */}
                      <button
                        onClick={() => handleToggleStatus(trip)}
                        disabled={togglingSlug === trip.slug}
                        title={trip.status === "published" ? "Unpublish" : "Publish"}
                        style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E8F0", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: trip.status === "published" ? "#f59e0b" : "#10b981" }}
                      >
                        {trip.status === "published" ? <FileText size={14} /> : <Globe size={14} />}
                      </button>
                      {/* Edit */}
                      <Link href={`/admin/trips/${trip.slug}`} title="Edit" style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#006CE4", textDecoration: "none" }}>
                        <Pencil size={14} />
                      </Link>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(trip.slug, trip.title)}
                        disabled={deletingSlug === trip.slug}
                        title="Delete"
                        style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #FEE2E2", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {trips.length === 0 && (
            <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>No trips found. Create your first trip.</div>
          )}
        </div>
      )}
    </div>
  );
}
