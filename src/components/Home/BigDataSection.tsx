"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const BigDataSection: React.FC = () => {
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
                src="/img/services/bigdata.jpg"
                alt="Big Data & Analytics"
                width={660}
                height={700}
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
              <h2>{t.bigData.section_title}</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                {isArabic
                  ? 'حوّل بياناتك الضخمة إلى ذكاء أعمال قابل للتنفيذ مع حلول التحليلات المتقدمة لدينا.'
                  : 'Transform your data into actionable business intelligence with our advanced analytics solutions.'}
              </p>

              <ul>
                <li>
                  <i className="flaticon-database"></i>
                  <h3>{t.bigData.warehouse_title}</h3>
                  <p>{t.bigData.warehouse_desc}</p>
                </li>
                <li>
                  <i className="flaticon-cyber"></i>
                  <h3>{t.bigData.dashboard_title}</h3>
                  <p>{t.bigData.dashboard_desc}</p>
                </li>
                <li>
                  <i className="flaticon-profile"></i>
                  <h3>{t.bigData.fraud_title}</h3>
                  <p>{t.bigData.fraud_desc}</p>
                </li>
                <li>
                  <i className="flaticon-cyber-security"></i>
                  <h3>{t.bigData.governance_title}</h3>
                  <p>{t.bigData.governance_desc}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigDataSection;
