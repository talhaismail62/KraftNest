import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "AI Automation Projects & Case Studies — KraftNest Portfolio",
  description:
    "Real AI automation systems, chatbots, and AI agents KraftNest has shipped — across events, hospitality, retail, healthcare, e-commerce and professional services.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        variant="dense"
        eyebrow="Our Work"
        title={[
          { text: "Real" },
          { text: "Builds." },
          { text: "Real", break: true },
          { text: "Industries." },
        ]}
        subtitle="A look at the systems and sites we've actually shipped — across events, hospitality, retail, healthcare and e-commerce."
      />
      <Portfolio />
      <CtaBanner
        eyebrow="Like What You See?"
        title={[
          { text: "Your" },
          { text: "Business" },
          { text: "Could" },
          { text: "Be" },
          { text: "Our", break: true, className: "text-cyan" },
          { text: "Next", className: "text-cyan" },
          { text: "Case", className: "text-cyan" },
          { text: "Study.", className: "text-cyan" },
        ]}
        subtitle="Every project on this page started as a free 30-minute audit. Let's find out what we'd build for you."
        primaryLabel="Book Free Audit Call →"
        secondaryLabel="See Services"
        secondaryHref="/services"
        footnote="No commitment. No fluff. Just a clear roadmap for your business."
      />
    </>
  );
}
