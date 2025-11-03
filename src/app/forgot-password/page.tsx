import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Forgot Password"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Forgot Password"
      />

      <ForgotPasswordForm />

      <Footer />
    </>
  );
}
