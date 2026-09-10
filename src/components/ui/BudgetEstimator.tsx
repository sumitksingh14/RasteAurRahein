"use client";

import { useState, useMemo } from "react";
import { Users, DollarSign, Sparkles, Bed, Utensils, Car, Camera, ShieldCheck, RefreshCw } from "lucide-react";
import type { Trip } from "@/lib/types";

interface BudgetEstimatorProps {
  trip: Trip;
  baseDays?: number;
}

type TravelStyle = "backpacker" | "midrange" | "luxury";
type Currency = "INR" | "USD" | "EUR" | "GBP" | "AED";

const CURRENCIES: { code: Currency; symbol: string; rateFromINR: number; label: string }[] = [
  { code: "INR", symbol: "₹", rateFromINR: 1, label: "INR (₹)" },
  { code: "USD", symbol: "$", rateFromINR: 0.012, label: "USD ($)" },
  { code: "EUR", symbol: "€", rateFromINR: 0.011, label: "EUR (€)" },
  { code: "GBP", symbol: "£", rateFromINR: 0.0095, label: "GBP (£)" },
  { code: "AED", symbol: "AED ", rateFromINR: 0.044, label: "AED (د.إ)" },
];

const STYLE_TIERS: Record<
  TravelStyle,
  {
    name: string;
    tagline: string;
    multiplier: number;
    icon: string;
    stayDailyINR: number;
    foodDailyINR: number;
    transportDailyINR: number;
    activitiesDailyINR: number;
    bufferPercent: number;
  }
> = {
  backpacker: {
    name: "Backpacker",
    tagline: "Hostels, dhabas, local buses & shared transport",
    multiplier: 0.65,
    icon: "🎒",
    stayDailyINR: 800,
    foodDailyINR: 400,
    transportDailyINR: 600,
    activitiesDailyINR: 300,
    bufferPercent: 0.08,
  },
  midrange: {
    name: "Mid-Range / Comfort",
    tagline: "3-star boutique stays, good local cafes, private rental cab",
    multiplier: 1.0,
    icon: "✨",
    stayDailyINR: 2500,
    foodDailyINR: 1000,
    transportDailyINR: 1400,
    activitiesDailyINR: 700,
    bufferPercent: 0.1,
  },
  luxury: {
    name: "Luxury / Premium",
    tagline: "Heritage resorts, fine dining, private dedicated SUV & guides",
    multiplier: 2.2,
    icon: "👑",
    stayDailyINR: 7500,
    foodDailyINR: 2500,
    transportDailyINR: 3200,
    activitiesDailyINR: 1800,
    bufferPercent: 0.15,
  },
};

