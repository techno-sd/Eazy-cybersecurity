'use client';

import React, { ReactNode } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';

interface AnimatedLazyLoadProps {
  children: ReactNode;
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * Animated LazyLoad Component
 * Provides various animation types for scroll-triggered effects
 * Best practices for engaging user experience
 */
const AnimatedLazyLoad: React.FC<AnimatedLazyLoadProps> = ({
  children,
  animationType = 'slideUp',
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
}) => {
  const { ref, isVisible } = useLazyLoad({ threshold, rootMargin, triggerOnce: true });

  const getInitialState = (): React.CSSProperties => {
    switch (animationType) {
      case 'slideUp':
        return { transform: 'translateY(30px)', opacity: 0 };
      case 'slideDown':
        return { transform: 'translateY(-30px)', opacity: 0 };
      case 'slideLeft':
        return { transform: 'translateX(-30px)', opacity: 0 };
      case 'slideRight':
        return { transform: 'translateX(30px)', opacity: 0 };
      case 'scaleIn':
        return { transform: 'scale(0.95)', opacity: 0 };
      case 'rotateIn':
        return { transform: 'rotate(-5deg)', opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const getFinalState = (): React.CSSProperties => {
    switch (animationType) {
      case 'slideUp':
      case 'slideDown':
        return { transform: 'translateY(0)', opacity: 1 };
      case 'slideLeft':
      case 'slideRight':
        return { transform: 'translateX(0)', opacity: 1 };
      case 'scaleIn':
        return { transform: 'scale(1)', opacity: 1 };
      case 'rotateIn':
        return { transform: 'rotate(0deg)', opacity: 1 };
      default:
        return { opacity: 1 };
    }
  };

  const style: React.CSSProperties = {
    ...(!isVisible ? getInitialState() : getFinalState()),
    transition: `all ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
    willChange: 'transform, opacity',
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default AnimatedLazyLoad;
