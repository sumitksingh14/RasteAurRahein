"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ComposedChart,
  Line,
  Area,
} from "recharts";
import { Cloud, Wind, Droplets, Thermometer, Star, AlertTriangle } from "lucide-react";
import { getWeatherDesc, isGoodTime } from "@/lib/weatherCoords";

interface WeatherPanelProps {
  slug: string;
  lat: number;
  lon: number;
  locationName: string;
  /** Optional: planned start month index (0 = Jan) to highlight and warn */
  plannedMonthIndex?: number;
}

interface ForecastDay {
  date: string;
  weatherCode: number;
  maxC: number;
  minC: number;
  precipMm: number;
  precipProbability: number;
  windMaxKph: number;
}

interface CurrentWeather {
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  precipMm: number;
  weatherCode: number;
  windKph: number;
  windDir: number;
}

interface MonthlyClimate {
  month: string;
  monthIndex: number;
  avgMaxC: number | null;
  avgMinC: number | null;
  avgPrecipMm: number;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dayLabel(dateStr: string) {
  const d = new Date(dateStr);
  return DAY_LABELS[d.getDay()];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// ---------------------------------------------------------------------------
// Custom Recharts tooltip
// ---------------------------------------------------------------------------
function ClimateTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        padding: "0.6rem 0.9rem",
        fontSize: "0.8rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#262729" }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</strong>
          {p.name.includes("Temp") ? "°C" : "mm"}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------
export default function WeatherPanel({
  lat,
  lon,
  locationName,
  plannedMonthIndex,
}: WeatherPanelProps) {
  const [forecast, setForecast] = useState<{
    current: CurrentWeather;
    daily: ForecastDay[];
  } | null>(null);

  const [climate, setClimate] = useState<{
    monthly: MonthlyClimate[];
    bestMonths: string[];
    dataYears: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/weather?lat=${lat}&lon=${lon}`).then((r) => r.json()),
      fetch(`/api/weather/climate?lat=${lat}&lon=${lon}`).then((r) => r.json()),
    ])
      .then(([f, c]) => {
        if (!f.error) setForecast(f);
        if (!c.error) setClimate(c);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const currentDesc = forecast ? getWeatherDesc(forecast.current.weatherCode) : null;

  // Planned month warning
  let plannedMonthWarning: string | null = null;
  if (climate && plannedMonthIndex !== undefined) {
    const pm = climate.monthly[plannedMonthIndex];
    if (pm) {
      if (pm.avgPrecipMm > 200) {
        plannedMonthWarning = `Heavy monsoon season in ${pm.month} (avg ~${Math.round(pm.avgPrecipMm)}mm rainfall). Expect road closures and landslide risk.`;
      } else if (pm.avgMaxC !== null && pm.avgMaxC < 0) {
        plannedMonthWarning = `${pm.month} is peak winter — temperatures drop below 0°C. High-altitude passes may be closed.`;
      } else if (pm.avgMaxC !== null && pm.avgMaxC > 40) {
        plannedMonthWarning = `${pm.month} is peak summer heat (avg high ~${pm.avgMaxC}°C). Plan for early morning starts and shade stops.`;
      }
    }
  }

  const chartData = climate?.monthly.map((m) => ({
    name: m.month.slice(0, 3),
    "Max Temp": m.avgMaxC,
    "Min Temp": m.avgMinC,
    "Rainfall (mm)": m.avgPrecipMm,
    highlighted: m.monthIndex === plannedMonthIndex,
  }));

  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid #E5E7EB",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
        }}
      >
        <Cloud size={20} color="#006CE4" />
        <div>
          <div style={{ fontWeight: 700, color: "#262729", fontSize: "1rem" }}>
            Weather & Best Time to Visit
          </div>
          <div style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: 2 }}>
            {locationName}
          </div>
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6B7280", fontSize: "0.9rem" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
            Loading weather data…
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#9CA3AF" }}>
            Weather data unavailable right now.
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Current Conditions ── */}
            {forecast && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "0.75rem" }}>
                  Current Conditions
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    flexWrap: "wrap",
                    background: "#F9FAFB",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem 1.25rem",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "2.5rem" }}>{currentDesc?.emoji}</span>
                    <div>
                      <div style={{ fontSize: "2rem", fontWeight: 800, color: "#262729", lineHeight: 1 }}>
                        {Math.round(forecast.current.tempC)}°C
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                        Feels like {Math.round(forecast.current.feelsLikeC)}°C · {currentDesc?.label}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "#374151" }}>
                      <Droplets size={15} color="#006CE4" />
                      {forecast.current.humidity}% humidity
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "#374151" }}>
                      <Wind size={15} color="#006CE4" />
                      {Math.round(forecast.current.windKph)} km/h
                    </div>
                    {forecast.current.precipMm > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "#374151" }}>
                        🌧️ {forecast.current.precipMm}mm
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── 7-day Forecast Strip ── */}
            {forecast && forecast.daily.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "0.75rem" }}>
                  7-Day Forecast
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "0.4rem",
                  }}
                >
                  {forecast.daily.map((day) => {
                    const desc = getWeatherDesc(day.weatherCode);
                    return (
                      <div
                        key={day.date}
                        style={{
                          background: "#F9FAFB",
                          border: "1px solid #E5E7EB",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.6rem 0.3rem",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6B7280", marginBottom: 4 }}>
                          {dayLabel(day.date)}
                        </div>
                        <div style={{ fontSize: "1.4rem", marginBottom: 4 }}>{desc.emoji}</div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#DC2626" }}>
                          {Math.round(day.maxC)}°
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#6B7280" }}>
                          {Math.round(day.minC)}°
                        </div>
                        {day.precipProbability > 30 && (
                          <div style={{ fontSize: "0.65rem", color: "#006CE4", marginTop: 2 }}>
                            💧{day.precipProbability}%
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Planned month warning ── */}
            {plannedMonthWarning && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.4)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "2rem",
                }}
              >
                <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: "0.85rem", color: "#92400E", lineHeight: 1.5, margin: 0 }}>
                  <strong>Heads-up:</strong> {plannedMonthWarning}
                </p>
              </div>
            )}

            {/* ── Monthly Climate Chart ── */}
            {climate && chartData && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "0.75rem" }}>
                  Month-by-Month Climate ({climate.dataYears})
                </div>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} />
                      <YAxis
                        yAxisId="temp"
                        orientation="left"
                        tick={{ fontSize: 11, fill: "#6B7280" }}
                        unit="°"
                        domain={["auto", "auto"]}
                      />
                      <YAxis
                        yAxisId="rain"
                        orientation="right"
                        tick={{ fontSize: 11, fill: "#6B7280" }}
                        unit="mm"
                      />
                      <Tooltip content={<ClimateTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar
                        yAxisId="rain"
                        dataKey="Rainfall (mm)"
                        fill="rgba(0,108,228,0.18)"
                        stroke="rgba(0,108,228,0.4)"
                        radius={[3, 3, 0, 0]}
                      />
                      <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="Max Temp"
                        stroke="#DC2626"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="Min Temp"
                        stroke="#006CE4"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="4 2"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* ── Best Time to Visit callout ── */}
            {climate && climate.bestMonths.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "rgba(0,108,228,0.05)",
                  border: "1px solid rgba(0,108,228,0.18)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1rem",
                }}
              >
                <Star size={18} color="#006CE4" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#006CE4", marginBottom: 2 }}>
                    Best Time to Visit
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.5, margin: 0 }}>
                    {formatBestMonths(climate.bestMonths)} — based on lowest rainfall and comfortable temperatures
                    (historical data {climate.dataYears}).
                  </p>
                </div>
              </div>
            )}

            {/* Attribution */}
            <div style={{ fontSize: "0.7rem", color: "#9CA3AF", textAlign: "right", marginTop: "0.5rem" }}>
              Data: <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" style={{ color: "#9CA3AF" }}>Open-Meteo</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function formatBestMonths(months: string[]): string {
  if (months.length === 0) return "No ideal window found";
  if (months.length === 1) return months[0];
  if (months.length <= 3) return months.join(", ");

  // Try to detect contiguous ranges
  const MONTH_ORDER = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const indices = months.map((m) => MONTH_ORDER.indexOf(m)).sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = indices[0];
  let end = indices[0];

  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === end + 1) {
      end = indices[i];
    } else {
      ranges.push(
        start === end
          ? MONTH_ORDER[start]
          : `${MONTH_ORDER[start]}–${MONTH_ORDER[end]}`
      );
      start = indices[i];
      end = indices[i];
    }
  }
  ranges.push(
    start === end
      ? MONTH_ORDER[start]
      : `${MONTH_ORDER[start]}–${MONTH_ORDER[end]}`
  );

  return ranges.join(", ");
}
