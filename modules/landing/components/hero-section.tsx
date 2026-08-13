import Image from "next/image";

import { DashedGridLines } from "./dashed-grid-lines";
import { HeroActions } from "./hero-actions";
import { HeroLogos } from "./hero-logos";
import { HeroTagline } from "./hero-tagline";
import { Navbar } from "./navbar";

export function HeroSection() {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="relative h-196 w-full border-b border-[#FFFFFF1A] bg-[#0B0B0B]">
        <DashedGridLines />
        <div className="absolute top-36 left-14 flex flex-col items-start">
          <Image
            src="/media/hero-text.png"
            alt="The lightning-fast trading terminal for Hyperliquid"
            width={656}
            height={237}
            priority
            draggable={false}
          />
          <HeroActions />
        </div>
        <div className="absolute top-[594px] left-14 flex flex-col items-start">
          <HeroTagline />
          <HeroLogos />
        </div>
      </div>
    </section>
  );
}
