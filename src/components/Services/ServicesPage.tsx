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

      {/* Section 1: AI Solutions */}
      <section id="ai" className="approach-area pb-100">
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

      {/* Section 2: Cybersecurity Services */}
      <section id="cybersecurity" className="approach-area pb-100">
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
                  src="/img/services/sec.jpg"
                  alt="Cybersecurity Services"
                  width={660}
                  height={700}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Big Data & Analytics */}
      <section id="bigdata" className="approach-area pb-100">
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
                    ? 'حوّل بياناتك إلى ذكاء أعمال قابل للتنفيذ مع حلول التحليلات المتقدمة لدينا.'
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

      {/* Section 4: Cloud Computing & Hosting */}
      <section id="cloud" className="approach-area pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" style={{ order: isArabic ? 2 : 1 }}>
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <h2>{t.cloudHosting.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  Secure, scalable cloud infrastructure designed for Saudi organizations with full regulatory compliance.
                </p>

                <ul>
                  <li>
                    <i className="flaticon-cyber-security"></i>
                    <h3>{t.cloudHosting.hosting_title}</h3>
                    <p>{t.cloudHosting.hosting_desc}</p>
                  </li>
                  <li>
                    <i className="flaticon-database"></i>
                    <h3>{t.cloudHosting.backup_title}</h3>
                    <p>{t.cloudHosting.backup_desc}</p>
                  </li>
                  <li>
                    <i className="flaticon-password"></i>
                    <h3>{t.cloudHosting.encryption_title}</h3>
                    <p>{t.cloudHosting.encryption_desc}</p>
                  </li>
                  <li>
                    <i className="flaticon-profile"></i>
                    <h3>{t.cloudHosting.iam_title}</h3>
                    <p>{t.cloudHosting.iam_desc}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6" style={{ order: isArabic ? 1 : 2 }}>
              <div className="approach-img">
                <Image
                  src="/img/services/hosting.jpg"
                  alt="Cloud Computing & Hosting"
                  width={660}
                  height={700}
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: SME-EAZY Program */}
      <section id="sme" className="approach-area pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="approach-img">
                <Image
                  src="/img/services/sme.jpg"
                  alt="SME-EAZY Program"
                  width={660}
                  height={700}
                />
                <div className="image-overlay"></div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <h2>{t.smeEazy.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.smeEazy.section_subtitle}
                </p>

                <ul>
                  <li>
                    <i className="flaticon-cyber-security"></i>
                    <h3>{t.smeEazy.packages_title}</h3>
                    <p>{t.smeEazy.packages_desc}</p>
                  </li>
                  <li>
                    <i className="flaticon-password"></i>
                    <h3>{t.smeEazy.layered_title}</h3>
                    <p>{t.smeEazy.layered_desc}</p>
                  </li>
                  <li>
                    <i className="flaticon-profile"></i>
                    <h3>{t.smeEazy.risk_title}</h3>
                    <p>{t.smeEazy.risk_desc}</p>
                  </li>
                  <li>
                    <i className="flaticon-cyber"></i>
                    <h3>{t.smeEazy.vision_title}</h3>
                    <p>{t.smeEazy.vision_desc}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
