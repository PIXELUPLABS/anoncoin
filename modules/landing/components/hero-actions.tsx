const BUTTON_CLASSNAME =
  "flex h-[42px] cursor-pointer items-center justify-center gap-6 px-6 py-3.5 font-dm-mono text-[14px] leading-none font-normal uppercase rounded-none";

export function HeroActions() {
  return (
    <div className="mt-8 flex items-center gap-4">
      <button type="button" className={`${BUTTON_CLASSNAME} w-[197px] bg-[#1D40C0] text-white`}>
        <span className="h-[7px] w-[7px] shrink-0 -translate-y-px bg-current" />
        Start Trading
      </button>
      <button
        type="button"
        className={`${BUTTON_CLASSNAME} w-[181px] border-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B] text-[#888888]`}
      >
        <span className="h-[7px] w-[7px] shrink-0 -translate-y-px bg-current" />
        Learn More
      </button>
    </div>
  );
}
