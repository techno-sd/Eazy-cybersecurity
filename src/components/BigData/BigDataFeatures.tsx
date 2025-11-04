"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const BigDataFeatures: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);

  const features = [
    {
      icon: "bx bx-data",
      titleKey: "warehouse_title",
      descKey: "warehouse_desc",
    },
    {
      icon: "bx bx-bar-chart-alt-2",
      titleKey: "dashboard_title",
      descKey: "dashboard_desc",
    },
    {
      icon: "bx bx-search-alt",
      titleKey: "fraud_title",
      descKey: "fraud_desc",
    },
    {
      icon: "bx bx-shield-quarter",
      titleKey: "governance_title",
      descKey: "governance_desc",
    },
  ];

  return (
    <section className="complete-area pt-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 pl-0">
            <div
              className="complete-img"
              style={{
                backgroundImage: `url(/img/complete-img.jpg)`,
              }}
            ></div>
          </div>
          <div className="col-lg-6">
            <div className="complete-content">
              <h2>{t.bigData.section_title}</h2>

              <div className="row">
                {features.map((feature, index) => (
                  <div key={index} className="col-lg-6 col-sm-6">
                    <div className={`single-security ${index >= 2 ? 'mb-0' : ''} ${index === 2 ? 'mb-rs-need' : ''}`}>
                      <i className={feature.icon}></i>
                      <h3>{t.bigData[feature.titleKey]}</h3>
                      <p>{t.bigData[feature.descKey]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="complete-shape">
        <Image
          src="/img/complete-shape.png"
          alt="Image"
          width={423}
          height={611}
        />
      </div>
    </section>
  );
};

export default BigDataFeatures;
