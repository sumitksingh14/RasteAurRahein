"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "rar_pwa_install_dismissed";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Already installed (running as standalone)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Previously dismissed
    if (localStorage.getItem(DISMISSED_KEY)) return;

    // iOS detection (Safari "Add to Home Screen" path)
    const ios =
      /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) &&
      !(window.navigator as { standalone?: boolean }).standalone;

    if (ios) {
      setIsIos(true);
      // Show iOS prompt after 3s
      setTimeout(() => setIsVisible(true), 3000);
      return;
    }

    // Android / Chrome: wait for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after a short delay so it doesn't pop up immediately on load
      setTimeout(() => setIsVisible(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          role="banner"
          aria-label="Install RasteAurRahein app"
          style={{
            position: "fixed",
            bottom: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 8000,
            width: "min(420px, calc(100vw - 2rem))",
            background:
              "linear-gradient(145deg, rgba(20,20,30,0.97) 0%, rgba(12,12,20,0.99) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "18px",
            padding: "1.1rem 1.25rem",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192.png"
              alt=""
              width={44}
              height={44}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Install RasteAurRahein
            </p>
            <p
              style={{
                margin: "2px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                lineHeight: 1.4,
              }}
            >
              {isIos
                ? "Tap Share → Add to Home Screen"
                : "Add to your home screen for quick access"}
            </p>
          </div>

          {/* Action / dismiss */}
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            {isIos ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "var(--accent-gold)",
                }}
                aria-hidden
              >
                <Share size={16} />
              </div>
            ) : (
              <button
                onClick={handleInstall}
                id="pwa-install-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                  color: "#0a0a0f",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 12px rgba(201,168,76,0.3)",
                }}
              >
                <Download size={13} />
                Install
              </button>
            )}

            <button
              onClick={handleDismiss}
              id="pwa-dismiss-btn"
              aria-label="Dismiss install prompt"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "8px",
                transition: "color 0.2s",
              }}
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
