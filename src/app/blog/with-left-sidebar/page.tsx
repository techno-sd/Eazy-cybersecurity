import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import BlogCardStyleOne from "../../../components/Blog/BlogCardStyleOne";
import Footer from "../../../components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Blog Left Sidebar"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Left Sidebar"
      />

      <BlogCardStyleOne />

      <Footer />
    </>
  );
}
