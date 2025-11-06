"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const AIServicesSection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="approach-area pb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="approach-img">
              <Image
                src="/img/services/ai.jpg"
                alt="AI Solutions"
                width={660}
                height={700}
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
              <h2>{t.aiSolutions.section_title}</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                {t.aiSolutions.section_subtitle}
              </p>

              <ul>
                <li>
                  <i className="flaticon-cyber"></i>
                  <h3>{t.aiSolutions.chatbot_title}</h3>
                  <p>{t.aiSolutions.chatbot_desc}</p>
                </li>
                <li>
                  <i className="flaticon-profile"></i>
                  <h3>{t.aiSolutions.predictive_title}</h3>
                  <p>{t.aiSolutions.predictive_desc}</p>
                </li>
                <li>
                  <i className="flaticon-cyber-security"></i>
                  <h3>{t.aiSolutions.threat_title}</h3>
                  <p>{t.aiSolutions.threat_desc}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIServicesSection;
