import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Reveal, RevealWords } from "@/components/site/Reveal";

type CtaBannerProps = {
  eyebrow?: string;
  title?: { text: string; className?: string; break?: boolean }[];
  subtitle?: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  footnote?: string;
};

export function CtaBanner({
  eyebrow = "Ready to Scale?",
  title = [
    { text: "Scale" },
    { text: "Without" },
    { text: "Hiring." },
    { text: "2x", break: true, className: "text-cyan" },
    { text: "the", className: "text-cyan" },
    { text: "Output", className: "text-cyan" },
    { text: "at" },
    { text: "Half" },
    { text: "the" },
    { text: "Cost." },
  ],
  subtitle = "One AI employee outworks a full-time hire — no salary, no benefits, no turnover. Book a free audit and see the math for your business.",
  primaryLabel = "Book Free Audit Call →",
  secondaryLabel = "View Pricing",
  secondaryHref = "/pricing",
  footnote = "No commitment. No fluff. Just a clear roadmap for your business.",
}: CtaBannerProps) {
  return (
    <section className="relative px-5 py-20 md:py-28 text-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)",
        }}
      />
      <Reveal className="relative z-10 max-w-xl mx-auto">
        <div className="eyebrow justify-center mb-5">{eyebrow}</div>
        <RevealWords
          as="h2"
          className="font-heading font-bold tracking-[-0.02em] leading-[1.05] mb-5"
          style={{ fontSize: "clamp(28px, 4.6vw, 50px)" }}
          words={title}
        />
        <p className="text-[14px] text-white/40 leading-[1.8] mb-9 font-light max-w-md mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
          <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {primaryLabel}
          </a>
          <a href={secondaryHref} className="btn btn-ghost">
            {secondaryLabel}
          </a>
        </div>
        <p className="text-[11px] text-subtle mt-6 tracking-wide">{footnote}</p>
      </Reveal>
    </section>
  );
}
