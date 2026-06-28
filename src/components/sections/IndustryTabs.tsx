"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { industries, projects } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/site/Reveal";

export function IndustryTabs() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const active = industries.find((i) => i.id === activeId) ?? industries[0];
  const proof = projects.find((p) => p.id === active.projectId);

  return (
    <section className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <Reveal>
        <div className="eyebrow">Built For Your Industry</div>
        <RevealWords
          as="h2"
          className="section-title mt-4"
          words={[
            { text: "Same" },
            { text: "AI" },
            { text: "Workforce." },
            { text: "Different", className: "text-white/30" },
            { text: "Job.", className: "text-white/30" },
          ]}
        />
        <p className="text-[15px] text-white/40 leading-[1.8] max-w-[520px] mt-4 font-light">
          The roles stay the same — what they handle changes by industry. Pick yours.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="flex flex-wrap gap-2 mt-10">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveId(ind.id)}
              className={`font-heading text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-colors ${
                ind.id === activeId
                  ? "bg-cyan-dim border-cyan-border text-cyan"
                  : "border-white/[0.08] text-white/45 hover:text-white/75 hover:border-white/20"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal key={active.id} delay={0.04}>
        <div className="card p-7 md:p-9 mt-6 grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div>
            <p className="text-[14.5px] text-white/55 leading-[1.8] font-light max-w-[460px]">
              {active.blurb}
            </p>
            <ul className="flex flex-col gap-2.5 mt-6">
              {active.useCases.map((u) => (
                <li key={u} className="flex items-start gap-2.5 text-[13px] text-white/60">
                  <Check size={14} className="text-cyan mt-0.5 shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {proof && (
            <div className="rounded-lg border border-white/[0.07] bg-bg/50 p-5">
              <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted mb-3">
                Proof, Not a Pitch
              </div>
              <div className="font-heading text-[15px] font-bold tracking-tight mb-2">
                {proof.name}
              </div>
              <p className="text-[12.5px] text-white/40 leading-[1.7] font-light mb-4">
                {proof.summary}
              </p>
              <Link
                href="/work"
                className="font-heading text-[11px] uppercase tracking-[0.1em] text-cyan/80 hover:text-cyan inline-flex items-center gap-1.5"
              >
                See It In Our Work <ArrowUpRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
