import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { RevealItem, RevealStagger } from "@/components/site/Reveal";
import { site } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {pricingPlans.map((plan) => (
          <RevealItem key={plan.label}>
            <div
              className={`rounded-xl border p-7 h-full flex flex-col ${
                plan.featured
                  ? "bg-bg-3/80 border-cyan-border/60"
                  : "bg-bg-2/60 border-white/[0.07]"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted">
                  {plan.label}
                </div>
                {plan.featured && (
                  <div className="font-heading text-[9px] uppercase tracking-[0.15em] text-cyan/80">
                    — Recommended
                  </div>
                )}
              </div>
              <div className="font-heading text-[36px] font-bold tracking-tight mb-1">
                {plan.price}
                {plan.unit && (
                  <span className="text-[14px] text-muted font-normal tracking-normal ml-1">
                    {plan.unit}
                  </span>
                )}
              </div>
              <div className="text-[12px] text-muted mb-6 font-light">{plan.desc}</div>
              <hr className="border-white/[0.06] mb-6" />
              <div className="flex flex-col gap-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-[12.5px] text-white/65 font-light">
                    <Check size={13} className="text-cyan/70 mt-0.5 shrink-0" strokeWidth={2} />
                    {f}
                  </div>
                ))}
              </div>
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn mt-auto w-full ${plan.featured ? "btn-primary" : "btn-outline"}`}
              >
                {plan.cta}
              </a>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
