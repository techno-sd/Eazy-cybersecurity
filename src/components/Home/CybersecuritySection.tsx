"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const CybersecuritySection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="approach-area pb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" style={{ order: isArabic ? 2 : 1 }}>
            <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
              <h2>{t.cybersecurity.section_title}</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                {t.cybersecurity.section_subtitle}
              </p>

              <ul>
                <li>
                  <i className="flaticon-cyber-security"></i>
                  <h3>{t.cybersecurity.pentest_title}</h3>
                  <p>{t.cybersecurity.pentest_desc}</p>
                </li>
                <li>
                  <i className="flaticon-password"></i>
                  <h3>{t.cybersecurity.compliance_title}</h3>
                  <p>{t.cybersecurity.compliance_desc}</p>
                </li>
                <li>
                  <i className="flaticon-cyber"></i>
                  <h3>{t.cybersecurity.soc_title}</h3>
                  <p>{t.cybersecurity.soc_desc}</p>
                </li>
                <li>
                  <i className="flaticon-profile"></i>
                  <h3>{t.cybersecurity.training_title}</h3>
                  <p>{t.cybersecurity.training_desc}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6" style={{ order: isArabic ? 1 : 2 }}>
            <div className="approach-img">
              <Image
                src="/img/cybersecurity-img.jpg"
                alt="Cybersecurity Services"
                width={660}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CybersecuritySection;
