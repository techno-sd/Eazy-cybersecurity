"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ServicesPageProps {
  lang: string;
  t: any;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="security-area pb-70 pt-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <h2>{t.services.hero_title}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.services.hero_content}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section id="overview" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-grid-alt"></i>
              {t.services.overview_title}
            </span>
            <h2>{t.services.overview_title}</h2>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.services.service_cards.map((card: any, index: number) => (
              <div key={index} className="col-lg-4 col-sm-6">
                <a href={card.anchor} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left', cursor: 'pointer' }}>
                    <i className={
                      index === 0 ? 'bx bx-brain' :
                      index === 1 ? 'bx bx-shield-quarter' :
                      index === 2 ? 'bx bx-data' :
                      index === 3 ? 'bx bx-cloud' :
                      'bx bx-briefcase'
                    }></i>
                    <h3>{card.title}</h3>
                    <p>{card.summary}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: AI Solutions */}
      <section id="ai" className="complete-area pt-100 pb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div
                className="complete-img"
                style={{
                  backgroundImage: `url(/img/approach-img.jpg)`,
                }}
              ></div>
            </div>
            <div className="col-lg-6">
              <div className="complete-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-brain"></i>
                  {t.aiSolutions.section_title}
                </span>
                <h2>{t.aiSolutions.section_title}</h2>

                <div className="row">
                  {t.services.ai_services.map((service: string, index: number) => (
                    <div key={index} className="col-lg-12">
                      <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                        <i className="bx bx-check-circle"></i>
                        <p>{service}</p>
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
            alt="Shape"
            width={423}
            height={611}
          />
        </div>
      </section>

      {/* Section 2: Cybersecurity Services */}
      <section id="cybersecurity" className="complete-area pt-100 pb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="complete-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-shield-quarter"></i>
                  {t.cybersecurity.section_title}
                </span>
                <h2>{t.cybersecurity.section_title}</h2>

                <div className="row">
                  {t.services.cybersecurity_services.map((service: string, index: number) => (
                    <div key={index} className="col-lg-12">
                      <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                        <i className="bx bx-check-circle"></i>
                        <p>{service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 pr-0">
              <div
                className="complete-img"
                style={{
                  backgroundImage: `url(/img/cybersecurity-img.jpg)`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="complete-shape">
          <Image
            src="/img/complete-shape.png"
            alt="Shape"
            width={423}
            height={611}
          />
        </div>
      </section>

      {/* Section 3: Big Data & Analytics */}
      <section id="bigdata" className="complete-area pt-100 pb-70">
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
              <div className="complete-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-data"></i>
                  {t.bigData.section_title}
                </span>
                <h2>{t.bigData.section_title}</h2>

                <div className="row">
                  {t.services.bigdata_services.map((service: string, index: number) => (
                    <div key={index} className="col-lg-12">
                      <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                        <i className="bx bx-check-circle"></i>
                        <p>{service}</p>
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
            alt="Shape"
            width={423}
            height={611}
          />
        </div>
      </section>

      {/* Section 4: Cloud Computing & Hosting */}
      <section id="cloud" className="complete-area pt-100 pb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="complete-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-cloud"></i>
                  {t.cloudHosting.section_title}
                </span>
                <h2>{t.cloudHosting.section_title}</h2>

                <div className="row">
                  {t.services.cloud_services.map((service: string, index: number) => (
                    <div key={index} className="col-lg-12">
                      <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                        <i className="bx bx-check-circle"></i>
                        <p>{service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 pr-0">
              <div
                className="complete-img"
                style={{
                  backgroundImage: `url(/img/cybersecurity-img-2.jpg)`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="complete-shape">
          <Image
            src="/img/complete-shape.png"
            alt="Shape"
            width={423}
            height={611}
          />
        </div>
      </section>

      {/* Section 5: SME-EAZY Program */}
      <section id="sme" className="complete-area pt-100 pb-70">
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
              <div className="complete-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span className="sub-title">
                  <i className="bx bx-briefcase"></i>
                  {t.smeEazy.section_title}
                </span>
                <h2>{t.smeEazy.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  {t.smeEazy.section_subtitle}
                </p>

                <div className="row">
                  {t.services.sme_highlights.map((highlight: string, index: number) => (
                    <div key={index} className="col-lg-12">
                      <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                        <i className="bx bx-check-circle"></i>
                        <p>{highlight}</p>
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
            alt="Shape"
            width={423}
            height={611}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="security-area pb-100 pt-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
            <h2>{t.services.cta_title}</h2>

            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="default-btn">
                {t.services.cta_consultation}
              </Link>
              <Link href="/industries" className="default-btn">
                {t.services.cta_industries}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
