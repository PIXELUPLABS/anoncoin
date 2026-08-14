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
      {open && (
        <nav className="absolute top-14 right-0 left-0 z-20 flex flex-col gap-1 border-b-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] px-5 py-4">
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
        </nav>
      )}
    </>
  );
}
