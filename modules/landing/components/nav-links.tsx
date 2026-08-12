const NAV_LINKS = [
  { label: "Docs", href: "#", padding: "px-2" },
  { label: "Discord", href: "#", padding: "px-2" },
  { label: "Legal", href: "#", padding: "px-2" },
  { label: "Log in", href: "#", padding: "px-4" },
];

export function NavLinks() {
  return (
    <nav className="flex items-center gap-4">
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`${link.padding} font-dm-mono text-[14px] font-normal uppercase tracking-[0.01em] text-[#FFFFFF99] transition-colors hover:text-white`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
