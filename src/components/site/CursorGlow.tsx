"use client";

import { useEffect, useRef } from "react";

/** Subtle glow that follows the cursor — desktop only, contained radius, no smear. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${e.clientX - 220}px, ${e.clientY - 220}px)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hidden md:block fixed top-0 left-0 h-[440px] w-[440px] rounded-full pointer-events-none z-0 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 72%)",
      }}
      aria-hidden="true"
    />
  );
}
