import { Check } from "lucide-react";
import { processSteps } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { WorkflowFlow } from "@/components/site/WorkflowFlow";

const flow = [
  { icon: "📥", label: "New lead form submitted", tag: "Trigger" },
  { icon: "🤖", label: "AI qualifies & scores lead", tag: "AI Layer" },
  { icon: "📬", label: "Personalised reply sent", tag: "Action" },
  { icon: "📊", label: "CRM auto-updated", tag: "Sync" },
  { icon: "✅", label: "Slack notification fired", tag: "Notify" },
];

export function Process() {
  return (
    <div id="process" className="bg-bg-2/40 border-y border-white/[0.04] py-20 md:py-28">
      <div className="max-w-site mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div className="flex gap-5 py-7 border-b border-white/[0.05] last:border-none">
                  <div className="font-heading text-[11px] text-cyan tracking-[0.15em] w-7 shrink-0 mt-0.5">
                    {step.n}
                  </div>
                  <div>
                    <div className="font-heading text-[14px] font-bold mb-1.5 tracking-tight">
                      {step.title}
                    </div>
                    <div className="text-[13px] text-white/40 leading-[1.7] font-light mb-3">
                      {step.desc}
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {step.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-[12px] text-white/45">
                          <Check size={12} className="text-cyan/70 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="card p-7 lg:sticky lg:top-24">
              <div className="font-heading text-[9px] uppercase tracking-[0.25em] text-muted mb-6">
                Live Automation Example
              </div>
              <WorkflowFlow nodes={flow} />
              <div className="mt-5 pt-4 border-t border-white/[0.05] text-[11px] text-muted tracking-wide">
                Zero human clicks. Runs 24/7.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
