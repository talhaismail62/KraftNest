import { Hero } from "@/components/sections/Hero";
import { TrustWall } from "@/components/sections/TrustWall";
import { StatBand } from "@/components/sections/StatBand";
import { Ticker } from "@/components/sections/Ticker";
import { EmployeesTeaser } from "@/components/sections/EmployeesTeaser";
import { IndustryTabs } from "@/components/sections/IndustryTabs";
import { EmployeeFinder } from "@/components/sections/EmployeeFinder";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustWall />
      <StatBand />
      <Ticker />
      <EmployeesTeaser />
      <IndustryTabs />
      <EmployeeFinder />
      <RoiCalculator />
      <CtaBanner />
    </>
  );
}
