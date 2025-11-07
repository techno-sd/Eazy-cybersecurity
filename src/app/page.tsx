import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/Home/MainBanner";
import LazyLoad from '../components/Common/LazyLoad';
import Vision2030Section from "../components/Home/Vision2030Section";
import IndustriesSection from "../components/Home/IndustriesSection";
import ServicesIntro from "../components/Home/ServicesIntro";
import AIServicesSection from "../components/Home/AIServicesSection";
import CybersecuritySection from "../components/Home/CybersecuritySection";
import BigDataSection from "../components/Home/BigDataSection";
import CloudComputingSection from "../components/Home/CloudComputingSection";
import SMEEazySection from "../components/Home/SMEEazySection";
import Testimonials from "../components/Common/Testimonials";
import LatesNews from "../components/Common/LatesNews";
import ContactCTA from "../components/Home/ContactCTA";
import Footer from "../components/Layouts/Footer";

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
