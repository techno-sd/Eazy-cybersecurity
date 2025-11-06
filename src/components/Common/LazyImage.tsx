'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLazyLoad } from '@/hooks/useLazyLoad';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  threshold?: number;
  rootMargin?: string;
  quality?: number;
}

/**
 * Progressive Image Loading Component
 * Features:
 * - Blur-up placeholder effect
 * - Lazy loading with Intersection Observer
 * - Smooth fade-in animation
 * - Next.js Image optimization
 * - Fallback for non-optimized images
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  placeholder,
  className = '',
  style = {},
  priority = false,
  threshold = 0.1,
  rootMargin = '100px',
  quality = 75,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isVisible } = useLazyLoad({ threshold, rootMargin, triggerOnce: true });

  useEffect(() => {
    if (!isVisible || !src) return;

    const image = document.createElement('img');
    image.src = src;
    image.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    image.onerror = () => {
      setImageSrc(src); // Fallback to src if load fails
      setIsLoaded(true);
    };
  }, [isVisible, src]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholder ? '#f0f0f0' : 'transparent',
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    opacity: isLoaded ? 1 : 0.7,
    filter: isLoaded ? 'blur(0px)' : 'blur(8px)',
    transition: 'opacity 0.5s ease, filter 0.5s ease',
    willChange: 'opacity, filter',
  };

  if (!width || !height) {
    // Fallback for img tag when dimensions not provided
    return (
      <div ref={ref} style={containerStyle} className={className}>
        <img
          src={imageSrc || src}
          alt={alt}
          style={imageStyle}
          onLoad={() => setIsLoaded(true)}
          className={className}
        />
      </div>
    );
  }

  return (
    <div ref={ref} style={containerStyle} className={className}>
      <Image
        src={imageSrc || src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        style={imageStyle}
        onLoadingComplete={() => setIsLoaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  );
};

export default LazyImage;
