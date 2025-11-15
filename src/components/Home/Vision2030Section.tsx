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
    <section className="vision-2030-area pt-100 pb-100" style={{
      direction: isArabic ? 'rtl' : 'ltr',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f0f7 50%, #f0f5f9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: isArabic ? 'auto' : '-100px',
        left: isArabic ? '-100px' : 'auto',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(10, 77, 140, 0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 reveal-animation" style={{ animationDelay: '0.2s' }}>
            <div className="vision-2030-content" style={{ textAlign: isArabic ? 'right' : 'left' }}>
              <div className="section-title" style={{ textAlign: isArabic ? 'right' : 'left' }}>
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
                <h2 className="gradient-text" style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  marginBottom: '20px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.5px'
                }}>
                  {t.home.vision2030.title}
                </h2>
                <p style={{
                  fontSize: '17px',
                  lineHeight: '1.9',
                  marginBottom: '25px',
                  color: '#555',
                  fontWeight: '500'
                }}>
                  {t.home.vision2030.intro}
                </p>
                <ul style={{
                  fontSize: '15px',
                  lineHeight: '2',
                  marginBottom: '35px',
                  color: '#444',
                  paddingLeft: isArabic ? '0' : '0',
                  paddingRight: isArabic ? '0' : '0',
                  listStylePosition: 'inside',
                  listStyle: 'none'
                }}>
                  {t.home.vision2030.points.map((point: string, index: number) => (
                    <li key={index} style={{
                      marginBottom: '15px',
                      paddingLeft: isArabic ? '0' : '30px',
                      paddingRight: isArabic ? '30px' : '0',
                      position: 'relative',
                      transition: 'all 0.3s ease'
                    }}>
                      <i className="bx bx-check-circle" style={{
                        color: '#0A4D8C',
                        fontSize: '20px',
                        position: 'absolute',
                        left: isArabic ? 'auto' : '0',
                        right: isArabic ? '0' : 'auto',
                        top: '2px'
                      }}></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/vision-2030" className="btn-gradient">
                {t.home.vision2030.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 reveal-animation" style={{ animationDelay: '0.4s' }}>
            <div className="vision-2030-img modern-card" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(10, 77, 140, 0.25)',
              position: 'relative',
              border: '1px solid rgba(10, 77, 140, 0.15)',
              background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.03) 0%, rgba(96, 126, 172, 0.03) 100%)',
              padding: '8px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 30px 70px rgba(10, 77, 140, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(10, 77, 140, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.15)';
            }}>
              <div style={{
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                background: '#fff'
              }}>
                <Image
                  src="/img/vision-2020.jpg"
                  alt="Saudi Vision 2030"
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* Gradient overlay on image */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.15) 100%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
              {/* Decorative badge */}
              <div style={{
                position: 'absolute',
                top: '30px',
                right: isArabic ? 'auto' : '30px',
                left: isArabic ? '30px' : 'auto',
                background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                color: '#fff',
                padding: '14px 26px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                boxShadow: '0 8px 25px rgba(10, 77, 140, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <i className="bx bx-flag" style={{ fontSize: '20px' }}></i>
                <span style={{ letterSpacing: '1px' }}>2030</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision2030Section;
