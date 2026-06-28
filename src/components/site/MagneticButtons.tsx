"use client";

import { useEffect } from "react";

const MAX_OFFSET = 8;
const STRENGTH = 0.3;

/** Pulls `.btn-primary` elements gently toward the cursor on hover — desktop only. */
export function MagneticButtons() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: HTMLElement | null = null;
    let raf = 0;

    const reset = (el: HTMLElement) => {
      el.style.transform = "";
    };

    const onMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(".btn-primary");

      if (target !== current && current) {
        reset(current);
      }
      current = target;
      if (!target) return;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * STRENGTH));
        const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * STRENGTH));
        target.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const onLeaveWindow = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
