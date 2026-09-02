"use client";

import { useEffect, useState, useCallback } from "react";
import {
  UserPlus,
  Shield,
  ShieldOff,
  Trash2,
  RefreshCw,
  Crown,
  User,
  Mail,
  Lock,
  AtSign,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

type ModalMode = "create" | "resetPassword" | null;

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  /* ── Modal state ── */
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [targetUser, setTargetUser] = useState<AdminUser | null>(null);

  /* ── Create form ── */
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    makeAdmin: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  /* ── Reset password form ── */
  const [newPassword, setNewPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);

  /* ── Fetch users ── */
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      showBanner("error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function showBanner(type: "success" | "error", msg: string) {
    setBanner({ type, msg });
    setTimeout(() => setBanner(null), 4000);
  }

  /* ── Toggle admin ── */
  async function toggleAdmin(user: AdminUser) {
    const next = !user.isAdmin;
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: next }),
      });
      const data = await res.json();
      if (!res.ok) { showBanner("error", data.error || "Failed"); return; }
      showBanner("success", next ? `${user.username} promoted to Admin` : `${user.username} demoted to User`);
      load();
    } catch {
      showBanner("error", "Network error");
    }
  }

  /* ── Delete user ── */
  async function deleteUser(user: AdminUser) {
    if (!confirm(`Delete account "${user.username}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { showBanner("error", data.error || "Failed"); return; }
      showBanner("success", `User "${user.username}" deleted`);
      load();
    } catch {
      showBanner("error", "Network error");
    }
  }

  /* ── Create user ── */
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || "Failed to create user"); return; }
      showBanner("success", `User "${form.username}" created successfully`);
      setModalMode(null);
      setForm({ username: "", email: "", password: "", makeAdmin: false });
      load();
    } catch {
      setFormError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Reset password ── */
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!targetUser) return;
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${targetUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || "Failed"); return; }
      showBanner("success", `Password reset for "${targetUser.username}"`);
      setModalMode(null);
      setNewPassword("");
      setTargetUser(null);
    } catch {
      setFormError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  function openResetPassword(user: AdminUser) {
    setTargetUser(user);
    setFormError("");
    setNewPassword("");
    setModalMode("resetPassword");
  }

  function closeModal() {
    setModalMode(null);
    setTargetUser(null);
    setFormError("");
    setForm({ username: "", email: "", password: "", makeAdmin: false });
    setNewPassword("");
  }

  const adminCount = users.filter(u => u.isAdmin).length;
  const userCount = users.filter(u => !u.isAdmin).length;

  return (
    <div className="admin-users-page">
      {/* Banner */}
      {banner && (
        <div className={`admin-banner admin-banner--${banner.type}`}>
          {banner.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {banner.msg}
        </div>
      )}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-subtitle">
            {users.length} registered account{users.length !== 1 ? "s" : ""} &middot;{" "}
            <span className="admin-users-stat admin-users-stat--admin">{adminCount} admin{adminCount !== 1 ? "s" : ""}</span>
            {" "}&middot;{" "}
            <span className="admin-users-stat admin-users-stat--user">{userCount} user{userCount !== 1 ? "s" : ""}</span>
          </p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn--ghost" onClick={load} disabled={loading}>
            <RefreshCw size={15} className={loading ? "spin" : ""} />
            Refresh
          </button>
          <button
            className="admin-btn admin-btn--primary"
            onClick={() => { setFormError(""); setModalMode("create"); }}
          >
            <UserPlus size={15} />
            Create User
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading users…</div>
      ) : users.length === 0 ? (
        <div className="admin-empty">No registered users found in Redis.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>EMAIL</th>
                <th>JOINED</th>
                <th>ROLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-user-cell">
                      <div
                        className={`admin-avatar ${user.isAdmin ? "admin-avatar--admin" : ""}`}
                      >
                        {user.isAdmin ? <Crown size={13} /> : user.username[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="admin-user-name">@{user.username}</div>
                        <div className="admin-user-id">{user.id.slice(0, 8)}…</div>
                      </div>
                    </div>
                  </td>
                  <td className="admin-user-email">{user.email}</td>
                  <td className="admin-muted">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td>
                    <span className={`admin-role-badge ${user.isAdmin ? "admin-role-badge--admin" : "admin-role-badge--user"}`}>
                      {user.isAdmin ? <><Crown size={11} /> Admin</> : <><User size={11} /> User</>}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions-row">
                      {/* Promote / Demote */}
                      <button
                        className={`admin-icon-btn ${user.isAdmin ? "admin-icon-btn--warn" : "admin-icon-btn--promote"}`}
                        title={user.isAdmin ? "Demote to User" : "Promote to Admin"}
                        onClick={() => toggleAdmin(user)}
                      >
                        {user.isAdmin ? <ShieldOff size={15} /> : <Shield size={15} />}
                      </button>
                      {/* Reset Password */}
                      <button
                        className="admin-icon-btn admin-icon-btn--edit"
                        title="Reset Password"
                        onClick={() => openResetPassword(user)}
                      >
                        <KeyRound size={15} />
                      </button>
                      {/* Delete */}
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        title="Delete User"
                        onClick={() => deleteUser(user)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal ── */}
      {modalMode && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="admin-modal-header">
              <div className="admin-modal-title">
                {modalMode === "create" ? (
                  <><UserPlus size={18} /> Create New User</>
                ) : (
                  <><KeyRound size={18} /> Reset Password — @{targetUser?.username}</>
                )}
              </div>
              <button className="admin-modal-close" onClick={closeModal}><X size={18} /></button>
            </div>

            {/* ── Create form ── */}
            {modalMode === "create" && (
              <form onSubmit={handleCreate} className="admin-modal-form">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label"><AtSign size={13} /> Username</label>
                    <input
                      className="admin-form-input"
                      placeholder="e.g. johndoe"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label"><Mail size={13} /> Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      placeholder="user@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label"><Lock size={13} /> Password</label>
                  <div className="admin-input-wrap">
                    <input
                      type={showPw ? "text" : "password"}
                      className="admin-form-input"
                      placeholder="Minimum 8 characters"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                    <button type="button" className="admin-input-toggle" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <label className="admin-toggle-row">
                  <input
                    type="checkbox"
                    checked={form.makeAdmin}
                    onChange={(e) => setForm({ ...form, makeAdmin: e.target.checked })}
                  />
                  <div className="admin-toggle-label">
                    <Crown size={14} className="admin-toggle-icon" />
                    <div>
                      <div className="admin-toggle-title">Grant Admin Access</div>
                      <div className="admin-toggle-hint">User can access the admin panel and manage all content</div>
                    </div>
                  </div>
                </label>

                {formError && (
                  <div className="admin-form-error">
                    <AlertCircle size={14} /> {formError}
                  </div>
                )}

                <div className="admin-modal-footer">
                  <button type="button" className="admin-btn admin-btn--ghost" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
                    {submitting ? "Creating…" : <><UserPlus size={14} /> Create User</>}
                  </button>
                </div>
              </form>
            )}

            {/* ── Reset password form ── */}
            {modalMode === "resetPassword" && (
              <form onSubmit={handleResetPassword} className="admin-modal-form">
                <div className="admin-form-group">
                  <label className="admin-form-label"><Lock size={13} /> New Password</label>
                  <div className="admin-input-wrap">
                    <input
                      type={showNewPw ? "text" : "password"}
                      className="admin-form-input"
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      autoFocus
                    />
                    <button type="button" className="admin-input-toggle" onClick={() => setShowNewPw(!showNewPw)}>
                      {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {formError && (
                  <div className="admin-form-error">
                    <AlertCircle size={14} /> {formError}
                  </div>
                )}

                <div className="admin-modal-footer">
                  <button type="button" className="admin-btn admin-btn--ghost" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
                    {submitting ? "Saving…" : <><KeyRound size={14} /> Reset Password</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .admin-users-page { padding: 2rem; max-width: 1200px; }

        .admin-page-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 1.5rem; gap: 1rem; flex-wrap: wrap;
        }
        .admin-page-title { font-size: 1.5rem; font-weight: 700; color: #111; margin: 0 0 .25rem; }
        .admin-page-subtitle { font-size: .85rem; color: #666; margin: 0; }
        .admin-users-stat { font-weight: 600; }
        .admin-users-stat--admin { color: #7c3aed; }
        .admin-users-stat--user  { color: #0891b2; }

        .admin-page-actions { display: flex; gap: .5rem; align-items: center; }

        .admin-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .45rem .9rem; border-radius: 8px; font-size: .85rem;
          font-weight: 500; cursor: pointer; border: none; transition: all .15s;
        }
        .admin-btn--primary { background: #6366f1; color: #fff; }
        .admin-btn--primary:hover { background: #4f46e5; }
        .admin-btn--ghost { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
        .admin-btn--ghost:hover { background: #e2e8f0; }
        .admin-btn:disabled { opacity: .6; cursor: not-allowed; }

        .spin { animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .admin-loading, .admin-empty {
          text-align: center; padding: 3rem; color: #94a3b8; font-size: .9rem;
        }

        /* Table */
        .admin-table-wrap { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th {
          background: #f8fafc; padding: .75rem 1rem; text-align: left;
          font-size: .7rem; font-weight: 600; color: #94a3b8; letter-spacing: .05em;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-table td {
          padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9;
          font-size: .85rem; color: #334155; vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: #fafbff; }

        /* User cell */
        .admin-user-cell { display: flex; align-items: center; gap: .75rem; }
        .admin-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; font-weight: 700; color: #4f46e5; flex-shrink: 0;
        }
        .admin-avatar--admin {
          background: linear-gradient(135deg, #fde68a, #fcd34d);
          color: #92400e;
        }
        .admin-user-name { font-weight: 600; color: #1e293b; font-size: .85rem; }
        .admin-user-id  { font-size: .7rem; color: #94a3b8; font-family: monospace; }
        .admin-user-email { color: #475569; }
        .admin-muted { color: #94a3b8; }

        /* Role badge */
        .admin-role-badge {
          display: inline-flex; align-items: center; gap: .3rem;
          padding: .2rem .6rem; border-radius: 20px; font-size: .72rem; font-weight: 600;
        }
        .admin-role-badge--admin { background: #fef3c7; color: #92400e; }
        .admin-role-badge--user  { background: #e0f2fe; color: #0369a1; }

        /* Action buttons */
        .admin-actions-row { display: flex; align-items: center; gap: .35rem; }
        .admin-icon-btn {
          width: 30px; height: 30px; border-radius: 7px; border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .15s; background: transparent;
        }
        .admin-icon-btn--promote { color: #7c3aed; border-color: #ede9fe; }
        .admin-icon-btn--promote:hover { background: #ede9fe; }
        .admin-icon-btn--warn    { color: #d97706; border-color: #fef3c7; }
        .admin-icon-btn--warn:hover { background: #fef3c7; }
        .admin-icon-btn--edit    { color: #0284c7; border-color: #e0f2fe; }
        .admin-icon-btn--edit:hover { background: #e0f2fe; }
        .admin-icon-btn--danger  { color: #ef4444; border-color: #fee2e2; }
        .admin-icon-btn--danger:hover { background: #fee2e2; }

        /* Modal */
        .admin-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.45);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
          backdrop-filter: blur(3px);
        }
        .admin-modal {
          background: #fff; border-radius: 16px; width: 100%; max-width: 540px;
          box-shadow: 0 20px 60px rgba(0,0,0,.2); overflow: hidden;
        }
        .admin-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9;
        }
        .admin-modal-title {
          display: flex; align-items: center; gap: .5rem;
          font-size: 1rem; font-weight: 700; color: #1e293b;
        }
        .admin-modal-close {
          background: #f1f5f9; border: none; border-radius: 8px;
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64748b;
        }
        .admin-modal-close:hover { background: #e2e8f0; }

        .admin-modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

        .admin-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .admin-form-group { display: flex; flex-direction: column; gap: .35rem; }
        .admin-form-label {
          display: flex; align-items: center; gap: .3rem;
          font-size: .78rem; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: .04em;
        }
        .admin-form-input {
          padding: .55rem .8rem; border: 1.5px solid #e2e8f0; border-radius: 9px;
          font-size: .875rem; color: #1e293b; outline: none; width: 100%; box-sizing: border-box;
          transition: border-color .15s;
        }
        .admin-form-input:focus { border-color: #6366f1; }

        .admin-input-wrap { position: relative; }
        .admin-input-wrap .admin-form-input { padding-right: 2.5rem; }
        .admin-input-toggle {
          position: absolute; right: .6rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #94a3b8; padding: 0;
        }

        /* Admin toggle */
        .admin-toggle-row {
          display: flex; align-items: flex-start; gap: .75rem; cursor: pointer;
          padding: .85rem 1rem; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fafbff; transition: border-color .15s;
        }
        .admin-toggle-row:hover { border-color: #a5b4fc; }
        .admin-toggle-row input[type="checkbox"] { margin-top: .15rem; accent-color: #6366f1; width: 16px; height: 16px; flex-shrink: 0; }
        .admin-toggle-label { display: flex; align-items: flex-start; gap: .5rem; }
        .admin-toggle-icon { color: #f59e0b; margin-top: .1rem; flex-shrink: 0; }
        .admin-toggle-title { font-size: .875rem; font-weight: 600; color: #1e293b; }
        .admin-toggle-hint  { font-size: .78rem; color: #94a3b8; margin-top: .15rem; }

        .admin-form-error {
          display: flex; align-items: center; gap: .4rem;
          padding: .6rem .85rem; background: #fef2f2; color: #ef4444;
          border-radius: 8px; font-size: .82rem; border: 1px solid #fecaca;
        }

        .admin-modal-footer {
          display: flex; justify-content: flex-end; gap: .5rem;
          padding-top: .5rem; border-top: 1px solid #f1f5f9; margin-top: .5rem;
        }

        /* Banner */
        .admin-banner {
          display: flex; align-items: center; gap: .5rem;
          padding: .75rem 1rem; border-radius: 10px; font-size: .875rem;
          margin-bottom: 1rem; font-weight: 500;
        }
        .admin-banner--success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
        .admin-banner--error   { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
      `}</style>
    </div>
  );
}
