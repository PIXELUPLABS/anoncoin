import { AnimationSection } from "@/modules/landing/components/animation-section";
import { CardsSection } from "@/modules/landing/components/cards-section";
import { ChartSection } from "@/modules/landing/components/chart-section";
import { HeroSection } from "@/modules/landing/components/hero-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <CardsSection />
      <AnimationSection />
      <ChartSection />
    </main>
  );
}
