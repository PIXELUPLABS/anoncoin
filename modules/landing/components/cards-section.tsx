import Image from "next/image";

const CARDS = [
  {
    title: "Stocks",
    description: "Global companies and sector leaders",
    image: "/media/card-0.png",
    hoverImage: "/media/card-5.png",
  },
  {
    title: "Crypto",
    description: "Majors, altcoins, & emerging markets",
    image: "/media/card-2.png",
    hoverImage: "/media/card-6.png",
  },
  {
    title: "Commodities",
    description: "Energy, metals, and real-world markets",
    image: "/media/card-3.png",
    hoverImage: "/media/card-7.png",
  },
  {
    title: "Indices",
    description: "Broad exposure in a single position",
    image: "/media/card-4.png",
    hoverImage: "/media/card-8.png",
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
            className="group relative h-full flex-1 border-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              draggable={false}
              className="object-fill transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={card.hoverImage}
              alt={card.title}
              fill
              draggable={false}
              className="object-fill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
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
