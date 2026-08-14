"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Docs", href: "#" },
  { label: "Discord", href: "#" },
  { label: "Legal", href: "#" },
  { label: "Log in", href: "#" },
];

export function MobileNavLinks() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative z-30 flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
        />
        <span className={`h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
        />
      </button>
      <nav
        className={`absolute top-14 right-0 left-0 z-20 overflow-hidden border-b-[0.5px] bg-[#0B0B0B] px-5 transition-all duration-300 ease-in-out ${
          open
            ? "max-h-96 border-[#FFFFFF1A] py-4 opacity-100"
            : "pointer-events-none max-h-0 border-transparent py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-dm-mono py-3 text-[14px] font-normal uppercase tracking-[0.01em] text-[#FFFFFF99] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
