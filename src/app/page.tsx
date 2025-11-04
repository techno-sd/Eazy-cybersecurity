import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/Home/MainBanner";
// import Partner from "../components/Common/Partner";
import Vision2030Section from "../components/Home/Vision2030Section";
import IndustriesPreview from "../components/Home/IndustriesPreview";
import ServicesIntro from "../components/Home/ServicesIntro";
import AIServicesSection from "../components/Home/AIServicesSection";
import CybersecuritySection from "../components/Home/CybersecuritySection";
import BigDataSection from "../components/Home/BigDataSection";
import CloudComputingSection from "../components/Home/CloudComputingSection";
import SMEEazySection from "../components/Home/SMEEazySection";
// import SecurityApproach from "../components/Home/SecurityApproach";
// import HighPerformanceSolutions from "../components/Home/HighPerformanceSolutions";
// import ElectronicProtection from "../components/Home/ElectronicProtection";
// import EffectiveProtection from "../components/Home/EffectiveProtection";
import Testimonials from "../components/Common/Testimonials";
// import CyberSecurityOperation from "../components/Home/CyberSecurityOperation";
import LatesNews from "../components/Common/LatesNews";
import ContactCTA from "../components/Home/ContactCTA";
import Footer from "../components/Layouts/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <MainBanner />

      {/* Partner section removed */}

      <Vision2030Section />

      <IndustriesPreview />

      <ServicesIntro />

      <AIServicesSection />

      <CybersecuritySection />

      <BigDataSection />

      <CloudComputingSection />

      <SMEEazySection />

  {/* <SecurityApproach /> */}

  {/* <HighPerformanceSolutions /> */}

  {/* <ElectronicProtection /> */}

  {/* <EffectiveProtection /> */}

      <Testimonials />

  {/* <CyberSecurityOperation /> */}

      <LatesNews />

      <ContactCTA />

      <Footer />
    </>
  );
}
