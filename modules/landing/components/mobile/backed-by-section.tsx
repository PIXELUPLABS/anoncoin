import Image from "next/image";

const BACKED_LOGOS = [
  { images: [{ src: "/media/backed-logo-1.png", width: 153.64, height: 14.72 }] },
  { images: [{ src: "/media/backed-logo-2.png", width: 107.64, height: 29.44 }] },
  { images: [{ src: "/media/backed-logo-3.png", width: 65.32, height: 21.16 }] },
  {
    images: [
      { src: "/media/backed-logo-4-1.png", width: 40.58, height: 40.58 },
      { src: "/media/backed-logo-4-2.png", width: 87.69, height: 42.57 },
    ],
  },
  { images: [{ src: "/media/backed-logo-5.png", width: 147.51, height: 35.13 }] },
];

const REPEAT_COUNT = 4;

export function MobileBackedBySection() {
  return (
    <section className="relative h-48.25 w-full bg-[#0B0B0B] pt-10">
      <p className="text-center font-general-sans text-[24px] leading-none font-medium text-[#EDEDEDDE]">
        Trusted by
      </p>
      <div
        className="mt-10.25 w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="animate-marquee-right flex w-max items-center gap-19.5">
          {Array.from({ length: REPEAT_COUNT * 2 }).map((_, setIndex) =>
            BACKED_LOGOS.map((logo, index) => (
              <div
                key={`${setIndex}-${index}`}
                className="flex shrink-0 items-center gap-[5.93px]"
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
    </section>
  );
}
