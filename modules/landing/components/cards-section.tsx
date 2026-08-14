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
    // Unlike the other three coin images, this asset's coin isn't centered within its own
    // canvas (it sits off to one side with extra empty space around it), so object-contain
    // centers the canvas but not the coin itself - nudge it back into visual alignment.
    coinOffsetClassName: "-translate-x-[15px] translate-y-[45px]",
    // Its canvas also has a lot more empty padding around the coin than the other three,
    // so object-contain renders it noticeably smaller - scale it up to match their size
    // (hover scale bumped by the same ~10% the others get, to keep the hover grow consistent).
    coinScaleClassName: "scale-[1.5] group-hover:scale-[1.63]",
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

export function CardsSection() {
  return (
    <section className="relative h-[861px] w-full bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-14 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-14 w-px bg-[#FFFFFF1A]" />
      <div className="h-30 w-full border-b-[0.5px] border-[#FFFFFF1A]" />
      <div className="h-38 w-full border-b-[0.5px] border-[#FFFFFF1A]">
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
          <h2
            className="font-general-sans ml-14 bg-clip-text text-[52px] leading-[110%] font-normal tracking-[-0.02em] text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
            }}
          >
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
      <div className="mt-12 mx-14 flex h-[421px] gap-4">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="group relative h-full flex-1 overflow-hidden bg-[#0B0B0B]"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              draggable={false}
              className="scale-100 object-fill opacity-[0.36] saturate-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:saturate-100"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Image
                src={card.coinImage}
                alt=""
                width={160}
                height={160}
                draggable={false}
                className={`h-40 w-40 object-contain saturate-0 transition-all duration-500 ease-out group-hover:saturate-100 ${card.coinScaleClassName ?? "scale-100 group-hover:scale-110"} ${card.coinOffsetClassName ?? ""}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-14 mt-4 flex gap-4">
        {CARDS.map((card) => (
          <div key={card.title} className="flex-1">
            <p className="font-inter text-[20px] leading-none font-normal tracking-[-0.02em] text-white">
              {card.title}
            </p>
            <p className="mt-2 font-inter text-[14px] leading-[120%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
