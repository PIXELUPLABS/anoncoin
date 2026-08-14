"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function MobileAnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[420px] w-full items-center justify-center overflow-hidden border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] px-6"
    >
      <Image
        src="/media/animation-bg.png"
        alt=""
        fill
        draggable={false}
        className={`object-cover transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <p
        className={`font-general-sans relative bg-clip-text text-center text-[28px] leading-[125%] font-normal tracking-[-0.02em] text-transparent transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: "linear-gradient(to top, #9E9E9E 0%, #FFFFFF 100%)" }}
      >
        Every conversation
        <Image
          src="/media/x-icon.png"
          alt=""
          width={28}
          height={28}
          draggable={false}
          className="relative -top-1 inline-block align-middle mx-1"
        />
        shapes the market. We turn the right ones into your next trade
        <Image
          src="/media/coin-icon.png"
          alt=""
          width={30}
          height={30}
          draggable={false}
          className="inline-block align-middle mx-1 mb-1.5"
        />
      </p>
    </section>
  );
}
