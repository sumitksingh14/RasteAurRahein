"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Car,
  Utensils,
  Bed,
  Binoculars,
  Camera,
  Check,
  Edit2,
  X,
  Sparkles,
} from "lucide-react";
import type { GeneratedTrip, GeneratedDay, GeneratedActivity } from "@/components/providers/GeneratedTripsProvider";

interface ItineraryEditorProps {
  trip: GeneratedTrip;
  onUpdate: (updatedTrip: GeneratedTrip) => void;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  transport: Car,
  food: Utensils,
  accommodation: Bed,
  sightseeing: Binoculars,
  activity: Camera,
};

const ACTIVITY_TYPES = [
  { value: "sightseeing", label: "Sightseeing", icon: Binoculars },
  { value: "activity", label: "Adventure / Trek", icon: Camera },
  { value: "food", label: "Food & Cafe", icon: Utensils },
  { value: "accommodation", label: "Stay / Hotel", icon: Bed },
  { value: "transport", label: "Drive / Transport", icon: Car },
];

export default function ItineraryEditor({ trip, onUpdate }: ItineraryEditorProps) {
  const [days, setDays] = useState<GeneratedDay[]>(trip.days || []);
  const [savedNotice, setSavedNotice] = useState(false);

  // New activity modal state
  const [addingToDay, setAddingToDay] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newType, setNewType] = useState("sightseeing");
  const [newNotes, setNewNotes] = useState("");

  const triggerUpdate = (newDays: GeneratedDay[]) => {
    setDays(newDays);
    const updated = { ...trip, days: newDays };
    onUpdate(updated);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const moveActivity = (dayIndex: number, actIndex: number, direction: "up" | "down") => {
    const newDays = [...days];
    const activities = [...newDays[dayIndex].activities];
    const targetIndex = direction === "up" ? actIndex - 1 : actIndex + 1;

    if (targetIndex < 0 || targetIndex >= activities.length) return;

    const temp = activities[actIndex];
    activities[actIndex] = activities[targetIndex];
    activities[targetIndex] = temp;

    newDays[dayIndex] = { ...newDays[dayIndex], activities };
    triggerUpdate(newDays);
  };

  const moveActivityBetweenDays = (dayIndex: number, actIndex: number, targetDayIndex: number) => {
    if (targetDayIndex < 0 || targetDayIndex >= days.length) return;
    const newDays = [...days];
    const sourceActivities = [...newDays[dayIndex].activities];
    const [movedActivity] = sourceActivities.splice(actIndex, 1);
    const targetActivities = [...newDays[targetDayIndex].activities, movedActivity];

    newDays[dayIndex] = { ...newDays[dayIndex], activities: sourceActivities };
    newDays[targetDayIndex] = { ...newDays[targetDayIndex], activities: targetActivities };
    triggerUpdate(newDays);
  };

  const deleteActivity = (dayIndex: number, actIndex: number) => {
    const newDays = [...days];
    const activities = newDays[dayIndex].activities.filter((_, i) => i !== actIndex);
    newDays[dayIndex] = { ...newDays[dayIndex], activities };
    triggerUpdate(newDays);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (addingToDay === null || !newTitle.trim()) return;

    const dayIndex = days.findIndex((d) => d.dayNumber === addingToDay);
    if (dayIndex === -1) return;

    const newActivity: GeneratedActivity = {
      title: newTitle.trim(),
      time: newTime.trim() || undefined,
      type: newType,
      notes: newNotes.trim() || undefined,
    };

    const newDays = [...days];
    newDays[dayIndex] = {
      ...newDays[dayIndex],
      activities: [...newDays[dayIndex].activities, newActivity],
    };

    triggerUpdate(newDays);
    // Reset modal
    setAddingToDay(null);
    setNewTitle("");
    setNewTime("");
    setNewType("sightseeing");
    setNewNotes("");
  };

  const addDay = () => {
    const nextDayNum = days.length + 1;
    const newDay: GeneratedDay = {
      dayNumber: nextDayNum,
      title: `Day ${nextDayNum} Exploration`,
      summary: "Custom day added to itinerary",
      activities: [],
    };
    triggerUpdate([...days, newDay]);
  };

  const deleteDay = (dayIndex: number) => {
    if (!confirm(`Delete Day ${days[dayIndex].dayNumber}?`)) return;
    const newDays = days
      .filter((_, i) => i !== dayIndex)
      .map((d, i) => ({ ...d, dayNumber: i + 1 }));
    triggerUpdate(newDays);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 1.25rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={16} color="var(--accent-gold)" />
          <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 600 }}>
            Interactive Itinerary Customizer
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            — Reorder stops, add custom cafes/viewpoints, or adjust timings
          </span>
        </div>

        {savedNotice && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981", fontSize: "0.8rem", fontWeight: 600 }}>
            <Check size={14} /> Changes saved
          </div>
        )}
      </div>

      {/* Days List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {days.map((day, dayIndex) => {
          return (
            <div
              key={day.dayNumber}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Day Header */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  background: "var(--bg-secondary)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      background: "var(--accent-gold)",
                      color: "var(--bg-primary)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    DAY {day.dayNumber}
                  </span>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => {
                      const newDays = [...days];
                      newDays[dayIndex] = { ...newDays[dayIndex], title: e.target.value };
                      triggerUpdate(newDays);
                    }}
                    style={{
                      background: "transparent",
                      border: "1px solid transparent",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      padding: "0.2rem 0.4rem",
                      borderRadius: "var(--radius-sm)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    onClick={() => setAddingToDay(day.dayNumber)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-accent)",
                      background: "var(--accent-gold-dim)",
                      color: "var(--accent-gold)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={13} /> Add Stop
                  </button>
                  {days.length > 1 && (
                    <button
                      onClick={() => deleteDay(dayIndex)}
                      title="Delete Day"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "0.35rem",
                        borderRadius: "var(--radius-sm)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Activities List */}
              <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {day.activities.length === 0 ? (
                  <div
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: "0.85rem",
                      border: "1px dashed var(--border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    No activities added yet for Day {day.dayNumber}. Click "Add Stop" to schedule an activity.
                  </div>
                ) : (
                  day.activities.map((act, actIndex) => {
                    const Icon = TYPE_ICONS[act.type || ""] || MapPin;
                    return (
                      <div
                        key={actIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.75rem 1rem",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-sm)",
                          gap: "0.75rem",
                        }}
                      >
                        {/* Left: Reorder arrows */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <button
                            onClick={() => moveActivity(dayIndex, actIndex, "up")}
                            disabled={actIndex === 0}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: actIndex === 0 ? "not-allowed" : "pointer",
                              color: actIndex === 0 ? "var(--border)" : "var(--text-secondary)",
                              padding: 0,
                            }}
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            onClick={() => moveActivity(dayIndex, actIndex, "down")}
                            disabled={actIndex === day.activities.length - 1}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: actIndex === day.activities.length - 1 ? "not-allowed" : "pointer",
                              color: actIndex === day.activities.length - 1 ? "var(--border)" : "var(--text-secondary)",
                              padding: 0,
                            }}
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>

                        {/* Icon */}
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "var(--accent-gold-dim)",
                            border: "1px solid var(--border-accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--accent-gold)",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={14} />
                        </div>

                        {/* Title & info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            {act.time && (
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  color: "var(--accent-gold)",
                                  background: "var(--bg-card)",
                                  padding: "0.15rem 0.4rem",
                                  borderRadius: "4px",
                                }}
                              >
                                {act.time}
                              </span>
                            )}
                            <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
                              {act.title}
                            </span>
                          </div>
                          {act.notes && (
                            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                              {act.notes}
                            </p>
                          )}
                        </div>

                        {/* Right: Actions */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {/* Move to next day */}
                          {dayIndex < days.length - 1 && (
                            <button
                              onClick={() => moveActivityBetweenDays(dayIndex, actIndex, dayIndex + 1)}
                              title="Move to next day"
                              style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "4px",
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.7rem",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                              }}
                            >
                              → Day {day.dayNumber + 1}
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => deleteActivity(dayIndex, actIndex)}
                            title="Remove Stop"
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              padding: "0.3rem",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Day Button */}
      <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
        <button
          onClick={addDay}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "0.75rem 1.5rem",
            borderRadius: "var(--radius-sm)",
            border: "1px dashed var(--border-accent)",
            background: "var(--accent-gold-dim)",
            color: "var(--accent-gold)",
            fontSize: "0.88rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          <Plus size={16} /> Add Day {days.length + 1}
        </button>
      </div>

      {/* Add Activity Modal */}
      {addingToDay !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setAddingToDay(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "1.75rem",
              maxWidth: 480,
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Add Stop to Day {addingToDay}
              </h3>
              <button
                onClick={() => setAddingToDay(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddActivity} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>
                  Activity / Place Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunrise viewpoint at Dhankar Lake"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>
                    Time Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 06:30 AM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>
                    Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {ACTIVITY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>
                  Travel Notes / Tips
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Requires a 45-min moderate hike. Carry warm layers and water."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setAddingToDay(null)}
                  style={{
                    padding: "0.55rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    background: "var(--accent-gold)",
                    color: "var(--bg-primary)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Save Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
