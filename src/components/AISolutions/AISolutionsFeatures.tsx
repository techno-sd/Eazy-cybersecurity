"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const AISolutionsFeatures: React.FC = () => {
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
    <section className="approach-area pt-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="approach-img">
              <Image
                src="/img/graph-img.png"
                alt="AI Solutions"
                width={660}
                height={700}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="approach-content">
              <h2>{t.aiSolutions.section_title}</h2>
              <p>{t.aiSolutions.section_subtitle}</p>

              <ul>
                {features.map((feature, index) => (
                  <li key={index}>
                    <i className={feature.icon}></i>
                    <h3>{(t.aiSolutions as any)[feature.titleKey]}</h3>
                    <p>{(t.aiSolutions as any)[feature.descKey]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISolutionsFeatures;
