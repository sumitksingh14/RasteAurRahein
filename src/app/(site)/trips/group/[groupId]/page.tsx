"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Calendar,
  Copy,
  Check,
  Trash2,
  LogOut,
  RefreshCw,
  MapPin,
  ExternalLink,
  ChevronLeft,
  Plus,
  X,
  Crown,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import GroupExpenseSplitter, { type ExpenseItem } from "@/components/group/GroupExpenseSplitter";

interface Member {
  id: string;
  username: string;
  email: string;
  role: "organizer" | "member";
}

interface GroupData {
  id: string;
  name: string;
  organizerId: string;
  startDate?: string;
  createdAt: string;
  checklist: string; // JSON string
  sourceTripSlug?: string;
  sourceItineraryId?: string;
  members: Member[];
  userRole: "organizer" | "member";
  expenses?: ExpenseItem[];
}

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  addedBy: string;
}

// ---------------------------------------------------------------------------
// Checklist
// ---------------------------------------------------------------------------
function ChecklistSection({
  items,
  onUpdate,
  groupId,
  username,
}: {
  items: ChecklistItem[];
  onUpdate: (items: ChecklistItem[]) => void;
  groupId: string;
  username: string;
}) {
  const [newText, setNewText] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (updated: ChecklistItem[]) => {
    setSaving(true);
    try {
      await fetch(`/api/group-trips/${groupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ checklist: updated }),
      });
      onUpdate(updated);
    } finally {
      setSaving(false);
    }
  };

  const addItem = async () => {
    if (!newText.trim()) return;
    const item: ChecklistItem = {
      id: `ci-${Date.now()}`,
      text: newText.trim(),
      done: false,
      addedBy: username,
    };
    setNewText("");
    await save([...items, item]);
  };

  const toggleItem = async (id: string) => {
    const updated = items.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
    await save(updated);
  };

  const removeItem = async (id: string) => {
    await save(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "0.75rem" }}>
        Shared Checklist {saving && <span style={{ fontSize: "0.65rem", color: "#9CA3AF", fontWeight: 400 }}>· saving…</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.75rem" }}>
        {items.length === 0 && (
          <div style={{ fontSize: "0.85rem", color: "#9CA3AF", fontStyle: "italic" }}>
            No items yet. Add the first one!
          </div>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.5rem 0.75rem",
              background: item.done ? "#F9FAFB" : "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleItem(item.id)}
              style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#006CE4", flexShrink: 0 }}
            />
            <span
              style={{
                flex: 1,
                fontSize: "0.88rem",
                color: item.done ? "#9CA3AF" : "#262729",
                textDecoration: item.done ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>@{item.addedBy}</span>
            <button
              onClick={() => removeItem(item.id)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#D1D5DB", display: "flex", padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add item */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add a checklist item…"
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            borderRadius: "var(--radius-sm)",
            border: "1.5px solid #E5E7EB",
            fontSize: "0.85rem",
            fontFamily: "var(--font-sans)",
            color: "#262729",
            outline: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#006CE4")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
        />
        <button
          onClick={addItem}
          disabled={!newText.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "0.5rem 0.85rem",
            borderRadius: "var(--radius-sm)",
            background: "#006CE4",
            color: "#fff",
            border: "none",
            cursor: newText.trim() ? "pointer" : "default",
            opacity: newText.trim() ? 1 : 0.5,
            fontSize: "0.82rem",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
          }}
        >
          <Plus size={13} /> Add
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function GroupTripPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Invite link state
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);

  // Name editing
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const fetchGroup = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/group-trips/${groupId}`, { credentials: "include" });
      if (res.status === 403 || res.status === 404) {
        setError("Group not found or you don't have access.");
        return;
      }
      const data = await res.json();
      setGroup(data.group);
      setNameInput(data.group.name);
    } catch {
      setError("Failed to load group data.");
    } finally {
      setLoading(false);
    }
  }, [groupId, user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchGroup();
  }, [user, fetchGroup]);

  const generateInvite = async () => {
    setInviteLoading(true);
    try {
      const res = await fetch(`/api/group-trips/${groupId}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setInviteUrl(data.joinUrl);
    } finally {
      setInviteLoading(false);
    }
  };

  const copyInvite = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = async () => {
    if (!user || !group) return;
    if (!confirm("Leave this group trip?")) return;
    await fetch(`/api/group-trips/${groupId}/members/${user.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/dashboard");
  };

  const handleDeleteTrip = async () => {
    if (!group) return;
    if (!confirm(`Permanently delete "${group.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/group-trips/${groupId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Remove this member?")) return;
    await fetch(`/api/group-trips/${groupId}/members/${memberId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setGroup((prev) =>
      prev ? { ...prev, members: prev.members.filter((m) => m.id !== memberId) } : prev
    );
  };

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    await fetch(`/api/group-trips/${groupId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: nameInput.trim() }),
    });
    setGroup((prev) => (prev ? { ...prev, name: nameInput.trim() } : prev));
    setEditingName(false);
  };

  if (authLoading || loading) {
    return (
      <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "0.9rem", color: "#6B7280" }}>Loading group trip…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <div style={{ fontSize: "1.5rem" }}>🗺️</div>
        <div style={{ color: "#6B7280", fontSize: "0.9rem" }}>{error}</div>
        <Link href="/dashboard" className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!group) return null;

  const checklist: ChecklistItem[] = (() => {
    try {
      return JSON.parse(group.checklist || "[]");
    } catch {
      return [];
    }
  })();

  const isOrganizer = group.userRole === "organizer";

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", background: "#F9FAFB" }}>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "3rem 0 2rem",
          background: "linear-gradient(135deg, #EFF6FF 0%, #F9FAFB 100%)",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div className="container">
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#6B7280",
              fontSize: "0.82rem",
              marginBottom: "1.25rem",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            <ChevronLeft size={14} /> Dashboard
          </Link>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div
                  style={{
                    padding: "0.2rem 0.7rem",
                    borderRadius: "100px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    background: isOrganizer ? "rgba(254,187,2,0.12)" : "rgba(0,108,228,0.08)",
                    color: isOrganizer ? "#92400E" : "#006CE4",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isOrganizer ? "👑 Organizer" : "Member"}
                </div>
                {group.sourceTripSlug && (
                  <Link
                    href={`/trips/${group.sourceTripSlug}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#006CE4", textDecoration: "none" }}
                  >
                    <ExternalLink size={12} /> View source trip
                  </Link>
                )}
              </div>

              {/* Editable name */}
              {editingName ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    style={{
                      fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                      fontFamily: "var(--font-serif)",
                      color: "#262729",
                      border: "2px solid #006CE4",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.25rem 0.5rem",
                      outline: "none",
                      background: "#fff",
                    }}
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="btn btn-primary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.82rem" }}>Save</button>
                  <button onClick={() => setEditingName(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <h1
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                    color: "#262729",
                    lineHeight: 1.15,
                    cursor: isOrganizer ? "pointer" : "default",
                  }}
                  onClick={() => isOrganizer && setEditingName(true)}
                  title={isOrganizer ? "Click to rename" : undefined}
                >
                  {group.name}
                  {isOrganizer && (
                    <span style={{ fontSize: "0.75rem", color: "#9CA3AF", fontFamily: "var(--font-sans)", fontWeight: 400, marginLeft: "0.5rem" }}>
                      (click to rename)
                    </span>
                  )}
                </h1>
              )}

              {group.startDate && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.85rem", color: "#6B7280", marginTop: "0.5rem" }}>
                  <Calendar size={14} />
                  Starting {new Date(group.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              )}
            </div>

            {/* Leave / actions */}
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              {!isOrganizer && (
                <button
                  onClick={handleLeave}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #FCA5A5",
                    background: "rgba(239,68,68,0.04)",
                    color: "#DC2626",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                  }}
                >
                  <LogOut size={13} /> Leave Trip
                </button>
              )}
              {isOrganizer && (
                <button
                  onClick={handleDeleteTrip}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #FCA5A5",
                    background: "rgba(239,68,68,0.04)",
                    color: "#DC2626",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                  }}
                >
                  <Trash2 size={13} /> Delete Trip
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
          className="group-trip-layout"
        >
          {/* ── Members ── */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280" }}>
                Members ({group.members.length})
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {group.members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 0.85rem",
                    background: "#F9FAFB",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #F3F4F6",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: m.role === "organizer"
                        ? "linear-gradient(135deg, #FEBB02, #F97316)"
                        : "linear-gradient(135deg, #006CE4, #0EA5E9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      flexShrink: 0,
                    }}
                  >
                    {m.username.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#262729" }}>
                      {m.username}
                      {m.role === "organizer" && (
                        <Crown size={12} color="#D97706" style={{ display: "inline", marginLeft: 5, verticalAlign: "middle" }} />
                      )}
                    </div>
                  </div>
                  {isOrganizer && m.id !== user?.id && (
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#D1D5DB",
                        display: "flex",
                        padding: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#D1D5DB")}
                      title="Remove member"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Invite ── */}
          {isOrganizer && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "1rem" }}>
                Invite Members
              </div>
              {inviteUrl ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    readOnly
                    value={inviteUrl}
                    style={{
                      flex: 1,
                      padding: "0.55rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1.5px solid #E5E7EB",
                      fontSize: "0.78rem",
                      color: "#374151",
                      fontFamily: "var(--font-sans)",
                      background: "#F9FAFB",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={copyInvite}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "0.55rem 0.9rem",
                      borderRadius: "var(--radius-sm)",
                      background: copied ? "#10B981" : "#006CE4",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      transition: "background 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                  </button>
                  <button
                    onClick={generateInvite}
                    disabled={inviteLoading}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "0.55rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      background: "transparent",
                      border: "1.5px solid #E5E7EB",
                      color: "#6B7280",
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      fontFamily: "var(--font-sans)",
                      flexShrink: 0,
                    }}
                    title="Regenerate invite link (invalidates old one)"
                  >
                    <RefreshCw size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={generateInvite}
                  disabled={inviteLoading}
                  className="btn btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}
                >
                  {inviteLoading ? "Generating…" : "Generate Invite Link"}
                </button>
              )}
              <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "0.6rem" }}>
                Share this link with friends. It expires in 7 days.
              </div>
            </div>
          )}

          {/* ── Checklist ── */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <ChecklistSection
              items={checklist}
              onUpdate={(updated) => setGroup((prev) => prev ? { ...prev, checklist: JSON.stringify(updated) } : prev)}
              groupId={groupId}
              username={user?.username || ""}
            />
          </div>
        </div>

        {/* ── Group Expenses & Splitter (Tier 4) ── */}
        <div style={{ marginTop: "2rem" }}>
          <GroupExpenseSplitter
            groupId={groupId}
            members={group.members}
            initialExpenses={group.expenses || []}
            currentUserId={user?.id || ""}
            currentUsername={user?.username || ""}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .group-trip-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
