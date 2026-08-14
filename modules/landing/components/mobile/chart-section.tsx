import Image from "next/image";

import { DashedGridLines } from "../dashed-grid-lines";

const STEPS = [
  {
    src: "/media/chart-img-1.png",
    insetClassName: "inset-x-[24%] inset-y-[20%]",
    icon: "/media/radar-line.svg",
    label: "Source Detected",
    description:
      "Every market-moving idea begins somewhere. NFA continuously monitors influential traders, communities, newsletters, and live content across the web, surfacing only the conversations with the potential to impact price action.",
  },
  {
    src: "/media/chart-img-2.png",
    insetClassName: "inset-x-[24%] top-[10%] bottom-[7%]",
    icon: "/media/git-branch-line.svg",
    label: "Context Mapped To Chart",
    description:
      "Signals are valuable only when paired with context. Every post is anchored directly to the chart, allowing you to understand when it appeared, how the market reacted, and whether the thesis is still playing out.",
  },
  {
    src: "/media/chart-img-3.png",
    insetClassName: "inset-x-[16%] top-[14%] bottom-0",
    icon: "/media/checkbox-circle-line.svg",
    label: "Trade Ready",
    description:
      "Once the signal and its context are clear, execution becomes straightforward. Review the insight, validate it against live market data, and place your trade without switching between platforms or losing valuable time.",
  },
];

export function MobileChartSection() {
  return (
    <section className="relative w-full border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] py-10">
      <DashedGridLines fade={false} />
      <div className="relative px-5">
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
            Intelligence where you trade
          </span>
        </div>
        <h2
          className="font-general-sans mt-4 bg-clip-text text-[32px] leading-[110%] font-normal tracking-[-0.02em] text-transparent capitalize"
          style={{
            backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
          }}
        >
          Market Intelligence Delivered Directly To The Chart.
        </h2>
        <p className="mt-4 font-inter text-[15px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
          See the post, understand the move, and act from one view. Every market-moving update
          arrives in real time and stays attached to the price action it influenced
        </p>
        <button
          type="button"
          className="mt-6 flex h-[46px] w-full max-w-[220px] cursor-pointer items-center justify-center gap-3 rounded-none bg-[#1D40C0] px-4 font-dm-mono text-[13px] leading-none font-normal uppercase text-white"
        >
          <span className="h-[7px] w-[7px] shrink-0 -translate-y-px bg-current" />
          Start Trading
        </button>
      </div>
      <div className="mt-10 flex flex-col gap-10">
        {STEPS.map((step) => (
          <div key={step.label} className="flex flex-col">
            <div className="relative h-[280px] w-full">
              <Image
                src="/media/chart-bg-img.png"
                alt=""
                fill
                draggable={false}
                unoptimized
                className="object-cover"
              />
              <div className={`absolute ${step.insetClassName}`}>
                <Image
                  src={step.src}
                  alt=""
                  fill
                  draggable={false}
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col px-5">
              <Image src={step.icon} alt="" width={22} height={22} draggable={false} />
              <p
                className="font-general-sans mt-5 bg-clip-text text-[22px] leading-[110%] font-normal tracking-[-0.02em] text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
                }}
              >
                {step.label}
              </p>
              <p className="mt-3 font-inter text-[14px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
