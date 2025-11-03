import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import PageBanner from "../../../components/Common/PageBanner"; 
import Footer from "../../../components/Layouts/Footer";
import LetsGetToWork from "../../../components/Common/LetsGetToWork";
import ProjectDetailsContent from "../../../components/Projects/ProjectDetailsContent";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Project Details"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Project Details"
      />

      <ProjectDetailsContent />

      <div className="pb-100">
        <LetsGetToWork />
      </div>

      <Footer />
    </>
  );
}
