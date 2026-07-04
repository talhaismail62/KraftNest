import type { Metadata } from "next";
import { Employees } from "@/components/sections/Employees";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "AI Employees, Automation Agents & Chatbots for Small Business",
  description:
    "KraftNest builds AI employees that work 24/7 — AI voice receptionists that answer calls, AI sales agents that qualify leads, AI support chatbots, and workflow automation systems. No technical knowledge needed.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        variant="hub"
        eyebrow="Meet Your AI Workforce"
        title={[
          { text: "Six" },
          { text: "Roles." },
          { text: "Zero", className: "text-white/30" },
          { text: "Sick", className: "text-white/30" },
          { text: "Days.", className: "text-white/30" },
        ]}
        subtitle="Each one is a specialist, not a generic chatbot — trained on a single job, wired into your tools, and working the moment it launches."
      />
      <Employees />
      <CtaBanner
        eyebrow="Not Sure Where to Start?"
        title={[
          { text: "Most" },
          { text: "Clients" },
          { text: "Start" },
          { text: "With" },
          { text: "One", break: true, className: "text-cyan" },
          { text: "AI", className: "text-cyan" },
          { text: "Employee.", className: "text-cyan" },
        ]}
        subtitle="Tell us which role is eating the most time on your team, and we'll map out exactly how that AI employee would work for your business — free."
        primaryLabel="Get My Free Audit →"
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
        footnote="Most single roles go live in 1–2 weeks."
      />
    </>
  );
}
