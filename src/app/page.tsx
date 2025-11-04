import Navbar from "../components/Layouts/Navbar";
import MainBanner from "../components/Home/MainBanner";
import Partner from "../components/Common/Partner";
import Vision2030Section from "../components/Home/Vision2030Section";
import ServicesOverview from "../components/Home/ServicesOverview";
import IndustriesPreview from "../components/Home/IndustriesPreview";
import SecurityApproach from "../components/Home/SecurityApproach";
import HighPerformanceSolutions from "../components/Home/HighPerformanceSolutions";
import ElectronicProtection from "../components/Home/ElectronicProtection";
import EffectiveProtection from "../components/Home/EffectiveProtection";
import Testimonials from "../components/Common/Testimonials";
import CyberSecurityOperation from "../components/Home/CyberSecurityOperation";
import LatesNews from "../components/Common/LatesNews";
import Footer from "../components/Layouts/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <MainBanner />

      <Partner />

      <Vision2030Section />

      <ServicesOverview />

      <IndustriesPreview />

      <SecurityApproach />

      <HighPerformanceSolutions />

      <ElectronicProtection />

      <EffectiveProtection />

      <Testimonials />

      <CyberSecurityOperation />

      <LatesNews />

      <Footer />
    </>
  );
}
