/**
 * Performance Optimization Utilities
 *
 * This file contains utilities for:
 * - Image optimization
 * - Caching strategies
 * - Performance monitoring
 * - Resource hints
 */

/**
 * Image Optimization Configuration
 */
export const IMAGE_CONFIG = {
  // Supported formats in order of preference
  FORMATS: ['image/avif', 'image/webp', 'image/jpeg'] as const,

  // Quality settings
  QUALITY: {
    HIGH: 90,
    MEDIUM: 75,
    LOW: 60,
    THUMBNAIL: 50,
  },

  // Responsive image sizes
  SIZES: {
    THUMBNAIL: 150,
    SMALL: 320,
    MEDIUM: 640,
    LARGE: 1024,
    XLARGE: 1920,
  },

  // Device pixel ratios to support
  DEVICE_PIXEL_RATIOS: [1, 2, 3],
} as const;

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  // Static assets (images, fonts, etc.)
  STATIC_ASSETS: {
    maxAge: 31536000, // 1 year in seconds
    staleWhileRevalidate: 86400, // 1 day
  },

  // API responses
  API: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    VERY_LONG: 86400, // 1 day
  },

  // HTML pages
  PAGES: {
    STATIC: 3600, // 1 hour
    DYNAMIC: 60, // 1 minute
    NO_CACHE: 0,
  },
} as const;

/**
 * Get cache control header string
 *
 * @param maxAge - Max age in seconds
 * @param options - Additional cache options
 * @returns Cache-Control header value
 */
export function getCacheControlHeader(
  maxAge: number,
  options?: {
    sMaxAge?: number;
    staleWhileRevalidate?: number;
    staleIfError?: number;
    public?: boolean;
    immutable?: boolean;
  }
): string {
  const parts: string[] = [];

  // Public or private
  parts.push(options?.public !== false ? 'public' : 'private');

  // Max age
  parts.push(`max-age=${maxAge}`);

  // Shared cache max age (CDN)
  if (options?.sMaxAge !== undefined) {
    parts.push(`s-maxage=${options.sMaxAge}`);
  }

  // Stale while revalidate
  if (options?.staleWhileRevalidate !== undefined) {
    parts.push(`stale-while-revalidate=${options.staleWhileRevalidate}`);
  }

  // Stale if error
  if (options?.staleIfError !== undefined) {
    parts.push(`stale-if-error=${options.staleIfError}`);
  }

  // Immutable
  if (options?.immutable) {
    parts.push('immutable');
  }

  return parts.join(', ');
}

/**
 * Generate responsive image srcset
 *
 * @param baseUrl - Base image URL
 * @param sizes - Array of sizes to generate
 * @returns srcset string
 */
export function generateSrcSet(baseUrl: string, sizes: number[]): string {
  return sizes.map((size) => `${baseUrl}?w=${size} ${size}w`).join(', ');
}

/**
 * Generate sizes attribute for responsive images
 *
 * @param breakpoints - Object with breakpoint sizes
 * @returns sizes string
 */
