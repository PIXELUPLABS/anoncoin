import Image from "next/image";

import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] px-14 py-3">
      <Image src="/media/nfa-logo.svg" alt="NFA" width={40} height={24} draggable={false} />
      <NavLinks />
    </header>
  );
}
