"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const HomeServices: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <>
      {/* Section 1: AI Solutions */}
      <section id="ai" className="approach-area pb-100 pt-70" style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f0f7 50%, #f0f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative element */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: isArabic ? '-150px' : 'auto',
          left: isArabic ? 'auto' : '-150px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translateY(-50%)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 reveal-animation" style={{ animationDelay: '0.2s' }}>
              <div className="approach-img">
                <Image
                  src="/img/services/ai.jpg"
                  alt="AI Solutions"
                  width={660}
                  height={700}
                />
              </div>
            </div>

            <div className="col-lg-6 reveal-animation" style={{ animationDelay: '0.3s' }}>
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '70px',
                  height: '5px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '3px',
                  marginBottom: '25px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto',
                  boxShadow: '0 2px 10px rgba(10, 77, 140, 0.3)'
                }}></span>
                <h2 style={{
                  fontSize: '38px',
                  fontWeight: '800',
                  marginBottom: '20px',
                  color: '#0e0129',
                  lineHeight: '1.2'
                }}>{t.aiSolutions.section_title}</h2>
                <p style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '35px', color: '#555', fontWeight: '500' }}>
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
      <section id="cybersecurity" className="approach-area pb-100 pt-70" style={{
        background: 'linear-gradient(135deg, #f0f5f9 0%, #e8f0f7 50%, #f8f9fa 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative element */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: isArabic ? '-150px' : 'auto',
          right: isArabic ? 'auto' : '-150px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translateY(-50%)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 reveal-animation" style={{ order: isArabic ? 2 : 1, animationDelay: '0.2s' }}>
              <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'block',
                  width: '70px',
                  height: '5px',
                  background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
                  borderRadius: '3px',
                  marginBottom: '25px',
                  [isArabic ? 'marginLeft' : 'marginRight']: 'auto',
                  boxShadow: '0 2px 10px rgba(10, 77, 140, 0.3)'
                }}></span>
                <h2 style={{
                  fontSize: '38px',
                  fontWeight: '800',
                  marginBottom: '20px',
                  color: '#0e0129',
                  lineHeight: '1.2'
                }}>{t.cybersecurity.section_title}</h2>
                <p style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '35px', color: '#555', fontWeight: '500' }}>
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

            <div className="col-lg-6 reveal-animation" style={{ order: isArabic ? 1 : 2, animationDelay: '0.3s' }}>
              <div className="approach-img">
                <Image
                  src="/img/services/sec.jpg"
                  alt="Cybersecurity Services"
                  width={660}
                  height={700}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Big Data & Analytics */}
      <section id="bigdata" className="approach-area pb-100 pt-70" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f0f7 50%, #f0f5f9 100%)', position: 'relative', overflow: 'hidden' }}>
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
              </div>
            </div>

            <div className="col-lg-6">
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
      <section id="cloud" className="approach-area pb-100 pt-70" style={{ background: 'linear-gradient(135deg, #f0f5f9 0%, #e8f0f7 50%, #f8f9fa 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" style={{ order: isArabic ? 2 : 1 }}>
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

            <div className="col-lg-6" style={{ order: isArabic ? 1 : 2 }}>
              <div className="approach-img">
                <Image
                  src="/img/services/hosting.jpg"
                  alt="Cloud Computing & Hosting"
                  width={660}
                  height={700}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: SME-EAZY Program */}
      <section id="sme" className="approach-area pb-100 pt-70" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f0f7 50%, #f0f5f9 100%)', position: 'relative', overflow: 'hidden' }}>
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
              </div>
            </div>

            <div className="col-lg-6">
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
    </>
  );
};

export default HomeServices;
