"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Check, Loader2, Compass } from "lucide-react";

const REGIONS = [
  "Himachal Pradesh",
  "Ladakh & Zanskar",
  "Uttarakhand",
  "Western Ghats",
  "North East",
  "Rajasthan & Deserts",
];

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushOptIn() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "Himachal Pradesh",
    "Ladakh & Zanskar",
  ]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);

      // Check current subscription
      navigator.serviceWorker.ready.then(async (reg) => {
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          setIsSubscribed(true);
        }
      });

      // Load saved preferences if available
      fetch("/api/push/subscribe", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.favoriteRegions && data.favoriteRegions.length > 0) {
            setSelectedRegions(data.favoriteRegions);
          }
        })
        .catch(() => {});
    }
  }, []);

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const handleSubscribe = async () => {
    if (!isSupported) return;
    setLoading(true);
    setMessage(null);

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== "granted") {
        setMessage("Notifications permission was denied in browser settings.");
        setLoading(false);
        return;
      }

      const reg = await navigator.serviceWorker.ready;

      // Get public VAPID key from API
      const keyRes = await fetch("/api/push/subscribe", { credentials: "include" });
      const { publicKey } = await keyRes.json();

      if (!publicKey) {
        throw new Error("Missing VAPID public key");
      }

      const convertedKey = urlBase64ToUint8Array(publicKey);

      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });
      }

      // Persist subscription with selected regions
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          subscription: sub.toJSON(),
          favoriteRegions: selectedRegions,
        }),
      });

      if (res.ok) {
        setIsSubscribed(true);
        setMessage("✓ You'll be notified when saved trips or new routes in your regions update!");
      } else {
        throw new Error("Failed to save push subscription on server");
      }
    } catch (err: unknown) {
      console.error(err);
      setMessage("Could not enable notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await sub.unsubscribe();
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
      }
      setIsSubscribed(false);
      setMessage("Unsubscribed from travel notifications.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to unsubscribe.");
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "var(--radius-lg, 16px)",
        padding: "1.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: isSubscribed ? "rgba(16, 185, 129, 0.12)" : "rgba(0,108,228,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isSubscribed ? "#059669" : "#006CE4",
            flexShrink: 0,
          }}
        >
          {isSubscribed ? <Bell size={22} /> : <BellOff size={22} />}
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#262729",
                margin: 0,
              }}
            >
              Trip &amp; Route Push Notifications
            </h3>
            {isSubscribed && (
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#059669",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "100px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Active
              </span>
            )}
          </div>
          <p style={{ color: "#6B7280", fontSize: "0.85rem", margin: "0 0 1rem" }}>
            Get instant alerts when a trip in your saved list is updated with fresh trail notes,
            or when a new offbeat itinerary in your favourite regions is published.
          </p>

          {/* Region interests selector */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#4B5563",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Compass size={13} /> Favourite Regions to Monitor:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {REGIONS.map((region) => {
                const active = selectedRegions.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    style={{
                      padding: "0.3rem 0.75rem",
                      borderRadius: "100px",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      border: active ? "1.5px solid #006CE4" : "1px solid #D1D5DB",
                      background: active ? "rgba(0,108,228,0.08)" : "#FFFFFF",
                      color: active ? "#006CE4" : "#4B5563",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {active && <Check size={12} />}
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {!isSubscribed ? (
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.5rem 1.15rem",
                  fontSize: "0.85rem",
                }}
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Bell size={15} />}
                Enable Push Notifications
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUnsubscribe}
                disabled={loading}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "0.5rem 1.15rem",
                  fontSize: "0.85rem",
                  background: "#F3F4F6",
                  color: "#4B5563",
                  border: "1px solid #D1D5DB",
                  borderRadius: "var(--radius-sm, 8px)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <BellOff size={15} />}
                Turn Off Notifications
              </button>
            )}

            {permission === "denied" && (
              <span style={{ fontSize: "0.78rem", color: "#DC2626" }}>
                Blocked in browser settings
              </span>
            )}
          </div>

          {message && (
            <div
              style={{
                marginTop: "0.85rem",
                fontSize: "0.82rem",
                color: message.startsWith("✓") ? "#059669" : "#DC2626",
                fontWeight: 500,
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
