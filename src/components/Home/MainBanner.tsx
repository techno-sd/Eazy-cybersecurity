"use client";
  
import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import Link from "next/link";
import Features from "./Features";

const MainBanner: React.FC = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/embed/bk7McNUjWgw"]}
      />

      <div 
        className="banner-area"
        style={{
          backgroundImage: `url(/img/home-one/home1-banner.jpg)`
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9">
              <div className="banner-text">
                <span>
                  All Research up to Blockchain Interoperability is completed
                </span>
                <h1>Modern Information Protect from Hackers</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  architecto laborum eaque! Deserunt maxime, minus quas
                  molestiae reiciendis esse natus nisi iure.
                </p>

                <div className="banner-btn">
                  <Link href="/contact" className="default-btn">
                    Booking Now
                  </Link>
                  
                  <Link href="/about" className="default-btn active">
                    About Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="video-btn-animat one">
                <div onClick={() => setToggler(!toggler)} className="video-btn">
                  <i className="bx bx-play"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <Features />

        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
