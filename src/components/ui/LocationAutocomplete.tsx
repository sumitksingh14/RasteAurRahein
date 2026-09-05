"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LocateFixed, Loader2, MapPin, X } from "lucide-react";
import { searchLocations, detectUserLocation, geolocationErrorMessage, type LocationSuggestion, type GeolocationStatus } from "@/lib/geolocation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface LocationAutocompleteProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: LocationSuggestion) => void;
  placeholder?: string;
  /** "light" = white card modal style | "dark" = dark panel (AI Planner) */
  theme?: "light" | "dark";
  /** CSS style applied to the wrapper div */
  style?: React.CSSProperties;
  /** Whether to show the "Use My Location" GPS button */
  showGpsButton?: boolean;
  /** Extra class applied to the outer container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function LocationAutocomplete({
  id = "location-autocomplete",
  value,
  onChange,
  onSelect,
  placeholder = "e.g. Mumbai, Bengaluru, Delhi…",
  theme = "light",
  style,
  showGpsButton = true,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [gpsStatus, setGpsStatus] = useState<GeolocationStatus>("idle");
  const [gpsError, setGpsError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedValue = useDebounce(value, 380);

  // Dark vs light tokens
  const isDark = theme === "dark";
  const colors = {
    inputBg: isDark ? "rgba(255,255,255,0.12)" : "var(--bg-card)",
    inputBorder: isDark ? "rgba(255,255,255,0.18)" : "var(--border)",
    inputBorderFocus: isDark ? "rgba(245,166,35,0.7)" : "var(--border-accent)",
    inputColor: isDark ? "#fff" : "var(--text-primary)",
    inputPlaceholder: isDark ? "rgba(255,255,255,0.4)" : "var(--text-muted)",
    dropdownBg: isDark ? "#1a2440" : "#fff",
    dropdownBorder: isDark ? "rgba(255,255,255,0.1)" : "var(--border)",
    dropdownShadow: "0 8px 32px rgba(0,0,0,0.22)",
    itemHoverBg: isDark ? "rgba(245,166,35,0.12)" : "var(--bg-secondary)",
    itemActiveBg: isDark ? "rgba(245,166,35,0.2)" : "var(--accent-gold-dim)",
    cityColor: isDark ? "#fff" : "var(--text-primary)",
    stateColor: isDark ? "rgba(255,255,255,0.55)" : "var(--text-muted)",
    pinColor: isDark ? "#f5c87a" : "var(--accent-gold)",
    gpsBtnBg: isDark ? "rgba(255,255,255,0.1)" : "var(--bg-secondary)",
    gpsBtnColor: isDark ? "rgba(255,255,255,0.8)" : "var(--text-secondary)",
    gpsBtnBorderGranted: isDark ? "rgba(245,166,35,0.5)" : "var(--border-accent)",
    gpsBtnBgGranted: isDark ? "rgba(245,166,35,0.15)" : "var(--accent-gold-dim)",
    gpsBtnColorGranted: isDark ? "#f5c87a" : "var(--accent-gold)",
    gpsBtnBorderDenied: isDark ? "rgba(248,113,113,0.4)" : "rgba(225,29,72,0.3)",
    gpsBtnBgDenied: isDark ? "rgba(248,113,113,0.08)" : "rgba(225,29,72,0.06)",
    gpsBtnColorDenied: isDark ? "#fca5a5" : "var(--accent-rose)",
    errorColor: isDark ? "#fca5a5" : "var(--accent-rose)",
    successColor: isDark ? "#f5c87a" : "var(--accent-gold)",
    loaderColor: isDark ? "#f5c87a" : "var(--accent-gold)",
  };

  // ── Fetch suggestions on debounced input ──────────────────────────────────
  useEffect(() => {
    if (!debouncedValue || debouncedValue.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    // Cancel previous in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    searchLocations(debouncedValue)
      .then((results) => {
        if (controller.signal.aborted) return;
        setSuggestions(results);
        setOpen(results.length > 0);
        setActiveIdx(-1);
      })
      .catch(() => {
        // Silently fail — user can still type
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedValue]);

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Select a suggestion ───────────────────────────────────────────────────
  const handleSelect = useCallback((s: LocationSuggestion) => {
    onChange(s.label);
    onSelect?.(s);
    setSuggestions([]);
    setOpen(false);
    setActiveIdx(-1);
    // Refocus input so user can continue
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [onChange, onSelect]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
    }
  }, [open, suggestions, activeIdx, handleSelect]);

  // ── GPS detect ────────────────────────────────────────────────────────────
  const handleGpsClick = useCallback(async () => {
    setGpsStatus("requesting");
    setGpsError("");
    try {
      const result = await detectUserLocation();
      onChange(result.label);
      onSelect?.({
        label: result.label,
        city: result.city,
        state: result.state,
        country: "",
        lat: result.lat,
        lng: result.lng,
      });
      setGpsStatus("granted");
      setOpen(false);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        setGpsError(geolocationErrorMessage(err));
      } else {
        setGpsError("Could not detect location. Please type your city.");
      }
      setGpsStatus("denied");
    }
  }, [onChange, onSelect]);

  // ── Clear input ───────────────────────────────────────────────────────────
  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    setOpen(false);
    setActiveIdx(-1);
    setGpsStatus("idle");
    setGpsError("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // GPS button styling
  const gpsBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: "0.7rem 0.9rem",
    borderRadius: isDark ? 10 : "var(--radius-md)",
    border: `1px solid ${
      gpsStatus === "granted"
        ? colors.gpsBtnBorderGranted
        : gpsStatus === "denied"
        ? colors.gpsBtnBorderDenied
        : colors.inputBorder
    }`,
    background:
      gpsStatus === "granted"
        ? colors.gpsBtnBgGranted
        : gpsStatus === "denied"
        ? colors.gpsBtnBgDenied
        : colors.gpsBtnBg,
    color:
      gpsStatus === "granted"
        ? colors.gpsBtnColorGranted
        : gpsStatus === "denied"
        ? colors.gpsBtnColorDenied
        : colors.gpsBtnColor,
    fontSize: "0.78rem",
    fontWeight: 600,
    fontFamily: "var(--font-sans)",
    cursor: gpsStatus === "requesting" ? "not-allowed" : "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "all 0.2s",
  };

  return (
    <>
      <style>{`
        @keyframes loc-spin { to { transform: rotate(360deg); } }
        .loc-spin { animation: loc-spin 0.9s linear infinite; }
        @keyframes loc-slide-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .loc-dropdown { animation: loc-slide-in 0.18s ease forwards; }
        .loc-item:hover { cursor: pointer; }
      `}</style>

      <div ref={containerRef} style={{ position: "relative", ...style }}>
        {/* ── Input + GPS row ─────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: "0.45rem", alignItems: "stretch" }}>
          {/* Text input with clear button */}
          <div style={{ flex: 1, position: "relative" }}>
            <input
              ref={inputRef}
              id={id}
              type="text"
              value={value}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              onChange={(e) => {
                onChange(e.target.value);
                if (e.target.value.length >= 2) setOpen(true);
              }}
              onFocus={() => {
                if (suggestions.length > 0) setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              style={{
                width: "100%",
                padding: isDark ? "0.65rem 2.2rem 0.65rem 0.9rem" : "0.75rem 2.4rem 0.75rem 0.9rem",
                borderRadius: isDark ? 10 : "var(--radius-md)",
                border: `1px solid ${open ? colors.inputBorderFocus : colors.inputBorder}`,
                background: colors.inputBg,
                color: colors.inputColor,
                fontSize: "0.9rem",
                fontFamily: "var(--font-sans)",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                // Placeholder color via CSS var trick
              }}
              onFocusCapture={(e) => (e.target.style.borderColor = colors.inputBorderFocus)}
              onBlurCapture={(e) => (e.target.style.borderColor = open ? colors.inputBorderFocus : colors.inputBorder)}
            />

            {/* Right side: loader OR clear button */}
            <div
              style={{
                position: "absolute",
                right: "0.6rem",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Loader2
                  size={14}
                  className="loc-spin"
                  style={{ color: colors.loaderColor }}
                />
              ) : value ? (
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 2,
                    color: colors.stateColor,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={13} />
                </button>
              ) : null}
            </div>
          </div>

          {/* GPS button */}
          {showGpsButton && (
            <button
              id={`${id}-gps-btn`}
              type="button"
              onClick={handleGpsClick}
              disabled={gpsStatus === "requesting"}
              title="Auto-detect my location"
              style={gpsBtnStyle}
            >
              {gpsStatus === "requesting" ? (
                <Loader2 size={14} className="loc-spin" />
              ) : (
                <LocateFixed size={14} />
              )}
              {gpsStatus === "granted"
                ? "Located"
                : gpsStatus === "requesting"
                ? "…"
                : "Locate"}
            </button>
          )}
        </div>

        {/* ── Suggestions dropdown ─────────────────────────────────────── */}
        {open && suggestions.length > 0 && (
          <div
            className="loc-dropdown"
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: showGpsButton ? undefined : 0,
              minWidth: "100%",
              background: colors.dropdownBg,
              border: `1px solid ${colors.dropdownBorder}`,
              borderRadius: 12,
              boxShadow: colors.dropdownShadow,
              zIndex: 9999,
              overflow: "hidden",
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {suggestions.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={`${s.lat}-${s.lng}-${i}`}
                  className="loc-item"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(s)}
                  onMouseEnter={() => setActiveIdx(i)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    padding: "0.7rem 1rem",
                    background: isActive ? colors.itemActiveBg : "transparent",
                    borderBottom: i < suggestions.length - 1
                      ? `1px solid ${colors.dropdownBorder}`
                      : "none",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                >
                  {/* Pin icon */}
                  <MapPin
                    size={14}
                    style={{
                      color: colors.pinColor,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Primary: city name */}
                    <div
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: colors.cityColor,
                        fontFamily: "var(--font-sans)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.city || s.label.split(",")[0]}
                    </div>
                    {/* Secondary: state, country */}
                    {(s.state || s.country) && (
                      <div
                        style={{
                          fontSize: "0.74rem",
                          color: colors.stateColor,
                          fontFamily: "var(--font-sans)",
                          marginTop: 1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {[s.state, s.country].filter(Boolean).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Footer hint */}
            <div
              style={{
                padding: "0.4rem 1rem",
                fontSize: "0.68rem",
                color: colors.stateColor,
                background: isDark ? "rgba(255,255,255,0.04)" : "var(--bg-secondary)",
                textAlign: "right",
                fontFamily: "var(--font-sans)",
              }}
            >
              Powered by OpenStreetMap
            </div>
          </div>
        )}

        {/* ── GPS status messages ────────────────────────────────────── */}
        {gpsError && (
          <p
            style={{
              fontSize: "0.74rem",
              color: colors.errorColor,
              marginTop: "0.4rem",
              lineHeight: 1.5,
              fontFamily: "var(--font-sans)",
            }}
          >
            {gpsError}
          </p>
        )}
        {gpsStatus === "granted" && value && (
          <p
            style={{
              fontSize: "0.74rem",
              color: colors.successColor,
              marginTop: "0.4rem",
              fontFamily: "var(--font-sans)",
            }}
          >
            📍 {value}
          </p>
        )}
      </div>
    </>
  );
}
