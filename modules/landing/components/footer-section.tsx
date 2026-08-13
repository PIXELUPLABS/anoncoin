import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="relative h-150 w-full border-t border-[#FFFFFF1A] bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-6.5 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-6.5 w-px bg-[#FFFFFF1A]" />
      <div className="absolute top-14 right-14 left-14 flex flex-col">
        <div className="flex">
          <div className="w-1/2">
            <Image src="/media/nfa-logo.svg" alt="NFA" width={96} height={45} draggable={false} />
          </div>
          <div className="grid w-1/2 grid-cols-3">
            {[
              { label: "Product", items: ["Market", "Signals", "Terminal"] },
              { label: "Community", items: ["X", "Discord", "Docs"] },
              { label: "Legal", items: ["Disclaimer", "Terms", "Privacy"] },
            ].map((column) => (
              <div key={column.label} className="flex flex-col items-start">
                <span className="font-dm-mono text-[14px] leading-none font-normal tracking-[0.1em] text-white uppercase">
                  {column.label}
                </span>
                <div className="mt-6 flex flex-col items-start gap-3">
                  {column.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="font-dm-mono text-[16px] leading-none font-normal tracking-[-0.02em] text-[#FFFFFF99] transition-colors hover:text-white"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-25 flex">
          <div className="w-1/2" />
          <div className="w-1/2">
            <p className="font-inter text-[14px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF4D]">
              NFA provides software and market information only. Nothing on this website
              constitutes investment, financial, legal, or tax advice. Trading derivatives and
              digital assets involves substantial risk and may result in the loss of capital. Past
              performance and hypothetical trade outcomes are not indicative of future results.
            </p>
            <p className="mt-6 font-inter text-[14px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF4D]">
              NFA does not custody funds or guarantee the accuracy, completeness, or timeliness
              of third-party content. Trades route to third-party venues, including Hyperliquid,
              and remain subject to their terms, fees, availability, and risks. Access may be
              restricted in certain jurisdictions. Do your own research.
            </p>
          </div>
        </div>
        <div className="mt-25 flex">
          <div className="w-1/2" />
          <div className="flex w-1/2 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-dm-mono text-[14px] leading-none font-normal tracking-[0.01em] text-[#FFFFFF99] uppercase">
                Powered By
              </span>
              <Image
                src="/media/hyperliquid-logo.svg"
                alt="Hyperliquid"
                width={103}
                height={16}
                draggable={false}
                className="h-4 w-auto opacity-60"
              />
            </div>
            <span className="font-dm-mono text-[14px] leading-none font-normal tracking-[0.01em] text-[#FFFFFF99] uppercase">
              &copy; 2026 NFA. Trade
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
