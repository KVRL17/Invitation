'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * FloatingPetals — lightweight falling petals.
 *
 * Performance strategy: a fixed, small pool of petals is rendered ONCE (the
 * same DOM nodes are reused for the whole session). Each petal is a single
 * div with a CSS custom-animation (transform + opacity only, GPU friendly).
 * No interval timers, no React re-renders, no hundreds of DOM nodes.
 *
 * Respects prefers-reduced-motion (renders nothing) and disabled on very
 * small screens for mobile perf.
 */
export function FloatingPetals({
  count = 12,
  opacity = 0.5,
  className,
}: {
  count?: number;
  opacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // On the smallest screens petals are decorative noise — keep the page
    // light and the focal content clear.
    setEnabled(window.innerWidth >= 390);
  }, []);

  // Deterministic pseudo-random values, computed once, never re-created.
  const petals = useMemo(() => {
    const seed = 7;
    let s = seed;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rnd() * 100,
      size: 9 + rnd() * 11,
      delay: rnd() * 14,
      duration: 13 + rnd() * 12,
      sway: 18 + rnd() * 26,
      swayDur: 3.5 + rnd() * 3,
      rot: rnd() * 360,
      blur: rnd() < 0.3,
    }));
  }, [count]);

  if (reduced || !enabled) return null;

  return (
    <div ref={ref} className={`pointer-events-none fixed inset-0 z-20 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.25,
              opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `-${p.delay}s`,
              filter: p.blur ? 'blur(0.6px)' : undefined,
              // Custom props consumed by the keyframes below.
              '--petal-sway': `${p.sway}px`,
              '--petal-sway-dur': `${p.swayDur}s`,
              '--petal-rot': `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
