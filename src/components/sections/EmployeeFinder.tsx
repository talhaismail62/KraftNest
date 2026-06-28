"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { site } from "@/lib/site";
import { employees, industries, projects } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/site/Reveal";

// Every fact shown by this quiz is pulled straight from the real employees/industries/projects
// data already used elsewhere on the site — no invented claims, so the recommendation can't
// say anything the rest of the site wouldn't also back up.
const TASK_OPTIONS = [
  { employeeId: "receptionist", label: "Answering calls & booking appointments" },
  { employeeId: "sdr", label: "Qualifying & following up with leads" },
  { employeeId: "support", label: "Answering repetitive customer questions" },
  { employeeId: "ops", label: "Manually moving data between tools" },
  { employeeId: "outreach", label: "Finding & contacting new prospects" },
] as const;

export function EmployeeFinder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [industryId, setIndustryId] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const industry = industries.find((i) => i.id === industryId);
  const employee = employees.find((e) => e.id === employeeId);
  const proof = industry ? projects.find((p) => p.id === industry.projectId) : undefined;

  function reset() {
    setStep(1);
    setIndustryId(null);
    setEmployeeId(null);
  }

  return (
    <section className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <Reveal>
        <div className="eyebrow">Find Your Fit</div>
        <RevealWords
          as="h2"
          className="section-title mt-4"
          words={[
            { text: "Which" },
            { text: "AI" },
            { text: "Employee" },
            { text: "Should", break: true, className: "text-cyan" },
            { text: "You", className: "text-cyan" },
            { text: "Hire", className: "text-cyan" },
            { text: "First?", className: "text-cyan" },
          ]}
        />
        <p className="text-[15px] text-white/40 leading-[1.8] max-w-[520px] mt-4 font-light">
          Two questions. One real recommendation — pulled from the same roles and case studies on this site, not a generic quiz result.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="card p-7 md:p-10 mt-10 min-h-[320px] flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: reduce ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -12 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <StepLabel n={1} text="What industry are you in?" />
                <div className="grid sm:grid-cols-2 gap-2.5 mt-6">
                  {industries.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setIndustryId(ind.id);
                        setStep(2);
                      }}
                      className="text-left rounded-md border border-white/[0.08] hover:border-cyan-border hover:bg-cyan-dim px-4 py-3 transition-colors group"
                    >
                      <span className="font-heading text-[12px] font-bold uppercase tracking-[0.06em] text-white group-hover:text-cyan">
                        {ind.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: reduce ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -12 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <StepLabel n={2} text="What's eating the most of your time right now?" />
                <div className="flex flex-col gap-2 mt-6">
                  {TASK_OPTIONS.map((t) => (
                    <button
                      key={t.employeeId}
                      onClick={() => {
                        setEmployeeId(t.employeeId);
                        setStep(3);
                      }}
                      className="text-left rounded-md border border-white/[0.08] hover:border-cyan-border hover:bg-cyan-dim px-4 py-3 transition-colors group flex items-center justify-between gap-3"
                    >
                      <span className="text-[13px] text-white/70 group-hover:text-white">{t.label}</span>
                      <ArrowUpRight size={14} className="text-white/20 group-hover:text-cyan shrink-0" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="font-heading text-[10px] uppercase tracking-[0.12em] text-white/35 hover:text-white/60 mt-5 inline-flex items-center gap-1.5"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {step === 3 && employee && industry && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-start"
              >
                <div>
                  <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-cyan/70 mb-2">
                    Recommended For {industry.label}
                  </div>
                  <h3 className="font-heading text-[22px] font-bold tracking-tight">{employee.title}</h3>
                  <p className="text-[14px] text-white/55 leading-[1.8] font-light mt-3 max-w-[440px]">
                    {employee.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5 mt-5">
                    {employee.tasks.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-[13px] text-white/60">
                        <Check size={14} className="text-cyan mt-0.5 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[12.5px] text-white/40 leading-[1.7] font-light mt-5 max-w-[440px]">
                    {industry.blurb}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-7">
                    <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Book Free Audit →
                    </a>
                    <button
                      onClick={reset}
                      className="font-heading text-[11px] uppercase tracking-[0.1em] text-white/40 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <RotateCcw size={13} /> Try Again
                    </button>
                  </div>
                </div>

                {proof && (
                  <div className="rounded-lg border border-white/[0.07] bg-bg/50 p-5">
                    <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted mb-3">
                      Proof, Not a Pitch
                    </div>
                    <div className="font-heading text-[15px] font-bold tracking-tight mb-2">{proof.name}</div>
                    <p className="text-[12.5px] text-white/40 leading-[1.7] font-light mb-4">{proof.summary}</p>
                    <Link
                      href={`/work/${proof.id}`}
                      className="font-heading text-[11px] uppercase tracking-[0.1em] text-cyan/80 hover:text-cyan inline-flex items-center gap-1.5"
                    >
                      See The Case Study <ArrowUpRight size={13} />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-cyan/10 border border-cyan-border text-cyan font-heading text-[11px] font-bold shrink-0">
        {n}
      </div>
      <h3 className="font-heading text-[16px] font-bold tracking-tight">{text}</h3>
    </div>
  );
}
