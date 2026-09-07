"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

interface TripPreviewModalProps {
  slug: string;
  title: string;
  onClose: () => void;
}

export default function TripPreviewModal({ slug, title, onClose }: TripPreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15,23,42,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.18s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1080,
          height: "90vh",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Modal header / toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.85rem 1.25rem",
            borderBottom: "1px solid #E2E8F0",
            background: "#F8FAFC",
            gap: "1rem",
            flexShrink: 0,
          }}
        >
          {/* Left — breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
            <div
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "linear-gradient(135deg,#10b981,#34d399)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.82rem", fontWeight: 600, color: "#0f172a",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}
            >
              {title}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8", flexShrink: 0 }}>
              /trips/{slug}
            </span>
          </div>

          {/* Right — actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <a
              href={`/trips/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "0.4rem 0.85rem", borderRadius: 8,
                border: "1px solid #E2E8F0", background: "#fff",
                color: "#475569", textDecoration: "none",
                fontSize: "0.78rem", fontWeight: 600,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#EFF6FF";
                (e.currentTarget as HTMLAnchorElement).style.color = "#006CE4";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#BFDBFE";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.color = "#475569";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0";
              }}
            >
              <ExternalLink size={11} /> Open in tab
            </a>

            <button
              onClick={onClose}
              title="Close preview (Esc)"
              style={{
                width: 32, height: 32, borderRadius: 8,
                border: "1px solid #E2E8F0",
                background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#64748b",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2";
                (e.currentTarget as HTMLButtonElement).style.color = "#dc2626";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#FCA5A5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* iframe body */}
        <iframe
          src={`/trips/${slug}`}
          title={`Preview: ${title}`}
          style={{
            flex: 1,
            width: "100%",
            border: "none",
            display: "block",
          }}
          loading="eager"
        />
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(24px) scale(0.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
