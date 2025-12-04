"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface VisionProps {
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

const Vision: React.FC<VisionProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  // Scroll reveal for each section
  const heroSection = useInView(0.1);
  const visionMissionSection = useInView(0.15);
  const coreValuesSection = useInView(0.1);
  const teamSection = useInView(0.15);
  const whyUsSection = useInView(0.1);
  const ctaSection = useInView(0.2);

  // Hover states
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  return (
    <>
      {/* Enhanced Hero / Introduction Section */}
      <section
        ref={heroSection.ref}
        id="introduction"
        className="about-hero-section"
        style={{
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
          padding: 'clamp(60px, 12vw, 100px) 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>

        <div className="container" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <div className="row align-items-center">
            <div
              className="col-lg-12"
              style={{
                opacity: heroSection.isInView ? 1 : 0,
                transform: heroSection.isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
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
      <section
        ref={visionMissionSection.ref}
        id="vision-mission"
        className="vision-mission-section"
        style={{ padding: 'clamp(60px, 12vw, 100px) 0', background: '#fff' }}
      >
        <div className="container">
          <div className="row g-3 g-md-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {/* Vision Card */}
            <div
              className="col-lg-6"
              style={{
                opacity: visionMissionSection.isInView ? 1 : 0,
                transform: visionMissionSection.isInView
                  ? 'translateX(0)'
                  : `translateX(${isArabic ? '40px' : '-40px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05), rgba(96, 126, 172, 0.05))',
                  borderRadius: 'clamp(16px, 3vw, 20px)',
                  padding: 'clamp(35px, 6vw, 50px) clamp(25px, 5vw, 40px)',
                  height: '100%',
                  border: '2px solid rgba(10, 77, 140, 0.1)',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredCard === 'vision' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === 'vision'
                    ? '0 25px 50px rgba(10, 77, 140, 0.15)'
                    : '0 5px 20px rgba(0, 0, 0, 0.05)'
                }}
                className="about-card"
                onMouseEnter={() => setHoveredCard('vision')}
                onMouseLeave={() => setHoveredCard(null)}
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
            <div
              className="col-lg-6"
              style={{
                opacity: visionMissionSection.isInView ? 1 : 0,
                transform: visionMissionSection.isInView
                  ? 'translateX(0)'
                  : `translateX(${isArabic ? '-40px' : '40px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.15s'
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(96, 126, 172, 0.05), rgba(10, 77, 140, 0.05))',
                  borderRadius: 'clamp(16px, 3vw, 20px)',
                  padding: 'clamp(35px, 6vw, 50px) clamp(25px, 5vw, 40px)',
                  height: '100%',
                  border: '2px solid rgba(96, 126, 172, 0.1)',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredCard === 'mission' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === 'mission'
                    ? '0 25px 50px rgba(96, 126, 172, 0.15)'
                    : '0 5px 20px rgba(0, 0, 0, 0.05)'
                }}
                className="about-card"
                onMouseEnter={() => setHoveredCard('mission')}
                onMouseLeave={() => setHoveredCard(null)}
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
        ref={coreValuesSection.ref}
        id="values"
        className="core-values-section"
        style={{
          padding: 'clamp(60px, 12vw, 100px) 0',
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-150px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite'
        }}></div>

        <div className="container">
          <div
            className="section-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: 'center',
              marginBottom: '60px',
              opacity: coreValuesSection.isInView ? 1 : 0,
              transform: coreValuesSection.isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
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
              const isHovered = hoveredValue === index;

              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6"
                  style={{
                    opacity: coreValuesSection.isInView ? 1 : 0,
                    transform: coreValuesSection.isInView ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      padding: '40px 30px',
                      height: '100%',
                      border: `2px solid ${colors[index]}20`,
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      ['--value-color' as any]: colors[index],
                      transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered
                        ? `0 25px 50px ${colors[index]}25`
                        : '0 5px 20px rgba(0, 0, 0, 0.05)'
                    }}
                    className="value-card"
                    onMouseEnter={() => setHoveredValue(index)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Number Badge */}
                    <span className="value-number">{String(index + 1).padStart(2, '0')}</span>

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
                        transition: 'all 0.4s ease',
                        borderColor: colors[index]
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
      <section
        ref={teamSection.ref}
        id="team"
        className="team-section"
        style={{ padding: 'clamp(60px, 12vw, 100px) 0', background: '#fff' }}
      >
        <div className="container">
          <div
            className="section-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: 'center',
              marginBottom: '60px',
              opacity: teamSection.isInView ? 1 : 0,
              transform: teamSection.isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
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
            <div
              className="col-lg-4 col-md-6 col-sm-8"
              style={{
                opacity: teamSection.isInView ? 1 : 0,
                transform: teamSection.isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: hoveredCard === 'team'
                    ? '0 30px 60px rgba(10, 77, 140, 0.2)'
                    : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transform: hoveredCard === 'team' ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)'
                }}
                className="team-card"
                onMouseEnter={() => setHoveredCard('team')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="team-img-wrapper" style={{ position: 'relative', overflow: 'hidden', height: '450px', width: '100%', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* CEO Badge */}
                  <span className="team-badge">
                    <i className="bx bx-certification" style={{ marginRight: '6px' }}></i>
                    {isArabic ? 'الرئيس التنفيذي' : 'CEO'}
                  </span>

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
                      background: 'linear-gradient(to top, rgba(10, 77, 140, 0.9) 0%, rgba(10, 77, 140, 0.6) 40%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '30px'
                    }}
                    className="team-overlay"
                  >
                    {/* Social Links */}
                    <div className="team-social">
                      <a href="#" aria-label="LinkedIn">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                      <a href="#" aria-label="Twitter">
                        <i className="bx bxl-twitter"></i>
                      </a>
                      <a href="#" aria-label="Email">
                        <i className="bx bx-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="team-content" style={{ padding: '30px 25px', textAlign: 'center' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(18px, 3vw, 22px)',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: '#1a1a1a',
                      lineHeight: '1.3'
                    }}
                  >
                    {isArabic ? 'م. مازن المطيري' : 'Eng. Mazen Al-Mutairi'}
                  </h3>

                  <span
                    className="team-role"
                    style={{
                      color: '#0A4D8C',
                      fontWeight: '600',
                      fontSize: 'clamp(13px, 2vw, 15px)',
                      display: 'block',
                      marginBottom: '12px'
                    }}
                  >
                    {isArabic ? 'الرئيس التنفيذي لوكيل إيزي سايبر' : 'CEO of Easy Cyber Agency'}
                  </span>

                  <p
                    className="team-bio"
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
        ref={whyUsSection.ref}
        id="why-us"
        className="why-choose-section"
        style={{
          padding: 'clamp(60px, 12vw, 100px) 0',
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Background Element */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-120px',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 1s'
        }}></div>

        <div className="container">
          <div
            className="section-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: 'center',
              marginBottom: '60px',
              opacity: whyUsSection.isInView ? 1 : 0,
              transform: whyUsSection.isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
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
              const isHighlightHovered = hoveredHighlight === index;

              return (
                <div
                  key={index}
                  className="col-lg-6 col-md-6"
                  style={{
                    opacity: whyUsSection.isInView ? 1 : 0,
                    transform: whyUsSection.isInView ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.08}s`
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '20px',
                      background: '#fff',
                      padding: '25px',
                      borderRadius: '12px',
                      border: `1px solid rgba(0, 0, 0, 0.06)`,
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      flexDirection: isArabic ? 'row-reverse' : 'row',
                      position: 'relative',
                      overflow: 'hidden',
                      transform: isHighlightHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                      boxShadow: isHighlightHovered
                        ? '0 20px 40px rgba(10, 77, 140, 0.12)'
                        : '0 4px 15px rgba(0, 0, 0, 0.04)'
                    }}
                    className="why-choose-item"
                    onMouseEnter={() => setHoveredHighlight(index)}
                    onMouseLeave={() => setHoveredHighlight(null)}
                  >
                    {/* Check Mark */}
                    <div className="check-mark">
                      <i className="bx bx-check"></i>
                    </div>

                    <div
                      style={{
                        minWidth: '50px',
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(10, 77, 140, 0.3)'
                      }}
                    >
                      <i className={icons[index]} style={{ fontSize: '28px', color: '#ffffff' }}></i>
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
        ref={ctaSection.ref}
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

        {/* Floating Shapes */}
        <div className="cta-shape"></div>
        <div className="cta-shape"></div>
        <div className="cta-shape"></div>

        <div
          className="container cta-content"
          style={{
            position: 'relative',
            zIndex: 1,
            opacity: ctaSection.isInView ? 1 : 0,
            transform: ctaSection.isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
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
