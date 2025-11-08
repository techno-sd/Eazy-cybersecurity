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
    <section className="vision-2030-area pt-100 pb-100" style={{ direction: isArabic ? 'rtl' : 'ltr', background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12" style={{ animation: 'slideIn 0.8s ease 0.2s forwards', opacity: 0 }}>
            <div className="vision-2030-content" style={{ textAlign: isArabic ? 'right' : 'left' }}>
              <div className="section-title" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', marginBottom: '20px', [isArabic ? 'marginLeft' : 'marginRight']: 'auto' }}></span>
                <span className="sub-title" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#0A4D8C',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  <i className="bx bx-flag"></i>
                  {isArabic ? 'رؤية 2030' : 'Vision 2030'}
                </span>
                <h2 className="gradient-text" style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  marginBottom: '15px'
                }}>
                  {t.home.vision2030.title}
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  marginBottom: '20px',
                  color: '#666'
                }}>
                  {t.home.vision2030.intro}
                </p>
                <ul style={{
                  fontSize: '15px',
                  lineHeight: '1.9',
                  marginBottom: '30px',
                  color: '#555',
                  paddingLeft: isArabic ? '0' : '24px',
                  paddingRight: isArabic ? '24px' : '0',
                  listStylePosition: 'outside'
                }}>
                  {t.home.vision2030.points.map((point: string, index: number) => (
                    <li key={index} style={{ marginBottom: '12px' }}>{point}</li>
                  ))}
                </ul>
              </div>

              <Link href="/vision-2030" className="btn-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>
                {t.home.vision2030.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-12" style={{ animation: 'scaleIn 0.8s ease 0.4s forwards', opacity: 0 }}>
            <div className="vision-2030-img modern-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(10, 77, 140, 0.15)' }}>
              <Image
                src="/img/vision-2020.jpg"
                alt="Saudi Vision 2030"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', transition: 'transform 0.4s ease' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision2030Section;
