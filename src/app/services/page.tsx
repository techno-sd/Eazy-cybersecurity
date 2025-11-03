import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import SecurityApproach from "../../components/ServicesStyleThree/SecurityApproach";
import EffectiveProtection from "../../components/ServicesStyleThree/EffectiveProtection";
import CyberSecurityOperation from "../../components/ServicesStyleThree/CyberSecurityOperation";
import RecentProjects from "../../components/Common/RecentProjects";
import Footer from "../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Services"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Services"
      />

      <SecurityApproach />

      <EffectiveProtection />

      <CyberSecurityOperation />

      <RecentProjects />

      <Footer />
    </>
  );
}
