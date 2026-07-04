import Link from "next/link";
import { site } from "@/lib/site";
import { LiveDemoCard } from "@/components/site/LiveDemoCard";
import { HeroBackground } from "@/components/site/HeroBackground";
import { RevealWords } from "@/components/site/Reveal";

export function Hero() {
  return (
    <section className="relative px-5 pt-24 pb-14 md:pt-28 md:pb-16 overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 max-w-site mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-start">
        <div className="text-center lg:text-left">
          <div className="mx-auto lg:mx-0 mb-6 px-4 py-1.5 rounded-md border-l-2 border-cyan bg-cyan-dim text-[10px] w-fit flex items-center gap-2.5 font-heading font-semibold uppercase tracking-[0.25em] text-cyan">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan animate-blink" />
            </span>
            AI Automation Studio
          </div>

          <RevealWords
            as="h1"
            className="font-heading font-bold tracking-[-0.025em] leading-[1.04] max-w-lg mx-auto lg:mx-0"
            style={{ fontSize: "clamp(36px, 4.6vw, 58px)" }}
            words={[
              { text: "We" },
              { text: "Build" },
              { text: "AI", className: "text-cyan" },
              { text: "Employees,", className: "text-cyan" },
              { text: "Agents", className: "text-cyan" },
              { text: "&" },
              { text: "Automations.", className: "text-cyan" },
            ]}
          />

          <p className="text-[15px] md:text-base text-white/45 leading-[1.75] max-w-[480px] mx-auto lg:mx-0 mt-5 mb-8 font-light">
            Voice agents, chatbots and workflow systems that handle the calls,
            leads, support and data entry eating your team&apos;s day — so your
            business runs with less headcount and more output.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0">
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get Your Free Audit →
            </a>
            <Link href="/work" className="btn btn-ghost">
              See Our Work
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end lg:pt-2">
          <LiveDemoCard />
        </div>
      </div>
    </section>
  );
}
