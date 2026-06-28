"use client";

import { useEffect } from "react";

/** Tracks the cursor over `.card` elements and feeds the position into the glow defined in globals.css. */
export function CardSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(".card");
      if (!target) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        target.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
