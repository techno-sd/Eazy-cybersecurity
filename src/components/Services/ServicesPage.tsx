"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceConsultationCTA from "@/components/Consultation/ServiceConsultationCTA";

interface ServicesPageProps {
  lang: string;
  t: any;
}

// Custom hook for scroll-triggered animations
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

const ServicesPage: React.FC<ServicesPageProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  // Scroll reveal for each section
  const heroSection = useInView(0.1);
  const aiSection = useInView(0.15);
  const cyberSection = useInView(0.15);
  const bigdataSection = useInView(0.15);
  const cloudSection = useInView(0.15);
  const smeSection = useInView(0.15);
  const ctaSection = useInView(0.2);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        id="hero"
        className="security-area pb-70 pt-100"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>

        <div className="container">
          <div
            className="section-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: isArabic ? 'right' : 'left',
              opacity: heroSection.isInView ? 1 : 0,
              transform: heroSection.isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(36px, 7vw, 56px)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: 'clamp(20px, 3vw, 30px)',
              background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none'
            }}>
              {t.services.hero_title}
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.services.hero_content}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: AI Solutions */}
      <section
        ref={aiSection.ref}
        id="ai"
        className="approach-area pb-100"
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{
                opacity: aiSection.isInView ? 1 : 0,
                transform: aiSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '50px' : '-50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
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

            <div
              className="col-lg-6"
              style={{
                opacity: aiSection.isInView ? 1 : 0,
                transform: aiSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-50px' : '50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '2px',
                  marginBottom: '20px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto'
                }}></span>
                <h2>{t.aiSolutions.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.aiSolutions.section_subtitle}
                </p>

                <ul>
                  <li>
                    <i className="bx bx-bot"></i>
                    <h3>{t.aiSolutions.chatbot_title}</h3>
                    <p>{t.aiSolutions.chatbot_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-line-chart"></i>
                    <h3>{t.aiSolutions.predictive_title}</h3>
                    <p>{t.aiSolutions.predictive_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-shield-alt-2"></i>
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
      <section
        ref={cyberSection.ref}
        id="cybersecurity"
        className="approach-area pb-100"
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{
                order: isArabic ? 2 : 1,
                opacity: cyberSection.isInView ? 1 : 0,
                transform: cyberSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '50px' : '-50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '2px',
                  marginBottom: '20px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto'
                }}></span>
                <h2>{t.cybersecurity.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.cybersecurity.section_subtitle}
                </p>

                <ul>
                  <li>
                    <i className="bx bx-bug"></i>
                    <h3>{t.cybersecurity.pentest_title}</h3>
                    <p>{t.cybersecurity.pentest_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-check-shield"></i>
                    <h3>{t.cybersecurity.compliance_title}</h3>
                    <p>{t.cybersecurity.compliance_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-desktop"></i>
                    <h3>{t.cybersecurity.soc_title}</h3>
                    <p>{t.cybersecurity.soc_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-user-check"></i>
                    <h3>{t.cybersecurity.training_title}</h3>
                    <p>{t.cybersecurity.training_desc}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="col-lg-6"
              style={{
                order: isArabic ? 1 : 2,
                opacity: cyberSection.isInView ? 1 : 0,
                transform: cyberSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-50px' : '50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
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
      <section
        ref={bigdataSection.ref}
        id="bigdata"
        className="approach-area pb-100"
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{
                opacity: bigdataSection.isInView ? 1 : 0,
                transform: bigdataSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '50px' : '-50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
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

            <div
              className="col-lg-6"
              style={{
                opacity: bigdataSection.isInView ? 1 : 0,
                transform: bigdataSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-50px' : '50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '2px',
                  marginBottom: '20px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto'
                }}></span>
                <h2>{t.bigData.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.bigData.section_subtitle}
                </p>

                <ul>
                  <li>
                    <i className="bx bx-data"></i>
                    <h3>{t.bigData.warehouse_title}</h3>
                    <p>{t.bigData.warehouse_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-bar-chart-alt-2"></i>
                    <h3>{t.bigData.dashboard_title}</h3>
                    <p>{t.bigData.dashboard_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-search-alt"></i>
                    <h3>{t.bigData.fraud_title}</h3>
                    <p>{t.bigData.fraud_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-shield-quarter"></i>
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
      <section
        ref={cloudSection.ref}
        id="cloud"
        className="approach-area pb-100"
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{
                order: isArabic ? 2 : 1,
                opacity: cloudSection.isInView ? 1 : 0,
                transform: cloudSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '50px' : '-50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '2px',
                  marginBottom: '20px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto'
                }}></span>
                <h2>{t.cloudHosting.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.cloudHosting.section_subtitle}
                </p>

                <ul>
                  <li>
                    <i className="bx bx-server"></i>
                    <h3>{t.cloudHosting.hosting_title}</h3>
                    <p>{t.cloudHosting.hosting_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-cloud-upload"></i>
                    <h3>{t.cloudHosting.backup_title}</h3>
                    <p>{t.cloudHosting.backup_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-lock-alt"></i>
                    <h3>{t.cloudHosting.encryption_title}</h3>
                    <p>{t.cloudHosting.encryption_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-user-circle"></i>
                    <h3>{t.cloudHosting.iam_title}</h3>
                    <p>{t.cloudHosting.iam_desc}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="col-lg-6"
              style={{
                order: isArabic ? 1 : 2,
                opacity: cloudSection.isInView ? 1 : 0,
                transform: cloudSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-50px' : '50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
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
      <section
        ref={smeSection.ref}
        id="sme"
        className="approach-area pb-100"
        style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{
                opacity: smeSection.isInView ? 1 : 0,
                transform: smeSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '50px' : '-50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
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

            <div
              className="col-lg-6"
              style={{
                opacity: smeSection.isInView ? 1 : 0,
                transform: smeSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-50px' : '50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '2px',
                  marginBottom: '20px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto'
                }}></span>
                <h2>{t.smeEazy.section_title}</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                  {t.smeEazy.section_subtitle}
                </p>

                <ul>
                  <li>
                    <i className="bx bx-layer"></i>
                    <h3>{t.smeEazy.layered_title}</h3>
                    <p>{t.smeEazy.layered_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-dollar-circle"></i>
                    <h3>{t.smeEazy.packages_title}</h3>
                    <p>{t.smeEazy.packages_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-group"></i>
                    <h3>{t.smeEazy.risk_title}</h3>
                    <p>{t.smeEazy.risk_desc}</p>
                  </li>
                  <li>
                    <i className="bx bx-analyse"></i>
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
      <section
        ref={ctaSection.ref}
        id="cta"
        className="security-area pb-100 pt-100"
        style={{
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-80px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '-80px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>

        <div className="container">
          <div
            className="section-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: 'center',
              opacity: ctaSection.isInView ? 1 : 0,
              transform: ctaSection.isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
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

      {/* Final CTA for last service */}
      <section className="pb-0 pt-0">
        <div className="container">
          <ServiceConsultationCTA serviceType="sme-eazy" lang={lang} />
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
