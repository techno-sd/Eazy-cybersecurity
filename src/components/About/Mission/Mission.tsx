"use client";

import React from "react";

interface MissionProps {
  lang: string;
  missionTitle: string;
  missionContent: string;
}

const Mission: React.FC<MissionProps> = ({ lang, missionTitle, missionContent }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Mission Hero Section */}
      <div className="mission-hero-section">
        <div className="container">
          <div className="mission-hero-content">
            <div className="mission-hero-overlay">
              <h1 className={isArabic ? "rtl-text" : "ltr-text"}>
                {missionTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Main Content Area */}
      <div className="mission-content-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className={`mission-single-wrapper ${isArabic ? 'rtl-layout' : 'ltr-layout'}`}>
                <div className="mission-section">
                  <p className="mission-text">
                    {missionContent}
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

export default Mission;
