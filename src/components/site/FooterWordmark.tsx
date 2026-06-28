"use client";

import { useEffect, useRef, useState } from "react";

/** Oversized brand wordmark that auto-scales to fill its container's width, then gets
 * cropped at roughly its mid-height by the parent's fixed, font-size-relative height —
 * the same "half-clipped giant logotype" footer treatment urbi.ae uses. */
export function FooterWordmark({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(200);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function fit() {
      const width = el?.clientWidth ?? 0;
      if (!width) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const probe = 200;
      const heading = getComputedStyle(document.documentElement).getPropertyValue("--font-heading") || "sans-serif";
      ctx.font = `700 ${probe}px ${heading}, sans-serif`;
      const textWidth = ctx.measureText(text).width || probe;
      // Oversize past the container width on purpose — the giant wordmark should bleed
      // slightly off the left/right edges, not sit neatly inside them.
      setFontSize(Math.max(40, (width / textWidth) * probe * 1.16));
    }

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none pointer-events-none"
      style={{ height: fontSize * 0.62 }}
      aria-hidden="true"
    >
      <div
        className="absolute right-0 top-0 rounded-full bg-cyan/10 blur-md"
        style={{ height: fontSize * 1.7, width: Math.min(fontSize * 0.65, 180) }}
      />
      <span
        className="absolute left-0 top-0 font-heading font-bold text-cyan/90 leading-none whitespace-nowrap"
        style={{
          fontSize,
          letterSpacing: "-0.05em",
          WebkitTextStroke: `${Math.max(1, fontSize * 0.02)}px currentColor`,
        }}
      >
        {text}
      </span>
    </div>
  );
}
