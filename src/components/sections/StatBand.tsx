"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";

function CountUp({ value, suffix, duration = 1100 }: { value: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const start = performance.now();
    let raf: number;
    function tick(t: number) {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/** Elevates Hero's stat data into a dedicated count-up band. */
export function StatBand() {
  return (
    <section className="max-w-site mx-auto px-5 md:px-8 py-4 md:py-6">
      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-y border-white/[0.06] py-10 md:py-12">
          {stats.map((s) => {
            const match = s.n.match(/^(\d+)(.*)$/);
            const value = match ? parseInt(match[1], 10) : null;
            const suffix = match ? match[2] : s.n;
            return (
              <div key={s.l} className="text-center">
                <div className="font-heading text-[28px] md:text-[36px] font-bold text-white tracking-tight">
                  {value !== null ? <CountUp value={value} suffix={suffix} /> : s.n}
                </div>
                <div className="text-[11px] md:text-[12px] text-white/35 uppercase tracking-[0.12em] mt-2">
                  {s.l}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
