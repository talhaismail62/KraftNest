"use client";

import { useState } from "react";
import { employees } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { WorkflowFlow } from "@/components/site/WorkflowFlow";

export function Employees() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = employees.find((e) => e.id === hovered) ?? employees[0];

  return (
    <section id="employees" className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16">
        <div>
          {employees.map((emp, i) => (
            <Reveal key={emp.id} delay={i * 0.04}>
              <button
                onMouseEnter={() => setHovered(emp.id)}
                onFocus={() => setHovered(emp.id)}
                className="w-full flex items-baseline gap-5 md:gap-7 py-5 border-b border-white/[0.06] text-left group"
              >
                <span className="font-heading text-[12px] text-cyan/40 tracking-[0.1em] w-6 shrink-0 group-hover:text-cyan transition-colors">
                  {emp.role}
                </span>
                <span className="font-heading text-[18px] md:text-[22px] font-bold tracking-tight text-white/35 group-hover:text-white transition-colors duration-200">
                  {emp.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div key={active.id} className="card p-7 lg:sticky lg:top-24">
            <div className="font-heading text-[10px] text-cyan/60 tracking-[0.15em] mb-3">
              {active.role}
            </div>
            <h3 className="font-heading text-[19px] font-bold tracking-tight mb-3">
              {active.title}
            </h3>
            <p className="text-[13.5px] text-white/45 leading-[1.75] font-light mb-6">
              {active.desc}
            </p>
            <div className="pt-5 border-t border-white/[0.06]">
              <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted mb-4">
                Live Workflow
              </div>
              <WorkflowFlow nodes={active.flow} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
