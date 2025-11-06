import dynamic from 'next/dynamic';
import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/Home/MainBanner";
import LazyLoad from '../components/Common/LazyLoad';

// Lazy load sections for optimal performance
const Vision2030Section = dynamic(() => import("../components/Home/Vision2030Section"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const IndustriesSection = dynamic(() => import("../components/Home/IndustriesSection"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const ServicesIntro = dynamic(() => import("../components/Home/ServicesIntro"), {
  loading: () => <div style={{ height: '300px', background: '#f8f9fa' }} />,
});
const AIServicesSection = dynamic(() => import("../components/Home/AIServicesSection"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const CybersecuritySection = dynamic(() => import("../components/Home/CybersecuritySection"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const BigDataSection = dynamic(() => import("../components/Home/BigDataSection"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const CloudComputingSection = dynamic(() => import("../components/Home/CloudComputingSection"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const SMEEazySection = dynamic(() => import("../components/Home/SMEEazySection"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const Testimonials = dynamic(() => import("../components/Common/Testimonials"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const LatesNews = dynamic(() => import("../components/Common/LatesNews"), {
  loading: () => <div style={{ height: '400px', background: '#f8f9fa' }} />,
});
const ContactCTA = dynamic(() => import("../components/Home/ContactCTA"), {
  loading: () => <div style={{ height: '300px', background: '#f8f9fa' }} />,
});
const Footer = dynamic(() => import("../components/Layouts/Footer"), {
  loading: () => <div style={{ height: '200px', background: '#1a1a1a' }} />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <MainBanner />

      {/* Lazy loaded sections with animations */}
      <LazyLoad delay={100}>
        <Vision2030Section />
      </LazyLoad>

      <LazyLoad delay={150}>
        <IndustriesSection />
      </LazyLoad>

      <LazyLoad delay={100}>
        <ServicesIntro />
      </LazyLoad>

      <LazyLoad delay={150}>
        <AIServicesSection />
      </LazyLoad>

      <LazyLoad delay={100}>
        <CybersecuritySection />
      </LazyLoad>

      <LazyLoad delay={150}>
        <BigDataSection />
      </LazyLoad>

      <LazyLoad delay={100}>
        <CloudComputingSection />
      </LazyLoad>

      <LazyLoad delay={150}>
        <SMEEazySection />
      </LazyLoad>

      <LazyLoad delay={100}>
        <Testimonials />
      </LazyLoad>

      <LazyLoad delay={150}>
        <LatesNews />
      </LazyLoad>

      <LazyLoad delay={100}>
        <ContactCTA />
      </LazyLoad>

      <Footer />
    </>
  );
}
