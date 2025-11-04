"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const AISolutionsComplete: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);

  const features = [
    {
      icon: "bx bx-bot",
      titleKey: "chatbot_title",
      descKey: "chatbot_desc",
    },
    {
      icon: "bx bx-line-chart",
      titleKey: "predictive_title",
      descKey: "predictive_desc",
    },
    {
      icon: "bx bx-shield-alt-2",
      titleKey: "threat_title",
      descKey: "threat_desc",
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
                backgroundImage: `url(/img/graph-img.png)`,
              }}
            ></div>
          </div>
          <div className="col-lg-6">
            <div className="complete-content">
              <h2>{t.aiSolutions.section_title}</h2>
              <p>{t.aiSolutions.section_subtitle}</p>

              <div className="row">
                {features.map((feature, index) => (
                  <div key={index} className="col-lg-6 col-sm-6">
                    <div className={`single-security ${index >= 2 ? 'mb-0 mb-rs-need' : ''}`}>
                      <i className={feature.icon}></i>
                      <h3>{(t.aiSolutions as any)[feature.titleKey]}</h3>
                      <p>{(t.aiSolutions as any)[feature.descKey]}</p>
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

export default AISolutionsComplete;
