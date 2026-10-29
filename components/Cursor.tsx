"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop only: a soft sulfur spotlight that follows the pointer, plus a small ring
 * that hides over links, buttons and the header. The real cursor stays visible. Off with reduced motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let x = innerWidth / 2,
      y = innerHeight / 2,
      rx = x,
      ry = y,
      raf = 0,
      shown = false;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        document.documentElement.classList.add("cursor-on");
      }
      const target = e.target as Element | null;
      // Over links, buttons, the header and project images the ring steps aside:
      // those already have their own hover effect, and a trailing ring there looks like lag.
      const busy = target?.closest("a, button, input, textarea, select, [role=button], label, header, .card-media");
      ring.current?.classList.toggle("is-hidden", Boolean(busy));
    };
    const leave = () => document.documentElement.classList.remove("cursor-on");
    const loop = () => {
      rx += (x - rx) * 0.4;
      ry += (y - ry) * 0.4;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (glow.current) glow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={glow} aria-hidden="true" className="cursor-glow" />
      <div ref={ring} aria-hidden="true" className="cursor-ring" />
    </>
  );
}
