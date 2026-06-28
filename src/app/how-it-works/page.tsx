import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From idea to a live AI employee in days, not months — see exactly how KraftNest scopes, builds and ships your automation.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        variant="flow"
        eyebrow="How It Works"
        title={[
          { text: "From" },
          { text: "Idea" },
          { text: "to" },
          { text: "Live" },
          { text: "AI" },
          { text: "Employee" },
          { text: "in", break: true },
          { text: "Days," },
          { text: "Not" },
          { text: "Months." },
        ]}
      />
      <Process />
      <CtaBanner
        eyebrow="Ready to Start?"
        title={[
          { text: "Let's" },
          { text: "Scope" },
          { text: "Your" },
          { text: "First", break: true, className: "text-cyan" },
          { text: "AI", className: "text-cyan" },
          { text: "Employee.", className: "text-cyan" },
        ]}
        subtitle="Book a free 30-minute audit and we'll map out exactly how this process applies to your business."
        primaryLabel="Book Free Audit Call →"
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
        footnote="No commitment. No fluff. Just a clear roadmap for your business."
      />
    </>
  );
}
