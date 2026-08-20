import Image from "next/image";

const BACKED_LOGOS = [
  { images: [{ src: "/media/backed-logo-1.png", width: 167, height: 16 }] },
  { images: [{ src: "/media/backed-logo-3.png", width: 71, height: 23 }] },
  {
    images: [
      { src: "/media/backed-logo-4-1.png", width: 44.11, height: 44.11 },
      { src: "/media/backed-logo-4-2.png", width: 95.32, height: 46.27 },
    ],
  },
  { images: [{ src: "/media/backed-logo-5.png", width: 160.34, height: 38.19 }] },
  { images: [{ src: "/media/backed-logo-6.png", width: 91, height: 23 }] },
  { images: [{ src: "/media/backed-logo-7.png", width: 205.5, height: 23 }] },
];

const REPEAT_COUNT = 4;

export function BackedBySection() {
  return (
    <section className="relative h-60 w-full border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-14 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-14 w-px bg-[#FFFFFF1A]" />
      <div className="flex h-30 w-full items-center border-b-[0.5px] border-[#FFFFFF1A] pl-14">
        <p className="font-general-sans shrink-0 text-[18px] leading-none font-medium text-[#EDEDEDDE]">
          Backed by
        </p>
        <div
          className="ml-87 mr-14 flex-1 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="animate-marquee-right flex w-max items-center gap-19.5">
            {Array.from({ length: REPEAT_COUNT * 2 }).map((_, setIndex) =>
              BACKED_LOGOS.map((logo, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex shrink-0 items-center gap-[6.45px]"
                >
                  {logo.images.map((image) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      draggable={false}
                      className="object-contain"
                    />
                  ))}
                </div>
              )),
            )}
          </div>
        </div>
      </div>
      <div className="h-30 w-full" />
    </section>
  );
}
