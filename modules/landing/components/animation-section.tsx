"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SCROLL_DISTANCE = 800;
const MAX_PROGRESS = 1;

// Fraction of the section's height that must be visible in the
// viewport before the scroll-jacked card animation locks in.
//
// ENTRY_VISIBLE_RATIO applies when scrolling down into the section
// from above; EXIT_VISIBLE_RATIO applies when scrolling back up into
// it from below (i.e. reversing the animation).
const ENTRY_VISIBLE_RATIO = 0.4;
const EXIT_VISIBLE_RATIO = 0.5;

const KEY_DELTAS: Record<string, number> = {
  ArrowDown: 80,
  ArrowUp: -80,
  PageDown: 800,
  PageUp: -800,
  " ": 800,
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

const CARD_ANIMATIONS = [
  {
    src: "/media/img-card-1.png",
    width: 340,
    height: 177,
    hidden: { left: 1500, top: 860 },
    visible: { left: 950, top: 585 },
    landingOvershoot: 0.06,
    arcHeight: 70,
    tiltDeg: -3,
    scaleFrom: 0.75,
    transformOrigin: "bottom right",
    fadeIn: true,
  },
  {
    src: "/media/img-card-2.png",
    width: 340,
    height: 179,
    hidden: { left: -400, top: 860 },
    visible: { left: 85, top: 580 },
    landingOvershoot: 0.045,
    arcHeight: 55,
    tiltDeg: 2,
    scaleFrom: 0.8,
    transformOrigin: "bottom left",
    fadeIn: true,
  },
  {
    src: "/media/img-card-3.png",
    width: 340,
    height: 184,
    hidden: { left: -400, top: -244 },
    visible: { left: 56, top: 56 },
    driftTarget: { left: 190, top: 150 },
    tiltDeg: -5,
    scaleTo: 0.92,
    blurTo: 1.2,
    zIndex: 5,
    fadeIn: true,
  },
  {
    src: "/media/img-card-4.png",
    width: 340,
    height: 187,
    hidden: { left: 1500, top: -247 },
    visible: { left: 1044, top: 56 },
    driftTarget: { left: 910, top: 150 },
    tiltDeg: 5,
    scaleTo: 0.8,
    blurTo: 1.5,
    zIndex: 5,
    fadeIn: true,
  },
];

const MAX_PROGRESS_STEP_PER_FRAME = 0.065;

export function AnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Logical progress.
  // This changes immediately based on scroll input.
  const progressRef = useRef(0);

  // Actual progress rendered on screen.
  // This smoothly follows logical progress.
  const renderedProgressRef = useRef(0);

  const rafIdRef = useRef<number | null>(null);

  const touchYRef = useRef<number | null>(null);

  // Whether the animation section currently owns the scroll.
  const isPinnedRef = useRef(false);

  // Prevents wheel input from interfering while we programmatically
  // move the page into the exact animation position.
  const isProgrammaticScrollRef = useRef(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Scroll animation is only enabled on desktop.
    const mql = window.matchMedia("(min-width: 768px)");

    let detach: (() => void) | null = null;

    const attach = () => {
      let lastWheelTime = 0;

      /**
       * Smoothly render logical progress.
       */
      const tickRender = () => {
        const target = progressRef.current;
        const current = renderedProgressRef.current;

        const diff = target - current;

        if (Math.abs(diff) < 0.0005) {
          renderedProgressRef.current = target;

          setProgress(target);

          rafIdRef.current = null;

          return;
        }

        const step =
          Math.sign(diff) *
          Math.min(
            Math.abs(diff) * 0.3,
            MAX_PROGRESS_STEP_PER_FRAME
          );

        renderedProgressRef.current = current + step;

        setProgress(renderedProgressRef.current);

        rafIdRef.current =
          requestAnimationFrame(tickRender);
      };

      /**
       * Update logical progress while keeping it between 0 and 1.
       */
      const setProgressClamped = (value: number) => {
        const next = Math.min(
          MAX_PROGRESS,
          Math.max(0, value)
        );

        progressRef.current = next;

        if (rafIdRef.current === null) {
          rafIdRef.current =
            requestAnimationFrame(tickRender);
        }

        return next;
      };

      /**
       * Position at which the animation section should be locked.
       *
       * The animation starts as soon as ENTRY_VISIBLE_RATIO of the
       * section's height has entered the viewport, not once the
       * whole section is in view.
       */
      const getEntryTop = () => {
        const rect =
          section.getBoundingClientRect();

        return Math.max(
          0,
          window.innerHeight -
            rect.height *
              ENTRY_VISIBLE_RATIO
        );
      };

      /**
       * Position at which the animation section should be locked
       * when scrolling UP into it from below (reversing).
       *
       * Mirrors `getEntryTop`, but the section is now re-entering
       * viewport-top-first (its bottom edge shows first), so
       * EXIT_VISIBLE_RATIO of it is visible once its top has come
       * back down to this point.
       */
      const getExitTop = () => {
        const rect =
          section.getBoundingClientRect();

        return (
          rect.height *
            (EXIT_VISIBLE_RATIO - 1)
        );
      };

      /**
       * Move the animation section to its exact locked position.
       *
       * IMPORTANT:
       * We only do this when entering the animation.
       * We do NOT continuously correct the scroll position.
       */
      const pinSection = (
        targetTop: number
      ) => {
        const rect =
          section.getBoundingClientRect();

        const adjustment =
          rect.top - targetTop;

        if (Math.abs(adjustment) > 0.5) {
          isProgrammaticScrollRef.current = true;

          window.scrollTo({
            top:
              window.scrollY +
              adjustment,
            behavior: "auto",
          });

          requestAnimationFrame(() => {
            isProgrammaticScrollRef.current =
              false;
          });
        }

        isPinnedRef.current = true;
      };

      /**
       * Release the scroll lock.
       */
      const releasePin = () => {
        isPinnedRef.current = false;
      };

      /**
       * Advance the reverse (scroll-up) animation by up to
       * `pxAvailable` px, scrolling the page by that same amount so
       * it visibly moves in sync with the cards instead of staying
       * frozen.
       *
       * The scroll actually applied is capped to the distance still
       * needed to finish reversing (`remainingPx`), so the page can
       * never scroll further than the point where the animation
       * completes — only once it hits 0 does the pin release and
       * scrolling further is allowed.
       */
      const scrubReverse = (
        pxAvailable: number
      ) => {
        if (pxAvailable <= 0) return;

        const current =
          progressRef.current;

        const remainingPx =
          current * SCROLL_DISTANCE;

        const scrollAmount = Math.min(
          pxAvailable,
          remainingPx
        );

        if (scrollAmount > 0) {
          window.scrollTo({
            top:
              window.scrollY -
              scrollAmount,
            behavior: "auto",
          });

          setProgressClamped(
            current -
              scrollAmount /
                SCROLL_DISTANCE
          );
        }

        if (pxAvailable >= remainingPx) {
          releasePin();
        }
      };

      /**
       * Apply scroll input to the animation.
       */
      const applyDelta = (delta: number) => {
        if (delta === 0) return false;

        const rect =
          section.getBoundingClientRect();

        const current =
          progressRef.current;

        const rendered =
          renderedProgressRef.current;

        /*
         * ==========================================================
         * NOT CURRENTLY PINNED
         * ==========================================================
         */

        if (!isPinnedRef.current) {
          /*
           * --------------------------------------------------------
           * SCROLLING DOWN
           * --------------------------------------------------------
           */

          if (delta > 0) {
            /*
             * If animation is already complete,
             * allow normal page scrolling.
             */
            if (
              current >= MAX_PROGRESS ||
              rendered >= MAX_PROGRESS
            ) {
              releasePin();

              return false;
            }

            const entryTop =
              getEntryTop();

            /*
             * Section hasn't reached the locked position yet.
             */
            if (rect.top > entryTop) {
              const distance =
                rect.top - entryTop;

              /*
               * This scroll event doesn't reach the
               * animation section yet.
               */
              if (delta < distance) {
                return false;
              }

              /*
               * ====================================================
               * IMPORTANT:
               *
               * We have reached the animation section.
               *
               * Move it into the exact locked position and
               * consume the ENTIRE current wheel event.
               *
               * We intentionally DO NOT use remainingDelta here.
               *
               * This prevents the section from moving while
               * the animation starts.
               * ====================================================
               */

              pinSection(entryTop);

              return true;
            }

            /*
             * Section is already at (or, e.g. right after reversing
             * back in from the different EXIT_VISIBLE_RATIO point,
             * already PAST) the entry position.
             *
             * Pin at whichever is closer — never jump backward
             * toward `entryTop` if we're already further along than
             * it, only forward to it if we haven't reached it yet.
             */
            pinSection(
              Math.min(rect.top, entryTop)
            );

            setProgressClamped(
              current +
                delta / SCROLL_DISTANCE
            );

            return true;
          }

          /*
           * --------------------------------------------------------
           * SCROLLING UP
           * --------------------------------------------------------
           */

          /*
           * If animation is completely closed,
           * allow normal page scrolling.
           */
          if (
            current <= 0 ||
            rendered <= 0
          ) {
            releasePin();

            return false;
          }

          const exitTop = getExitTop();

          /*
           * Section is above its locked position.
           */
          if (rect.top < exitTop) {
            const distance =
              exitTop - rect.top;

            /*
             * This scroll event doesn't reach the
             * animation section yet.
             */
            if (-delta < distance) {
              return false;
            }

            /*
             * Snap exactly to the exit trigger point — this fixes
             * the precise spot the reverse animation starts from —
             * then feed any delta left over in this same event
             * straight into the scrub, so the page keeps moving
             * instead of eating the rest of the gesture.
             */
            pinSection(exitTop);

            scrubReverse(-delta - distance);

            return true;
          }

          /*
           * Section is already at (or, e.g. right after entering
           * from the different ENTRY_VISIBLE_RATIO point, already
           * PAST) the exit position.
           *
           * Pin at whichever is closer — never jump forward toward
           * `exitTop` if we're already further along than it, only
           * backward to it if we haven't reached it yet.
           */
          pinSection(
            Math.max(rect.top, exitTop)
          );

          scrubReverse(-delta);

          return true;
        }

        /*
         * ==========================================================
         * CURRENTLY PINNED
         * ==========================================================
         */

        /*
         * ----------------------------------------------------------
         * SCROLLING DOWN WHILE ANIMATION IS PLAYING
         * ----------------------------------------------------------
         */

        if (delta > 0) {
          /*
           * Animation is complete.
           *
           * Release the section so the browser can
           * continue to the next section.
           */
          if (
            current >= MAX_PROGRESS ||
            rendered >= MAX_PROGRESS
          ) {
            releasePin();

            return false;
          }

          /*
           * Animation is still running.
           *
           * Consume the wheel event.
           */
          setProgressClamped(
            current +
              delta / SCROLL_DISTANCE
          );

          return true;
        }

        /*
         * ----------------------------------------------------------
         * SCROLLING UP WHILE ANIMATION IS PLAYING
         * ----------------------------------------------------------
         */

        /*
         * Animation is completely reversed.
         *
         * Release the lock so the browser can continue
         * scrolling to the previous section.
         */
        if (
          current <= 0 ||
          rendered <= 0
        ) {
          releasePin();

          return false;
        }

        /*
         * Reverse animation, scrolling the page along with it
         * (capped so it can't outrun the animation — see
         * `scrubReverse`).
         */
        scrubReverse(-delta);

        return true;
      };

      /**
       * Wheel / trackpad input.
       */
      const handleWheel = (
        event: WheelEvent
      ) => {
        const now =
          performance.now();

        /*
         * Ignore wheel input immediately around the
         * programmatic positioning.
         */
        if (
          isProgrammaticScrollRef.current &&
          now - lastWheelTime < 50
        ) {
          event.preventDefault();

          return;
        }

        lastWheelTime = now;

        /*
         * applyDelta returns true when the animation
         * needs to own the scroll.
         */
        if (
          applyDelta(event.deltaY)
        ) {
          event.preventDefault();
        }
      };

      /**
       * Touch start.
       */
      const handleTouchStart = (
        event: TouchEvent
      ) => {
        touchYRef.current =
          event.touches[0].clientY;
      };

      /**
       * Touch move.
       */
      const handleTouchMove = (
        event: TouchEvent
      ) => {
        if (
          touchYRef.current === null
        ) {
          return;
        }

        const currentY =
          event.touches[0].clientY;

        const delta =
          touchYRef.current -
          currentY;

        touchYRef.current =
          currentY;

        if (applyDelta(delta)) {
          event.preventDefault();
        }
      };

      /**
       * Touch end.
       */
      const handleTouchEnd = () => {
        touchYRef.current = null;
      };

      /**
       * Keyboard input.
       */
      const handleKeyDown = (
        event: KeyboardEvent
      ) => {
        const target =
          event.target as HTMLElement | null;

        /*
         * Don't hijack form controls.
         */
        if (
          target &&
          [
            "INPUT",
            "TEXTAREA",
            "SELECT",
          ].includes(target.tagName)
        ) {
          return;
        }

        const delta =
          KEY_DELTAS[event.key];

        if (delta === undefined) {
          return;
        }

        const signedDelta =
          event.key === " " &&
          event.shiftKey
            ? -delta
            : delta;

        if (
          applyDelta(signedDelta)
        ) {
          event.preventDefault();
        }
      };

      /*
       * IMPORTANT:
       *
       * There is intentionally NO scroll correction
       * listener.
       *
       * The previous scroll correction loop could cause:
       *
       * wheel → scroll → correction → scroll → correction
       *
       * which produced the wobbling effect.
       */

      window.addEventListener(
        "wheel",
        handleWheel,
        {
          passive: false,
        }
      );

      window.addEventListener(
        "touchstart",
        handleTouchStart,
        {
          passive: true,
        }
      );

      window.addEventListener(
        "touchmove",
        handleTouchMove,
        {
          passive: false,
        }
      );

      window.addEventListener(
        "touchend",
        handleTouchEnd,
        {
          passive: true,
        }
      );

      window.addEventListener(
        "keydown",
        handleKeyDown,
        {
          passive: false,
        }
      );

      return () => {
        window.removeEventListener(
          "wheel",
          handleWheel
        );

        window.removeEventListener(
          "touchstart",
          handleTouchStart
        );

        window.removeEventListener(
          "touchmove",
          handleTouchMove
        );

        window.removeEventListener(
          "touchend",
          handleTouchEnd
        );

        window.removeEventListener(
          "keydown",
          handleKeyDown
        );

        if (
          rafIdRef.current !== null
        ) {
          cancelAnimationFrame(
            rafIdRef.current
          );

          rafIdRef.current = null;
        }
      };
    };

    const sync = () => {
      if (
        mql.matches &&
        !detach
      ) {
        detach = attach();
      } else if (
        !mql.matches &&
        detach
      ) {
        detach();

        detach = null;
      }
    };

    sync();

    mql.addEventListener(
      "change",
      sync
    );

    return () => {
      mql.removeEventListener(
        "change",
        sync
      );

      detach?.();
    };
  }, []);

  const cardsProgress = progress;

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
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-8">
        <p
          className="font-general-sans max-w-4xl bg-clip-text text-center text-[56px] leading-[120%] font-normal tracking-[-0.02em] text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to top, #9E9E9E 0%, #FFFFFF 100%)",
          }}
        >
          Every conversation
          <Image
            src="/media/x-icon.png"
            alt=""
            width={56}
            height={56}
            draggable={false}
            className="relative -top-1.5 mx-1 inline-block align-middle"
          />
          shapes <br /> the market. We turn the right <br /> ones into your next trade
          <Image
            src="/media/coin-icon.png"
            alt=""
            width={60}
            height={60}
            draggable={false}
            className="mx-1 mb-3 inline-block align-middle"
          />
        </p>
      </div>

      {CARD_ANIMATIONS.map(
        (card) => {
          /*
           * Cards with landingOvershoot or
           * driftTarget use eased movement.
           */
          const eased =
            card.landingOvershoot !==
              undefined ||
            card.driftTarget !==
              undefined;

          const posT = eased
            ? easeOutCubic(
                cardsProgress
              )
            : cardsProgress;

          /*
           * Calculate final target position.
           */
          const targetLeft =
            card.driftTarget
              ? card.driftTarget
                  .left
              : card.landingOvershoot
                ? card.visible.left +
                  (card.visible.left -
                    card.hidden.left) *
                    card.landingOvershoot
                : card.visible.left;

          const targetTop =
            card.driftTarget
              ? card.driftTarget.top
              : card.landingOvershoot
                ? card.visible.top +
                  (card.visible.top -
                    card.hidden.top) *
                    card.landingOvershoot
                : card.visible.top;

          /*
           * Horizontal movement.
           */
          const dx =
            (card.hidden.left -
              targetLeft) *
            (1 - posT);

          /*
           * Curved vertical movement.
           */
          const arcLift =
            card.arcHeight
              ? card.arcHeight *
                Math.sin(
                  (Math.min(
                    1,
                    cardsProgress
                  ) *
                    Math.PI) /
                    2
                )
              : 0;

          const dy =
            (card.hidden.top -
              targetTop) *
              (1 - posT) -
            arcLift;

          /*
           * Rotation.
           */
          const rotate =
            card.tiltDeg
              ? card.tiltDeg * posT
              : 0;

          /*
           * Scale.
           */
          const scaleFrom =
            card.scaleFrom ?? 1;

          const scaleTo =
            card.scaleTo ?? 1;

          const scale =
            scaleFrom +
            (scaleTo - scaleFrom) *
              posT;

          /*
           * Fade in.
           */
          const opacity =
            card.fadeIn
              ? Math.min(
                  1,
                  cardsProgress /
                    0.7
                )
              : 1;

          /*
           * Gradual blur.
           */
          const blurPx =
            card.blurTo
              ? card.blurTo *
                cardsProgress **
                  2
              : 0;

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
                filter: blurPx
                  ? `blur(${blurPx}px)`
                  : undefined,
                transformOrigin:
                  card.transformOrigin ??
                  "center",
                transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(${scale})`,
                willChange:
                  "transform, opacity, filter",
              }}
            >
              <Image
                src={card.src}
                alt=""
                fill
                draggable={false}
                className="object-contain"
              />
            </div>
          );
        }
      )}
    </section>
  );
}