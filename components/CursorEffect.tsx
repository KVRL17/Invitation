'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorEffect — a subtle golden particle trail behind the cursor.
 * Desktop only (pointer: fine + no touch). Disabled for reduced motion.
 *
 * Implementation: a tiny <canvas> that draws fading gold dots at the cursor
 * position on each mousemove. No DOM churn, ~zero cost when idle.
 */
export function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mqFine = window.matchMedia('(pointer: fine)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = mqFine.matches && !mqReduce.matches;
    let particles: { x: number; y: number; life: number; size: number }[] = [];
    let last = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      if (!running) return;
      last = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: last.x + (Math.random() - 0.5) * 6,
          y: last.y + (Math.random() - 0.5) * 6,
          life: 1,
          size: 1.5 + Math.random() * 2.5,
        });
      }
      if (particles.length > 60) particles.splice(0, particles.length - 60);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 201, 139, ${p.life * 0.7})`;
        ctx.fill();
        p.life -= 0.035;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        resize();
        tick();
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) stop();
      else start();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    mqReduce.addEventListener('change', onChange);

    if (running) {
      resize();
      tick();
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      mqReduce.removeEventListener('change', onChange);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
      aria-hidden="true"
    />
  );
}
