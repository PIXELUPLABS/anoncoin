import { AnimationSection } from "@/modules/landing/components/animation-section";
import { CardsSection } from "@/modules/landing/components/cards-section";
import { ChartSection } from "@/modules/landing/components/chart-section";
import { FooterSection } from "@/modules/landing/components/footer-section";
import { HeroSection } from "@/modules/landing/components/hero-section";
import { ResponsiveScale } from "@/modules/landing/components/responsive-scale";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <ResponsiveScale>
        <HeroSection />
        <CardsSection />
        <AnimationSection />
        <ChartSection />
        <FooterSection />
      </ResponsiveScale>
    </main>
  );
}
