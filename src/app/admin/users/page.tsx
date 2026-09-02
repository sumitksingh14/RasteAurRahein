"use client";

import { useEffect, useState } from "react";
import { Trash2, RefreshCw, Users, Shield } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const ADMIN_EMAIL = "zsumitksingh@gmail.com";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (user: AdminUser) => {
    if (user.email === ADMIN_EMAIL) { alert("Cannot delete the admin account."); return; }
    if (!confirm(`Revoke account for @${user.username} (${user.email})?`)) return;
    setDeletingId(user.id);
    await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    setDeletingId(null);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Users</h1>
          <p style={{ color: "#64748b", margin: "0.35rem 0 0", fontSize: "0.9rem" }}>{users.length} registered accounts</p>
        </div>
        <button
          onClick={load}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.55rem 1rem", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "0.85rem" }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ color: "#64748b" }}>Loading users…</div>
      ) : users.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "3rem", textAlign: "center", color: "#94a3b8", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <Users size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>No registered users yet.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                {["User", "Email", "Joined", "Role", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                const isAdmin = user.email === ADMIN_EMAIL;
                return (
                  <tr key={user.id} style={{ borderBottom: idx < users.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: isAdmin ? "linear-gradient(135deg,#006CE4,#FEBB02)" : "linear-gradient(135deg,#8b5cf6,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.875rem" }}>@{user.username}</span>
                      </div>
                    </td>
                    <td style={{ padding: "0.9rem 1rem", fontSize: "0.875rem", color: "#475569" }}>{user.email}</td>
                    <td style={{ padding: "0.9rem 1rem", fontSize: "0.8rem", color: "#64748b", whiteSpace: "nowrap" }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td style={{ padding: "0.9rem 1rem" }}>
                      {isAdmin ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, background: "rgba(0,108,228,0.1)", color: "#006CE4" }}>
                          <Shield size={11} /> Admin
                        </span>
                      ) : (
                        <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, background: "#F1F5F9", color: "#64748b" }}>
                          User
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <button
                        onClick={() => handleDelete(user)}
                        disabled={deletingId === user.id || isAdmin}
                        title={isAdmin ? "Cannot delete admin" : "Revoke account"}
                        style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #FEE2E2", background: isAdmin ? "#F8FAFC" : "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: isAdmin ? "not-allowed" : "pointer", color: isAdmin ? "#cbd5e1" : "#ef4444", opacity: deletingId === user.id ? 0.6 : 1 }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
