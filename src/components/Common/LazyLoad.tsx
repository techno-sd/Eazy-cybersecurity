'use client';

import React, { ReactNode } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  delay?: number;
}

/**
 * LazyLoad Wrapper Component
 * Applies fade-in animation when element enters viewport
 * Perfect for sections, cards, and layouts
 */
const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useLazyLoad({ threshold, rootMargin, triggerOnce });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default LazyLoad;
