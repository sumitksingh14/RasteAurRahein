"use client";

import { useEffect, useRef, useState } from "react";

export default function ButterflyFollower() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const targetRef = useRef({ x: -300, y: -300 });
  const currentRef = useRef({ x: -300, y: -300 });
  const prevXRef = useRef(-300);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Smooth lerp follow
    const loop = () => {
      const speed = 0.055;
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;
      currentRef.current.x += dx * speed;
      currentRef.current.y += dy * speed;

      // Flip based on horizontal travel direction
      if (currentRef.current.x < prevXRef.current - 0.4) setFlipped(true);
      else if (currentRef.current.x > prevXRef.current + 0.4) setFlipped(false);
      prevXRef.current = currentRef.current.x;

      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <>
      <style>{`
        /* ────────────────────────────────────────────────
           Butterfly cursor — converted from user's SCSS
           $color-wing: dodgerblue (#1e90ff)
           $color-sub-wing: lighten(dodgerblue,10%) ≈ #51a7ff
           $color-background: #d6c18b (used for body darken)
        ──────────────────────────────────────────────── */

        .bf-root {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          perspective-origin: 50% 50%;
          perspective: 800px;
          transition: opacity 0.35s ease;
        }

        .bf-butterfly {
          animation: bf-hover 250ms cubic-bezier(.48,.01,.54,1) infinite;
          animation-direction: alternate;
          animation-fill-mode: reverse;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateZ(0px);
          width: 30px;
        }

        /* Body */
        .bf-butterfly::before {
          background: #5c4500;
          border-radius: 50%;
          content: '';
          display: block;
          height: 110px;
          left: 50%;
          margin-left: -10px;
          outline: 1px solid transparent;
          position: absolute;
          top: -15px;
          transform: rotateY(100deg);
          width: 20px;
          z-index: 2;
        }

        /* Shadow beneath butterfly */
        .bf-shadow {
          animation: bf-shadow 250ms cubic-bezier(.48,.01,.54,1) infinite;
          animation-direction: alternate;
          animation-fill-mode: reverse;
          background: #000;
          border-radius: 50%;
          display: block;
          height: 10px;
          opacity: 0.1;
          transform-origin: 50% 50%;
          transform: translateX(-40px) translateY(100px);
          width: 100px;
          position: absolute;
        }

        /* Wings shared */
        .bf-wing {
          background: #888;
          display: block;
          opacity: 0.7;
          outline: 1px solid transparent;
          position: absolute;
          top: 0;
        }

        /* Left wing */
        .bf-wing:first-child {
          animation: bf-leftflap 250ms cubic-bezier(.48,.01,.54,1) infinite;
          animation-direction: alternate;
          animation-fill-mode: reverse;
          height: 1px;
          left: 0;
          transform: rotateY(-20deg);
          transform-origin: 700% 50%;
          width: 1px;
          z-index: 3;
        }

        /* Right wing */
        .bf-wing:last-child {
          animation: bf-rightflap 250ms cubic-bezier(.48,.01,.54,1) infinite;
          animation-direction: alternate;
          animation-fill-mode: reverse;
          right: 0;
          transform: rotateY(200deg);
          z-index: 1;
        }

        /* Wing bits */
        .bf-bit {
          background: dodgerblue;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
          transform-origin: 100% 50%;
        }

        .bf-bit::after {
          background: #51a7ff;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
          transform-origin: 100% 50%;
        }

        /* Upper wing bit */
        .bf-bit:first-child {
          height: 70px;
          text-align: center;
          top: 15px;
          transform: rotateZ(40deg);
          width: 130px;
        }

        .bf-bit:first-child::after {
          content: '';
          display: inline-block;
          height: 60px;
          left: -30px;
          top: 5px;
          width: 100px;
        }

        /* Lower wing bit */
        .bf-bit:last-child {
          height: 55px;
          transform: rotateZ(-40deg);
          width: 100px;
        }

        .bf-bit:last-child::after {
          content: '';
          display: inline-block;
          height: 45px;
          left: -24px;
          top: 5px;
          width: 60px;
          z-index: 1;
        }

        /* ── Keyframes ── */
        @keyframes bf-hover {
          0%   { transform: rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateZ(0px); }
          100% { transform: rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateZ(-3px); }
        }

        @keyframes bf-shadow {
          0%   { transform: translateX(-40px) translateY(100px) scale(1,1); }
          100% { transform: translateX(-40px) translateY(100px) scale(1.1,1.1); }
        }

        @keyframes bf-leftflap {
          0%   { transform: rotateY(-20deg); }
          100% { transform: rotateY(90deg); }
        }

        @keyframes bf-rightflap {
          0%   { transform: rotateY(200deg); }
          100% { transform: rotateY(90deg); }
        }
      `}</style>

      {/* Outer wrapper — positions butterfly at cursor */}
      <div
        className="bf-root"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
          transform: `scale(0.3) scaleX(${flipped ? -1 : 1})`,
        }}
      >
        <div className="bf-butterfly">
          {/* Left wing */}
          <span className="bf-wing">
            <b className="bf-bit" />
            <b className="bf-bit" />
          </span>

          {/* Right wing */}
          <span className="bf-wing">
            <b className="bf-bit" />
            <b className="bf-bit" />
          </span>
        </div>

        {/* Ground shadow */}
        <span className="bf-shadow" />
      </div>
    </>
  );
}
