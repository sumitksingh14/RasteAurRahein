"use client";

import { useState, useRef, useEffect } from "react";
import {
  Share2,
  X,
  Copy,
  Check,
  MessageCircle,
  Link2,
} from "lucide-react";

// Inline branded icons not available in this lucide version
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ShareButtonProps {
  title: string;
  excerpt?: string;
}

const WHATSAPP_GREEN = "#25D366";
const FACEBOOK_BLUE = "#1877F2";
const X_BLACK = "#000000";

export default function ShareButton({ title, excerpt }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const shareText = `${title}${excerpt ? ` — ${excerpt.slice(0, 80)}…` : ""} via Raste Aur Raahein`;

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: excerpt || title, url: getUrl() }).catch(() => {});
      setOpen(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`${shareText}\n${getUrl()}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleFacebook = () => {
    const url = encodeURIComponent(getUrl());
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
    setOpen(false);
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(getUrl());
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
    setOpen(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => { setCopied(false); setOpen(false); }, 1800);
    } catch {
      // fallback
    }
  };

  return (
    <div ref={panelRef} style={{ position: "relative", display: "inline-flex" }}>
      <button
        id="share-trip-btn"
        onClick={() => setOpen((v) => !v)}
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "0.5rem 1rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid rgba(255,255,255,0.2)",
          background: open ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
          color: "white",
          fontSize: "0.8rem",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          backdropFilter: "blur(8px)",
          transition: "all var(--transition)",
        }}
        aria-label="Share this trip"
        aria-expanded={open}
      >
        {open ? <X size={13} /> : <Share2 size={13} />}
        {open ? "Close" : "Share"}
      </button>

      {open && (
        <div className="share-panel glass-card">
          <div className="share-panel-title">Share This Trip</div>

          {/* WhatsApp */}
          <button
            id="share-whatsapp-btn"
            className="share-platform-btn"
            onClick={handleWhatsApp}
            style={{ "--platform-color": WHATSAPP_GREEN } as React.CSSProperties}
          >
            <span className="share-platform-icon" style={{ background: WHATSAPP_GREEN }}>
              <MessageCircle size={16} fill="white" stroke="none" />
            </span>
            <span className="share-platform-label">
              <span className="share-platform-name">WhatsApp</span>
              <span className="share-platform-sub">Send to friends &amp; groups</span>
            </span>
          </button>

          {/* Facebook */}
          <button
            id="share-facebook-btn"
            className="share-platform-btn"
            onClick={handleFacebook}
            style={{ "--platform-color": FACEBOOK_BLUE } as React.CSSProperties}
          >
            <span className="share-platform-icon" style={{ background: FACEBOOK_BLUE }}>
              <FacebookIcon />
            </span>
            <span className="share-platform-label">
              <span className="share-platform-name">Facebook</span>
              <span className="share-platform-sub">Share on your timeline</span>
            </span>
          </button>

          {/* X / Twitter */}
          <button
            id="share-twitter-btn"
            className="share-platform-btn"
            onClick={handleTwitter}
            style={{ "--platform-color": X_BLACK } as React.CSSProperties}
          >
            <span className="share-platform-icon" style={{ background: X_BLACK }}>
              <TwitterIcon />
            </span>
            <span className="share-platform-label">
              <span className="share-platform-name">X / Twitter</span>
              <span className="share-platform-sub">Tweet your itinerary</span>
            </span>
          </button>

          {/* Instagram — copy link */}
          <button
            id="share-instagram-btn"
            className="share-platform-btn"
            onClick={handleCopy}
            style={{ "--platform-color": "#E1306C" } as React.CSSProperties}
          >
            <span
              className="share-platform-icon"
              style={{
                background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              {/* Instagram icon using SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </span>
            <span className="share-platform-label">
              <span className="share-platform-name">Instagram</span>
              <span className="share-platform-sub">Copy link to share in bio/story</span>
            </span>
          </button>

          {/* Divider */}
          <div className="share-divider" />

          {/* Copy Link */}
          <button
            id="share-copy-btn"
            className="share-copy-btn"
            onClick={handleCopy}
          >
            {copied ? <Check size={14} style={{ color: "var(--accent-teal)" }} /> : <Link2 size={14} />}
            {copied ? "Link Copied!" : "Copy Link"}
          </button>

          {/* Native share (mobile) */}
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              id="share-native-btn"
              className="share-native-btn"
              onClick={handleNativeShare}
            >
              <Share2 size={14} />
              More Options…
            </button>
          )}
        </div>
      )}
    </div>
  );
}
