'use client';

import React, { ReactNode } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';

interface StaggeredLazyLoadProps {
  children: ReactNode[];
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  className?: string;
}

/**
 * Staggered LazyLoad Component
 * Perfect for lists, card grids, and multiple items
 * Creates a cascading animation effect
 * Industry best practice for visual appeal and performance
 */
const StaggeredLazyLoad: React.FC<StaggeredLazyLoadProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  staggerDelay = 100,
  className = '',
}) => {
  const { ref, isVisible } = useLazyLoad({ threshold, rootMargin, triggerOnce: true });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.6s ease ${index * staggerDelay}ms, transform 0.6s ease ${index * staggerDelay}ms`,
            willChange: 'opacity, transform',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredLazyLoad;
