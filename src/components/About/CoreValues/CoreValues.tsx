"use client";

import React from "react";

interface CoreValue {
  title: string;
  description: string;
}

interface CoreValuesProps {
  lang: string;
  coreValuesTitle: string;
  coreValues: CoreValue[];
}

const CoreValues: React.FC<CoreValuesProps> = ({ lang, coreValuesTitle, coreValues }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Core Values Hero Section */}
      <div className="core-values-hero-section">
        <div className="container">
          <div className="core-values-hero-content">
            <div className="core-values-hero-overlay">
              <h1 className={isArabic ? "rtl-text" : "ltr-text"}>
                {coreValuesTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Main Content Area */}
      <div className="core-values-content-area ptb-100">
        <div className="container">
          <div className={`core-values-grid ${isArabic ? 'rtl-layout' : 'ltr-layout'}`}>
            {coreValues.map((value, index) => (
              <div key={index} className="core-value-card">
                <div className="core-value-content">
                  <h3 className="core-value-title">{value.title}</h3>
                  <p className="core-value-description">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoreValues;
