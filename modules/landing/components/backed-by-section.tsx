import Image from "next/image";

const BACKED_LOGOS = [
  { images: [{ src: "/media/backed-logo-1.png", width: 167, height: 16 }] },
  { images: [{ src: "/media/backed-logo-2.png", width: 117, height: 32 }] },
  { images: [{ src: "/media/backed-logo-3.png", width: 71, height: 23 }] },
  {
    images: [
      { src: "/media/backed-logo-4-1.png", width: 44.11, height: 44.11 },
      { src: "/media/backed-logo-4-2.png", width: 95.32, height: 46.27 },
    ],
  },
  { images: [{ src: "/media/backed-logo-5.png", width: 160.34, height: 38.19 }] },
];

export function BackedBySection() {
  return (
    <section className="relative h-60 w-full border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-14 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-14 w-px bg-[#FFFFFF1A]" />
      <div className="flex h-30 w-full items-center justify-between border-b-[0.5px] border-[#FFFFFF1A] px-14">
        <p className="font-general-sans text-[18px] leading-none font-medium text-[#EDEDEDDE]">
          Backed by
        </p>
        <div className="flex items-center gap-19.5">
          {BACKED_LOGOS.map((logo) => (
            <div
              key={logo.images.map((image) => image.src).join("+")}
              className="flex items-center gap-[6.45px]"
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
          ))}
        </div>
      </div>
      <div className="h-30 w-full" />
    </section>
  );
}
