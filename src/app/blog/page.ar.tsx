import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import BlogGrid from "../../components/Blog/BlogGrid";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="المدونة"
        homePageUrl="/"
        homePageText="الرئيسية"
        activePageText="المدونة"
      />

      <BlogGrid />

      <Footer />
    </>
  );
}
