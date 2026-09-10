"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bookmark,
  Sparkles,
  Users,
  MapPin,
  Calendar,
  Trash2,
  FileDown,
  RefreshCw,
  ChevronRight,
  Navigation,
  Map,
  X,
  Compass,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useGeneratedTrips, type GeneratedTrip } from "@/components/providers/GeneratedTripsProvider";
import type { Trip } from "@/lib/types";
import ExportPDFButton from "@/components/ai/ExportPDFButton";
import PassportStamps from "@/components/ui/PassportStamps";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ServerItinerary {
  id: string;
  title: string;
  destination: string;
  days: number;
  pace: string;
  budget: string;
  travelStyle: string;
  itineraryJson: string;
  createdAt: string;
}

interface GroupTripCard {
  id: string;
  name: string;
  role: "organizer" | "member";
  startDate?: string;
  memberCount?: number;
  sourceTripSlug?: string;
}

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------
type Tab = "saved" | "itineraries" | "groups" | "passport";

// ---------------------------------------------------------------------------
// Saved trip card (minimal — just slug + fetched trip data)
// ---------------------------------------------------------------------------
function SavedTripItem({
  slug,
  onRemove,
}: {
  slug: string;
  onRemove: (slug: string) => void;
}) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      const res = await fetch("/api/saved-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tripSlug: slug }),
      });
      if (res.ok) {
        const data = await res.json();
        if (!data.saved) onRemove(slug);
      }
    } finally {
      setRemoving(false);
    }
  };

  // Format the slug into a readable title
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 1.25rem",
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease",
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
        <Bookmark size={18} color="#006CE4" fill="rgba(0,108,228,0.2)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#262729",
            marginBottom: "0.2rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>
          <MapPin size={11} style={{ display: "inline", marginRight: 3 }} />
          India
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        <Link
          href={`/trips/${slug}`}
          className="btn btn-outline"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "0.35rem 0.9rem",
            fontSize: "0.8rem",
          }}
        >
          View <ChevronRight size={13} />
        </Link>
        <button
          onClick={handleRemove}
          disabled={removing}
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #FCA5A5",
            borderRadius: "var(--radius-sm)",
            background: "rgba(220,38,38,0.04)",
            color: "#DC2626",
            cursor: removing ? "default" : "pointer",
            opacity: removing ? 0.5 : 1,
            transition: "all 0.2s ease",
          }}
          title="Remove bookmark"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Server-saved itinerary card
