"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const CloudComputingSection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="approach-area pb-100" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)', direction: isArabic ? 'rtl' : 'ltr' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" style={{ order: isArabic ? 2 : 1 }}>
            <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
              <span style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', marginBottom: '20px', [isArabic ? 'marginLeft' : 'marginRight']: 'auto' }}></span>
              <h2 className="gradient-text" style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>
                {t.cloudHosting.section_title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px', color: '#666' }}>
                {isArabic
                  ? 'بنية تحتية سحابية آمنة وقابلة للتوسع مصممة للمؤسسات السعودية مع امتثال تنظيمي كامل.'
                  : 'Secure, scalable cloud infrastructure designed for Saudi organizations with full regulatory compliance.'}
              </p>

              <ul className="modern-list">
                <li style={{ marginBottom: '25px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#0e0129' }}>{t.cloudHosting.hosting_title}</h3>
                    <p style={{ marginBottom: '0', fontSize: '14px', color: '#666' }}>{t.cloudHosting.hosting_desc}</p>
                  </div>
                </li>
                <li style={{ marginBottom: '25px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#0e0129' }}>{t.cloudHosting.backup_title}</h3>
                    <p style={{ marginBottom: '0', fontSize: '14px', color: '#666' }}>{t.cloudHosting.backup_desc}</p>
                  </div>
                </li>
                <li style={{ marginBottom: '25px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#0e0129' }}>{t.cloudHosting.encryption_title}</h3>
                    <p style={{ marginBottom: '0', fontSize: '14px', color: '#666' }}>{t.cloudHosting.encryption_desc}</p>
                  </div>
                </li>
                <li style={{ marginBottom: '0' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#0e0129' }}>{t.cloudHosting.iam_title}</h3>
                    <p style={{ marginBottom: '0', fontSize: '14px', color: '#666' }}>{t.cloudHosting.iam_desc}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6" style={{ order: isArabic ? 1 : 2 }}>
            <div className="approach-img hover-lift" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(10, 77, 140, 0.15)' }}>
              <Image
                src="/img/services/hosting.jpg"
                alt="Cloud Computing & Hosting"
                width={660}
                height={700}
                style={{ transition: 'transform 0.4s ease' }}
              />
              <div className="image-overlay" style={{ background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudComputingSection;
