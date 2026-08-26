"use client";

import { useEffect, useState } from "react";

/**
 * A slim gradient progress bar fixed at the top of the viewport
 * (below the navbar) that fills as the user scrolls through the page.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const total = docH - winH;
      setProgress(total > 0 ? Math.min((scrollY / total) * 100, 100) : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update(); // initialise
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "var(--nav-height)",
        left: 0,
        right: 0,
        height: 3,
        zIndex: 999,
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--accent-gold) 0%, var(--accent-rose) 100%)",
          transition: "width 0.1s linear",
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 8px rgba(201,168,76,0.5)",
        }}
      />
    </div>
  );
}
