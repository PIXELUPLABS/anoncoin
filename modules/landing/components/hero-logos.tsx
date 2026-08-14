import Image from "next/image";

const STOCK_LOGOS = [
  { src: "/media/stocks/stock-1.svg", size: 18 },
  { src: "/media/stocks/stock-2.svg", size: 18 },
  { src: "/media/stocks/stock-3.svg", size: 18 },
  { src: "/media/stocks/stock-4.svg", size: 14 },
  { src: "/media/stocks/stock-5.svg", size: 18 },
  { src: "/media/stocks/stock-6.svg", size: 22 },
];

function LogoBadge({ src, size }: { src: string; size: number }) {
  return (
    <div className="mr-18.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#666666]">
      <Image src={src} alt="" width={size} height={size} draggable={false} />
    </div>
  );
}

const REPEAT_COUNT = 4;

export function HeroLogos() {
  return (
    <div
      // Sized against the fixed 1440px design width (matching ResponsiveScale's BASE_WIDTH),
      // not the real viewport - the whole page is laid out at that fixed width and scaled
      // via CSS transform, and `vw` ignores that transform, so it drifted from the design
      // above 1920px once growth was capped there and the two stopped scaling in lockstep.
      className="mt-12 w-[796.8px] overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
        maskImage: "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
      }}
    >
      <div className="animate-marquee-right flex w-max items-center">
        {Array.from({ length: REPEAT_COUNT * 2 }).map((_, setIndex) =>
          STOCK_LOGOS.map((logo, index) => (
            <LogoBadge key={`${setIndex}-${index}`} src={logo.src} size={logo.size} />
          )),
        )}
      </div>
    </div>
  );
}
