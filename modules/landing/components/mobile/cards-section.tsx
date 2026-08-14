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
  return (
    <section className="relative w-full border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] py-10">
      <div className="px-5">
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
        <h2
          className="font-general-sans mt-4 bg-clip-text text-[36px] leading-[110%] font-normal tracking-[-0.02em] text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
          }}
        >
          250+ Assets.
          <br />
          One Terminal
        </h2>
        <p className="mt-4 font-inter text-[15px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
          Trade exposure across stocks, crypto, commodities, and indices around the clock, from
          anywhere in the world where NFA is available
        </p>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
        {CARDS.map((card) => (
          <div key={card.title} className="w-[270px] shrink-0 snap-start">
            <div className="relative h-[270px] w-full overflow-hidden bg-[#0B0B0B]">
              <Image src={card.image} alt={card.title} fill draggable={false} className="object-fill" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Image
                  src={card.coinImage}
                  alt=""
                  width={160}
                  height={160}
                  draggable={false}
                  className={`h-40 w-40 object-contain ${card.coinScaleClassName ?? ""} ${card.coinOffsetClassName ?? ""}`}
                />
              </div>
            </div>
            <p className="font-inter-display mt-3 text-[18px] leading-none font-normal tracking-[-0.02em] text-white">
              {card.title}
            </p>
            <p className="font-inter-display mt-2 text-[13px] leading-[120%] font-normal tracking-[-0.02em] text-[#FFFFFF99]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
