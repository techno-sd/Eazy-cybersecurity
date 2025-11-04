"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AboutPreviewProps {
  lang: string;
  t: any;
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  return (
    <section className="security-area pt-100 pb-70">
      <div className="container">
        <div className="row align-items-center" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {/* Image Column */}
          <div className="col-lg-6 col-md-12">
            <div className="security-img" style={{ marginBottom: isArabic ? '0' : '30px' }}>
              <Image
                src="/img/about-img.png"
                alt={t.home.about_preview.title}
                width={600}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-6 col-md-12">
            <div className="security-content" style={{ textAlign: isArabic ? 'right' : 'left' }}>
              <div className="section-title" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-info-circle"></i>
                  {t.home.about_preview.title}
                </span>
                <h2>{t.home.about_preview.title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.home.about_preview.intro}
                </p>
              </div>

              {/* Three Mini Cards */}
              <div className="row" style={{ marginBottom: '30px' }}>
                <div className="col-lg-4 col-sm-4 col-6">
                  <div className="single-security" style={{ textAlign: 'center', padding: '20px 10px' }}>
                    <i className="bx bx-bullseye" style={{ fontSize: '40px', color: '#0A4D8C' }}></i>
                    <h4 style={{ fontSize: '16px', marginTop: '10px', marginBottom: '5px' }}>
                      {t.home.about_preview.vision_card}
                    </h4>
                    <p style={{ fontSize: '13px', marginBottom: '0' }}>
                      {t.home.about_preview.vision_text}
                    </p>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-4 col-6">
                  <div className="single-security" style={{ textAlign: 'center', padding: '20px 10px' }}>
                    <i className="bx bx-rocket" style={{ fontSize: '40px', color: '#0A4D8C' }}></i>
                    <h4 style={{ fontSize: '16px', marginTop: '10px', marginBottom: '5px' }}>
                      {t.home.about_preview.mission_card}
                    </h4>
                    <p style={{ fontSize: '13px', marginBottom: '0' }}>
                      {t.home.about_preview.mission_text}
                    </p>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-4 col-12">
                  <div className="single-security" style={{ textAlign: 'center', padding: '20px 10px' }}>
                    <i className="bx bx-star" style={{ fontSize: '40px', color: '#0A4D8C' }}></i>
                    <h4 style={{ fontSize: '16px', marginTop: '10px', marginBottom: '5px' }}>
                      {t.home.about_preview.values_card}
                    </h4>
                    <p style={{ fontSize: '13px', marginBottom: '0' }}>
                      {t.home.about_preview.values_text}
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="default-btn">
                {t.home.about_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
