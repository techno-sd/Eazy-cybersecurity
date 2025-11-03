import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import FaqStyleOne from "../../components/Common/FaqStyleOne";
import FaqForm from "../../components/Faq/FaqForm";
import Footer from "../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="FAQ"
        homePageUrl="/"
        homePageText="Home"
        activePageText="FAQ"
      />

      <FaqStyleOne />

      <FaqForm />

      <Footer />
    </>
  );
}
