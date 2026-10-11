"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Sparkles,
  Bed,
  Utensils,
  Car,
  Camera,
  ShieldCheck,
  Plane,
  Info,
} from "lucide-react";
import type { Trip } from "@/lib/types";
import Callout from "@/components/ui/Callout";

interface BudgetEstimatorProps {
  trip: Trip;
  baseDays?: number;
}

export type ComfortLevel = "budget" | "comfort" | "luxury";
export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

const CURRENCIES: { code: CurrencyCode; symbol: string; rateFromINR: number; label: string }[] = [
  { code: "INR", symbol: "₹", rateFromINR: 1, label: "INR (₹)" },
  { code: "USD", symbol: "$", rateFromINR: 0.012, label: "USD ($)" },
  { code: "EUR", symbol: "€", rateFromINR: 0.011, label: "EUR (€)" },
  { code: "GBP", symbol: "£", rateFromINR: 0.0095, label: "GBP (£)" },
  { code: "AED", symbol: "AED ", rateFromINR: 0.044, label: "AED (د.إ)" },
];

/**
 * Extracts low and high budget figures (in INR) from a string like "₹25,000 – ₹40,000 per person"
 */
function parseBudgetRange(rangeStr?: string): { low: number; high: number } | null {
  if (!rangeStr) return null;
  const numbers = rangeStr.replace(/,/g, "").match(/\d+/g);
  if (!numbers || numbers.length === 0) return null;
  const parsed = numbers.map((n) => parseInt(n, 10)).filter((n) => !isNaN(n) && n > 0);
  if (parsed.length >= 2) {
    return { low: Math.min(parsed[0], parsed[1]), high: Math.max(parsed[0], parsed[1]) };
  }
  if (parsed.length === 1) {
    return { low: Math.round(parsed[0] * 0.85), high: Math.round(parsed[0] * 1.15) };
  }
  return null;
}

