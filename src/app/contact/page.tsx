import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Book a Free AI Automation Audit — Contact KraftNest",
  description:
    "Talk to KraftNest about automating your business with AI agents, chatbots, or AI voice receptionists. Book a free 30-minute audit call — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        variant="converge"
        eyebrow="Get In Touch"
        title={[
          { text: "Let's" },
          { text: "Build" },
          { text: "Your" },
          { text: "First", break: true },
          { text: "AI" },
          { text: "Employee." },
        ]}
        subtitle="Book a free 30-minute audit, or send us a message and we'll reply within one business day."
      />
      <Contact />
    </>
  );
}
