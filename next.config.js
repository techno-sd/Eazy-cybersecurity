const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the root directory explicitly to avoid lockfile detection issues
  outputFileTracingRoot: path.join(__dirname),

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Strict-Transport-Security disabled for local development
          // Enable only in production
          ...(process.env.NODE_ENV === 'production' ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }] : []),
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Server',
            value: ''  // Remove server version disclosure
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'production'
              ? [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com data:",
                  "img-src 'self' data: https: blob:",
                  "connect-src 'self' https://www.google-analytics.com https://*.aivencloud.com",
                  "frame-src 'self' https://www.google.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'self'",
                  "block-all-mixed-content",
                  "upgrade-insecure-requests"
                ].join('; ')
              : [
                  // Development mode requires unsafe-eval for Next.js hot reloading
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com data:",
                  "img-src 'self' data: https: blob:",
                  "connect-src 'self' ws: wss: https://www.google-analytics.com https://*.aivencloud.com",
                  "frame-src 'self' https://www.google.com",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'self'"
                ].join('; ')
          }
        ]
      }
    ]
  },

  // Image optimization
  images: {
    domains: ['eazycyber.sa', 'localhost', '127.0.0.1', 'ui-avatars.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'eazycyber.sa',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['boxicons', 'fslightbox-react'],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://eazycyber.sa',
  },

  // Webpack configuration to fix Windows permission issues
  webpack: (config, { isServer, webpack }) => {
    // Only apply cache disabling on Windows
    if (process.platform === 'win32') {
      config.cache = false;

      // Set snapshot options to avoid scanning user directories
      config.snapshot = {
        managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
        immutablePaths: [],
        buildDependencies: {
          hash: true,
          timestamp: false,
        },
        module: {
          timestamp: false,
          hash: true,
        },
        resolve: {
          timestamp: false,
          hash: true,
        },
        resolveBuildDependencies: {
          timestamp: false,
          hash: true,
        },
      };

      // Ignore Windows system directories
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git', 'C:/Users/**/AppData/**', 'C:/Users/**/Application Data/**', 'C:/Users/**/Cookies/**'],
      };
    }

    // Add plugin to suppress warnings
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SUPPRESS_NO_CONFIG_WARNING': 'true',
      })
    );

    // Reduce logging verbosity
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
}

module.exports = nextConfig
