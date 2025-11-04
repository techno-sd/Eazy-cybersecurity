import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import CybersecurityFeatures from "../../../components/Cybersecurity/CybersecurityFeatures";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Cybersecurity Services"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Cybersecurity Services"
      />

      <CybersecurityFeatures />

      <Footer />
    </>
  );
}
