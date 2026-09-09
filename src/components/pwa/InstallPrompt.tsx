"use client";

import { useState, useEffect } from "react";
import { X, Share2 } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Re-show the prompt after 7 days if dismissed (not permanently suppressed)
const DISMISSED_KEY = "rar_pwa_install_dismissed_at";
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Already installed — running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt && Date.now() - Number(dismissedAt) < DISMISS_TTL_MS) {
      return;
    }

    // iOS detection (Safari "Add to Home Screen" path)
    const ios =
      /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) &&
      !(window.navigator as { standalone?: boolean }).standalone;

    if (ios) {
      setIsIos(true);
      setTimeout(() => setIsVisible(true), 4000);
      return;
    }

    // Android / Chrome desktop: wait for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after a short delay so it doesn't immediately pop on load
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
    } finally {
      setIsInstalling(false);
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Backdrop — subtle scrim when sheet is open */}
      <div
        onClick={handleDismiss}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 7999,
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Install Raste Aur Raahein app"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 8000,
          background: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          padding: "0 1.5rem 2rem",
          transform: isVisible ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
        }}
      >
        {/* Drag handle pill */}
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: "2px",
            background: "#D1D5DB",
            margin: "12px auto 20px",
          }}
          aria-hidden="true"
        />

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          id="pwa-dismiss-btn"
          aria-label="Dismiss install prompt"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1.25rem",
            background: "#F3F4F6",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#6B7280",
          }}
        >
          <X size={16} />
        </button>

        {/* App identity row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          {/* App icon */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "14px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192.png"
              alt="Raste Aur Raahein app icon"
              width={60}
              height={60}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Name + subtitle */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "#262729",
                marginBottom: "2px",
              }}
            >
              Raste Aur Raahein
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#6B7280",
                fontFamily: "var(--font-sans)",
              }}
            >
              rasteaurrahein.com
            </div>
            {/* Star rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                marginTop: "3px",
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#FEBB02", fontSize: "0.75rem" }}>
                  ★
                </span>
              ))}
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "#9CA3AF",
                  marginLeft: "4px",
                }}
              >
                Travel · Trekking
              </span>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          {[
            { icon: "🗺️", label: "60k+ km\nDocumented" },
            { icon: "📵", label: "Works\nOffline" },
            { icon: "🤖", label: "AI Trip\nPlanner" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                background: "#F7F7F7",
                borderRadius: "12px",
                padding: "0.75rem 0.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
                {icon}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#374151",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* iOS specific — step-by-step guide */}
        {isIos ? (
          <div
            style={{
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "0.75rem",
                color: "#1D4ED8",
                fontWeight: 700,
                fontSize: "0.85rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              <Share2 size={15} />
              Add to Home Screen
            </div>
            {[
              "Tap the Share button in Safari's toolbar",
              'Scroll down and tap "Add to Home Screen"',
              'Tap "Add" in the top right corner',
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: i < 2 ? "0.5rem" : 0,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#006CE4",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#1E40AF",
                    lineHeight: 1.4,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Android / Chrome: Install CTA */
          <button
            onClick={handleInstall}
            id="pwa-install-btn"
            disabled={isInstalling}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "14px",
              border: "none",
              background: isInstalling
                ? "#93C5FD"
                : "linear-gradient(135deg, #006CE4 0%, #0057b8 100%)",
              color: "#FFFFFF",
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "1rem",
              cursor: isInstalling ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(0,108,228,0.35)",
              transition: "all 0.2s ease",
              letterSpacing: "0.01em",
            }}
          >
            {isInstalling ? "Installing…" : "Install App — It's Free"}
          </button>
        )}

        {/* Fine print */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.72rem",
            color: "#9CA3AF",
            marginTop: "0.75rem",
            fontFamily: "var(--font-sans)",
          }}
        >
          No Play Store required · Works on Android &amp; iOS
        </p>
      </div>

      <style>{`
        @media (min-width: 600px) {
          /* On wider screens, constrain the sheet to a card-like width */
          [aria-label="Install Raste Aur Raahein app"] {
            left: 50% !important;
            right: auto !important;
            bottom: 1.5rem !important;
            transform: ${isVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(120%)"} !important;
            width: min(480px, calc(100vw - 3rem));
            border-radius: 20px !important;
          }
        }
      `}</style>
    </>
  );
}