// ---------------------------------------------------------------------------
function ServerItineraryCard({
  item,
  onDelete,
}: {
  item: ServerItinerary;
  onDelete: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dateLabel = new Date(item.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const parsedTrip: GeneratedTrip | null = (() => {
    try {
      return JSON.parse(item.itineraryJson);
    } catch {
      return null;
    }
  })();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/saved-itineraries/${item.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) onDelete(item.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#262729",
                lineHeight: 1.35,
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.title}
            </h3>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                color: "#DC2626",
                background: "transparent",
                border: "none",
                cursor: deleting ? "default" : "pointer",
                opacity: deleting ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: "0.75rem",
                fontWeight: 500,
                flexShrink: 0,
                fontFamily: "var(--font-sans)",
              }}
            >
              <Trash2 size={13} />
              Delete
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.5rem",
              fontSize: "0.78rem",
              color: "#6B7280",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MapPin size={12} /> {item.destination}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Calendar size={12} /> {item.days} days
            </span>
            {item.budget && (
              <span style={{ color: "#006CE4", fontWeight: 600 }}>{item.budget}</span>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            paddingTop: "0.75rem",
            borderTop: "1px solid #F3F4F6",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-outline"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "0.35rem 0.9rem",
              fontSize: "0.8rem",
            }}
          >
            <ChevronRight size={13} /> View
          </button>
          {parsedTrip && <ExportPDFButton trip={parsedTrip} variant="ghost" />}
          <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#9CA3AF" }}>
            Saved {dateLabel}
          </span>
        </div>
      </div>

      {/* Quick-view modal: reuse AIItineraryModal style with the parsed trip */}
      {showModal && parsedTrip && (
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
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          />
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              maxWidth: 640,
              width: "100%",
              maxHeight: "85vh",
              overflow: "auto",
              padding: "1.5rem",
              boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
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
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                color: "#262729",
                marginBottom: "0.5rem",
                paddingRight: "2rem",
              }}
            >
              {parsedTrip.title}
            </h2>
            {parsedTrip.overview && (
              <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {parsedTrip.overview}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {parsedTrip.days.map((day) => (
                <div
                  key={day.dayNumber}
                  style={{
                    padding: "0.75rem 1rem",
                    background: "#F9FAFB",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span
                      style={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: "6px",
                        background: "rgba(0,108,228,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#006CE4",
                        flexShrink: 0,
                      }}
                    >
                      D{day.dayNumber}
                    </span>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#262729" }}>
                      {day.title}
                    </div>
                  </div>
                  {day.summary && (
                    <div style={{ fontSize: "0.82rem", color: "#6B7280", paddingLeft: "2.25rem" }}>
                      {day.summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Group trip card (placeholder until Feature 3 fills it)
// ---------------------------------------------------------------------------
function GroupTripCard({ group }: { group: GroupTripCard }) {
  return (
    <Link
      href={`/trips/group/${group.id}`}
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: "var(--radius-md)",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-sm)",
            background:
              group.role === "organizer"
                ? "rgba(254,187,2,0.12)"
                : "rgba(0,108,228,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Users
            size={18}
            color={group.role === "organizer" ? "#FEBB02" : "#006CE4"}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#262729",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: "0.2rem",
            }}
          >
            {group.name}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#6B7280", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {group.startDate && (
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Calendar size={11} /> {new Date(group.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            )}
            {group.memberCount !== undefined && (
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Users size={11} /> {group.memberCount} members
              </span>
            )}
          </div>
        </div>
        <span
          style={{
            padding: "0.2rem 0.65rem",
            borderRadius: "100px",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            background:
              group.role === "organizer"
                ? "rgba(254,187,2,0.15)"
                : "rgba(0,108,228,0.08)",
            color: group.role === "organizer" ? "#B45309" : "#006CE4",
            flexShrink: 0,
          }}
        >
          {group.role}
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Tab button
// ---------------------------------------------------------------------------
function TabButton({
  id,
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  id: Tab;
  active: boolean;
  onClick: (id: Tab) => void;
  icon: React.ElementType;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "0.55rem 1.1rem",
        borderRadius: "100px",
        border: active ? "1.5px solid #006CE4" : "1.5px solid #E5E7EB",
        background: active ? "#006CE4" : "#fff",
        color: active ? "#fff" : "#374151",
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={15} />
      {label}
      {count !== undefined && count > 0 && (
        <span
          style={{
            background: active ? "rgba(255,255,255,0.25)" : "rgba(0,108,228,0.1)",
            color: active ? "#fff" : "#006CE4",
            borderRadius: "100px",
            padding: "0 6px",
            fontSize: "0.72rem",
            fontWeight: 700,
            minWidth: 20,
            textAlign: "center",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Dashboard Page
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { trips: localTrips } = useGeneratedTrips();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [serverItineraries, setServerItineraries] = useState<ServerItinerary[]>([]);
  const [groupTrips, setGroupTrips] = useState<GroupTripCard[]>([]);
  const [dataLoading, setDataLoading] = useState(true);


  // Import from localStorage prompt
  const [showImportPrompt, setShowImportPrompt] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [savedRes, itinRes, groupRes] = await Promise.all([
        fetch("/api/saved-trips", { credentials: "include" }),
        fetch("/api/saved-itineraries", { credentials: "include" }),
        fetch("/api/group-trips", { credentials: "include" }),
      ]);

      if (savedRes.ok) {
        const d = await savedRes.json();
        setSavedSlugs(d.savedSlugs || []);
      }

      if (itinRes.ok) {
        const d = await itinRes.json();
        const items: ServerItinerary[] = d.itineraries || [];
        setServerItineraries(items);

        // Show import prompt if user has localStorage trips not yet on server
        if (localTrips.length > 0 && items.length === 0) {
          setShowImportPrompt(true);
        }
      }

      if (groupRes.ok) {
        const d = await groupRes.json();
        setGroupTrips(d.groups || []);
      }
    } finally {
      setDataLoading(false);
    }
  }, [localTrips.length]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  const handleImportLocalTrips = async () => {
    setImportLoading(true);
    try {
      await Promise.all(
        localTrips.map((trip) =>
          fetch("/api/saved-itineraries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              title: trip.title,
              destination: trip.destination,
              days: trip.days.length,
              pace: trip.style,
              budget: trip.totalBudgetEstimate || "",
              travelStyle: (trip.tags || []).join(", "),
              itineraryJson: JSON.stringify(trip),
            }),
          })
        )
      );
      setShowImportPrompt(false);
      await fetchDashboardData();
    } finally {
      setImportLoading(false);
    }
  };

  if (loading || !user) return null;

  return (
    <div
      style={{
        paddingTop: "var(--nav-height)",
        minHeight: "100vh",
        background: "#F9FAFB",
      }}
    >
      {/* ── Hero ── */}
      <section
        style={{
          padding: "3.5rem 0 2.5rem",
          background: "linear-gradient(180deg, #F0F6FF 0%, #F9FAFB 100%)",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#006CE4",
                  marginBottom: "0.75rem",
                }}
              >
                ✦ Personal Dashboard
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#262729",
                  lineHeight: 1.15,
                  marginBottom: "0.5rem",
                }}
              >
                Welcome back, {user.username} 👋
              </h1>
              <p style={{ color: "#6B7280", fontSize: "0.95rem" }}>
                Your saved trips, itineraries, and group adventures.
              </p>
            </div>
            <Link
              href="/ai-planner"
              className="btn btn-primary"
              style={{ display: "inline-flex", gap: 8, alignItems: "center", flexShrink: 0, textDecoration: "none" }}
            >
              <Sparkles size={16} />
              Plan a new trip
            </Link>
          </div>
        </div>
      </section>

      {/* ── Import localStorage prompt ── */}
      {showImportPrompt && (
        <div
          style={{
            background: "rgba(0,108,228,0.06)",
            borderBottom: "1px solid rgba(0,108,228,0.15)",
            padding: "1rem 0",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong style={{ color: "#006CE4", fontSize: "0.9rem" }}>
                You have {localTrips.length} unsaved itiner{localTrips.length === 1 ? "y" : "ies"} in this browser.
              </strong>
              <p style={{ color: "#374151", fontSize: "0.82rem", marginTop: 2 }}>
                Import them to your account so they're accessible from any device.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button
                onClick={handleImportLocalTrips}
                disabled={importLoading}
                className="btn btn-primary"
                style={{ padding: "0.4rem 1rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6 }}
              >
                <RefreshCw size={13} />
                {importLoading ? "Importing…" : "Import to account"}
              </button>
              <button
                onClick={() => setShowImportPrompt(false)}
                style={{
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.82rem",
                  background: "transparent",
                  border: "1px solid #D1D5DB",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  color: "#6B7280",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <TabButton
            id="saved"
            active={activeTab === "saved"}
            onClick={setActiveTab}
            icon={Bookmark}
            label="Saved Trips"
            count={savedSlugs.length}
          />
          <TabButton
            id="itineraries"
            active={activeTab === "itineraries"}
            onClick={setActiveTab}
            icon={Sparkles}
            label="My Itineraries"
            count={serverItineraries.length}
          />
          <TabButton
            id="groups"
            active={activeTab === "groups"}
            onClick={setActiveTab}
            icon={Users}
            label="Group Trips"
            count={groupTrips.length}
          />
          <TabButton
            id="passport"
            active={activeTab === "passport"}
            onClick={setActiveTab}
            icon={Compass}
            label="Passport Stamps"
          />
        </div>

        {/* ── Saved Trips Tab ── */}
        {activeTab === "saved" && (
          <>
            {dataLoading ? (
              <LoadingSkeleton />
            ) : savedSlugs.length === 0 ? (
              <EmptyState
                icon={Bookmark}
                title="No saved trips yet"
                description="Browse trips and bookmark the ones you'd love to do. They'll appear here."
                cta={{ label: "Explore trips", href: "/trips" }}
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "0.75rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(380px,100%),1fr))",
                }}
              >
                {savedSlugs.map((slug) => (
                  <SavedTripItem
                    key={slug}
                    slug={slug}
                    onRemove={(s) => setSavedSlugs((prev) => prev.filter((x) => x !== s))}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── My Itineraries Tab ── */}
        {activeTab === "itineraries" && (
          <>
            {dataLoading ? (
              <LoadingSkeleton />
            ) : serverItineraries.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No saved itineraries yet"
                description="Generate a custom day-by-day itinerary with the AI Planner and save it to your account."
                cta={{ label: "Open AI Planner", href: "/ai-planner" }}
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "1.25rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(380px,100%),1fr))",
                }}
              >
                {serverItineraries.map((item) => (
                  <ServerItineraryCard
                    key={item.id}
                    item={item}
                    onDelete={(id) =>
                      setServerItineraries((prev) => prev.filter((x) => x.id !== id))
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Group Trips Tab ── */}
        {activeTab === "groups" && (
          <>
            {dataLoading ? (
              <LoadingSkeleton />
            ) : groupTrips.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No group trips yet"
                description='Open any trip page and click "Start a Trip" to invite friends and plan together.'
                cta={{ label: "Browse trips", href: "/trips" }}
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "0.75rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(420px,100%),1fr))",
                }}
              >
                {groupTrips.map((g) => (
                  <GroupTripCard key={g.id} group={g} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Passport Stamps Tab ── */}
        {activeTab === "passport" && (
          <PassportStamps savedTripSlugs={savedSlugs} />
        )}
      </div>


    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function LoadingSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            height: 72,
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  cta,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  cta: { label: string; href: string };
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "5rem 2rem",
        borderRadius: "var(--radius-lg)",
        background: "#fff",
        border: "1px solid #E5E7EB",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
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
        <Icon size={28} color="#006CE4" />
      </div>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.5rem",
          color: "#262729",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "#6B7280",
          lineHeight: 1.6,
          marginBottom: "2rem",
          maxWidth: 380,
          margin: "0 auto 2rem",
          fontSize: "0.9rem",
        }}
      >
        {description}
      </p>
      <Link href={cta.href} className="btn btn-primary">
        {cta.label}
      </Link>
    </div>
  );
}
