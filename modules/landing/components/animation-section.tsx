"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_DISTANCE = 800;
const KEY_DELTAS: Record<string, number> = {
  ArrowDown: 80,
  ArrowUp: -80,
  PageDown: 800,
  PageUp: -800,
  " ": 800,
};

export function AnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const lockTopRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const setProgressClamped = (value: number) => {
      const next = Math.min(1, Math.max(0, value));
      progressRef.current = next;
      setProgress(next);
      return next;
    };

    // Returns true if this scroll delta was (fully or partially) absorbed by the
    // animation and the caller should preventDefault; false if it should scroll normally.
    const applyDelta = (delta: number) => {
      if (delta === 0) return false;
      const rect = section.getBoundingClientRect();
      const top = rect.top;
      const height = rect.height;
      // The section only counts as "arrived" once it's entirely within the viewport
      // (top and bottom edges both on-screen) - not just as soon as its top edge appears.
      const entryTop = Math.max(0, window.innerHeight - height);
      const current = progressRef.current;

      if (delta > 0) {
        // Scrolling down.
        if (current >= 1) {
          lockTopRef.current = null;
          return false; // already fully open, let scrolling continue
        }
        if (top > entryTop) {
          const distance = top - entryTop;
          if (delta < distance) return false; // won't reach full visibility this tick
          // This tick crosses into the pin zone: land exactly at the boundary,
          // then feed the leftover into the animation instead of letting it fall through.
          window.scrollBy(0, distance);
          const next = setProgressClamped(current + (delta - distance) / SCROLL_DISTANCE);
          lockTopRef.current = next < 1 ? entryTop : null;
          return true;
        }
        const next = setProgressClamped(current + delta / SCROLL_DISTANCE);
        lockTopRef.current = next < 1 ? entryTop : null;
        return true;
      }

      // Scrolling up (delta < 0) - mirrors the down direction exactly, anchored on the
      // same "fully visible" position so closing engages at the same point opening did.
      if (current <= 0) {
        lockTopRef.current = null;
        return false; // already fully closed, let scrolling continue
      }
      if (top < entryTop) {
        const distance = entryTop - top;
        if (-delta < distance) return false; // won't reach full visibility this tick
        window.scrollBy(0, -distance);
        const next = setProgressClamped(current + (delta + distance) / SCROLL_DISTANCE);
        lockTopRef.current = next > 0 ? entryTop : null;
        return true;
      }
      const next = setProgressClamped(current + delta / SCROLL_DISTANCE);
      lockTopRef.current = next > 0 ? entryTop : null;
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (applyDelta(event.deltaY)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchYRef.current === null) return;
      const currentY = event.touches[0].clientY;
      const delta = touchYRef.current - currentY;
      touchYRef.current = currentY;
      if (applyDelta(delta)) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const delta = KEY_DELTAS[event.key];
      if (delta === undefined) return;
      const signedDelta = event.key === " " && event.shiftKey ? -delta : delta;
      if (applyDelta(signedDelta)) {
        event.preventDefault();
      }
    };

    // Safety net: if the section drifts away from its required lock position through
    // an input we don't directly handle (scrollbar drag, browser extensions, etc.),
    // snap it back so the animation can never be skipped.
    const handleScrollCorrection = () => {
      const lockTop = lockTopRef.current;
      if (lockTop === null) return;
      const rect = section.getBoundingClientRect();
      const drift = rect.top - lockTop;
      if (Math.abs(drift) > 0.5) {
        window.scrollBy(0, drift);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("scroll", handleScrollCorrection, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollCorrection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex h-200 w-full overflow-hidden border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]"
    >
      <div
        className="flex w-1/2 divide-x-[0.5px] divide-[#FFFFFF1A] border-r-[0.5px] border-[#FFFFFF1A]"
        style={{ transform: `translateX(${-progress * 100}%)` }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-full flex-1" />
        ))}
      </div>
      <div
        className="flex w-1/2 divide-x-[0.5px] divide-[#FFFFFF1A] border-l-[0.5px] border-[#FFFFFF1A]"
        style={{ transform: `translateX(${progress * 100}%)` }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-full flex-1" />
        ))}
      </div>
    </section>
  );
}
