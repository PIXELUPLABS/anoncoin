import Link from "next/link";

import { DashedGridLines } from "@/modules/landing/components/dashed-grid-lines";
import { MobileNavbar } from "@/modules/landing/components/mobile/navbar";
import { Navbar } from "@/modules/landing/components/navbar";

export default function NotFound() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-[1920px] flex-col overflow-hidden border-x-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]">
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <DashedGridLines />
        <h1
          className="font-general-sans -mt-42 bg-clip-text text-[240px] leading-[110%] font-medium tracking-[-0.02em] text-transparent md:-mt-34 md:text-[478px]"
          style={{
            backgroundImage: "linear-gradient(90deg, #AFB4BB 0%, #F2F7FF 60%, #FFFFFF 100%)",
          }}
        >
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 flex w-[85%] max-w-87 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[14px] border border-white/10 bg-white/5 px-6 pt-8 pb-8 backdrop-blur-xl md:h-62.5 md:w-123.5 md:max-w-none md:px-0 md:pt-11 md:pb-0">
          <p className="font-general-sans text-center text-[24px] leading-[110%] font-normal tracking-[0%] text-white md:text-[34.51px] md:leading-[37.17px]">
            Oops, page not found
          </p>
          <p className="font-general-sans mt-4 text-center text-[16px] leading-[140%] font-normal tracking-[0%] text-white">
            We couldn&apos;t find the page you
            <br />
             were looking for.
          </p>
          <div className="mt-4 flex justify-center">
            <Link
              href="/"
              className="flex h-[46px] w-fit cursor-pointer items-center justify-center gap-3 rounded-none bg-[#1D40C0] px-4 font-dm-mono text-[13px] leading-none font-normal uppercase text-white md:h-[42px] md:gap-6 md:px-6 md:py-3.5 md:text-[14px]"
            >
              <span className="h-[7px] w-[7px] shrink-0 -translate-y-px bg-current" />
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
