"use client";

import { useState, useEffect, useRef } from "react";
import {
  CloudDownload,
  CloudCheck,
  Loader2,
  Trash2,
  AlertCircle,
  HardDrive,
  X,
  FileCheck2,
} from "lucide-react";
import type { Trip } from "@/lib/types";
import {
  isTripSavedOffline,
  saveTripOffline,
  removeTripOffline,
  getSavedOfflineTrips,
  isOfflineStorageSupported,
  type SavedOfflineTripMeta,
} from "@/lib/offlineTrips";

interface SaveOfflineButtonProps {
  trip: Trip;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** If true, displays with full text label beside icon */
  showLabel?: boolean;
  className?: string;
}

export default function SaveOfflineButton({
  trip,
  size = "lg",
  showLabel = false,
  className,
}: SaveOfflineButtonProps) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManageMenu, setShowManageMenu] = useState(false);
  const [meta, setMeta] = useState<SavedOfflineTripMeta | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!isOfflineStorageSupported()) {
        if (!ignore) setIsSupported(false);
        return;
      }
      const isSaved = await isTripSavedOffline(trip.slug);
      if (ignore) return;
      setSaved(isSaved);
      if (isSaved) {
        const all = getSavedOfflineTrips();
        const current = all.find((t) => t.slug === trip.slug);
        if (!ignore && current) setMeta(current);
      } else {
        if (!ignore) setMeta(null);
      }
    }

    load();

    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ slug: string; action: string; meta?: SavedOfflineTripMeta }>;
      if (custom.detail?.slug === trip.slug) {
        if (custom.detail.action === "saved") {
          setSaved(true);
          if (custom.detail.meta) setMeta(custom.detail.meta);
        } else if (custom.detail.action === "removed") {
          setSaved(false);
          setMeta(null);
        }
      }
    };

    window.addEventListener("rar:offline-trips-changed", handler);
    return () => {
      ignore = true;
      window.removeEventListener("rar:offline-trips-changed", handler);
    };
  }, [trip.slug]);

  // Close manage popover when clicking outside or pressing Escape
  useEffect(() => {
    if (!showManageMenu) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowManageMenu(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowManageMenu(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showManageMenu]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      // Toggle manage menu
      setShowManageMenu((prev) => !prev);
      return;
    }

    if (saving) return;

    setSaving(true);
    setErrorMessage(null);

    const result = await saveTripOffline(trip);

    if (result.success) {
      setSaved(true);
      setToastMessage("Trip & GPX saved for offline use!");
      setTimeout(() => setToastMessage(null), 3000);
      const all = getSavedOfflineTrips();
      const current = all.find((t) => t.slug === trip.slug);
      if (current) setMeta(current);
    } else {
      setErrorMessage(result.error || "Storage failed: Could not cache this trip.");
    }

    setSaving(false);
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSaving(true);
    const ok = await removeTripOffline(trip.slug);
    if (ok) {
      setSaved(false);
      setShowManageMenu(false);
      setToastMessage("Trip removed from offline storage.");
      setTimeout(() => setToastMessage(null), 2500);
    }
    setSaving(false);
  };

  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;
  const btnSize = size === "sm" ? 30 : size === "lg" ? 42 : 36;
  const isLg = size === "lg";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleSave}
        disabled={saving || !isSupported}
        aria-label={
          saved
            ? "Saved for offline — click to manage or remove"
            : saving
            ? "Saving trip for offline use"
            : "Save for offline"
        }
        title={
          saved
            ? "Saved for offline — click to manage or remove"
            : "Save guide, route map & GPX for offline use"
        }
        aria-expanded={showManageMenu}
        aria-haspopup={saved ? "dialog" : undefined}
        className={className}
        style={{
          width: showLabel ? "auto" : btnSize,
          height: btnSize,
          padding: showLabel ? "0 1rem" : 0,
          borderRadius: isLg ? "0.625rem" : "50%",
          background: isLg
            ? saved
              ? "rgba(16, 185, 129, 0.2)"
              : "rgba(255, 255, 255, 0.12)"
            : saved
            ? "rgba(16, 185, 129, 0.15)"
            : "rgba(255, 255, 255, 0.92)",
          border: isLg
            ? saved
              ? "1px solid rgba(16, 185, 129, 0.45)"
              : "1px solid rgba(255, 255, 255, 0.2)"
            : saved
            ? "1.5px solid rgba(16, 185, 129, 0.35)"
            : "none",
          color: saved ? "#34d399" : "var(--text-primary, #ffffff)",
          cursor: saving || !isSupported ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          backdropFilter: isLg ? "blur(8px)" : undefined,
          WebkitBackdropFilter: isLg ? "blur(8px)" : undefined,
          boxShadow: isLg ? "none" : "0 2px 8px rgba(0,0,0,0.12)",
          transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
          opacity: saving ? 0.7 : !isSupported ? 0.4 : 1,
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (!saving && isSupported) e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {saving ? (
          <Loader2 size={iconSize} className="animate-spin" color="#34d399" />
        ) : saved ? (
          <CloudCheck size={iconSize} color="#34d399" />
        ) : (
          <CloudDownload size={iconSize} color={isLg ? "#ffffff" : "#4B5563"} />
        )}

        {showLabel && (
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {saving ? "Saving..." : saved ? "Saved Offline" : "Save Offline"}
          </span>
        )}
      </button>

      {/* Success / Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "#065f46",
            border: "1px solid #10b981",
            color: "#ecfdf5",
            fontSize: "0.78rem",
            padding: "6px 12px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            zIndex: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <FileCheck2 size={13} color="#34d399" />
          {toastMessage}
        </div>
      )}

      {/* Storage Failure / Error Modal */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "280px",
            background: "rgba(30, 20, 20, 0.98)",
            border: "1px solid #ef4444",
            color: "#fecaca",
            padding: "10px 12px",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            zIndex: 600,
            fontSize: "0.8rem",
            lineHeight: 1.4,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#f87171" }}>
              <AlertCircle size={15} />
              <span>Storage Error</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              aria-label="Dismiss error"
              style={{
                background: "transparent",
                border: "none",
                color: "#fca5a5",
                cursor: "pointer",
                padding: "2px",
              }}
            >
              <X size={14} />
            </button>
          </div>
          <p style={{ margin: "6px 0 0 0", color: "#e5e7eb" }}>{errorMessage}</p>
        </div>
      )}

      {/* Saved State Management Popover */}
      {showManageMenu && saved && (
        <div
          ref={menuRef}
          role="dialog"
          aria-label="Offline storage management"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "270px",
            background: "var(--card-bg, #181b24)",
            border: "1px solid var(--border-color, rgba(255,255,255,0.18))",
            color: "var(--text-primary, #ffffff)",
            borderRadius: "0.75rem",
            padding: "12px 14px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.55)",
            zIndex: 600,
            fontSize: "0.82rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontWeight: 700 }}>
              <CloudCheck size={16} />
              <span>Available Offline</span>
            </div>
            <button
              onClick={() => setShowManageMenu(false)}
              aria-label="Close menu"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted, #9ca3af)",
                cursor: "pointer",
                padding: "2px",
              }}
            >
              <X size={14} />
            </button>
          </div>

          <p style={{ margin: "0 0 8px 0", color: "var(--text-muted, #9ca3af)", fontSize: "0.76rem", lineHeight: 1.4 }}>
            Full guide, route map images, and turn-by-turn GPX track are cached on this device.
          </p>

          {meta && (
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
                padding: "6px 8px",
                marginBottom: "10px",
                fontSize: "0.74rem",
                color: "var(--text-secondary, #d1d5db)",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <HardDrive size={11} color="#9ca3af" />
                <span>Cached: {meta.assetCount} assets (~{meta.approxSizeKb} KB)</span>
              </div>
              <div style={{ color: "var(--text-muted, #9ca3af)" }}>
                Saved on: {new Date(meta.savedAt).toLocaleDateString()}
              </div>
            </div>
          )}

          <button
            onClick={handleRemove}
            disabled={saving}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              borderRadius: "6px",
              padding: "7px 10px",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: saving ? "default" : "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!saving) e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
            }}
          >
            <Trash2 size={13} />
            <span>Remove from offline</span>
          </button>
        </div>
      )}
    </div>
  );
}
