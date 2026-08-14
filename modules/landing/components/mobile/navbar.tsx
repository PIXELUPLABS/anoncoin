import Image from "next/image";

import { MobileNavLinks } from "./nav-links";

export function MobileNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] px-5">
      <Image src="/media/nfa-logo.svg" alt="NFA" width={36} height={22} draggable={false} />
      <MobileNavLinks />
    </header>
  );
}
