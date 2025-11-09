import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/home/MainBanner";
import LazyLoad from '../components/Common/LazyLoad';
import Vision2030Section from "../components/home/Vision2030Section";
import IndustriesSection from "../components/home/IndustriesSection";
import ServicesSectionHeader from "../components/home/ServicesSectionHeader";
import HomeServices from "../components/home/HomeServices";
import ServicesCTA from "../components/home/ServicesCTA";
import Testimonials from "../components/Common/Testimonials";
import LatesNews from "../components/Common/LatesNews";
import ContactCTA from "../components/home/ContactCTA";
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
        <ServicesSectionHeader />
      </LazyLoad>

      <LazyLoad delay={100}>
        <HomeServices />
      </LazyLoad>

      <LazyLoad delay={100}>
        <ServicesCTA />
      </LazyLoad>

      <LazyLoad delay={150}>
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
