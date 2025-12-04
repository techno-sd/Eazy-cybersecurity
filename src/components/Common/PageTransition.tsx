'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayChildren(children);
      return;
    }

    setIsAnimating(true);

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={`page-transition ${className}`}
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        willChange: 'opacity, transform'
      }}
    >
      {displayChildren}
    </div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export function SlideTransition({
  children,
  direction = 'up'
}: SlideTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  const transforms = {
    left: 'translateX(-30px)',
    right: 'translateX(30px)',
    up: 'translateY(30px)',
    down: 'translateY(-30px)'
  };

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

interface FadeOverlayTransitionProps {
  children: ReactNode;
  overlayColor?: string;
}

export function FadeOverlayTransition({
  children,
  overlayColor = 'rgba(10, 77, 140, 0.95)'
}: FadeOverlayTransitionProps) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<'idle' | 'covering' | 'revealing'>('idle');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    setPhase('covering');
    const revealTimer = setTimeout(() => setPhase('revealing'), 400);
    const idleTimer = setTimeout(() => setPhase('idle'), 800);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(idleTimer);
    };
  }, [pathname]);

  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: overlayColor,
          zIndex: 9999,
          pointerEvents: 'none',
          transform: phase === 'idle'
            ? 'translateY(-100%)'
            : phase === 'covering'
              ? 'translateY(0)'
              : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </div>
  );
}

export default PageTransition;
