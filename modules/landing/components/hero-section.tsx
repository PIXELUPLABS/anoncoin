import { HeroActions } from "./hero-actions";
import { HeroLogos } from "./hero-logos";
import { HeroTagline } from "./hero-tagline";
import { Navbar } from "./navbar";

export function HeroSection() {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="relative h-196 w-full overflow-hidden border-b-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/media/hero-bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-36 left-14 flex flex-col items-start">
          <h1
            className="font-general-sans w-[656px] bg-clip-text text-[72px] leading-[110%] font-normal tracking-[-0.02em] text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
            }}
          >
            The Lightening-fast Trading Terminal for Hyperliquid
          </h1>
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
