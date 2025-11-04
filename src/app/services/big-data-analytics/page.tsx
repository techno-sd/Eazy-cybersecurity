import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import BigDataFeatures from "../../../components/BigData/BigDataFeatures";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Big Data & Analytics"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Big Data & Analytics"
      />

      <BigDataFeatures />

      <Footer />
    </>
  );
}
