"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const Vision2030Section: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="security-area pt-100 pb-100" style={{
      background: 'linear-gradient(135deg, rgba(216, 6, 80, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)',
      position: 'relative'
    }}>
      <div className="container">
        <div className="row align-items-center" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {/* Content Column */}
          <div className="col-lg-6 col-md-12">
            <div className="security-content" style={{ textAlign: isArabic ? 'right' : 'left' }}>
              <div className="section-title" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-flag"></i>
                  {t.home.vision2030.title}
                </span>
                <h2>{t.home.vision2030.title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.home.vision2030.content}
                </p>
              </div>

              <Link href="/vision-2030" className="default-btn">
                {t.home.vision2030.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-lg-6 col-md-12">
            <div className="security-img" style={{ marginTop: isArabic ? '0' : '30px' }}>
              <Image
                src="/img/vision-2020.jpg"
                alt="Saudi Vision 2030"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision2030Section;
