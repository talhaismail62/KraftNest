import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute audit with KraftNest or send us a message — we reply within one business day.",
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
