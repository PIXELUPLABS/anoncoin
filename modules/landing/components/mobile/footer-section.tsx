import Image from "next/image";

export function MobileFooterSection() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0B0B0B] px-5 py-14">
      <Image
        src="/media/footer-bg.png"
        alt=""
        width={850}
        height={580}
        draggable={false}
        className="pointer-events-none absolute -top-10 left-0 h-auto w-full opacity-70"
      />
      <div className="relative flex flex-col">
        <Image src="/media/nfa-logo.svg" alt="NFA" width={80} height={38} draggable={false} />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10">
          {[
            { label: "Product", items: ["Market", "Signals", "Terminal"] },
            { label: "Community", items: ["X", "Discord", "Docs"] },
            { label: "Legal", items: ["Disclaimer", "Terms", "Privacy"] },
          ].map((column) => (
            <div key={column.label} className="flex flex-col items-start">
              <span className="font-dm-mono text-[13px] leading-none font-normal tracking-[0.1em] text-white uppercase">
                {column.label}
              </span>
              <div className="mt-5 flex flex-col items-start gap-3">
                {column.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="font-dm-mono text-[15px] leading-none font-normal tracking-[-0.02em] text-[#FFFFFF99] transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-6">
          <p className="font-inter-display text-[14px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF4D] text-balance">
            NFA provides software and market information only. Nothing on this website
            constitutes investment, financial, legal, or tax advice. Trading derivatives and
            digital assets involves substantial risk and may result in the loss of capital. Past
            performance and hypothetical trade outcomes are not indicative of future results.
          </p>
          <p className="font-inter-display text-[14px] leading-[140%] font-normal tracking-[-0.02em] text-[#FFFFFF4D] text-balance">
            NFA does not custody funds or guarantee the accuracy, completeness, or timeliness of
            third-party content. Trades route to third-party venues, including Hyperliquid, and
            remain subject to their terms, fees, availability, and risks. Access may be restricted
            in certain jurisdictions. Do your own research.
          </p>
        </div>
        <div className="mt-14 flex items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-dm-mono text-[14px] leading-none font-normal tracking-[0.01em] text-[#FFFFFF4D] uppercase whitespace-nowrap">
              Powered By
            </span>
            <Image
              src="/media/hyperliquid-logo.svg"
              alt="Hyperliquid"
              width={103}
              height={16}
              draggable={false}
              className="h-4 w-auto shrink-0 opacity-60"
            />
          </div>
          <span className="font-dm-mono text-[14px] leading-none font-normal tracking-[0.01em] text-[#FFFFFF4D] uppercase whitespace-nowrap">
            &copy; 2026 NFA. Trade
          </span>
        </div>
      </div>
    </footer>
  );
}
