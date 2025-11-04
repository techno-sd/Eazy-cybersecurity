"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const CybersecurityFeatures: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);

  const features = [
    {
      icon: "bx bx-bug",
      titleKey: "pentest_title",
      descKey: "pentest_desc",
    },
    {
      icon: "bx bx-check-shield",
      titleKey: "compliance_title",
      descKey: "compliance_desc",
    },
    {
      icon: "bx bx-shield-quarter",
      titleKey: "soc_title",
      descKey: "soc_desc",
    },
    {
      icon: "bx bx-user-voice",
      titleKey: "training_title",
      descKey: "training_desc",
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
                backgroundImage: `url(/img/cybersecurity-img.jpg)`,
              }}
            ></div>
          </div>
          <div className="col-lg-6">
            <div className="complete-content">
              <h2>{t.cybersecurity.section_title}</h2>
              <p>{t.cybersecurity.section_subtitle}</p>

              <div className="row">
                {features.map((feature, index) => (
                  <div key={index} className="col-lg-6 col-sm-6">
                    <div className={`single-security ${index >= 2 ? 'mb-0' : ''} ${index === 2 ? 'mb-rs-need' : ''}`}>
                      <i className={feature.icon}></i>
                      <h3>{t.cybersecurity[feature.titleKey]}</h3>
                      <p>{t.cybersecurity[feature.descKey]}</p>
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

export default CybersecurityFeatures;
