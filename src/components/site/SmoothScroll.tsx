"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth-scroll driver. No-ops entirely under prefers-reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let raf = requestAnimationFrame(loop);
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
