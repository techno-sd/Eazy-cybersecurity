import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/Home/MainBanner";
import LazyLoad from '../components/Common/LazyLoad';

// Metadata for SEO and performance
export const metadata: Metadata = {
  title: 'Eazy Cyber Agent | Leading Cybersecurity & AI Solutions in Saudi Arabia',
  description: 'Eazy Cyber Agent provides cutting-edge cybersecurity, AI, cloud computing, and big data solutions across Saudi Arabia. Aligned with Vision 2030.',
  keywords: 'cybersecurity Saudi Arabia, AI solutions, cloud computing, big data, Vision 2030, digital transformation',
  openGraph: {
    title: 'Eazy Cyber Agent | Cybersecurity & AI Experts',
    description: 'Leading provider of cybersecurity and AI solutions in Saudi Arabia',
    type: 'website',
  },
};

// Dynamic imports with loading states for better performance
const Vision2030Section = dynamic(() => import("../components/Home/Vision2030Section"), {
  loading: () => null,
  ssr: true
});

const IndustriesSection = dynamic(() => import("../components/Home/IndustriesSection"), {
  loading: () => null,
  ssr: true
});

const ServicesSectionHeader = dynamic(() => import("../components/Home/ServicesSectionHeader"), {
  loading: () => null,
  ssr: true
});

const HomeServices = dynamic(() => import("../components/Home/HomeServices"), {
  loading: () => null,
  ssr: true
});

const ServicesCTA = dynamic(() => import("../components/Home/ServicesCTA"), {
  loading: () => null
});

const StatsCounter = dynamic(() => import("../components/Home/StatsCounter"), {
  loading: () => null
});

const Testimonials = dynamic(() => import("../components/Common/Testimonials"), {
  loading: () => null
});

const LatesNews = dynamic(() => import("../components/Common/LatesNews"), {
  loading: () => null
});

const Footer = dynamic(() => import("../components/Layouts/Footer"), {
  loading: () => null,
  ssr: true
});

export default function Home() {
  return (
    <>
      <Navbar />
      <MainBanner />

      {/* Lazy loaded sections with animations - reduced delays for faster perception */}
      <LazyLoad delay={50}>
        <Vision2030Section />
      </LazyLoad>

      <LazyLoad delay={50}>
        <IndustriesSection />
      </LazyLoad>

      <LazyLoad delay={50}>
        <ServicesSectionHeader />
      </LazyLoad>

      <LazyLoad delay={50}>
        <HomeServices />
      </LazyLoad>

      <LazyLoad delay={50}>
        <ServicesCTA />
      </LazyLoad>

      <LazyLoad delay={50}>
        <StatsCounter />
      </LazyLoad>

      <LazyLoad delay={75}>
        <Testimonials />
      </LazyLoad>

      <LazyLoad delay={75}>
        <LatesNews />
      </LazyLoad>

      <Footer />
    </>
  );
}
