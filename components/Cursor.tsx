"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop only: a soft sulfur spotlight that follows the pointer, plus a small ring
 * that grows over links and buttons. The real cursor stays visible. Off with reduced motion.
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
      const interactive = target?.closest("a, button, input, textarea, select, [role=button], label");
      const media = target?.closest(".card-media");
      ring.current?.classList.toggle("is-hover", Boolean(interactive) && !media);
      ring.current?.classList.toggle("is-hidden", Boolean(media));
    };
    const leave = () => document.documentElement.classList.remove("cursor-on");
    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
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