export function generateSizesAttribute(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default: string;
}): string {
  const parts: string[] = [];

  if (breakpoints.mobile) {
    parts.push(`(max-width: 640px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    parts.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    parts.push(`(min-width: 1025px) ${breakpoints.desktop}`);
  }

  parts.push(breakpoints.default);

  return parts.join(', ');
}

/**
 * Debounce function for performance optimization
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 *
 * @param func - Function to throttle
 * @param limit - Minimum time between executions in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load configuration for images
 */
export const LAZY_LOAD_CONFIG = {
  // Intersection Observer options
  rootMargin: '50px', // Load images 50px before they enter viewport
  threshold: 0.01, // Trigger when 1% of image is visible

  // Placeholder
  placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',

  // Loading strategy
  loading: 'lazy' as const,
} as const;

/**
 * Preload critical resources
 *
 * @param resources - Array of resource URLs with types
 * @returns Array of link elements for preloading
 */
export function preloadResources(
  resources: Array<{ href: string; as: string; type?: string }>
): string {
  return resources
    .map(
      (resource) =>
        `<link rel="preload" href="${resource.href}" as="${resource.as}"${
          resource.type ? ` type="${resource.type}"` : ''
        }>`
    )
    .join('\n');
}

/**
 * DNS prefetch for external domains
 *
 * @param domains - Array of domain URLs
 * @returns Link elements for DNS prefetch
 */
export function dnsPrefetch(domains: string[]): string {
  return domains.map((domain) => `<link rel="dns-prefetch" href="${domain}">`).join('\n');
}

/**
 * Preconnect to critical origins
 *
 * @param origins - Array of origin URLs
 * @returns Link elements for preconnect
 */
export function preconnect(origins: string[]): string {
  return origins.map((origin) => `<link rel="preconnect" href="${origin}">`).join('\n');
}

/**
 * Performance Metrics Tracking
 */
export interface PerformanceMetrics {
  TTFB: number; // Time to First Byte
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTI: number; // Time to Interactive
}

/**
 * Get Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    GOOD: 2500,
    NEEDS_IMPROVEMENT: 4000,
  },
  FID: {
    GOOD: 100,
    NEEDS_IMPROVEMENT: 300,
  },
  CLS: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
  },
  TTFB: {
    GOOD: 800,
    NEEDS_IMPROVEMENT: 1800,
  },
  FCP: {
    GOOD: 1800,
    NEEDS_IMPROVEMENT: 3000,
  },
} as const;

/**
 * Resource Hints for critical assets
 */
export const RESOURCE_HINTS = {
  // Fonts
  FONTS: [
    '/fonts/boxicons.woff2',
    '/fonts/Flaticon.woff2',
  ],

  // Critical images
  CRITICAL_IMAGES: [
    '/img/logo-white.png',
    '/img/logo.png',
  ],

  // External domains to prefetch
  EXTERNAL_DOMAINS: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
} as const;

/**
 * Bundle optimization recommendations
 */
export const BUNDLE_OPTIMIZATION = {
  // Code splitting strategies
  SPLIT_CHUNKS: {
    vendor: ['react', 'react-dom', 'next'],
    ui: ['swiper', 'fslightbox-react', 'react-accessible-accordion'],
    utils: ['bcryptjs', 'jsonwebtoken'],
  },

  // Dynamic imports for heavy components
  DYNAMIC_IMPORTS: [
    'Admin components (only for /admin routes)',
    'Blog editor (only for /admin/blog routes)',
    'Charts and graphs',
    'Heavy animations',
  ],

  // Tree shaking opportunities
  TREE_SHAKING: [
    'Import only needed lodash functions',
    'Use specific icon imports instead of full icon libraries',
    'Import only used Bootstrap components',
  ],
} as const;

/**
 * API Response optimization
 */
export function optimizeApiResponse<T>(
  data: T,
  options?: {
    cache?: boolean;
    cacheTime?: number;
    compress?: boolean;
  }
): {
  data: T;
  headers: Record<string, string>;
} {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add cache headers
  if (options?.cache) {
    headers['Cache-Control'] = getCacheControlHeader(
      options.cacheTime || CACHE_CONFIG.API.MEDIUM
    );
  } else {
    headers['Cache-Control'] = 'no-store';
  }

  // Add security headers
  headers['X-Content-Type-Options'] = 'nosniff';

  return { data, headers };
}

/**
 * Database query optimization helpers
 */
export const DB_OPTIMIZATION = {
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // Batch operations
  BATCH_SIZE: 1000,

  // Connection pooling
  POOL_CONFIG: {
    MIN: 2,
    MAX: 10,
    IDLE_TIMEOUT: 30000, // 30 seconds
  },
} as const;

/**
 * Memoization helper for expensive computations
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxCacheSize = 100
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);

    // Implement LRU cache eviction
    if (cache.size >= maxCacheSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);
    return result;
  }) as T;
}
