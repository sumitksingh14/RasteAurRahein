"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, RefreshCw, CheckCircle, XCircle, SkipForward, Clock } from "lucide-react";
import type { EnrichmentRunLog } from "@/lib/enrichment/types";

interface RunsResponse {
  logs: EnrichmentRunLog[];
  approvalRate: number;
  totalTokens: number;
  successCount: number;
  failCount: number;
  skipCount: number;
}

export default function EnrichmentRunsPage() {
  const [data, setData] = useState<RunsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/enrichment/runs")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(load, []);

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const OUTCOME_ICONS = {
    success: <CheckCircle size={14} color="#10b981" />,
    failed: <XCircle size={14} color="#ef4444" />,
    skipped: <SkipForward size={14} color="#94a3b8" />,
  };

  const OUTCOME_COLORS = {
    success: "#10b981",
    failed: "#ef4444",
    skipped: "#94a3b8",
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <Link
              href="/admin/enrichment"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.85rem",
              }}
            >
              <ChevronLeft size={14} style={{ display: "inline" }} /> Enrichment
            </Link>
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
            }}
          >
            📊 Enrichment Run Logs
          </h1>
          <p
            style={{
              color: "#64748b",
              margin: "0.35rem 0 0",
              fontSize: "0.9rem",
            }}
          >
            Last 100 enrichment runs — token usage, outcomes, and timing.
          </p>
        </div>

        <button
          onClick={load}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0.55rem 1rem",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#fff",
            fontSize: "0.85rem",
            cursor: "pointer",
            color: "#475569",
          }}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ color: "#64748b" }}>Loading run logs…</div>
      ) : !data ? (
        <p style={{ color: "#ef4444" }}>Failed to load run logs.</p>
      ) : (
        <>
          {/* Summary cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 100%), 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              {
                label: "Successful",
                value: data.successCount,
                color: "#10b981",
                icon: <CheckCircle size={18} color="#fff" />,
              },
              {
                label: "Failed",
                value: data.failCount,
                color: "#ef4444",
                icon: <XCircle size={18} color="#fff" />,
              },
              {
                label: "Skipped",
                value: data.skipCount,
                color: "#94a3b8",
                icon: <SkipForward size={18} color="#fff" />,
              },
              {
                label: "Approval Rate",
                value: `${Math.round(data.approvalRate * 100)}%`,
                color: "#3b82f6",
                icon: <Clock size={18} color="#fff" />,
              },
              {
                label: "Total Tokens",
                value: data.totalTokens.toLocaleString(),
                color: "#8b5cf6",
                icon: <Clock size={18} color="#fff" />,
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "1.25rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 2 }}>
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Runs table */}
          {data.logs.length === 0 ? (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "3rem",
                textAlign: "center",
                color: "#64748b",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              No enrichment runs yet. Use the Gaps page to trigger enrichment.
            </div>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 80px 80px 80px 120px",
                  padding: "0.75rem 1.5rem",
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <span>Trip / Field</span>
                <span>Outcome</span>
                <span>Duration</span>
                <span>Tokens</span>
                <span>API calls</span>
                <span>Time</span>
              </div>

              {[...data.logs].reverse().map((log, i) => (
                <div
                  key={log.jobId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 80px 80px 80px 120px",
                    padding: "0.875rem 1.5rem",
                    borderBottom:
                      i < data.logs.length - 1 ? "1px solid #f8fafc" : "none",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.tripSlug}
                    </div>
                    <code
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        background: "#f1f5f9",
                        padding: "1px 5px",
                        borderRadius: 4,
                      }}
                    >
                      {log.field}
                    </code>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {OUTCOME_ICONS[log.outcome]}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: OUTCOME_COLORS[log.outcome],
                        fontWeight: 600,
                      }}
                    >
                      {log.outcome}
                    </span>
                    {log.error && (
                      <span
                        title={log.error}
                        style={{
                          fontSize: "0.65rem",
                          color: "#94a3b8",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 120,
                        }}
                      >
                        {log.error}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "#475569" }}>
                    {formatDuration(log.durationMs)}
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "#475569" }}>
                    {log.tokensUsed.toLocaleString()}
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "#475569" }}>
                    {log.toolCallCount}
                  </div>

                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {new Date(log.completedAt).toLocaleString("en-IN", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
