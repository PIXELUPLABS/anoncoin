import { DashedGridLines } from "./dashed-grid-lines";

export function ChartSection() {
  return (
    <section className="relative h-425 w-full border-t border-[#FFFFFF1A] bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-y-0 left-6.5 w-px bg-[#FFFFFF1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-6.5 w-px bg-[#FFFFFF1A]" />
      <DashedGridLines fade={false} />
    </section>
  );
}
