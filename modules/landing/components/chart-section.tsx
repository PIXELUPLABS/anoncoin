import Image from "next/image";

import { DashedGridLines } from "./dashed-grid-lines";

export function ChartSection() {
  return (
    <section className="relative h-425 w-full border-t border-[#FFFFFF1A] bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-6.5 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-6.5 w-px bg-[#FFFFFF1A]" />
      <DashedGridLines fade={false} />
      <div className="absolute top-30 left-14 right-14 flex flex-col items-start">
        <div className="flex h-[22px] w-fit items-center gap-2 rounded-none bg-white px-2 py-1">
          <Image
            src="/media/globe-icon.svg"
            alt=""
            width={11}
            height={11}
            draggable={false}
            className="h-[14px] w-[14px] shrink-0"
          />
          <span className="translate-y-px font-dm-mono text-[14px] leading-none font-normal uppercase text-[#0B0B0B]">
            Intelligence where you trade
          </span>
        </div>
        <div className="mt-6 flex w-full items-start justify-between">
          <h2
            className="font-general-sans bg-clip-text text-[52px] leading-[110%] font-normal tracking-[-0.02em] text-transparent capitalize"
            style={{
              backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
            }}
          >
            Market intelligence delivered <br /> directly to the chart.
          </h2>
          <div className="flex flex-col items-end">
            <p className="w-[432px] font-inter text-[16px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
              See the post, understand the move, and act from one view. <br /> Every
              market-moving update arrives in real time and stays <br /> attached to
              the price action it influenced
            </p>
            <button
              type="button"
              className="mt-6 mr-[235px] flex h-[42px] w-[197px] cursor-pointer items-center justify-center gap-6 rounded-none bg-[#1D40C0] px-6 py-3.5 font-dm-mono text-[14px] leading-none font-normal uppercase text-white"
            >
              <span className="h-[7px] w-[7px] shrink-0 -translate-y-px bg-current" />
              Start Trading
            </button>
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col gap-4">
          {[
            {
              src: "/media/chart-img-1.png",
              inset: { top: 110, bottom: 110, left: 148, right: 148 },
              icon: "/media/radar-line.svg",
              label: "Source detected",
              description:
                "Every market-moving idea begins somewhere. NFA continuously monitors influential traders, communities, newsletters, and live content across the web, surfacing only the conversations with the potential to impact price action.",
            },
            {
              src: "/media/chart-img-2.png",
              inset: { top: 54.8, bottom: 39, left: 148, right: 148 },
              icon: "/media/git-branch-line.svg",
              label: "Context mapped to chart",
              description:
                "Signals are valuable only when paired with context. Every post is anchored directly to the chart, allowing you to understand when it appeared, how the market reacted, and whether the thesis is still playing out.",
            },
            {
              src: "/media/chart-img-3.png",
              inset: { top: 87, bottom: 0, left: 104, right: 104 },
              icon: "/media/checkbox-circle-line.svg",
              label: "Trade ready",
              description:
                "Once the signal and its context are clear, execution becomes straightforward. Review the insight, validate it against live market data, and place your trade without switching between platforms or losing valuable time.",
            },
          ].map((chartImage, index) => (
            <div key={index} className="relative h-100 w-full">
              <div className="absolute inset-y-0 left-0 w-1/2">
                <Image
                  src="/media/chart-bg-img.png"
                  alt=""
                  fill
                  draggable={false}
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute" style={chartImage.inset}>
                  <Image
                    src={chartImage.src}
                    alt=""
                    fill
                    draggable={false}
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <div
                className="absolute flex flex-col"
                style={{ left: "calc(50% + 16px)", right: 0, top: 221 }}
              >
                <Image src={chartImage.icon} alt="" width={24} height={24} draggable={false} />
                <p
                  className="font-general-sans mt-8 bg-clip-text text-[28px] leading-[110%] font-normal tracking-[-0.02em] text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
                  }}
                >
                  {chartImage.label}
                </p>
                <p className="mt-4 w-full font-inter text-[16px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
                  {chartImage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
