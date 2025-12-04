'use client';

import React, { ReactNode, ElementType } from 'react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

type AnimationType =
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-in'
  | 'rotate-in';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
}

const animationStyles: Record<AnimationType, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-up': {
    hidden: { opacity: 0, transform: 'translateY(40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' }
  },
  'slide-down': {
    hidden: { opacity: 0, transform: 'translateY(-40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' }
  },
  'slide-left': {
    hidden: { opacity: 0, transform: 'translateX(40px)' },
    visible: { opacity: 1, transform: 'translateX(0)' }
  },
  'slide-right': {
    hidden: { opacity: 0, transform: 'translateX(-40px)' },
    visible: { opacity: 1, transform: 'translateX(0)' }
  },
  'scale-in': {
    hidden: { opacity: 0, transform: 'scale(0.9)' },
    visible: { opacity: 1, transform: 'scale(1)' }
  },
  'rotate-in': {
    hidden: { opacity: 0, transform: 'rotate(-5deg) scale(0.95)' },
    visible: { opacity: 1, transform: 'rotate(0) scale(1)' }
  }
};

export function AnimatedSection({
  children,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
  className = '',
  style = {},
  as: Component = 'div'
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    delay,
    triggerOnce: true
  });

  const animStyle = animationStyles[animation];
  const currentStyle = isVisible ? animStyle.visible : animStyle.hidden;

  return (
    <Component
      ref={ref as any}
      className={className}
      style={{
        ...style,
        ...currentStyle,
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </Component>
  );
}

interface StaggeredListProps {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
  as?: ElementType;
  itemAs?: ElementType;
}

export function StaggeredList({
  children,
  animation = 'slide-up',
  staggerDelay = 100,
  className = '',
  itemClassName = '',
  as: Container = 'div',
  itemAs: Item = 'div'
}: StaggeredListProps) {
  const { ref, visibleChildren } = useStaggerReveal<HTMLDivElement>(
    children.length,
    { staggerDelay, triggerOnce: true }
  );

  const animStyle = animationStyles[animation];

  return (
    <Container ref={ref as any} className={className}>
      {React.Children.map(children, (child, index) => {
        const currentStyle = visibleChildren[index] ? animStyle.visible : animStyle.hidden;
        return (
          <Item
            className={itemClassName}
            style={{
              ...currentStyle,
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: 'opacity, transform'
            }}
          >
            {child}
          </Item>
        );
      })}
    </Container>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  style = {}
}: FadeInProps) {
  const animationMap: Record<string, AnimationType> = {
    up: 'slide-up',
    down: 'slide-down',
    left: 'slide-left',
    right: 'slide-right',
    none: 'fade-in'
  };

  return (
    <AnimatedSection
      animation={animationMap[direction]}
      delay={delay}
      className={className}
      style={style}
    >
      {children}
    </AnimatedSection>
  );
}

export default AnimatedSection;
