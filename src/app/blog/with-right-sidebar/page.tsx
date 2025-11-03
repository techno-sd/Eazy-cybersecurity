import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import BlogCardStyleTwo from "../../../components/Blog/BlogCardStyleTwo";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Blog Right Sidebar"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Right Sidebar"
      />

      <BlogCardStyleTwo />

      <Footer />
    </>
  );
}
