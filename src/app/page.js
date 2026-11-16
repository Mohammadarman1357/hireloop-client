import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import PricingCtaSection from "@/components/PricingCtaSection";
import StatsSection from "@/components/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <HeroSection></HeroSection>
      <StatsSection></StatsSection>
      <FeaturedJobsSection></FeaturedJobsSection>
      <FeaturesSection></FeaturesSection>
      <PricingCtaSection></PricingCtaSection>

    </div>
  );
}
