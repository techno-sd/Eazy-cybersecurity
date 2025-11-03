import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import LetsGetToWork from "../../components/Common/LetsGetToWork";
import ProjectsCard from "../../components/Projects/ProjectsCard";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Projects"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Projects"
      />

      <ProjectsCard />

      <div className="pb-100">
        <LetsGetToWork />
      </div>

      <Footer />
    </>
  );
}
