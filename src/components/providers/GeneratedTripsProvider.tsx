"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface GeneratedActivity {
  time?: string;
  title: string;
  description?: string;
  notes?: string;
  type?: string;
}

export interface GeneratedDay {
  dayNumber: number;
  title: string;
  summary?: string;
  activities: GeneratedActivity[];
}

export interface GeneratedTrip {
  id: string;
  title: string;
  destination: string;
  overview?: string;
  bestTimeToVisit?: string;
  totalBudgetEstimate?: string;
  tags?: string[];
  days: GeneratedDay[];
  style: string;
  month: string;
  generatedAt: string;
}

interface GeneratedTripsContextValue {
  trips: GeneratedTrip[];
  addTrip: (trip: Omit<GeneratedTrip, "id">) => GeneratedTrip;
  removeTrip: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const GeneratedTripsContext = createContext<GeneratedTripsContextValue>({
  trips: [],
  addTrip: () => ({ id: "", title: "", destination: "", days: [], style: "", month: "", generatedAt: "" }),
  removeTrip: () => {},
});

const STORAGE_KEY = "raste-generated-trips";

export function GeneratedTripsProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<GeneratedTrip[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTrips(JSON.parse(stored));
    } catch {
      // ignore storage errors
    }
  }, []);

  const persist = useCallback((updated: GeneratedTrip[]) => {
    setTrips(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  const addTrip = useCallback(
    (trip: Omit<GeneratedTrip, "id">): GeneratedTrip => {
      const full: GeneratedTrip = { ...trip, id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
      persist([full, ...trips]);
      return full;
    },
    [trips, persist]
  );

  const removeTrip = useCallback(
    (id: string) => {
      persist(trips.filter((t) => t.id !== id));
    },
    [trips, persist]
  );

  if (!mounted) return <>{children}</>;

  return (
    <GeneratedTripsContext.Provider value={{ trips, addTrip, removeTrip }}>
      {children}
    </GeneratedTripsContext.Provider>
  );
}

export function useGeneratedTrips() {
  return useContext(GeneratedTripsContext);
}
