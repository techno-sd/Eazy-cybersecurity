/** @type {import('next').NextConfig} */
const nextConfig = {
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
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
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://www.google-analytics.com https://*.aivencloud.com",
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  },

  // Image optimization
  images: {
    domains: ['eazycyber.sa', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://eazycyber.sa',
  },

  // Webpack configuration to fix Windows permission issues
  webpack: (config, { isServer, webpack }) => {
    // Disable file system caching for Windows
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

    // Add plugin to suppress warnings
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SUPPRESS_NO_CONFIG_WARNING': 'true',
      })
    );

    // Add ignored patterns to prevent scanning user directories
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
}

module.exports = nextConfig
