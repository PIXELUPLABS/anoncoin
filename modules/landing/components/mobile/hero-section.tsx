"use client";

import { useEffect, useRef } from "react";

import { MobileHeroLogos } from "./hero-logos";

export function MobileHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="flex flex-col">
      <div className="relative w-full overflow-hidden border-b-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-[560px] w-full object-cover object-[75%_50%]"
        >
          <source src="/media/hero-bg-video.mp4" type="video/mp4" />
        </video>
        <div className="relative flex flex-col items-start px-5 pt-[440px] pb-10">
          <h1
            className="font-general-sans bg-clip-text text-[40px] leading-[110%] font-normal tracking-[-0.02em] text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
            }}
          >
            The Lightning-fast Trading Terminal for Hyperliquid
          </h1>
          <div className="mt-6 flex w-full items-center gap-3">
            <button
              type="button"
              className="flex h-[46px] flex-1 cursor-pointer items-center justify-center gap-3 rounded-none bg-[#1D40C0] px-4 font-dm-mono text-[13px] leading-none font-normal uppercase text-white"
            >
              <span className="h-[7px] w-[7px] shrink-0 bg-current" />
              Start Trading
            </button>
            <button
              type="button"
              className="flex h-[46px] flex-1 cursor-pointer items-center justify-center gap-3 rounded-none border-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] px-4 font-dm-mono text-[13px] leading-none font-normal uppercase text-[#888888]"
            >
              <span className="h-[7px] w-[7px] shrink-0 bg-current" />
              Learn More
            </button>
          </div>
          <p className="font-dm-mono mt-10 text-[10px] leading-[100%] tracking-normal font-normal uppercase text-[#888888]">
            Markets never sleep. Neither does your terminal
          </p>
          <MobileHeroLogos />
        </div>
      </div>
    </section>
  );
}
