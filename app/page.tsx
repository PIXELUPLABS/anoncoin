import { AnimationSection } from "@/modules/landing/components/animation-section";
import { CardsSection } from "@/modules/landing/components/cards-section";
import { ChartSection } from "@/modules/landing/components/chart-section";
import { FooterSection } from "@/modules/landing/components/footer-section";
import { HeroSection } from "@/modules/landing/components/hero-section";
import { MobileAnimationSection } from "@/modules/landing/components/mobile/animation-section";
import { MobileCardsSection } from "@/modules/landing/components/mobile/cards-section";
import { MobileChartSection } from "@/modules/landing/components/mobile/chart-section";
import { MobileFooterSection } from "@/modules/landing/components/mobile/footer-section";
import { MobileHeroSection } from "@/modules/landing/components/mobile/hero-section";
import { MobileNavbar } from "@/modules/landing/components/mobile/navbar";
import { Navbar } from "@/modules/landing/components/navbar";
import { ResponsiveScale } from "@/modules/landing/components/responsive-scale";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="md:hidden">
        <MobileNavbar />
        <MobileHeroSection />
        <MobileCardsSection />
        <MobileAnimationSection />
        <MobileChartSection />
        <MobileFooterSection />
      </div>
      <div className="hidden md:block">
        <ResponsiveScale>
          <Navbar />
          <HeroSection />
          <CardsSection />
          <AnimationSection />
          <ChartSection />
          <FooterSection />
        </ResponsiveScale>
      </div>
    </main>
  );
}
