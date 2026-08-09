'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Section stops in page order, each with the reading time (ms) a guest gets
 * before the page gently scrolls on to the next one.
 */
const SECTION_STOPS: { id: string; readMs: number }[] = [
  { id: 'hero', readMs: 5000 },
  { id: 'meet-the-couple', readMs: 7000 },
  { id: 'ring-animation', readMs: 5000 },
  { id: 'save-the-date', readMs: 5500 },
  { id: 'countdown', readMs: 4500 },
  { id: 'event-details', readMs: 7000 },
  { id: 'couple-illustration', readMs: 6000 },
  { id: 'gallery', readMs: 6000 },
  { id: 'blessings', readMs: 5000 },
  { id: 'rsvp', readMs: 8000 },
  { id: 'closing', readMs: 6000 },
];

/** How long the smooth scroll between two sections takes. */
const SCROLL_MS = 900;

/**
 * AutoScroll — after the invitation opens, gently walks the guest through
 * each section, pausing long enough to read it. The tour stops the moment the
 * guest scrolls, touches or presses a key, and a small button lets them
 * restart it. Respects prefers-reduced-motion.
 */
export function AutoScroll() {
  const [running, setRunning] = useState(false);
  const [reduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const stopRef = useRef(false);

  const stop = useCallback(() => {
    stopRef.current = true;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    rafRef.current = null;
    timerRef.current = null;
    setRunning(false);
  }, []);

  const run = useCallback(() => {
    if (running || reduce) return;
    stopRef.current = false;
    setRunning(true);

    const els = SECTION_STOPS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) {
      setRunning(false);
      return;
    }

    // Resume from the first section that is at or below the current viewport.
    const viewportTop = window.scrollY;
    let start = els.findIndex(
      (el) => el.offsetTop + el.offsetHeight > viewportTop + 8
    );
    if (start < 0) start = 0;

    // Resolves early if the tour is stopped mid-wait.
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const end = Date.now() + ms;
        const tick = () => {
          if (stopRef.current || Date.now() >= end) resolve();
          else timerRef.current = window.setTimeout(tick, 100);
        };
        tick();
      });

    // Smoothly scroll to a Y position, cancelling if the tour is stopped.
    const animateTo = (targetY: number) =>
      new Promise<void>((resolve) => {
        const startY = window.scrollY;
        const delta = targetY - startY;
        const t0 = performance.now();
        const step = (now: number) => {
          if (stopRef.current) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - t0) / SCROLL_MS);
          // easeInOutQuad
          const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          window.scrollTo(0, startY + delta * eased);
          if (t < 1) rafRef.current = requestAnimationFrame(step);
          else resolve();
        };
        rafRef.current = requestAnimationFrame(step);
      });

    (async () => {
      for (let i = start; i < els.length; i++) {
        if (stopRef.current) break;
        await animateTo(els[i].offsetTop - 8);
        if (stopRef.current) break;
        await sleep(SECTION_STOPS[i].readMs);
      }
      // Finish by reaching the very bottom of the page.
      if (!stopRef.current) {
        await animateTo(document.documentElement.scrollHeight);
      }
      stopRef.current = true;
      setRunning(false);
    })();
  }, [running, reduce]);

  // Start automatically once the guest opens the invitation.
  useEffect(() => {
    const onOpen = () => run();
    window.addEventListener('invitation:open', onOpen);
    return () => {
      window.removeEventListener('invitation:open', onOpen);
      stop();
    };
  }, [run, stop]);

  // The moment the guest interacts, the tour yields to them.
  useEffect(() => {
    if (!running) return;
    const events: (keyof WindowEventMap)[] = [
      'wheel',
      'touchstart',
      'keydown',
      'mousedown',
    ];
    const interrupt = () => stop();
    events.forEach((e) => window.addEventListener(e, interrupt, { passive: true }));
    return () =>
      events.forEach((e) => window.removeEventListener(e, interrupt));
  }, [running, stop]);

  return (
    <AnimatePresence>
      <motion.button
        key="autoscroll"
        type="button"
        onClick={running ? stop : run}
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.6, y: 12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-20 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-burgundy-deep/80 text-gold-light shadow-glow-soft backdrop-blur-md"
        aria-label={running ? 'Pause auto-scroll' : 'Start auto-scroll'}
        aria-pressed={running}
        title={running ? 'Pause auto-scroll' : 'Start auto-scroll'}
      >
        {running ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" rx="1.5" />
            <rect x="14" y="4" width="4" height="16" rx="1.5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15a.75.75 0 0 0 1.12.67l12.6-7.5a.75.75 0 0 0 0-1.34l-12.6-7.5A.75.75 0 0 0 7 4.5Z" />
          </svg>
        )}
      </motion.button>
    </AnimatePresence>
  );
}
