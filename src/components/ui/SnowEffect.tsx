"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: string;
  size: number;
  fallDuration: number;
  fallDelay: number;
  swayDuration: number;
  opacity: number;
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate flakes on client only to avoid hydration mismatch
    const flakes: Snowflake[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: Math.random() * 4 + 2, // 2px to 6px
      fallDuration: Math.random() * 10 + 10, // 10s to 20s
      fallDelay: Math.random() * -20, // Negative delay to start immediately at different positions
      swayDuration: Math.random() * 3 + 2, // 2s to 5s
      opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
    }));
    setSnowflakes(flakes);
  }, []);

  if (snowflakes.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0, // Behind content, but visible
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snow-flake"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `
              snow-fall ${flake.fallDuration}s linear ${flake.fallDelay}s infinite,
              snow-sway ${flake.swayDuration}s ease-in-out infinite alternate
            `,
          }}
        />
      ))}
    </div>
  );
}
