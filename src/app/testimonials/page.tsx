import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import TestimonialsCard from "../../components/Testimonials/TestimonialsCard";
import Footer from "../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Testimonials"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Testimonials"
      />

      <TestimonialsCard />

      <Footer />
    </>
  );
}
