"use client";

import { useState } from "react";
import Image from "next/image";

const CARDS = [
  {
    title: "Stocks",
    description: "Global companies and sector leaders",
    image: "/media/card-bg-1.png",
    coinImage: "/media/coin-img-1.png",
  },
  {
    title: "Crypto",
    description: "Majors, altcoins, & emerging markets",
    image: "/media/card-bg-2.png",
    coinImage: "/media/coin-img-2.png",
    coinOffsetClassName: "-translate-x-[15px] translate-y-[45px]",
    coinScaleClassName: "scale-[1.5]",
    coinActiveScaleClassName: "scale-[1.63]",
  },
  {
    title: "Commodities",
    description: "Energy, metals, and real-world markets",
    image: "/media/card-bg-3.png",
    coinImage: "/media/coin-img-3.png",
  },
  {
    title: "Indices",
    description: "Broad exposure in a single position",
    image: "/media/card-bg-4.png",
    coinImage: "/media/coin-img-4.png",
  },
];

export function MobileCardsSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="relative w-full border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] px-4 pb-10">
      <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-4 w-px bg-[#FFFFFF1A]" />
      <div className="-mx-4 h-10 w-auto border-b-[0.5px] border-[#FFFFFF1A]" />
      <div>
        <div className="flex h-[22px] w-fit items-center gap-2 rounded-none bg-white px-2 py-1">
          <Image
            src="/media/globe-icon.svg"
            alt=""
            width={11}
            height={11}
            draggable={false}
            className="h-[14px] w-[14px] shrink-0"
          />
          <span className="translate-y-px font-dm-mono text-[12px] leading-none font-normal uppercase text-[#0B0B0B]">
            Global market access
          </span>
        </div>
        <h2 className="font-general-sans mt-4 text-[36px] leading-[110%] font-normal tracking-[-0.02em]">
          <span
            className="block w-fit bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #9BA0A7 0%, #D8DEE6 100%)",
            }}
          >
            250+ Assets.
          </span>
          <span
            className="block w-fit bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #9BA0A7 0%, #D8DEE6 100%)",
            }}
          >
            One Terminal
          </span>
        </h2>
        <p className="mt-4 font-inter text-[16px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
          Trade exposure across stocks, crypto, commodities, and indices around the clock, from
          anywhere in the world where NFA is available
        </p>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {CARDS.map((card) => {
          const isActive = activeCard === card.title;

          return (
            <div key={card.title} className="w-[270px] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActiveCard((prev) => (prev === card.title ? null : card.title))}
                className="relative block h-[270px] w-full overflow-hidden bg-[#0B0B0B]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  draggable={false}
                  className={`object-fill transition-all duration-500 ease-out ${
                    isActive ? "scale-110 opacity-100 saturate-100" : "scale-100 opacity-[0.36] saturate-0"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <Image
                    src={card.coinImage}
                    alt=""
                    width={160}
                    height={160}
                    draggable={false}
                    className={`h-40 w-40 object-contain transition-all duration-500 ease-out ${
                      isActive ? "saturate-100" : "saturate-0"
                    } ${
                      isActive
                        ? (card.coinActiveScaleClassName ?? "scale-110")
                        : (card.coinScaleClassName ?? "scale-100")
                    } ${card.coinOffsetClassName ?? ""}`}
                  />
                </div>
              </button>
              <p className="font-inter-display mt-3 text-[18px] leading-none font-normal tracking-[-0.02em] text-white">
                {card.title}
              </p>
              <p className="font-inter-display mt-2 text-[13px] leading-[120%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
