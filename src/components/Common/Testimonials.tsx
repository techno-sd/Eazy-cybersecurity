"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

// Custom hook for scroll-triggered animations
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);
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

// Custom hook for responsive detection
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 576);
      setIsTablet(window.innerWidth >= 576 && window.innerWidth < 992);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
};

// Function to generate avatar with initials
const getAvatarUrl = (name: string, isArabic: boolean = false): string => {
  const words = name.split(' ');
  let initials = words
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // For Arabic names, reverse the initials order to match RTL reading
  if (isArabic && initials.length === 2) {
    initials = initials.split('').reverse().join('');
  }

  // Using ui-avatars.com for professional-looking avatars
  // Colors based on platform theme
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=0A4D8C&color=fff&size=128&bold=true&font-size=0.5`;
};

const testimonials = {
  en: [
    {
      text: "Their AI and cloud services helped us accelerate our digital transformation securely. We trust Eazy Cyber Agent as a strategic partner.",
      name: "Sara Al Otaibi",
      title: "CIO, Saudi Healthcare Group"
    },
    {
      text: "Excellent support and deep local expertise. Eazy Cyber Agent's solutions are fully compliant with Saudi regulations.",
      name: "Mohammed Al Harbi",
      title: "Operations Manager, EnergyCo"
    },
    {
      text: "We achieved a new level of security and efficiency thanks to their innovative approach and 24/7 support.",
      name: "Lina Al Dossary",
      title: "CEO, TechStart KSA"
    },
    {
      text: "Their team's dedication and technical know-how made our cloud migration seamless and secure.",
      name: "Abdullah Al Qahtani",
      title: "Head of IT, Al Shifa Hospital"
    },
    {
      text: "We recommend Eazy Cyber Agent to any Saudi organization seeking reliable, innovative digital solutions.",
      name: "Mona Al Amri",
      title: "Founder, SME Solutions"
    }
  ],
  ar: [
    {
      text: "خدمات الذكاء الاصطناعي والسحابة من Eazy Cyber Agent ساعدتنا في تسريع التحول الرقمي بأمان. نثق بهم كشريك استراتيجي.",
      name: "سارة العتيبي",
      title: "مديرة تقنية المعلومات، مجموعة الصحة السعودية"
    },
    {
      text: "دعم ممتاز وخبرة محلية عميقة. حلولهم متوافقة تماماً مع الأنظمة السعودية.",
      name: "محمد الحربي",
      title: "مدير العمليات، EnergyCo"
    },
    {
      text: "حققنا مستوى جديداً من الأمان والكفاءة بفضل نهجهم المبتكر ودعمهم على مدار الساعة.",
      name: "لينا الدوسري",
      title: "الرئيس التنفيذي، TechStart KSA"
    },
    {
      text: "تفاني فريقهم ومعرفتهم التقنية جعلت انتقالنا إلى السحابة سلساً وآمناً.",
      name: "عبدالله القحطاني",
      title: "رئيس قسم تقنية المعلومات، مستشفى الشفاء"
    },
    {
      text: "نوصي بـ Eazy Cyber Agent لأي جهة سعودية تبحث عن حلول رقمية موثوقة ومبتكرة.",
      name: "منى العمري",
      title: "مؤسسة SME Solutions"
    }
  ]
};

const Testimonials: React.FC = () => {
  const { lang } = useLang();
  const t = lang === 'ar' ? testimonials.ar : testimonials.en;
  const sectionTitle = lang === 'ar' ? 'آراء عملائنا' : "What Clients Say About Us";
  const sectionDesc = lang === 'ar'
    ? 'نفتخر بثقة عملائنا في المملكة العربية السعودية، ونلتزم بتقديم حلول رقمية وأمنية مبتكرة تدعم نجاحهم.'
    : "We are proud to earn the trust of leading organizations across Saudi Arabia. Here's what our clients say about working with Eazy Cyber Agent.";
  const isArabic = lang === 'ar';

  // Use the custom hook for scroll-triggered animations
  const sectionRef = useInView(0.1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeStars, setActiveStars] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsive();

  return (
    <>
      <section
        ref={sectionRef.ref}
        className="client-area ptb-100"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0A4D8C 0%, #073366 50%, #051d3d 100%)',
        }}
      >
        {/* Enhanced Animated Background - Responsive */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: isMobile ? '-100px' : '-150px',
          width: isMobile ? '250px' : isTablet ? '350px' : '500px',
          height: isMobile ? '250px' : isTablet ? '350px' : '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite',
          opacity: sectionRef.isInView ? 1 : 0,
          transition: 'opacity 1s ease'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: isMobile ? '-50px' : '-100px',
          width: isMobile ? '200px' : isTablet ? '300px' : '400px',
          height: isMobile ? '200px' : isTablet ? '300px' : '400px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s',
          opacity: sectionRef.isInView ? 1 : 0,
          transition: 'opacity 1s ease 0.3s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '300px' : isTablet ? '500px' : '800px',
          height: isMobile ? '300px' : isTablet ? '500px' : '800px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.08) 0%, transparent 60%)',
          borderRadius: '50%',
          animation: 'pulse 8s ease-in-out infinite',
          opacity: sectionRef.isInView ? 0.6 : 0,
          transition: 'opacity 1.2s ease 0.5s'
        }}></div>

        {/* Decorative Quote Icons - Hidden on mobile for cleaner look */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            fontSize: isTablet ? '80px' : '120px',
            color: 'rgba(255, 255, 255, 0.03)',
            transform: sectionRef.isInView ? 'rotate(15deg) scale(1)' : 'rotate(0deg) scale(0.5)',
            opacity: sectionRef.isInView ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.4s'
          }}>
            <i className="bx bxs-quote-alt-left"></i>
          </div>
        )}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '8%',
            fontSize: isTablet ? '50px' : '80px',
            color: 'rgba(255, 255, 255, 0.02)',
            transform: sectionRef.isInView ? 'rotate(-10deg) scale(1)' : 'rotate(0deg) scale(0.5)',
            opacity: sectionRef.isInView ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.6s'
          }}>
            <i className="bx bxs-quote-alt-right"></i>
          </div>
        )}
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 15px' : undefined }}>
          <div
            className="section-title white-title"
            style={{
              direction: isArabic ? 'rtl' : 'ltr',
              textAlign: 'center',
              maxWidth: '900px',
              margin: isMobile ? '0 auto 40px' : isTablet ? '0 auto 50px' : '0 auto 70px',
              opacity: sectionRef.isInView ? 1 : 0,
              transform: sectionRef.isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {/* Animated Badge - Responsive */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '8px',
              padding: isMobile ? '8px 16px' : '10px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '50px',
              marginBottom: isMobile ? '18px' : '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              opacity: sectionRef.isInView ? 1 : 0,
              transform: sectionRef.isInView ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
            }}>
              <i className="bx bxs-star" style={{ color: '#FFD700', fontSize: isMobile ? '14px' : '16px' }}></i>
              <span style={{ color: 'white', fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
                {isArabic ? 'تقييمات العملاء' : 'Client Reviews'}
              </span>
            </span>

            <h2 style={{
              fontSize: isMobile ? 'clamp(24px, 7vw, 32px)' : 'clamp(32px, 6vw, 48px)',
              fontWeight: '800',
              marginBottom: isMobile ? '15px' : '20px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              color: 'white',
              background: 'none',
              WebkitTextFillColor: 'white',
              backgroundClip: 'unset',
              WebkitBackgroundClip: 'unset',
              opacity: sectionRef.isInView ? 1 : 0,
              transform: sectionRef.isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s'
            } as React.CSSProperties}>{sectionTitle}</h2>

            <p style={{
              fontSize: isMobile ? '14px' : isTablet ? '15px' : '17px',
              lineHeight: isMobile ? '1.7' : '1.9',
              marginBottom: '0',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '700px',
              margin: '0 auto',
              padding: isMobile ? '0 10px' : undefined,
              opacity: sectionRef.isInView ? 1 : 0,
              transform: sectionRef.isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s'
            }}>{sectionDesc}</p>
          </div>
          <div style={{
            opacity: sectionRef.isInView ? 1 : 0,
            transform: sectionRef.isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.5s'
          }}>
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 25 },
                992: { slidesPerView: 3, spaceBetween: 30 },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              modules={[Pagination, Autoplay]}
              className="client-wrap testimonials-swiper"
              style={{ paddingBottom: isMobile ? '40px' : '45px' }}
            >
              {t.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="single-client"
                    onMouseEnter={() => {
                      setHoveredCard(idx);
                      setActiveStars(idx);
                    }}
                    onMouseLeave={() => {
                      setHoveredCard(null);
                      setActiveStars(null);
                    }}
                    style={{
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      transform: hoveredCard === idx ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                      boxShadow: hoveredCard === idx
                        ? '0 30px 60px rgba(0, 0, 0, 0.3)'
                        : '0 15px 40px rgba(0, 0, 0, 0.15)',
                      background: hoveredCard === idx
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: hoveredCard === idx
                        ? '1px solid rgba(255, 255, 255, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: isMobile ? '12px' : '14px',
                      padding: isMobile ? '14px 12px' : isTablet ? '16px 14px' : '16px 14px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Animated Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
                      backgroundSize: '200% 100%',
                      animation: hoveredCard === idx ? 'shimmer 2s linear infinite' : 'none',
                      opacity: hoveredCard === idx ? 1 : 0,
                      transition: 'opacity 0.4s ease'
                    }}></div>

                    {/* Quote Icon - Responsive */}
                    <i
                      className="quotes bx bxs-quote-alt-left"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                        transform: hoveredCard === idx ? 'scale(1.3) rotate(-10deg)' : 'scale(1) rotate(0)',
                        color: hoveredCard === idx ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
                        fontSize: isMobile ? '18px' : '20px',
                        marginBottom: isMobile ? '5px' : '6px',
                        display: 'block'
                      }}
                    ></i>

                    {/* Testimonial Text - Responsive */}
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: isMobile ? '11px' : '11px',
                      lineHeight: isMobile ? '1.5' : '1.55',
                      marginBottom: isMobile ? '8px' : '10px',
                      minHeight: isMobile ? 'auto' : isTablet ? '48px' : '52px',
                      direction: isArabic ? 'rtl' : 'ltr',
                      textAlign: isArabic ? 'right' : 'left'
                    }}>{item.text}</p>

                    {/* Animated Star Rating - Responsive */}
                    <ul style={{
                      display: 'flex',
                      gap: isMobile ? '2px' : '3px',
                      padding: 0,
                      margin: isMobile ? '0 0 8px 0' : '0 0 10px 0',
                      listStyle: 'none',
                      justifyContent: isArabic ? 'flex-end' : 'flex-start'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <li key={i} style={{
                          transition: `all 0.3s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.08}s`,
                          transform: activeStars === idx ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0)',
                          opacity: activeStars === idx ? 1 : 0.7
                        }}>
                          <i className="bx bxs-star" style={{
                            color: '#FFD700',
                            fontSize: isMobile
                              ? (activeStars === idx ? '11px' : '10px')
                              : (activeStars === idx ? '12px' : '10px'),
                            transition: 'font-size 0.3s ease',
                            filter: activeStars === idx ? 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))' : 'none'
                          }}></i>
                        </li>
                      ))}
                    </ul>

                    {/* Client Info - Responsive */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '6px' : '8px',
                      flexDirection: isArabic ? 'row-reverse' : 'row',
                      width: '100%'
                    }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <Image
                          src={getAvatarUrl(item.name, isArabic)}
                          alt={`${item.name} - ${item.title}`}
                          width={isMobile ? 32 : 36}
                          height={isMobile ? 32 : 36}
                          style={{
                            borderRadius: '50%',
                            border: hoveredCard === idx
                              ? '2px solid #FFD700'
                              : '2px solid rgba(255, 255, 255, 0.3)',
                            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                            transform: hoveredCard === idx ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: hoveredCard === idx
                              ? '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.3)'
                              : '0 5px 15px rgba(0, 0, 0, 0.2)'
                          }}
                        />
                        {/* Online Indicator - Responsive */}
                        <span style={{
                          position: 'absolute',
                          bottom: '0px',
                          right: '0px',
                          width: isMobile ? '6px' : '8px',
                          height: isMobile ? '6px' : '8px',
                          background: '#22c55e',
                          borderRadius: '50%',
                          border: '1.5px solid rgba(255, 255, 255, 0.9)',
                          animation: hoveredCard === idx ? 'pulse 2s ease-in-out infinite' : 'none'
                        }}></span>
                      </div>
                      <div style={{
                        textAlign: isArabic ? 'right' : 'left',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <p style={{
                          color: '#ffffff',
                          fontSize: isMobile ? '11px' : '12px',
                          fontWeight: '700',
                          margin: '0 0 1px 0',
                          padding: 0,
                          lineHeight: '1.2'
                        }}>{item.name}</p>
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: isMobile ? '9px' : '10px',
                          fontWeight: '500',
                          margin: 0,
                          padding: 0,
                          lineHeight: '1.2'
                        }}>{item.title}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
