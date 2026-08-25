"use client";

import { useEffect, useState, useRef } from "react";

const TRAVEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
    alt: "Snow-capped mountain peaks",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    alt: "Mountain lake reflection",
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80",
    alt: "Open road through the wilderness",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
    alt: "Rolling hills travel landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    alt: "Tropical beach shoreline",
  },
  {
    src: "https://images.unsplash.com/photo-1519944093750-4e5c9a7fc8dc?w=1920&q=80",
    alt: "Desert sand dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=1920&q=80",
    alt: "Snowy Himalayan wilderness",
  },
  {
    src: "https://images.unsplash.com/photo-1625166961073-2a3e28ee12b5?w=1920&q=80",
    alt: "Spiti Valley high altitude desert",
  },
];

const SLIDE_DURATION = 7000;  // 7 s per image
const FADE_DURATION  = 1500;  // 1.5 s cross-fade

export default function AmbientBackground() {
  const [current, setCurrent] = useState(0);
  const [next, setNext]       = useState<number | null>(null);
  const [fading, setFading]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      const n = (current + 1) % TRAVEL_IMAGES.length;
      setNext(n);
      setFading(true);

      // After fade completes, promote next → current
      timerRef.current = setTimeout(() => {
        setCurrent(n);
        setNext(null);
        setFading(false);
      }, FADE_DURATION);
    };

    const interval = setInterval(cycle, SLIDE_DURATION);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  return (
    <>
      <style>{`
        @keyframes amb-ken {
          0%   { transform: scale(1)    translate(0, 0); }
          50%  { transform: scale(1.06) translate(-1%, -0.5%); }
          100% { transform: scale(1)    translate(0, 0); }
        }
        .amb-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: amb-ken 30s ease-in-out infinite;
        }
        .amb-img-enter {
          animation: amb-ken 30s ease-in-out infinite;
        }
      `}</style>

      {/* Fixed full-screen ambient container */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Current image */}
        <img
          key={`curr-${current}`}
          src={TRAVEL_IMAGES[current].src}
          alt={TRAVEL_IMAGES[current].alt}
          className="amb-img"
          style={{ opacity: 1, transition: `opacity ${FADE_DURATION}ms ease` }}
        />

        {/* Next image fading in */}
        {next !== null && (
          <img
            key={`next-${next}`}
            src={TRAVEL_IMAGES[next].src}
            alt={TRAVEL_IMAGES[next].alt}
            className="amb-img amb-img-enter"
            style={{
              opacity: fading ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease`,
            }}
          />
        )}

        {/* Dark overlay — keeps pages readable while letting image breathe */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(3,15,20,0.72)",
          }}
        />

        {/* Subtle vignette for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>
    </>
  );
}
