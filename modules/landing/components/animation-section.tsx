"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SCROLL_DISTANCE = 800;
const MAX_PROGRESS = 2; // phase 1 (0-1): columns open. phase 2 (1-2): cards fly in.
const KEY_DELTAS: Record<string, number> = {
  ArrowDown: 80,
  ArrowUp: -80,
  PageDown: 800,
  PageUp: -800,
  " ": 800,
};

// Eases 0->1 decelerating into place - monotonic (never overshoots and settles back),
// so a card's landing only ever keeps moving forward toward its mark.
function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

// Each of the 6 shader columns gets its own diagonal sheen (brightest at the corner nearest
// the outer edge and the top, fading toward the center seam and downward) rather than one
// flat color - sampled from the reference image, where each panel resets independently and
// the peak brightness tapers from the outer columns inward toward the middle seam.
const COLUMN_PEAKS = [28, 22, 14];
function columnGradient(peak: number, direction: "to top right" | "to top left") {
  const grey = peak.toString(16).padStart(2, "0");
  return `linear-gradient(${direction}, #0B0B0B 0%, #${grey}${grey}${grey} 100%)`;
}

// Each card starts fully off-page beyond its origin corner (hidden) and slides in just
// far enough to rest near that same corner - a small entrance, not a trip to center.
const CARD_ANIMATIONS = [
  {
    src: "/media/animation-card-1.png",
    width: 340,
    height: 177,
    hidden: { left: 1500, top: 860 }, // bottom-right, off-page
    visible: { left: 950, top: 585 },
    // Curved entrance: arcs in, lands a little further than its base mark (never back-tracks),
    // settling with a faint left tilt, and scales up from the corner it flies in from while fading in.
    landingOvershoot: 0.06,
    arcHeight: 70,
    tiltDeg: -3,
    scaleFrom: 0.75,
    transformOrigin: "bottom right",
    fadeIn: true,
  },
  {
    src: "/media/animation-card-2.png",
    width: 340,
    height: 179,
    hidden: { left: -400, top: 860 }, // bottom-left, off-page
    visible: { left: 85, top: 580 },
    // Mirror of card 1 (tilts right, scales from bottom-left), but with slightly different
    // values throughout so it doesn't land in lockstep with card 1 - keeps it feeling organic.
    landingOvershoot: 0.045,
    arcHeight: 55,
    tiltDeg: 2,
    scaleFrom: 0.8,
    transformOrigin: "bottom left",
    fadeIn: true,
  },
  {
    src: "/media/animation-card-3.png",
    width: 340,
    height: 184,
    hidden: { left: -400, top: -244 }, // top-left, off-page
    visible: { left: 56, top: 56 },
    // Instead of resting at its corner, this one drifts on a little further, only up to
    // where the centered text starts - shrinking and gradually blurring as it goes, and
    // sitting beneath the text's z-index so it reads as sliding behind it, not landing next to it.
    driftTarget: { left: 190, top: 150 },
    tiltDeg: -5,
    scaleTo: 0.92,
    blurTo: 1.2,
    zIndex: 5,
    fadeIn: true,
  },
  {
    src: "/media/animation-card-4.png",
    width: 340,
    height: 187,
    hidden: { left: 1500, top: -247 }, // top-right, off-page
    visible: { left: 1044, top: 56 },
    // Mirror of card 3 (tilts right, drifts left-and-down past its corner toward the
    // centered text), shrinking and gradually blurring, sitting beneath the text's z-index.
    driftTarget: { left: 910, top: 150 },
    tiltDeg: 5,
    scaleTo: 0.8,
    blurTo: 1.5,
    zIndex: 5,
    fadeIn: true,
  },
];

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
      const next = Math.min(MAX_PROGRESS, Math.max(0, value));
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
        if (current >= MAX_PROGRESS) {
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
          lockTopRef.current = next < MAX_PROGRESS ? entryTop : null;
          return true;
        }
        const next = setProgressClamped(current + delta / SCROLL_DISTANCE);
        lockTopRef.current = next < MAX_PROGRESS ? entryTop : null;
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

  const openProgress = Math.min(1, progress);
  const cardsProgress = Math.max(0, progress - 1);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-200 w-full overflow-hidden border-t-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]"
    >
      <Image
        src="/media/animation-bg.png"
        alt=""
        fill
        draggable={false}
        className="object-cover"
        style={{ opacity: openProgress }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-8"
        style={{ opacity: openProgress }}
      >
        <p
          className="font-general-sans max-w-4xl bg-clip-text text-center text-[56px] leading-[120%] font-normal tracking-[-0.02em] text-transparent"
          style={{ backgroundImage: "linear-gradient(to top, #9E9E9E 0%, #FFFFFF 100%)" }}
        >
          Every conversation
          <Image
            src="/media/x-icon.png"
            alt=""
            width={56}
            height={56}
            draggable={false}
            className="relative -top-1.5 inline-block align-middle mx-1"
          />
          shapes <br /> the market. We turn the right <br /> ones into your next trade
          <Image
            src="/media/coin-icon.png"
            alt=""
            width={60}
            height={60}
            draggable={false}
            className="inline-block align-middle mx-1 mb-3"
          />
        </p>
      </div>
      <div
        className="relative z-20 flex w-1/2 divide-x-[0.5px] divide-[#FFFFFF1A] border-r-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]"
        style={{ transform: `translateX(${-openProgress * 100}%)` }}
      >
        {COLUMN_PEAKS.map((peak, index) => (
          <div key={index} className="h-full flex-1" style={{ background: columnGradient(peak, "to top right") }} />
        ))}
      </div>
      <div
        className="relative z-20 flex w-1/2 divide-x-[0.5px] divide-[#FFFFFF1A] border-l-[0.5px] border-[#FFFFFF1A] bg-[#0B0B0B]"
        style={{ transform: `translateX(${openProgress * 100}%)` }}
      >
        {[...COLUMN_PEAKS].reverse().map((peak, index) => (
          <div key={index} className="h-full flex-1" style={{ background: columnGradient(peak, "to top left") }} />
        ))}
      </div>
      {CARD_ANIMATIONS.map((card) => {
        // Cards without the extra fields fall back to the original straight, linear glide.
        const eased = card.landingOvershoot !== undefined || card.driftTarget !== undefined;
        const posT = eased ? easeOutCubic(cardsProgress) : cardsProgress;
        // "Go a little further" is baked into the resting spot itself (pushed a bit past
        // `visible`, further from `hidden`) rather than overshot-and-corrected mid-flight,
        // so the card only ever keeps moving forward and never travels backward. A card can
        // instead drift all the way past its corner mark toward an explicit point (e.g. the
        // centered text) via `driftTarget`.
        const targetLeft = card.driftTarget
          ? card.driftTarget.left
          : card.landingOvershoot
            ? card.visible.left + (card.visible.left - card.hidden.left) * card.landingOvershoot
            : card.visible.left;
        const targetTop = card.driftTarget
          ? card.driftTarget.top
          : card.landingOvershoot
            ? card.visible.top + (card.visible.top - card.hidden.top) * card.landingOvershoot
            : card.visible.top;
        const dx = (card.hidden.left - targetLeft) * (1 - posT);
        // Monotonic rise (0 -> arcHeight, never back down) at a different easing rate than
        // posT, so x and y arrive at different speeds - that mismatch is what reads as a
        // curved path, without ever dipping back down once it nears its lift.
        const arcLift = card.arcHeight ? card.arcHeight * Math.sin((Math.min(1, cardsProgress) * Math.PI) / 2) : 0;
        const dy = (card.hidden.top - targetTop) * (1 - posT) - arcLift;
        const rotate = card.tiltDeg ? card.tiltDeg * posT : 0;
        const scaleFrom = card.scaleFrom ?? 1;
        const scaleTo = card.scaleTo ?? 1;
        const scale = scaleFrom + (scaleTo - scaleFrom) * posT;
        const opacity = card.fadeIn ? Math.min(1, cardsProgress / 0.7) : 1;
        // Ease-in (slow start, sharper toward the end) rather than posT's ease-out, so the
        // card reads as a clear image for most of its travel and only gains blur near the end,
        // instead of looking blurred as soon as it fades into view.
        const blurPx = card.blurTo ? card.blurTo * cardsProgress ** 2 : 0;
        return (
          <div
            key={card.src}
            className="absolute z-30"
            style={{
              left: targetLeft,
              top: targetTop,
              width: card.width,
              height: card.height,
              opacity,
              zIndex: card.zIndex,
              filter: blurPx ? `blur(${blurPx}px)` : undefined,
              transformOrigin: card.transformOrigin ?? "center",
              transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(${scale})`,
            }}
          >
            <Image src={card.src} alt="" fill draggable={false} className="object-contain" />
          </div>
        );
      })}
    </section>
  );
}
