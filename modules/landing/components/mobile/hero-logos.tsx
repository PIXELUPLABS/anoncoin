import Image from "next/image";

const STOCK_LOGOS = [
  { src: "/media/stocks/stock-1.svg", size: 16 },
  { src: "/media/stocks/stock-2.svg", size: 16 },
  { src: "/media/stocks/stock-3.svg", size: 16 },
  { src: "/media/stocks/stock-4.svg", size: 13 },
  { src: "/media/stocks/stock-5.svg", size: 16 },
  { src: "/media/stocks/stock-6.svg", size: 19 },
];

function LogoBadge({ src, size }: { src: string; size: number }) {
  return (
    <div className="mr-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#666666]">
      <Image src={src} alt="" width={size} height={size} draggable={false} />
    </div>
  );
}

const REPEAT_COUNT = 6;

export function MobileHeroLogos() {
  return (
    <div
      className="mt-8 w-full overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, black 0%, black 80%, transparent 100%)",
        maskImage: "linear-gradient(to right, black 0%, black 80%, transparent 100%)",
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
