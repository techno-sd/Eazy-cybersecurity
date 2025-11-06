'use client';

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  count?: number;
  circle?: boolean;
  inline?: boolean;
}

/**
 * Skeleton Loading Component
 * Shows placeholder while content is loading
 * Improves perceived performance and UX
 */
const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  className = '',
  style = {},
  count = 1,
  circle = false,
  inline = false,
}) => {
  const skeletonStyle: React.CSSProperties = {
    display: inline ? 'inline-block' : 'block',
    width,
    height,
    borderRadius: circle ? '50%' : '4px',
    backgroundColor: '#e0e0e0',
    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    marginBottom: !inline ? '12px' : '0',
    marginRight: inline ? '8px' : '0',
    ...style,
  };

  const skeletons = Array(count)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        style={{
          ...skeletonStyle,
          marginBottom: index === count - 1 && !inline ? '0' : skeletonStyle.marginBottom,
        }}
        className={className}
      />
    ));

  return <>{skeletons}</>;
};

export default Skeleton;
