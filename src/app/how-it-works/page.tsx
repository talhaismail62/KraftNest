import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "How KraftNest Builds AI Automation — From Brief to Live in Days",
  description:
    "See exactly how KraftNest scopes, builds and deploys AI agents, chatbots, and workflow automation for your business — from free audit call to a live AI employee in 1–2 weeks.",
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
