import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import AISolutionsComplete from "../../../components/AISolutions/AISolutionsComplete";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="AI Solutions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="AI Solutions"
      />

      <AISolutionsComplete />

      <Footer />
    </>
  );
}
