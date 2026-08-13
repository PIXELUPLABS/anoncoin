"use client";

import { useLayoutEffect, useRef, useState } from "react";

const BASE_WIDTH = 1440;

export function ResponsiveScale({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const update = () => {
      setScale(window.innerWidth / BASE_WIDTH);
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
      className="w-full overflow-hidden"
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
