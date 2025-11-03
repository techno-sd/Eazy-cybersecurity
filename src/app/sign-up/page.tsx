import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import SignUpForm from "../../components/Auth/SignUpForm";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Sign Up"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Sign Up"
      />

      <SignUpForm />

      <Footer />
    </>
  );
}
