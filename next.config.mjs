/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Static Export
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
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
