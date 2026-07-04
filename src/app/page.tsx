import { Hero } from "@/components/sections/Hero";
import { TrustWall } from "@/components/sections/TrustWall";
import { StatBand } from "@/components/sections/StatBand";
import { Ticker } from "@/components/sections/Ticker";
import { EmployeesTeaser } from "@/components/sections/EmployeesTeaser";
import { IndustryTabs } from "@/components/sections/IndustryTabs";
import { EmployeeFinder } from "@/components/sections/EmployeeFinder";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { faqs } from "@/lib/data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrustWall />
      <StatBand />
      <Ticker />
      <EmployeesTeaser />
      <IndustryTabs />
      <EmployeeFinder />
      <RoiCalculator />
      <Faq />
      <CtaBanner />
    </>
  );
}
