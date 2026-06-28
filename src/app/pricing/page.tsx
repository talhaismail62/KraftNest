import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for KraftNest AI employees — Starter, Growth and Enterprise plans, no surprises.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        variant="grid"
        eyebrow="Pricing"
        title={[
          { text: "Simple," },
          { text: "Transparent" },
          { text: "Pricing." },
          { text: "No", break: true },
          { text: "Surprises." },
        ]}
        subtitle="Every plan starts with a free discovery call. We only move forward if we can show you real ROI."
      />
      <Pricing />
      <Faq />
      <CtaBanner
        eyebrow="Still Deciding?"
        title={[
          { text: "Every" },
          { text: "Plan" },
          { text: "Starts" },
          { text: "With" },
          { text: "a", break: true, className: "text-cyan" },
          { text: "Free", className: "text-cyan" },
          { text: "Audit", className: "text-cyan" },
          { text: "Call.", className: "text-cyan" },
        ]}
        subtitle="No commitment until you see the numbers. We'll tell you honestly which plan fits — or if you don't need us at all."
        primaryLabel="Book Free Audit Call →"
        secondaryLabel="Talk to Us"
        secondaryHref="/contact"
        footnote="30 minutes. No sales pitch — just a clear roadmap."
      />
    </>
  );
}
