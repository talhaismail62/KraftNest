"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Reveal, RevealWords } from "@/components/site/Reveal";

const AUTOMATION_RATE = 0.85; // assumption: AI employees eliminate ~85% of repetitive task time
const STANDARD_WEEKLY_HOURS = 40; // used to pro-rate a monthly salary against time spent on repetitive work

type CurrencyCode = "USD" | "PKR" | "AED" | "GBP";

const CURRENCIES: Record<
  CurrencyCode,
  { label: string; symbol: string; rate: number; hourlyStep: number }
> = {
  USD: { label: "USD", symbol: "$", rate: 1, hourlyStep: 1 },
  PKR: { label: "PKR", symbol: "Rs ", rate: 278, hourlyStep: 50 },
  AED: { label: "AED", symbol: "AED ", rate: 3.67, hourlyStep: 1 },
  GBP: { label: "GBP", symbol: "£", rate: 0.79, hourlyStep: 1 },
};

// Real local monthly-salary bands for this kind of repetitive admin/support role —
// these don't scale linearly with FX rate, so they're set per market rather than converted.
const MONTHLY_RANGES: Record<CurrencyCode, { min: number; max: number; step: number; def: number }> = {
  USD: { min: 800, max: 6000, step: 50, def: 2500 },
  PKR: { min: 40000, max: 300000, step: 5000, def: 80000 },
  AED: { min: 2500, max: 20000, step: 250, def: 6000 },
  GBP: { min: 700, max: 5000, step: 50, def: 2000 },
};

type Tenure = "hourly" | "monthly";

const roundTo = (n: number, step: number) => Math.max(step, Math.round(n / step) * step);

function getRange(currency: CurrencyCode, tenure: Tenure) {
  const cfg = CURRENCIES[currency];
  if (tenure === "hourly") {
    return {
      min: roundTo(8 * cfg.rate, cfg.hourlyStep),
      max: roundTo(60 * cfg.rate, cfg.hourlyStep),
      step: cfg.hourlyStep,
      def: roundTo(20 * cfg.rate, cfg.hourlyStep),
    };
  }
  return MONTHLY_RANGES[currency];
}

export function RoiCalculator() {
  const [hours, setHours] = useState(15);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [tenure, setTenure] = useState<Tenure>("hourly");
  const [comp, setComp] = useState(() => getRange("USD", "hourly").def);

  useEffect(() => {
    setComp(getRange(currency, tenure).def);
  }, [currency, tenure]);

  const cfg = CURRENCIES[currency];
  const range = getRange(currency, tenure);

  const monthlyCost =
    tenure === "hourly" ? hours * comp * 4.33 : comp * (hours / STANDARD_WEEKLY_HOURS);
  const monthlySavings = monthlyCost * AUTOMATION_RATE;
  const annualSavings = monthlySavings * 12;
  const fmt = (n: number) => `${cfg.symbol}${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <section className="section max-w-site mx-auto px-5 md:px-8 py-20 md:py-28">
      <Reveal>
        <div className="eyebrow">See The Math</div>
        <RevealWords
          as="h2"
          className="section-title mt-4"
          words={[
            { text: "What" },
            { text: "Is" },
            { text: "Manual" },
            { text: "Work" },
            { text: "Actually", break: true, className: "text-cyan" },
            { text: "Costing", className: "text-cyan" },
            { text: "You?", className: "text-cyan" },
          ]}
        />
        <p className="text-[15px] text-white/40 leading-[1.8] max-w-[520px] mt-4 font-light">
          A rough, honest estimate — not a sales number. Move the sliders to match your team.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="card p-7 md:p-10 mt-10 grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 rounded-md border border-white/10 p-1">
                {(["hourly", "monthly"] as Tenure[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenure(t)}
                    className={`font-heading text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm transition-colors ${
                      tenure === t ? "bg-cyan text-black" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {t === "hourly" ? "Paid Hourly" : "Paid Monthly"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-white/10 p-1">
                {Object.entries(CURRENCIES).map(([code, c]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code as CurrencyCode)}
                    className={`font-heading text-[10px] uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm transition-colors ${
                      currency === code ? "bg-cyan text-black" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label htmlFor="roi-hours" className="font-heading text-[11px] uppercase tracking-[0.12em] text-white/50">
                  Hours/week on repetitive tasks
                </label>
                <span className="font-heading text-[15px] font-bold text-cyan">{hours}h</span>
              </div>
              <input
                id="roi-hours"
                type="range"
                min={1}
                max={60}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-cyan"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label htmlFor="roi-comp" className="font-heading text-[11px] uppercase tracking-[0.12em] text-white/50">
                  {tenure === "hourly" ? "Avg. cost per hour of that time" : "Avg. monthly salary for that role"}
                </label>
                <span className="font-heading text-[15px] font-bold text-cyan">{fmt(comp)}</span>
              </div>
              <input
                id="roi-comp"
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={comp}
                onChange={(e) => setComp(Number(e.target.value))}
                className="w-full accent-cyan"
              />
            </div>
            <p className="text-[11px] text-subtle leading-relaxed">
              Assumes an AI employee eliminates ~{Math.round(AUTOMATION_RATE * 100)}% of that time —
              based on typical KraftNest engagements. Your exact number depends on the workflow.
              {tenure === "monthly" &&
                " Monthly mode pro-rates the salary by the share of a 40h work week spent on repetitive tasks."}
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-cyan-border bg-cyan-dim p-6">
            <div>
              <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-cyan/70 mb-2">
                Estimated Savings
              </div>
              <div className="font-heading text-[34px] md:text-[40px] font-bold text-white tracking-tight">
                {fmt(monthlySavings)}
                <span className="text-[16px] text-white/40">/mo</span>
              </div>
              <div className="text-[12.5px] text-white/40 mt-1">≈ {fmt(annualSavings)} per year</div>
            </div>
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7 w-full"
            >
              Get My Exact Number →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
