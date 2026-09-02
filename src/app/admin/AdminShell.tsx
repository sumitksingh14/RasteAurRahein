"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/trips", label: "Trips", icon: MapPin },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (item: { href: string; exact?: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F4FF" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 0",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #006CE4, #3B82F6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={18} color="#fff" />
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em" }}>
              Admin Panel
            </span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", paddingLeft: 44 }}>
            Raste Aur Raahein
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0.65rem 0.9rem",
                  borderRadius: 10,
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#fff" : "rgba(255,255,255,0.55)",
                  background: active ? "rgba(59,130,246,0.25)" : "transparent",
                  border: active ? "1px solid rgba(59,130,246,0.35)" : "1px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <item.icon size={16} />
                {item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 4 }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0.65rem 0.9rem",
              borderRadius: 10,
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "transparent"; }}
          >
            <LogOut size={16} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: 240,
          minHeight: "100vh",
          background: "#F0F4FF",
          padding: "2rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}
