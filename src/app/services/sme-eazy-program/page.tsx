import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import SMEEazyFeatures from "../../../components/SMEEazy/SMEEazyFeatures";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="SME-EAZY Program"
        homePageUrl="/"
        homePageText="Home"
        activePageText="SME-EAZY Program"
      />

      <SMEEazyFeatures />

      <Footer />
    </>
  );
}
