'use client';

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius,
  className = '',
  variant = 'text',
  animation = 'wave'
}: SkeletonProps) {
  const getRadius = () => {
    if (borderRadius !== undefined) return borderRadius;
    switch (variant) {
      case 'circular':
        return '50%';
      case 'rounded':
        return 12;
      case 'rectangular':
        return 4;
      default:
        return 4;
    }
  };

  const animationStyle = animation === 'wave' ? {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeletonLoading 1.5s ease-in-out infinite'
  } : animation === 'pulse' ? {
    background: '#f0f0f0',
    animation: 'pulse 1.5s ease-in-out infinite'
  } : {
    background: '#f0f0f0'
  };

  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof getRadius() === 'number' ? `${getRadius()}px` : getRadius(),
        ...animationStyle
      }}
    />
  );
}

interface CardSkeletonProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}

export function CardSkeleton({
  className = '',
  showImage = true,
  lines = 3
}: CardSkeletonProps) {
  return (
    <div className={`card-skeleton ${className}`} style={{
      background: 'white',
      borderRadius: 16,
      padding: 20,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
    }}>
      {showImage && (
        <Skeleton
          variant="rounded"
          height={180}
          className="mb-4"
        />
      )}
      <Skeleton width="60%" height={24} className="mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '80%' : '100%'}
          height={16}
          className={i < lines - 1 ? 'mb-2' : ''}
        />
      ))}
    </div>
  );
}

interface BlogCardSkeletonProps {
  className?: string;
}

export function BlogCardSkeleton({ className = '' }: BlogCardSkeletonProps) {
  return (
    <div className={`blog-card-skeleton ${className}`} style={{
      background: 'white',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
    }}>
      <Skeleton variant="rectangular" height={220} borderRadius={0} />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Skeleton width={80} height={20} variant="rounded" />
          <Skeleton width={100} height={20} variant="rounded" />
        </div>
        <Skeleton width="90%" height={28} className="mb-3" />
        <Skeleton width="100%" height={16} className="mb-2" />
        <Skeleton width="75%" height={16} className="mb-4" />
        <Skeleton width={120} height={40} variant="rounded" />
      </div>
    </div>
  );
}

interface ServiceCardSkeletonProps {
  className?: string;
}

export function ServiceCardSkeleton({ className = '' }: ServiceCardSkeletonProps) {
  return (
    <div className={`service-card-skeleton ${className}`} style={{
      background: 'white',
      borderRadius: 16,
      padding: 30,
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <Skeleton variant="circular" width={70} height={70} />
      </div>
      <Skeleton width="70%" height={24} className="mb-3 mx-auto" />
      <Skeleton width="100%" height={14} className="mb-2" />
      <Skeleton width="100%" height={14} className="mb-2" />
      <Skeleton width="60%" height={14} className="mx-auto" />
    </div>
  );
}

interface TestimonialSkeletonProps {
  className?: string;
}

export function TestimonialSkeleton({ className = '' }: TestimonialSkeletonProps) {
  return (
    <div className={`testimonial-skeleton ${className}`} style={{
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 30,
      backdropFilter: 'blur(10px)'
    }}>
      <Skeleton width={40} height={40} variant="rounded" className="mb-4" animation="pulse" />
      <Skeleton width="100%" height={16} className="mb-2" animation="pulse" />
      <Skeleton width="100%" height={16} className="mb-2" animation="pulse" />
      <Skeleton width="70%" height={16} className="mb-4" animation="pulse" />
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width={16} height={16} variant="circular" animation="pulse" />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton variant="circular" width={60} height={60} animation="pulse" />
        <div>
          <Skeleton width={120} height={18} className="mb-2" animation="pulse" />
          <Skeleton width={150} height={14} animation="pulse" />
        </div>
      </div>
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className = ''
}: TableSkeletonProps) {
  return (
    <div className={`table-skeleton ${className}`} style={{
      background: 'white',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
        padding: 16,
        background: 'rgba(10, 77, 140, 0.05)',
        borderBottom: '1px solid rgba(10, 77, 140, 0.1)'
      }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height={20} variant="rounded" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 16,
            padding: 16,
            borderBottom: rowIndex < rows - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height={16} width={colIndex === 0 ? '80%' : '100%'} />
          ))}
        </div>
      ))}
    </div>
  );
}

interface FormSkeletonProps {
  fields?: number;
  className?: string;
}

export function FormSkeleton({
  fields = 4,
  className = ''
}: FormSkeletonProps) {
  return (
    <div className={`form-skeleton ${className}`}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <Skeleton width={100} height={14} className="mb-2" />
          <Skeleton height={48} variant="rounded" />
        </div>
      ))}
      <Skeleton width={150} height={48} variant="rounded" />
    </div>
  );
}

export default Skeleton;
