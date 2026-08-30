"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share, GripVertical } from "lucide-react";

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

  const handleInstall = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          whileDrag={{
            scale: 1.03,
            cursor: "grabbing",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 0 2px rgba(201,168,76,0.35)",
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 260 }}
          role="banner"
          aria-label="Install RasteAurRahein app"
          className="pwa-install-dialog"
          style={{
            position: "fixed",
            zIndex: 8000,
            background:
              "linear-gradient(145deg, rgba(20,20,30,0.97) 0%, rgba(12,12,20,0.99) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "18px",
            padding: "0.85rem 1rem 0.85rem 0.65rem",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            touchAction: "none",
            cursor: "grab",
            userSelect: "none",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Drag Handle Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              opacity: 0.6,
              cursor: "grab",
              padding: "2px",
              flexShrink: 0,
            }}
            title="Drag to move anywhere"
            aria-hidden="true"
          >
            <GripVertical size={16} />
          </div>

          {/* Icon */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.12)",
              pointerEvents: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192.png"
              alt=""
              width={40}
              height={40}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0, pointerEvents: "none" }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Install App
            </p>
            <p
              style={{
                margin: "1px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: "0.74rem",
                color: "var(--text-muted)",
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isIos
                ? "Tap Share → Add to Home Screen"
                : "Add to home screen for quick access"}
            </p>
          </div>

          {/* Action / dismiss */}
          <div
            style={{ display: "flex", gap: "6px", flexShrink: 0 }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {isIos ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "var(--accent-gold)",
                }}
                aria-hidden
              >
                <Share size={15} />
              </div>
            ) : (
              <button
                onClick={handleInstall}
                id="pwa-install-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, var(--accent-gold), var(--accent-rose))",
                  color: "#0a0a0f",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 10px rgba(201,168,76,0.3)",
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
                width: 30,
                height: 30,
                borderRadius: "8px",
                transition: "color 0.2s",
              }}
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
