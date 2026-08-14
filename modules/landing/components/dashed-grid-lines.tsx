"use client";

import { useEffect, useRef, useState } from "react";

const DASHED_LINE_GAP = 109;

const dashedLineBackground = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='8'><line x1='0.5' y1='0' x2='0.5' y2='8' stroke='#D9D9D9' stroke-opacity='0.03' stroke-width='1' stroke-dasharray='4 4'/></svg>`
)}")`;

const FADE_MASK_IMAGE =
  "linear-gradient(to bottom, transparent 0%, transparent 33%, black 40%, black 100%)";

export function DashedGridLines({ fade = true }: { fade?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLineCount = () => {
      const segments = Math.max(1, Math.round(container.offsetWidth / DASHED_LINE_GAP));
      setLineCount(segments + 1);
    };

    updateLineCount();

    const observer = new ResizeObserver(updateLineCount);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-y-0 left-14 right-14 flex justify-between"
      style={
        fade
          ? { WebkitMaskImage: FADE_MASK_IMAGE, maskImage: FADE_MASK_IMAGE }
          : undefined
      }
    >
      {Array.from({ length: lineCount }).map((_, index) => (
        <div
          key={index}
          className="h-full w-px"
          style={{ backgroundImage: dashedLineBackground, backgroundRepeat: "repeat-y" }}
        />
      ))}
    </div>
  );
}
