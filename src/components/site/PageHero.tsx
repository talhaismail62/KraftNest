import type { ReactNode } from "react";
import { HeroBackground, type HeroVariant } from "./HeroBackground";
import { RevealWords } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant,
}: {
  eyebrow: string;
  title: { text: string; className?: string; break?: boolean }[];
  subtitle?: ReactNode;
  variant?: HeroVariant;
}) {
  return (
    <section className="relative px-5 pt-28 pb-10 md:pt-32 md:pb-14 overflow-hidden">
      <HeroBackground variant={variant} />
      <div className="relative z-10 max-w-site mx-auto">
        <div className="eyebrow">{eyebrow}</div>
        <RevealWords as="h1" className="section-title mt-4" words={title} />
        {subtitle && (
          <p className="text-[15px] text-white/40 leading-[1.8] max-w-[520px] mt-4 font-light">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
