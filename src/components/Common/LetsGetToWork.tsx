"use client";
  
import React from "react";
import Link from "next/link";

const LetsGetToWork: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="get-to-work">
          <p>READY TO DO THIS</p>
          <h1>Let&apos;s get to work!</h1>

          <Link href="/contact" className="contact-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default LetsGetToWork;
