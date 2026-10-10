"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

export interface SearchIndexEntry {
  slug: string;
  title: string;
  tags?: string[];
  region?: string;
}

interface NavSearchBarProps {
  index: SearchIndexEntry[];
}

function highlight(text: string, query: string): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

export default function NavSearchBar({ index }: NavSearchBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search over index
  const runSearch = useCallback(
    (q: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const trimmed = q.trim().toLowerCase();
        if (!trimmed) {
          setResults([]);
          return;
        }
        const matches = index
          .filter((entry) => {
            const inTitle = entry.title.toLowerCase().includes(trimmed);
            const inTags = entry.tags?.some((t) =>
              t.toLowerCase().includes(trimmed)
            );
            const inRegion = entry.region?.toLowerCase().includes(trimmed);
            return inTitle || inTags || inRegion;
          })
          .slice(0, 8);
        setResults(matches);
        setFocused(0);
      }, 160);
    },
    [index]
  );

  useEffect(() => {
    runSearch(query);
  }, [query, runSearch]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused((f) => Math.min(f + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused((f) => Math.max(f - 1, 0));
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open search"
          id="nav-search-btn"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6366f1",
            border: "none",
            background: "#e8eaf0",
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "var(--shadow-neo-raised)",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#7c3aed";
            e.currentTarget.style.boxShadow = "var(--shadow-neo-raised-lg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6366f1";
            e.currentTarget.style.boxShadow = "var(--shadow-neo-raised)";
          }}
        >
          <Search size={16} />
        </button>
      )}

      {/* Expanded search input */}
      {open && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#e8eaf0",
            borderRadius: "100px",
            boxShadow: "var(--shadow-neo-inset)",
            padding: "0 0.75rem",
            width: "min(260px, 50vw)",
            height: 38,
            gap: "0.5rem",
          }}
        >
          <Search size={14} style={{ color: "#6366f1", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="search"
            id="nav-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search trips, regions…"
            autoComplete="off"
            aria-label="Search trips"
            aria-autocomplete="list"
            aria-controls="nav-search-results"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "0.85rem",
              color: "#1e1b4b",
              fontFamily: "var(--font-sans)",
            }}
          />
          <button
            onClick={handleClose}
            aria-label="Close search"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6B7280",
              display: "flex",
              padding: "2px",
              flexShrink: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <div
          id="nav-search-results"
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "min(320px, 90vw)",
            background: "#FFFFFF",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid #E5E7EB",
            overflow: "hidden",
            zIndex: 2001,
          }}
        >
          {results.map((entry, idx) => (
            <Link
              key={entry.slug}
              href={`/trips/${entry.slug}`}
              role="option"
              aria-selected={idx === focused}
              onClick={handleClose}
              style={{
                display: "block",
                padding: "0.65rem 1rem",
                fontSize: "0.875rem",
                color: idx === focused ? "#6366f1" : "#374151",
                background:
                  idx === focused ? "rgba(99,102,241,0.06)" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s ease",
                borderBottom:
                  idx < results.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
              onMouseEnter={() => setFocused(idx)}
              dangerouslySetInnerHTML={{
                __html: highlight(entry.title, query),
              }}
            />
          ))}
        </div>
      )}

      {/* No results */}
      {open && query.trim().length > 1 && results.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "min(260px, 90vw)",
            background: "#FFFFFF",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid #E5E7EB",
            padding: "1rem",
            fontSize: "0.85rem",
            color: "#6B7280",
            textAlign: "center",
            zIndex: 2001,
          }}
        >
          No trips found for &ldquo;{query}&rdquo;
        </div>
      )}

      <style>{`
        mark {
          background: rgba(99,102,241,0.15);
          color: #4f46e5;
          border-radius: 2px;
          padding: 0 1px;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
