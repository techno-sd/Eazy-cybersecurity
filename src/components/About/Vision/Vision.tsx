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
      {/* Enhanced Hero / Introduction Section */}
      <section
        id="introduction"
        className="about-hero-section"
        style={{
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
          padding: 'clamp(60px, 12vw, 100px) 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <div className="row align-items-center">
            <div className="col-lg-12" data-aos="fade-up">
              <div style={{ textAlign: isArabic ? 'right' : 'left', maxWidth: '900px', margin: '0 auto' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                    borderRadius: '50px',
                    color: '#0A4D8C',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '25px',
                    border: '2px solid rgba(10, 77, 140, 0.2)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  <i className="bx bx-trending-up" style={{ fontSize: '18px' }}></i>
                  {t.about.hero_tagline}
                </span>
                
                <h1
                  style={{
                    fontSize: 'clamp(32px, 6vw, 48px)',
                    fontWeight: '700',
                    marginBottom: 'clamp(18px, 3vw, 25px)',
                    lineHeight: '1.2',
                    background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {t.about.hero_title}
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(15px, 2.5vw, 18px)',
                    lineHeight: '1.8',
                    color: '#555',
                    marginBottom: '0'
                  }}
                >
                  {t.about.hero_content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '50px',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05), rgba(96, 126, 172, 0.05))',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '50px',
          right: '50px',
          width: '180px',
          height: '180px',
          background: 'linear-gradient(135deg, rgba(96, 126, 172, 0.05), rgba(10, 77, 140, 0.05))',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
      </section>

      {/* Enhanced Vision & Mission Section - Side by Side */}
      <section id="vision-mission" className="vision-mission-section" style={{ padding: 'clamp(60px, 12vw, 100px) 0', background: '#fff' }}>
        <div className="container">
          <div className="row g-3 g-md-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {/* Vision Card */}
            <div className="col-lg-6" data-aos="fade-up">
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05), rgba(96, 126, 172, 0.05))',
                  borderRadius: 'clamp(16px, 3vw, 20px)',
                  padding: 'clamp(35px, 6vw, 50px) clamp(25px, 5vw, 40px)',
                  height: '100%',
                  border: '2px solid rgba(10, 77, 140, 0.1)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="about-card"
              >
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: isArabic ? 'auto' : '-30px',
                  left: isArabic ? '-30px' : 'auto',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                  borderRadius: '50%',
                  zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, textAlign: isArabic ? 'right' : 'left' }}>
                  <div 
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '25px',
                      boxShadow: '0 10px 30px rgba(10, 77, 140, 0.3)'
                    }}
                  >
                    <i className="bx bx-bullseye" style={{ fontSize: '36px', color: '#fff' }}></i>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(24px, 4vw, 32px)',
                      fontWeight: '700',
                      marginBottom: 'clamp(15px, 2.5vw, 20px)',
                      color: '#0A4D8C'
                    }}
                  >
                    {t.about.vision_heading}
                  </h2>

                  <p
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      lineHeight: '1.8',
                      color: '#555',
                      marginBottom: '0'
                    }}
                  >
                    {t.about.vision_content}
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(96, 126, 172, 0.05), rgba(10, 77, 140, 0.05))',
                  borderRadius: 'clamp(16px, 3vw, 20px)',
                  padding: 'clamp(35px, 6vw, 50px) clamp(25px, 5vw, 40px)',
                  height: '100%',
                  border: '2px solid rgba(96, 126, 172, 0.1)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="about-card"
              >
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: isArabic ? '-30px' : 'auto',
                  left: isArabic ? 'auto' : '-30px',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(96, 126, 172, 0.1), rgba(10, 77, 140, 0.1))',
                  borderRadius: '50%',
                  zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, textAlign: isArabic ? 'right' : 'left' }}>
                  <div 
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #607EAC, #4A6390)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '25px',
                      boxShadow: '0 10px 30px rgba(96, 126, 172, 0.3)'
                    }}
                  >
                    <i className="bx bx-rocket" style={{ fontSize: '36px', color: '#fff' }}></i>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(24px, 4vw, 32px)',
                      fontWeight: '700',
                      marginBottom: 'clamp(15px, 2.5vw, 20px)',
                      color: '#607EAC'
                    }}
                  >
                    {t.about.mission_heading}
                  </h2>

                  <p
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      lineHeight: '1.8',
                      color: '#555',
                      marginBottom: '0'
                    }}
                  >
                    {t.about.mission_content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values Section */}
      <section
        id="values"
        className="core-values-section"
        style={{
          padding: 'clamp(60px, 12vw, 100px) 0',
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)'
        }}
      >
        <div className="container">
          <div 
            className="section-title" 
            style={{ 
              direction: isArabic ? 'rtl' : 'ltr', 
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 42px)',
                fontWeight: '700',
                marginBottom: '0',
                background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t.about.core_values_heading}
            </h2>
          </div>

          <div className="row g-3 g-md-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.about.core_values.map((value: any, index: number) => {
              const colors = ['#0A4D8C', '#607EAC', '#0A4D8C', '#607EAC'];
              const icons = ['bx bx-shield-quarter', 'bx bx-bulb', 'bx bx-lock-alt', 'bx bx-user-check'];
              
              return (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div 
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      padding: '40px 30px',
                      height: '100%',
                      border: `2px solid ${colors[index]}20`,
                      transition: 'all 0.4s ease',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    className="value-card"
                  >
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        background: `linear-gradient(135deg, ${colors[index]}, ${colors[index]}CC)`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 25px',
                        boxShadow: `0 10px 30px ${colors[index]}40`,
                        transition: 'all 0.4s ease'
                      }}
                      className="value-icon"
                    >
                      <i className={icons[index]} style={{ fontSize: '38px', color: '#fff' }}></i>
                    </div>

                    <h3 
                      style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        marginBottom: '15px',
                        color: '#1a1a1a'
                      }}
                    >
                      {value.title}
                    </h3>

                    <p 
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.7',
                        color: '#666',
                        marginBottom: '0'
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section id="team" className="team-section" style={{ padding: 'clamp(60px, 12vw, 100px) 0', background: '#fff' }}>
        <div className="container">
          <div
            className="section-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 42px)',
                fontWeight: '700',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {isArabic ? 'الفريق' : 'Our Team'}
            </h2>

            <p
              style={{
                fontSize: 'clamp(15px, 2.5vw, 17px)',
                lineHeight: '1.8',
                color: '#555',
                maxWidth: '900px',
                margin: '0 auto'
              }}
            >
              {isArabic
                ? 'فريقنا يجمع بين الخبرة التقنية والالتزام بالجودة، يضم نخبة من المتخصصين في الأمن السيبراني، الذكاء الاصطناعي، وتحليل البيانات، يحملون شهادات عالمية ويعملون بروح واحدة لتحقيق رؤية الشركة.'
                : 'Our team combines technical expertise with a commitment to quality, featuring elite specialists in cybersecurity, artificial intelligence, and data analytics, holding international certifications and working with one spirit to achieve the company\'s vision.'}
            </p>
          </div>

          <div className="row justify-content-center" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <div className="col-lg-4 col-md-6 col-sm-8" data-aos="fade-up">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s ease',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%'
                }}
                className="team-card"
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '450px', width: '100%', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    src="/img/team/ceo.jpg"
                    alt="م. مازن المطيري"
                    width={450}
                    height={450}
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                    className="team-img-enhanced"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/img/team/placeholder.jpg';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 77, 140, 0.8) 0%, transparent 60%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }}
                    className="team-overlay"
                  ></div>
                </div>

                <div style={{ padding: '30px 25px', textAlign: 'center' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(18px, 3vw, 22px)',
                      fontWeight: '700',
                      marginBottom: '10px',
                      color: '#1a1a1a',
                      lineHeight: '1.3'
                    }}
                  >
                    {isArabic ? 'م. مازن المطيري' : 'Eng. Mazen Al-Mutairi'}
                  </h3>

                  <span
                    style={{
                      color: '#0A4D8C',
                      fontWeight: '600',
                      fontSize: 'clamp(13px, 2vw, 15px)',
                      display: 'block',
                      marginBottom: '15px',
                      lineHeight: '1.5'
                    }}
                  >
                    {isArabic ? 'الرئيس التنفيذي لوكيل إيزي سايبر' : 'CEO of Easy Cyber Agency'}
                  </span>

                  <p
                    style={{
                      fontSize: 'clamp(13px, 2vw, 14px)',
                      lineHeight: '1.6',
                      color: '#666',
                      marginBottom: '0'
                    }}
                  >
                    {isArabic ? 'قيادة الابتكار الرقمي والأمن السيبراني' : 'Leading Digital Innovation and Cybersecurity'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section
        id="why-us"
        className="why-choose-section"
        style={{
          padding: 'clamp(60px, 12vw, 100px) 0',
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)'
        }}
      >
        <div className="container">
          <div 
            className="section-title" 
            style={{ 
              direction: isArabic ? 'rtl' : 'ltr', 
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            <h2
              style={{
                fontSize: '42px',
                fontWeight: '700',
                marginBottom: '0',
                background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t.about.why_choose_heading}
            </h2>
          </div>

          <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.about.why_choose_highlights.map((highlight: string, index: number) => {
              const icons = ['bx bx-shield', 'bx bx-star', 'bx bx-rocket', 'bx bx-trophy', 'bx bx-brain', 'bx bx-hand-right'];
              const colors = ['#0A4D8C', '#607EAC', '#0A4D8C', '#607EAC', '#0A4D8C', '#607EAC'];
              
              return (
                <div key={index} className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '20px',
                      background: '#fff',
                      padding: '30px',
                      borderRadius: '16px',
                      border: `2px solid ${colors[index]}20`,
                      transition: 'all 0.3s ease',
                      flexDirection: isArabic ? 'row-reverse' : 'row'
                    }}
                    className="why-choose-item"
                  >
                    <div 
                      style={{
                        minWidth: '50px',
                        width: '50px',
                        height: '50px',
                        background: `linear-gradient(135deg, ${colors[index]}, ${colors[index]}99)`,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 20px ${colors[index]}40`
                      }}
                    >
                      <i className={icons[index]} style={{ fontSize: '28px', color: '#fff' }}></i>
                    </div>
                    <p 
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.7',
                        color: '#555',
                        marginBottom: '0',
                        flex: 1,
                        textAlign: isArabic ? 'right' : 'left'
                      }}
                    >
                      {highlight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section
        className="cta-section"
        style={{
          padding: 'clamp(60px, 12vw, 100px) 0',
          background: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.3
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div 
            style={{ 
              direction: isArabic ? 'rtl' : 'ltr', 
              textAlign: 'center' 
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 42px)',
                fontWeight: '700',
                color: '#fff',
                marginBottom: 'clamp(15px, 3vw, 20px)',
                lineHeight: '1.3'
              }}
            >
              {t.about.cta_heading}
            </h2>

            <p
              style={{
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: 'clamp(30px, 5vw, 40px)',
                maxWidth: '700px',
                margin: '0 auto clamp(30px, 5vw, 40px)'
              }}
            >
              {isArabic 
                ? 'اكتشف خدماتنا المتميزة في الأمن السيبراني أو تواصل معنا مباشرة'
                : 'Discover our premium cybersecurity services or get in touch with us directly'
              }
            </p>

            <div 
              style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center', 
                flexWrap: 'wrap' 
              }}
            >
              <Link 
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '18px 38px',
                  background: '#fff',
                  color: '#0A4D8C',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 35px rgba(0, 0, 0, 0.2)',
                  border: '2px solid transparent'
                }}
                className="cta-btn-primary"
              >
                {t.about.cta_services}
                <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '20px' }}></i>
              </Link>

              <Link 
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '18px 38px',
                  background: 'transparent',
                  color: '#fff',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(255, 255, 255, 0.5)'
                }}
                className="cta-btn-secondary"
              >
                {t.about.cta_contact}
                <i className="bx bx-envelope" style={{ fontSize: '20px' }}></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
      </section>
    </>
  );
};

export default Vision;
