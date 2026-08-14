"use client";

import { useLayoutEffect, useRef, useState } from "react";

const BASE_WIDTH = 1440;
// Beyond this viewport width the site stops growing further - it holds at 1920px,
// centered, with a border on each side marking where the page ends.
const MAX_WIDTH = 1920;

export function ResponsiveScale({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const update = () => {
      setScale(Math.min(window.innerWidth, MAX_WIDTH) / BASE_WIDTH);
      setContentHeight(content.offsetHeight);
      setReady(true);
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(content);
    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="mx-auto w-full max-w-[1920px] overflow-hidden border-x-[0.5px] border-[#FFFFFF1A]"
      style={{ height: contentHeight * scale || undefined, visibility: ready ? "visible" : "hidden" }}
    >
      <div
        ref={contentRef}
        style={{ width: BASE_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
