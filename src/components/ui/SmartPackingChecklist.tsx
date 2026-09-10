"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, Sparkles, Download, RotateCcw, ShieldCheck } from "lucide-react";
import type { Trip } from "@/lib/types";
import { generatePackingList, PACKING_CATEGORIES, type PackingItem } from "@/lib/packingListGenerator";

interface SmartPackingChecklistProps {
  trip: Trip;
}

export default function SmartPackingChecklist({ trip }: SmartPackingChecklistProps) {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filterEssential, setFilterEssential] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const storageKey = `rar-packing-${trip.slug}`;

  useEffect(() => {
    setMounted(true);
    const generated = generatePackingList(trip);
    setItems(generated);

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setCheckedIds(new Set(JSON.parse(stored)));
      }
    } catch {
      // ignore
    }
  }, [trip, storageKey]);

  const toggleItem = (id: string) => {
    const updated = new Set(checkedIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setCheckedIds(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(updated)));
    } catch {
      // ignore
    }
  };

  const resetChecklist = () => {
    if (confirm("Reset all checked packing items?")) {
      setCheckedIds(new Set());
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeCategory !== "all" && item.category !== activeCategory) return false;
    if (filterEssential && !item.essential) return false;
    return true;
  });

  const totalCount = items.length;
  const checkedCount = items.filter((i) => checkedIds.has(i.id)).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  if (!mounted) return null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", margin: 0 }}>
              Smart Packing & Essentials Checklist
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
            Adapted for {trip.title} terrain and regional travel conditions
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={resetChecklist}
            title="Reset Checklist"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "0.35rem 0.75rem",
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
            Packing Readiness
          </span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: progressPercent === 100 ? "#10b981" : "var(--accent-gold)" }}>
            {checkedCount} of {totalCount} packed ({progressPercent}%)
          </span>
        </div>
        <div style={{ height: 8, borderRadius: 100, background: "var(--bg-secondary)", overflow: "hidden", border: "1px solid var(--border)" }}>
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: progressPercent === 100 ? "#10b981" : "var(--accent-gold)",
              borderRadius: 100,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setActiveCategory("all")}
          style={{
            padding: "0.3rem 0.75rem",
            borderRadius: "100px",
            border: "1px solid",
            borderColor: activeCategory === "all" ? "var(--border-accent)" : "var(--border)",
            background: activeCategory === "all" ? "var(--accent-gold-dim)" : "var(--bg-secondary)",
            color: activeCategory === "all" ? "var(--accent-gold)" : "var(--text-secondary)",
            fontSize: "0.78rem",
            fontWeight: activeCategory === "all" ? 600 : 400,
            cursor: "pointer",
          }}
        >
          All Items ({items.length})
        </button>

        {PACKING_CATEGORIES.map((cat) => {
          const count = items.filter((i) => i.category === cat.key).length;
          const active = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "100px",
                border: "1px solid",
                borderColor: active ? "var(--border-accent)" : "var(--border)",
                background: active ? "var(--accent-gold-dim)" : "var(--bg-secondary)",
                color: active ? "var(--accent-gold)" : "var(--text-secondary)",
                fontSize: "0.78rem",
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label} ({count})</span>
            </button>
          );
        })}

        <button
          onClick={() => setFilterEssential((prev) => !prev)}
          style={{
            marginLeft: "auto",
            padding: "0.3rem 0.75rem",
            borderRadius: "100px",
            border: "1px solid",
            borderColor: filterEssential ? "#d97706" : "var(--border)",
            background: filterEssential ? "rgba(245,158,11,0.15)" : "transparent",
            color: filterEssential ? "#d97706" : "var(--text-muted)",
            fontSize: "0.75rem",
            fontWeight: filterEssential ? 600 : 400,
            cursor: "pointer",
          }}
        >
          {filterEssential ? "★ Essentials Only" : "Show Essentials Only"}
        </button>
      </div>

      {/* Items List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {filteredItems.map((item) => {
          const checked = checkedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.85rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid",
                borderColor: checked ? "rgba(16,185,129,0.3)" : "var(--border)",
                background: checked ? "rgba(16,185,129,0.04)" : "var(--bg-secondary)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ marginTop: "2px", color: checked ? "#10b981" : "var(--text-muted)" }}>
                {checked ? <CheckSquare size={18} /> : <Square size={18} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: checked ? "var(--text-muted)" : "var(--text-primary)",
                      textDecoration: checked ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </span>
                  {item.essential && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "4px",
                        background: "rgba(212,95,17,0.15)",
                        color: "var(--accent-gold)",
                      }}
                    >
                      Essential
                    </span>
                  )}
                </div>

                {item.tip && (
                  <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", margin: "0.25rem 0 0", lineHeight: 1.45 }}>
                    💡 {item.tip}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
