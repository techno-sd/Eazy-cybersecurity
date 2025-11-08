"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Vision2030Props {
  lang: string;
}

const Vision2030Content: React.FC<Vision2030Props> = ({ lang }) => {
  const isArabic = lang === "ar";

  const content = {
    en: {
      title: "Vision 2030 Alignment",
      subtitle: "Building a Secure Digital Future",
      description: "Eazy Cyber Agent is proud to contribute to Saudi Vision 2030 by providing cutting-edge cybersecurity solutions that protect national digital infrastructure and empower digital transformation across all sectors.",
      mainPoints: [
        {
          number: "01",
          title: "Digital Transformation",
          text: "Empowering government and private sectors with secure digital solutions aligned with Vision 2030 objectives.",
          icon: "bx bx-cloud-upload",
          color: "#0A4D8C"
        },
        {
          number: "02",
          title: "National Infrastructure",
          text: "Protecting critical national infrastructure through advanced threat detection and security operations centers.",
          icon: "bx bx-shield-alt-2",
          color: "#607EAC"
        },
        {
          number: "03",
          title: "Innovation & Entrepreneurship",
          text: "Supporting technical entrepreneurship and startups with secure cloud solutions and AI-driven security tools.",
          icon: "bx bx-bulb",
          color: "#0A4D8C"
        },
        {
          number: "04",
          title: "Talent Development",
          text: "Contributing to national expertise development through comprehensive cybersecurity training and capacity building programs.",
          icon: "bx bx-user-check",
          color: "#607EAC"
        }
      ],
      stats: [
        { value: "100+", label: "Enterprises Protected" },
        { value: "24/7", label: "Security Monitoring" },
        { value: "99.9%", label: "Uptime Guarantee" },
        { value: "50+", label: "Certified Experts" }
      ],
      ctaText: "Partner With Us"
    },
    ar: {
      title: "التوافق مع رؤية 2030",
      subtitle: "بناء مستقبل رقمي آمن",
      description: "نحن نؤمن أن الأمن السيبراني والابتكار الرقمي هما ركيزتان أساسيتان في رؤية المملكة 2030، لذلك تركز حلولنا على:",
      mainPoints: [
        {
          number: "٠١",
          title: "التحول الرقمي",
          text: "تمكين التحول الرقمي في الجهات الحكومية والخاصة.",
          icon: "bx bx-cloud-upload",
          color: "#0A4D8C"
        },
        {
          number: "٠٢",
          title: "البنية التحتية الوطنية",
          text: "حماية البنية التحتية الحيوية الوطنية.",
          icon: "bx bx-shield-alt-2",
          color: "#607EAC"
        },
        {
          number: "٠٣",
          title: "ريادة الأعمال التقنية",
          text: "دعم ريادة الأعمال التقنية والشركات الناشئة.",
          icon: "bx bx-bulb",
          color: "#0A4D8C"
        },
        {
          number: "٠٤",
          title: "تطوير الكفاءات",
          text: "المساهمة في تطوير الكفاءات الوطنية عبر التدريب وبناء القدرات.",
          icon: "bx bx-user-check",
          color: "#607EAC"
        }
      ],
      stats: [
        { value: "+100", label: "مؤسسة محمية" },
        { value: "24/7", label: "مراقبة أمنية" },
        { value: "99.9%", label: "ضمان التشغيل" },
        { value: "+50", label: "خبير معتمد" }
      ],
      ctaText: "كن شريكاً لنا"
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  return (
    <>
      <section 
        className="vision-2030-area ptb-100" 
        style={{ 
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <div className="row align-items-center mb-5">
            <div className="col-lg-6" data-aos="fade-up">
              <div style={{ position: 'relative' }}>
                <Image
                  src="/img/vision-2020.jpg"
                  alt={isArabic ? "رؤية 2030" : "Vision 2030"}
                  width={600}
                  height={500}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(10, 77, 140, 0.15)',
                    transition: 'all 0.5s ease'
                  }}
                  className="vision-image-hover"
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: isArabic ? 'auto' : '20px',
                  left: isArabic ? '20px' : 'auto',
                  padding: '15px 25px',
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.95), rgba(96, 126, 172, 0.95))',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(10, 77, 140, 0.3)'
                }}>
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: '28px', 
                    fontWeight: '700', 
                    margin: '0',
                    textAlign: isArabic ? 'right' : 'left'
                  }}>
                    {isArabic ? 'رؤية 2030' : 'Vision 2030'}
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                  borderRadius: '30px',
                  color: '#0A4D8C',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '20px',
                  border: '2px solid rgba(10, 77, 140, 0.2)'
                }}>
                  <i className="bx bx-trending-up" style={{ fontSize: '18px' }}></i>
                  {currentContent.subtitle}
                </span>
                
                <h2 style={{
                  fontSize: '42px',
                  fontWeight: '700',
                  marginBottom: '25px',
                  lineHeight: '1.3',
                  color: '#1a1a1a',
                  background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {currentContent.title}
                </h2>

                <p style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: '#555',
                  marginBottom: '30px'
                }}>
                  {currentContent.description}
                </p>

                <Link 
                  href="/contact" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                    color: '#fff',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(10, 77, 140, 0.25)'
                  }}
                  className="vision-cta-button"
                >
                  {currentContent.ctaText}
                  <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '20px' }}></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-5">
            {currentContent.mainPoints.map((point, index) => (
              <div key={index} className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '30px',
                  height: '100%',
                  border: `2px solid ${point.color}20`,
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }} className="vision-point-card">
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: isArabic ? 'auto' : '-20px',
                    left: isArabic ? '-20px' : 'auto',
                    width: '100px',
                    height: '100px',
                    background: `linear-gradient(135deg, ${point.color}10, ${point.color}05)`,
                    borderRadius: '50%',
                    zIndex: 0
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px', textAlign: isArabic ? 'right' : 'left', flexDirection: isArabic ? 'row-reverse' : 'row' }}>
                      <div style={{ flex: 1 }}>
                        <i className={point.icon} style={{
                          fontSize: '32px',
                          color: point.color,
                          marginBottom: '10px',
                          display: 'block'
                        }}></i>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#1a1a1a',
                          marginBottom: '12px'
                        }}>
                          {point.title}
                        </h3>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '15px',
                      lineHeight: '1.7',
                      color: '#666',
                      marginBottom: '0',
                      textAlign: isArabic ? 'right' : 'left'
                    }}>
                      {point.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Vision2030Content;