export default function BudgetEstimator({ trip, baseDays }: BudgetEstimatorProps) {
  const [style, setStyle] = useState<TravelStyle>("midrange");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [travelers, setTravelers] = useState<number>(2);

  const durationDays = useMemo(() => {
    if (baseDays && baseDays > 0) return baseDays;
    if (trip.startDate && trip.endDate) {
      const d = Math.ceil(
        (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
      return d > 0 ? d : 5;
    }
    return trip.itinerary?.length || 5;
  }, [trip, baseDays]);

  const curr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const tier = STYLE_TIERS[style];

  // Calculate costs in INR
  const breakdownINR = useMemo(() => {
    // If trip has structured total budget, adjust baseline
    const baseAdjustment = trip.totalBudget && trip.totalBudget > 5000
      ? (trip.totalBudget / (durationDays * 5600)) // baseline reference
      : 1;

    const stayPerPerson = (tier.stayDailyINR * durationDays * baseAdjustment) / (travelers > 1 ? 1.6 : 1);
    const foodPerPerson = tier.foodDailyINR * durationDays * baseAdjustment;
    const transportPerPerson = (tier.transportDailyINR * durationDays * baseAdjustment) / Math.max(1, Math.min(travelers, 4));
    const activitiesPerPerson = tier.activitiesDailyINR * durationDays * baseAdjustment;

    const subtotal = stayPerPerson + foodPerPerson + transportPerPerson + activitiesPerPerson;
    const buffer = subtotal * tier.bufferPercent;
    const totalPerPerson = subtotal + buffer;
    const totalGroup = totalPerPerson * travelers;

    return {
      stay: Math.round(stayPerPerson),
      food: Math.round(foodPerPerson),
      transport: Math.round(transportPerPerson),
      activities: Math.round(activitiesPerPerson),
      buffer: Math.round(buffer),
      totalPerPerson: Math.round(totalPerPerson),
      totalGroup: Math.round(totalGroup),
    };
  }, [tier, durationDays, travelers, trip.totalBudget]);

  // Convert to selected currency
  const formatCost = (inrAmount: number) => {
    const converted = inrAmount * curr.rateFromINR;
    if (currency === "INR") {
      return `₹${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `${curr.symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: converted < 100 ? 1 : 0,
      maximumFractionDigits: converted < 100 ? 1 : 0,
    })}`;
  };

  const categories = [
    { label: "Stay & Accommodation", icon: Bed, cost: breakdownINR.stay, color: "#3b82f6" },
    { label: "Food & Dining", icon: Utensils, cost: breakdownINR.food, color: "#ec4899" },
    { label: "Fuel & Transport", icon: Car, cost: breakdownINR.transport, color: "#f59e0b" },
    { label: "Activities & Sightseeing", icon: Camera, cost: breakdownINR.activities, color: "#10b981" },
    { label: "Emergency & Buffer", icon: ShieldCheck, cost: breakdownINR.buffer, color: "#8b5cf6" },
  ];

  const grandSubtotal = categories.reduce((sum, c) => sum + c.cost, 0);

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
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1.25rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.25rem" }}>
            <Sparkles size={16} color="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", margin: 0 }}>
              Smart Budget Estimator
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
            Estimated for {durationDays} days in {trip.title}
          </p>
        </div>

        {/* Currency Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Currency:</span>
          <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "2px", border: "1px solid var(--border)" }}>
            {CURRENCIES.map((c) => {
              const active = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  style={{
                    border: "none",
                    background: active ? "var(--accent-gold)" : "transparent",
                    color: active ? "var(--bg-primary)" : "var(--text-secondary)",
                    fontWeight: active ? 700 : 500,
                    fontSize: "0.75rem",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {c.code}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Travel Style Selector */}
      <div style={{ marginBottom: "1.75rem" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "0.75rem" }}>
          Select Travel Tier
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
          {(Object.keys(STYLE_TIERS) as TravelStyle[]).map((st) => {
            const item = STYLE_TIERS[st];
            const active = style === st;
            return (
              <button
                key={st}
                onClick={() => setStyle(st)}
                style={{
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid",
                  borderColor: active ? "var(--border-accent)" : "var(--border)",
                  background: active ? "var(--accent-gold-dim)" : "var(--bg-secondary)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all var(--transition)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.35rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: active ? "var(--accent-gold)" : "var(--text-primary)" }}>
                    {item.name}
                  </span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Travelers Slider */}
      <div style={{ marginBottom: "1.75rem", background: "var(--bg-secondary)", padding: "1rem 1.25rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Users size={16} color="var(--accent-gold)" />
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Number of Travelers
            </span>
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-gold)" }}>
            {travelers} {travelers === 1 ? "Person (Solo)" : "Travelers (Shared)"}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={travelers}
          onChange={(e) => setTravelers(parseInt(e.target.value, 10))}
          style={{ width: "100%", accentColor: "var(--accent-gold)", cursor: "pointer" }}
        />
      </div>

      {/* Highlight Total Card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          border: "1px solid var(--border-accent)",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.75rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.25rem" }}>
            Estimated Total (Group of {travelers})
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--accent-gold)", fontFamily: "var(--font-serif)" }}>
            {formatCost(breakdownINR.totalGroup)}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.25rem" }}>
            Per Person ({durationDays} Days)
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {formatCost(breakdownINR.totalPerPerson)}
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400, marginLeft: "6px" }}>
              (~{formatCost(Math.round(breakdownINR.totalPerPerson / durationDays))}/day)
            </span>
          </div>
        </div>
      </div>

      {/* Visual Allocation Bar */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", height: "10px", borderRadius: "100px", overflow: "hidden", marginBottom: "0.75rem" }}>
          {categories.map((c) => {
            const pct = grandSubtotal > 0 ? (c.cost / grandSubtotal) * 100 : 20;
            return (
              <div
                key={c.label}
                title={`${c.label}: ${Math.round(pct)}%`}
                style={{ width: `${pct}%`, background: c.color }}
              />
            );
          })}
        </div>

        {/* Category Breakdown Table */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {categories.map((c) => {
            const Icon = c.icon;
            const pct = grandSubtotal > 0 ? Math.round((c.cost / grandSubtotal) * 100) : 0;
            return (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "0.82rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                  <Icon size={14} color="var(--text-muted)" />
                  <span style={{ color: "var(--text-secondary)" }}>{c.label}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>({pct}%)</span>
                </div>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  {formatCost(c.cost * travelers)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
