"use client";

import React from "react";

interface VisionProps {
  lang: string;
  visionTitle: string;
  visionContent: string;
}

const Vision: React.FC<VisionProps> = ({ lang, visionTitle, visionContent }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Vision Hero Section */}
      <div className="vision-hero-section">
        <div className="container">
          <div className="vision-hero-content">
            <div className="vision-hero-overlay">
              <h1 className={isArabic ? "rtl-text" : "ltr-text"}>
                {visionTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Main Content Area */}
      <div className="vision-content-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className={`vision-single-wrapper ${isArabic ? 'rtl-layout' : 'ltr-layout'}`}>
                <div className="vision-section">
                  <p className="vision-text">
                    {visionContent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vision;
