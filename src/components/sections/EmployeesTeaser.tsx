import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { employees } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { WorkflowFlow } from "@/components/site/WorkflowFlow";

export function EmployeesTeaser() {
  return (
    <section className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Meet Your AI Workforce</div>
            <RevealWords
              as="h2"
              className="section-title mt-4"
              words={[
                { text: "Six" },
                { text: "Roles." },
                { text: "Zero", className: "text-white/30" },
                { text: "Sick", className: "text-white/30" },
                { text: "Days.", className: "text-white/30" },
              ]}
            />
          </div>
          <Link
            href="/services"
            className="font-heading text-[12px] uppercase tracking-[0.12em] text-cyan/80 hover:text-cyan flex items-center gap-1.5 shrink-0"
          >
            All Services <ArrowUpRight size={14} />
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 md:mt-20 flex flex-col gap-20 md:gap-28">
        {employees.map((emp, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={emp.id} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <div className="font-heading text-[11px] text-cyan/50 tracking-[0.15em] mb-3">
                  {emp.role} — AI EMPLOYEE
                </div>
                <h3 className="font-heading text-[24px] md:text-[30px] font-bold tracking-tight mb-4">
                  {emp.title}
                </h3>
                <p className="text-[14.5px] text-white/45 leading-[1.8] font-light mb-6 max-w-[440px]">
                  {emp.desc}
                </p>
                <ul className="flex flex-col gap-2.5 mb-7">
                  {emp.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[13px] text-white/60">
                      <Check size={14} className="text-cyan mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="font-heading text-[12px] uppercase tracking-[0.1em] text-cyan/80 hover:text-cyan inline-flex items-center gap-1.5"
                >
                  Explore This Role <ArrowUpRight size={13} />
                </Link>
              </Reveal>

              <Reveal delay={0.08} className={reversed ? "lg:order-1" : ""}>
                <div className="card p-6">
                  <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted mb-4">
                    Live Workflow
                  </div>
                  <WorkflowFlow nodes={emp.flow} />
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
