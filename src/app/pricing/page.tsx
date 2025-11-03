import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import PricingPlan from "../../components/Pricing/PricingPlan";
import Footer from "../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Pricing"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Pricing"
      />

      <div className="pt-100">
        <PricingPlan />
      </div>

      <Footer />
    </>
  );
}
