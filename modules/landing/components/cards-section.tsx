import Image from "next/image";

export function CardsSection() {
  return (
    <section className="relative h-[861px] w-full bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-14 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-14 w-px bg-[#FFFFFF1A]" />
      <div className="h-30 w-full border-b border-[#FFFFFF1A]" />
      <div className="h-38 w-full border-b border-[#FFFFFF1A]">
        <div className="ml-14 flex h-[22px] w-[209px] items-center gap-2 rounded-none bg-white px-2 py-1">
          <Image
            src="/media/globe-icon.svg"
            alt=""
            width={11}
            height={11}
            draggable={false}
            className="h-[14px] w-[14px] shrink-0"
          />
          <span className="translate-y-px font-dm-mono text-[14px] leading-none font-normal uppercase text-[#0B0B0B]">
            Global market access
          </span>
        </div>
        <div className="mt-4 flex w-full items-end justify-between">
          <h2 className="font-general-sans ml-14 text-[52px] leading-[110%] font-normal tracking-[-0.02em] text-white">
            250+ Assets.
            <br />
            One Terminal
          </h2>
          <p className="mr-14 w-[432px] font-inter text-[16px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
            Trade exposure across stocks, crypto, commodities, and <br /> indices
            around the clock, from anywhere in the world <br /> where NFA is
            available
          </p>
        </div>
      </div>
    </section>
  );
}
