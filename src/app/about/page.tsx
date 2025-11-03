import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import EffectiveProtection from "../../components/Home/EffectiveProtection";
import ElectronicProtection from "../../components/Home/ElectronicProtection";
import SecurityApproach from "../../components/Home/SecurityApproach";
import Testimonials from "../../components/Common/Testimonials";
import Partner from "../../components/Common/Partner";
import Footer from "../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="About"
        homePageUrl="/"
        homePageText="Home"
        activePageText="About"
      />

      <EffectiveProtection />

      <ElectronicProtection />

      <div className="pt-100">
        <SecurityApproach />
      </div>

      <Testimonials />

      <Partner />

      <Footer />
    </>
  );
}
