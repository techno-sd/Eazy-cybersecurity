"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface VisionProps {
  lang: string;
  t: any;
}

const Vision: React.FC<VisionProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Hero / Introduction Section with Tagline */}
      <section id="introduction" className="security-area pb-70 pt-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title" style={{ fontSize: '18px', color: '#0A4D8C' }}>
              <i className="bx bx-trending-up"></i>
              {t.about.hero_tagline}
            </span>
            <h2>{t.about.hero_title}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.about.hero_content}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-bullseye"></i>
              {t.about.vision_heading}
            </span>
            <h2>{t.about.vision_heading}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.about.vision_content}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-rocket"></i>
              {t.about.mission_heading}
            </span>
            <h2>{t.about.mission_heading}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.about.mission_content}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-star"></i>
              {t.about.core_values_heading}
            </span>
            <h2>{t.about.core_values_heading}</h2>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.about.core_values.map((value: any, index: number) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <i className={
                    index === 0 ? 'bx bx-shield-quarter' :
                    index === 1 ? 'bx bx-bulb' :
                    index === 2 ? 'bx bx-lock-alt' :
                    'bx bx-user-check'
                  }></i>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-group"></i>
              {t.about.team_heading}
            </span>
            <h2>{t.about.team_heading}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.about.team_content}
            </p>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.about.team_members.map((member: any, index: number) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="single-team" style={{ textAlign: isArabic ? 'right' : 'left', marginBottom: '30px' }}>
                  <div className="team-img" style={{ marginBottom: '20px' }}>
                    <Image
                      src={member.image ? member.image : `/img/team/team-${index + 1}.jpg`}
                      alt={isArabic ? member.name : member.name_en}
                      width={300}
                      height={300}
                      style={{ objectFit: 'cover', borderRadius: '8px', width: '100%', height: 'auto' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/img/team/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="team-content">
                    <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{isArabic ? member.name : member.name_en}</h3>
                    <span style={{ color: '#0A4D8C', fontWeight: '600', display: 'block', marginBottom: '10px' }}>{member.position}</span>
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      {isArabic ? member.tagline : member.tagline_en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Teaser Section */}
      <section id="why-choose" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-check-circle"></i>
              {t.about.why_choose_heading}
            </span>
            <h2>{t.about.why_choose_heading}</h2>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.about.why_choose_highlights.map((highlight: string, index: number) => (
              <div key={index} className="col-lg-6 col-sm-12">
                <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left', marginBottom: '20px' }}>
                  <i className="bx bx-check"></i>
                  <p>{highlight}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link href="/about/team" className="default-btn">
              {t.about.why_choose_button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="security-area pb-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
            <h2>{t.about.cta_heading}</h2>
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/services" className="default-btn">
                {t.about.cta_services}
              </Link>
              <Link href="/contact" className="default-btn">
                {t.about.cta_contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vision;
