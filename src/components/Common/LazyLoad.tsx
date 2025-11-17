'use client';

import React, { ReactNode, useEffect, useState } from 'react';
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
 * LazyLoad Wrapper Component - Optimized for Performance
 * Applies fade-in animation when element enters viewport
 * Perfect for sections, cards, and layouts
 */
const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0.05,
  rootMargin = '100px',
  triggerOnce = true,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useLazyLoad({ threshold, rootMargin, triggerOnce });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Slightly delay rendering to improve perceived performance
      const timer = setTimeout(() => setShouldRender(true), Math.max(0, delay - 50));
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        contentVisibility: isVisible ? 'visible' : 'auto',
      }}
    >
      {shouldRender || isVisible ? children : null}
    </div>
  );
};

export default LazyLoad;
