"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Vision2030Props {
  lang: string;
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

const Vision2030Content: React.FC<Vision2030Props> = ({ lang }) => {
  const isArabic = lang === "ar";

  // Scroll reveal for sections
  const headerSection = useInView(0.15);
  const pointsSection = useInView(0.1);

  // Hover state for cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const content = {
    en: {
      title: "Our Vision 2030 (Alignment with Vision 2030)",
      subtitle: "Building a Secure Digital Future",
      description: "We believe that cybersecurity and digital innovation are two fundamental pillars of the Kingdom's Vision 2030, so our solutions focus on:",
      mainPoints: [
        {
          number: "01",
          title: "Digital Transformation",
          text: "Empowering digital transformation in government and private entities.",
          icon: "bx bx-cloud-upload",
          color: "#0A4D8C"
        },
        {
          number: "02",
          title: "National Infrastructure",
          text: "Protecting critical national infrastructure.",
          icon: "bx bx-shield-alt-2",
          color: "#607EAC"
        },
        {
          number: "03",
          title: "Innovation & Entrepreneurship",
          text: "Supporting technical entrepreneurship and startups.",
          icon: "bx bx-bulb",
          color: "#0A4D8C"
        },
        {
          number: "04",
          title: "Talent Development",
          text: "Contributing to the development of national competencies through training and capacity building.",
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
      title: "رؤيتنا 2030 (التوافق مع رؤية 2030)",
      subtitle: "بناء مستقبل رقمي آمن",
      description: "نحن نؤمن أن الأمن السيبراني والابتكار الرقمي هما ركيزتان أساسيتان في رؤية المملكة 2030، لذلك تركز حلولنا على:",
      mainPoints: [
        {
          number: "01",
          title: "التحول الرقمي",
          text: "تمكين التحول الرقمي في الجهات الحكومية والخاصة.",
          icon: "bx bx-cloud-upload",
          color: "#0A4D8C"
        },
        {
          number: "02",
          title: "البنية التحتية الوطنية",
          text: "حماية البنية التحتية الحيوية الوطنية.",
          icon: "bx bx-shield-alt-2",
          color: "#607EAC"
        },
        {
          number: "03",
          title: "الابتكار وريادة الأعمال",
          text: "دعم ريادة الأعمال التقنية والشركات الناشئة.",
          icon: "bx bx-bulb",
          color: "#0A4D8C"
        },
        {
          number: "04",
          title: "تطوير المواهب",
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
        ref={headerSection.ref}
        className="vision-2030-area ptb-100"
        style={{
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
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
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>

        <div className="container" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {/* Header Section with Image */}
          <div className="row align-items-center mb-5">
            <div
              className="col-lg-6"
              style={{
                opacity: headerSection.isInView ? 1 : 0,
                transform: headerSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '50px' : '-50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
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

            <div
              className="col-lg-6"
              style={{
                opacity: headerSection.isInView ? 1 : 0,
                transform: headerSection.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-50px' : '50px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
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
                  marginBottom: '0'
                }}>
                  {currentContent.description}
                </p>
              </div>
            </div>
          </div>

          <div ref={pointsSection.ref} className="row g-4 mt-4">
            {currentContent.mainPoints.map((point, index) => {
              const isHovered = hoveredCard === index;
              return (
              <div
                key={index}
                className="col-lg-6 col-md-6"
                style={{
                  opacity: pointsSection.isInView ? 1 : 0,
                  transform: pointsSection.isInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '30px',
                    height: '100%',
                    border: `2px solid ${point.color}20`,
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered
                      ? `0 25px 50px ${point.color}25`
                      : '0 5px 20px rgba(0, 0, 0, 0.05)'
                  }}
                  className="vision-point-card"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
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
            );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Vision2030Content;
