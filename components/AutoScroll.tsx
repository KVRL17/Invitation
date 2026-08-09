'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * AutoScroll — after the invitation opens, glides the guest through the
 * whole page with one continuous, even scroll (no per-section pauses).
 * Resting a finger on a touch screen pauses the glide in place and resumes
 * it from that exact spot on release; a real drag, wheel scroll, or key
 * press ends the tour, and a small button restarts it. Respects
 * prefers-reduced-motion.
 */

/** Pace of the continuous scroll, in pixels per second. */
const SCROLL_PX_PER_S = 80;
export function AutoScroll() {
  const [running, setRunning] = useState(false);
  const [reduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [hasTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) || navigator.maxTouchPoints > 0)
  );
  // Keep the "am I running" guard in a ref (not state) so `run`/`stop` stay
  // referentially stable. If they depended on the `running` state, toggling
  // it would recreate them, which would re-run the `invitation:open` effect
  // below — and its cleanup would call `stop()` and cancel the tour right
  // after it started.
  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const stopRef = useRef(false);
  // True while a finger is resting on the screen — the glide holds position
  // and continues from there once the finger lifts.
  const pausedRef = useRef(false);
  // Where the current touch started, so a real drag can be told apart from a
  // light hold-and-release.
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const stop = useCallback(() => {
    stopRef.current = true;
    runningRef.current = false;
    pausedRef.current = false;
    touchStartRef.current = null;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    rafRef.current = null;
    timerRef.current = null;
    // Put the global smooth scroll back, now that the tour is finished.
    document.documentElement.style.scrollBehavior = '';
    setRunning(false);
  }, []);

  const run = useCallback(() => {
    if (runningRef.current || reduce) return;
    stopRef.current = false;
    runningRef.current = true;
    setRunning(true);

    // The global stylesheet sets `scroll-behavior: smooth`, but that makes
    // the browser animate *every* scrollTo in the rAF loop below, fighting
    // our own easing and making the cruise laggy. Pin it to `auto` for the
    // duration of the tour; `stop()` (or the completion path) restores it.
    document.documentElement.style.scrollBehavior = 'auto';

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const end = Date.now() + ms;
        const tick = () => {
          if (stopRef.current || Date.now() >= end) resolve();
          else timerRef.current = window.setTimeout(tick, 100);
        };
        tick();
      });

    (async () => {
      // The invitation:open event fires synchronously right after the main
      // content is mounted, so React may not have committed the DOM yet.
      // Wait until the invitation actually has height before measuring.
      let waits = 0;
      while (!stopRef.current && waits < 50) {
        const main = document.getElementById('invitation');
        if (main && main.offsetHeight > 0) break;
        waits += 1;
        await sleep(100);
      }
      if (stopRef.current) return;

      // One continuous pass: ease in, glide down the whole page, ease out.
      const startY = window.scrollY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const distance = Math.max(0, maxY - startY);
      if (distance <= 0) {
        document.documentElement.style.scrollBehavior = '';
        stopRef.current = true;
        runningRef.current = false;
        setRunning(false);
        return;
      }

      const duration = (distance / SCROLL_PX_PER_S) * 1000;
      // Accumulate elapsed time frame-to-frame (never counting time spent
      // paused under a finger), so a hold-and-release resumes exactly where
      // it left off instead of jumping ahead.
      let elapsed = 0;
      let lastNow: number | null = null;
      const step = (now: number) => {
        if (stopRef.current) return;
        if (pausedRef.current) {
          lastNow = now;
          rafRef.current = requestAnimationFrame(step);
          return;
        }
        if (lastNow !== null) elapsed += now - lastNow;
        lastNow = now;
        const t = Math.min(1, elapsed / duration);
        // easeInOutQuad — gentle start/stop, even cruise in between.
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        window.scrollTo(0, startY + distance * eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          // Images/reveals can change the page height mid-flight, so settle
          // on the *current* true bottom rather than the value measured above.
          document.documentElement.style.scrollBehavior = '';
          window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight);
          stopRef.current = true;
          runningRef.current = false;
          setRunning(false);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    })();
  }, [reduce]);

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

    // Scrolling with a wheel / pressing a key means the guest has taken
    // over — end the tour for good. (On touch devices a mouse-click would be
    // emulated from every tap, so mousedown only counts as an interrupt on
    // mouse-only machines.)
    const hardStop = () => stop();
    const hardEvents: (keyof WindowEventMap)[] = ['wheel', 'keydown'];
    if (!hasTouch) hardEvents.push('mousedown');
    hardEvents.forEach((e) =>
      window.addEventListener(e, hardStop, { passive: true })
    );

    // On touch screens, resting a finger simply pauses the glide where it
    // is; lifting it resumes from that exact spot. A real drag (past a small
    // threshold) counts as the guest taking over and ends the tour.
    let touchCleanup: (() => void) | null = null;
    if (hasTouch) {
      const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        touchStartRef.current = t ? { x: t.clientX, y: t.clientY } : null;
        pausedRef.current = true;
      };
      const onTouchMove = (e: TouchEvent) => {
        const start = touchStartRef.current;
        const t = e.touches[0];
        if (start && t) {
          const dx = Math.abs(t.clientX - start.x);
          const dy = Math.abs(t.clientY - start.y);
          if (Math.hypot(dx, dy) > 40) stop();
        }
      };
      const onTouchEnd = () => {
        touchStartRef.current = null;
        pausedRef.current = false;
      };
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('touchcancel', onTouchEnd, { passive: true });
      touchCleanup = () => {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchcancel', onTouchEnd);
      };
    }

    return () => {
      hardEvents.forEach((e) =>
        window.removeEventListener(e, hardStop)
      );
      touchCleanup?.();
    };
  }, [running, stop, hasTouch]);

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
