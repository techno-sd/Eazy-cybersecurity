import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import CloudHostingFeatures from "../../../components/CloudHosting/CloudHostingFeatures";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Cloud Computing & Hosting"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Cloud Computing & Hosting"
      />

      <CloudHostingFeatures />

      <Footer />
    </>
  );
}
