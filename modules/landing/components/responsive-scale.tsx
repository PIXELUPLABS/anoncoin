"use client";

import { useLayoutEffect, useState } from "react";

const BASE_WIDTH = 1440;
// Beyond this viewport width the site stops growing further - it holds at 1920px,
// centered, with a border on each side marking where the page ends.
const MAX_WIDTH = 1920;

export function ResponsiveScale({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth, MAX_WIDTH) / BASE_WIDTH);
      setReady(true);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="mx-auto w-full max-w-[1920px] border-x-[0.5px] border-[#FFFFFF1A]"
      style={{ visibility: ready ? "visible" : "hidden" }}
    >
      <div style={{ width: BASE_WIDTH, zoom: scale }}>{children}</div>
    </div>
  );
}