export default function BudgetEstimator({ trip, baseDays }: BudgetEstimatorProps) {
  const [comfort, setComfort] = useState<ComfortLevel>("comfort");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [travelers, setTravelers] = useState<number>(2);
  const [includeFlights, setIncludeFlights] = useState<boolean>(false);

  // Determine trip duration
  const durationDays = useMemo(() => {
    if (baseDays && baseDays > 0) return baseDays;
    if (trip.quickFacts?.durationDays && trip.quickFacts.durationDays > 0) {
      return trip.quickFacts.durationDays;
    }
    if (trip.startDate && trip.endDate) {
      const d =
        Math.ceil(
          (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      if (d > 0) return d;
    }
    return trip.itinerary?.length || 5;
  }, [trip, baseDays]);

  // Check for structured budget data from quick facts, totalBudget, or itinerary
  const structuredRange = useMemo(() => {
    return parseBudgetRange(trip.quickFacts?.budgetRange);
  }, [trip.quickFacts?.budgetRange]);

  const itineraryActivitySum = useMemo(() => {
    if (!trip.itinerary) return 0;
    return trip.itinerary
      .flatMap((d) => d.activities || [])
      .reduce((sum, a) => sum + (a.cost || 0), 0);
  }, [trip.itinerary]);

  // Currency object
  const curr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  // Base per-person cost baseline in INR
  const baseBaselinePerPerson = useMemo(() => {
    if (structuredRange) {
      if (comfort === "budget") return structuredRange.low;
      if (comfort === "comfort") return Math.round((structuredRange.low + structuredRange.high) / 2);
      return Math.round(structuredRange.high * 1.35); // luxury
    }

    if (trip.totalBudget && trip.totalBudget > 3000) {
      const perDay = trip.totalBudget / durationDays;
      if (comfort === "budget") return Math.round(perDay * 0.7 * durationDays);
      if (comfort === "comfort") return Math.round(perDay * durationDays);
      return Math.round(perDay * 1.6 * durationDays);
    }

    if (itineraryActivitySum > 0) {
      // Itinerary activity costs represent sightseeing + entry; scale for stay, food, fuel
      const estimatedTotal = itineraryActivitySum * 3.2;
      if (comfort === "budget") return Math.round(estimatedTotal * 0.75);
      if (comfort === "comfort") return Math.round(estimatedTotal);
      return Math.round(estimatedTotal * 1.8);
    }

    // Regional fallback standard baseline per day
    const standardDaily = comfort === "budget" ? 2200 : comfort === "comfort" ? 4500 : 9500;
    return standardDaily * durationDays;
  }, [structuredRange, trip.totalBudget, itineraryActivitySum, comfort, durationDays]);

  // Calculate detailed category breakdown
  const breakdownINR = useMemo(() => {
    // Group sharing adjustments:
    // Solo traveler: pays 100% of room and cab alone.
    // 2 travelers: room is shared (divided by 2), vehicle shared.
    // 3-4 travelers: vehicle shared, 2 rooms.
    // 5-8 travelers: group sharing efficiencies.
    const roomShareFactor = travelers === 1 ? 1.0 : travelers % 2 === 0 ? 0.55 : 0.65;
    const vehicleShareFactor = 1 / Math.max(1, Math.min(travelers, 4.5));

    // Allocation percentages of the baseline cost
    const stayCostPerPerson = baseBaselinePerPerson * 0.38 * (roomShareFactor / 0.55);
    const foodCostPerPerson = baseBaselinePerPerson * 0.24;
    const transportCostPerPerson = baseBaselinePerPerson * 0.22 * (vehicleShareFactor / 0.5);
    const activityCostPerPerson = baseBaselinePerPerson * 0.11;
    const bufferCostPerPerson = baseBaselinePerPerson * 0.05;

    // Optional domestic flight / transit buffer
    const flightCostPerPerson = includeFlights ? 6500 : 0;

    const totalPerPerson =
      stayCostPerPerson +
      foodCostPerPerson +
      transportCostPerPerson +
      activityCostPerPerson +
      bufferCostPerPerson +
      flightCostPerPerson;

    const totalGroup = totalPerPerson * travelers;

    return {
      stay: Math.round(stayCostPerPerson),
      food: Math.round(foodCostPerPerson),
      transport: Math.round(transportCostPerPerson),
      activities: Math.round(activityCostPerPerson),
      buffer: Math.round(bufferCostPerPerson),
      flights: Math.round(flightCostPerPerson),
      totalPerPerson: Math.round(totalPerPerson),
      totalGroup: Math.round(totalGroup),
    };
  }, [baseBaselinePerPerson, travelers, includeFlights]);

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
    { label: "Sightseeing & Entry Fees", icon: Camera, cost: breakdownINR.activities, color: "#10b981" },
    { label: "Emergency & Cash Buffer", icon: ShieldCheck, cost: breakdownINR.buffer, color: "#8b5cf6" },
    ...(includeFlights
      ? [{ label: "Domestic Flights / Long Transit", icon: Plane, cost: breakdownINR.flights, color: "#06b6d4" }]
      : []),
  ];

  const grandSubtotal = categories.reduce((sum, c) => sum + c.cost, 0);

  return (
    <div
      className="budget-estimator-card"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "clamp(1.2rem, 3.5vw, 1.75rem)",
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
            <Sparkles size={18} color="var(--accent-gold)" />
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
                margin: 0,
              }}
            >
              Interactive Trip Budget Calculator
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
            {structuredRange
              ? `Derived from published itinerary range (${trip.quickFacts?.budgetRange}) · ${durationDays} days`
              : `Estimated for ${durationDays} days across ${travelers} traveler${travelers > 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Currency Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Currency:</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              padding: "2px",
              border: "1px solid var(--border)",
            }}
          >
            {CURRENCIES.map((c) => {
              const active = currency === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  aria-label={`Set currency to ${c.label}`}
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

      {/* Control Strip: Comfort Tier & 1–8 Travelers Stepper */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Comfort Level Toggle */}
        <div
          style={{
            background: "var(--bg-secondary)",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
          }}
        >
          <label
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: "0.6rem",
            }}
          >
            Comfort Level
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px",
            }}
          >
            {[
              { id: "budget", label: "Budget", desc: "Homestays & buses" },
              { id: "comfort", label: "Comfort", desc: "Private room & cab" },
              { id: "luxury", label: "Luxury", desc: "Boutique & SUV" },
            ].map((t) => {
              const active = comfort === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setComfort(t.id as ComfortLevel)}
                  style={{
                    padding: "0.65rem 0.5rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid",
                    borderColor: active ? "var(--accent-gold)" : "var(--border)",
                    background: active ? "var(--accent-gold-dim)" : "var(--bg-card)",
                    color: active ? "var(--accent-gold)" : "var(--text-secondary)",
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all var(--transition)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{t.label}</div>
                  <div style={{ fontSize: "0.68rem", opacity: 0.8, marginTop: "2px" }}>{t.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1–8 Travelers Selector */}
        <div
          style={{
            background: "var(--bg-secondary)",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Users size={15} color="var(--accent-gold)" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                Travelers (1–8)
              </span>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-gold)" }}>
              {travelers} {travelers === 1 ? "Person (Solo)" : "Travelers (Shared)"}
            </span>
          </div>

          {/* Stepper buttons 1 through 8 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "4px", marginBottom: "0.6rem" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const active = travelers === num;
              return (
                <button
                  key={num}
                  onClick={() => setTravelers(num)}
                  aria-label={`${num} traveler${num > 1 ? "s" : ""}`}
                  style={{
                    padding: "0.45rem 0",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: active ? "var(--accent-gold)" : "var(--border)",
                    background: active ? "var(--accent-gold)" : "var(--bg-card)",
                    color: active ? "var(--bg-primary)" : "var(--text-primary)",
                    fontWeight: active ? 800 : 500,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Accessible range slider */}
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={travelers}
            onChange={(e) => setTravelers(parseInt(e.target.value, 10))}
            aria-label="Traveler count slider (1 to 8)"
            style={{ width: "100%", accentColor: "var(--accent-gold)", cursor: "pointer", margin: 0 }}
          />
        </div>
      </div>

      {/* Flight / Transit Addon Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "0.75rem 1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Plane size={16} color="var(--accent-teal)" />
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Include Domestic Flights / Rail buffer
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Adds ~₹6,500 / person round-trip domestic transit buffer
            </div>
          </div>
        </div>
        <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", gap: "8px" }}>
          <input
            type="checkbox"
            checked={includeFlights}
            onChange={(e) => setIncludeFlights(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: "var(--accent-gold)", cursor: "pointer" }}
          />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: includeFlights ? "var(--accent-gold)" : "var(--text-secondary)" }}>
            {includeFlights ? "Included (+₹6.5k/p)" : "Ground only"}
          </span>
        </label>
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
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.25rem",
            }}
          >
            Estimated Total ({travelers} Traveler{travelers > 1 ? "s" : ""})
          </div>
          <div
            style={{
              fontSize: "1.85rem",
              fontWeight: 800,
              color: "var(--accent-gold)",
              fontFamily: "var(--font-serif)",
            }}
          >
            {formatCost(breakdownINR.totalGroup)}
          </div>
          <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Covers {durationDays} days · {comfort.toUpperCase()} comfort tier
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.25rem",
            }}
          >
            Per Person Cost
          </div>
          <div style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {formatCost(breakdownINR.totalPerPerson)}
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400, marginLeft: "6px" }}>
              (~{formatCost(Math.round(breakdownINR.totalPerPerson / durationDays))}/day)
            </span>
          </div>
          <div style={{ fontSize: "0.74rem", color: "var(--accent-teal)", marginTop: "2px" }}>
            {travelers > 1 ? `Reflects shared room & shared vehicle split` : `Solo occupancy baseline`}
          </div>
        </div>
      </div>

      {/* Visual Allocation Bar */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            height: "10px",
            borderRadius: "100px",
            overflow: "hidden",
            marginBottom: "0.75rem",
          }}
        >
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

        {/* Category Breakdown Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
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
                  padding: "0.45rem 0",
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

      {/* Required Disclaimer Callout */}
      <Callout variant="cost" title="Estimates, Not Quotes">
        Actual trip expenses fluctuate based on traveling season, advance booking, fuel price updates,
        and personal vehicle choice. In high-altitude or remote sectors, ATM coverage is scarce—carry
        sufficient liquid cash for fuel and homestays.
      </Callout>
    </div>
  );
}
