'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { EASE } from '@/lib/ease';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
}

/**
 * Reveal — a small cinematic scroll-triggered entrance.
 * Fades + slides + slightly rotates + zooms, once, when the element
 * enters the viewport. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.25,
  className,
  style,
}: {
  children: React.ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset(direction, distance),
      scale: 1.02,
      rotate: direction === 'left' || direction === 'right' ? 0 : -0.6,
      filter: 'blur(4px)',
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reduce ? 0 : duration,
        ease: EASE,
        delay: reduce ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger — reveals children one after another with a shared rhythm.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.14,
  duration = 1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : step, delayChildren: reduce ? 0 : delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 34, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduce ? 0 : duration, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
