"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import { RevealItem, RevealStagger } from "@/components/site/Reveal";
import { ProjectCard } from "./ProjectCard";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function Portfolio() {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
    return [...filtered].sort((a, b) => (a.status === b.status ? 0 : a.status === "Live" ? -1 : 1));
  }, [active]);

  return (
    <section className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`font-heading text-[11px] uppercase tracking-[0.08em] px-4 py-2 rounded-full border transition-colors ${
              active === c
                ? "bg-cyan text-black border-cyan"
                : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
        {visible.map((p) => (
          <RevealItem key={p.id}>
            <ProjectCard project={p} />
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
