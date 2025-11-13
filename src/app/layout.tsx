import "../../styles/bootstrap.min.css";
import "../../styles/animate.css";
import "../../styles/boxicons.min.css";
import "../../styles/flaticon.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "swiper/css";
import "swiper/css/bundle";

// Global Style
import "../../styles/style.scss";
import "../../styles/responsive.scss";
import "../../styles/_mobile-fixes.scss";
import "../../styles/_banner-responsive.scss";
import "../../styles/_navbar-mobile.scss";
import "../../styles/_vision-2030-enhanced.scss";
import "../../styles/_vision-2030-page-enhanced.scss";
import "../../styles/_industries-enhanced.scss";
import "../../styles/_services-enhanced.scss";
import "../../styles/_blog-enhancements.scss";
import "../../styles/_latest-news-responsive.scss";
import "../../styles/_about-enhanced.scss";

import type { Metadata } from "next";
import Providers from "./providers";
import { cookies } from "next/headers";
import { Rubik, Barlow_Condensed } from "next/font/google";

// For all body text font
const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

// For all heading font
const barlow_condensed = Barlow_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eazy Cyber Agent - Cybersecurity & Digital Transformation Solutions",
  description: "Eazy Cyber Agent - Leading Saudi cybersecurity company providing AI solutions, big data analytics, cloud computing, and digital transformation services aligned with Vision 2030",

  // Verification & Authentication
  verification: {
    google: "google-site-verification-code", // Replace with your Google verification code
    yandex: "yandex-verification-code", // Replace with your Yandex verification code
    other: {
      'facebook-domain-verification': 'facebook-verification-code', // Replace with your Facebook verification
      'pinterest-site-verification': 'pinterest-verification-code', // Replace with your Pinterest verification
    },
  },

  // Open Graph Authentication
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US', 'ar_AE'],
    url: 'https://eazycyber.sa',
    siteName: 'Eazy Cyber Agent',
    title: 'Eazy Cyber Agent - Cybersecurity & Digital Transformation Solutions',
    description: 'Leading Saudi cybersecurity company providing AI solutions, big data analytics, cloud computing, and digital transformation services aligned with Vision 2030',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eazy Cyber Agent',
      },
    ],
  },

  // Twitter Authentication
  twitter: {
    card: 'summary_large_image',
    title: 'Eazy Cyber Agent - Cybersecurity & Digital Transformation',
    description: 'Leading Saudi cybersecurity company aligned with Vision 2030',
    images: ['/img/twitter-image.jpg'],
    creator: '@eazycyber', // Replace with your Twitter handle
    site: '@eazycyber', // Replace with your Twitter handle
  },

  // Robots & SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional metadata
  authors: [{ name: 'Eazy Cyber Agent', url: 'https://eazycyber.sa' }],
  creator: 'Eazy Cyber Agent',
  publisher: 'Eazy Cyber Agent',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Keywords
  keywords: [
    'cybersecurity Saudi Arabia',
    'AI solutions KSA',
    'digital transformation',
    'Vision 2030',
    'cloud computing',
    'big data analytics',
    'cyber security Yanbu',
    'أمن سيبراني السعودية',
    'الذكاء الاصطناعي',
    'رؤية 2030',
  ],

  // App metadata
  applicationName: 'Eazy Cyber Agent',
  referrer: 'origin-when-cross-origin',
  category: 'technology',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const lang = cookieLang === "en" ? "en" : "ar";
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* Viewport Meta Tag for Mobile Responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />

        {/* Security & Authentication Meta Tags */}
        <meta name="theme-color" content="#0A4D8C" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Eazy Cyber" />

        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#0A4D8C" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://eazycyber.sa" />

        {/* Alternate Language Links */}
        <link rel="alternate" hrefLang="ar" href="https://eazycyber.sa/ar" />
        <link rel="alternate" hrefLang="en" href="https://eazycyber.sa/en" />
        <link rel="alternate" hrefLang="x-default" href="https://eazycyber.sa" />
      </head>
      <body className={`${rubik.variable} ${barlow_condensed.variable}`}>
        <Providers initialLang={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
