/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Static Export
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Removed optimizeFonts (deprecated in Next.js 15)
  // Removed i18n config (not supported in App Router)
  async rewrites() {
    return [
      {
        source: "/:locale(en|ar)",
        destination: "/",
        locale: false,
      },
      {
        source: "/:locale(en|ar)/:path*",
        destination: "/:path*",
        locale: false,
      },
    ];
  },
};

export default nextConfig;
