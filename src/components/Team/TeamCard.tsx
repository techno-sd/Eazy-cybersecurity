"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

const TeamCard: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: "Eng. Mazin Al Motairy",
      role: "CEO",
      image: "/img/team/CEO.jpg",
      bio: isArabic ? "الرئيس التنفيذي" : "Chief Executive Officer"
    },
    {
      name: "Peter Pers",
      role: "Director",
      image: "/img/team/team1.jpg",
      bio: isArabic ? "مدير العمليات" : "Operations Director"
    },
    {
      name: "Sarah Swift",
      role: "Executive",
      image: "/img/team/team2.jpg",
      bio: isArabic ? "مديرة التنفيذ" : "Executive Manager"
    },
    {
      name: "Alita Scott",
      role: "Lead Programmer",
      image: "/img/team/team3.jpg",
      bio: isArabic ? "مبرمج رئيسي" : "Lead Programmer"
    },
    {
      name: "Denial James",
      role: "Technical Lead",
      image: "/img/team/team4.jpg",
      bio: isArabic ? "مسؤول تقني" : "Technical Lead"
    },
    {
      name: "Killv Smith",
      role: "Regional Leader",
      image: "/img/team/team5.jpg",
      bio: isArabic ? "قائد إقليمي" : "Regional Leader"
    },
    {
      name: "Kilva Smith",
      role: "Web Designer",
      image: "/img/team/team6.jpg",
      bio: isArabic ? "مصمم ويب" : "Web Designer"
    },
    {
      name: "Zinkel Dew",
      role: "Graphics Designer",
      image: "/img/team/team7.jpg",
      bio: isArabic ? "مصمم رسوميات" : "Graphics Designer"
    }
  ];

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
          padding: '100px 0',
          direction: isArabic ? 'rtl' : 'ltr',
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
          bottom: '10%',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                borderRadius: '50px',
                color: '#0A4D8C',
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '20px',
                border: '1px solid rgba(10, 77, 140, 0.2)'
              }}
            >
              {isArabic ? 'فريقنا المتخصص' : 'Our Experts'}
            </span>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#0e0129',
              background: 'linear-gradient(135deg, #0A4D8C 0%, #0e0129 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {isArabic ? 'فريق عمل متميز' : 'Meet Our Team'}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              {isArabic
                ? 'متخصصون معتمدون بخبرة عملية واسعة في مجالات الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية'
                : 'Certified professionals with extensive expertise in cybersecurity, artificial intelligence, and cloud computing'}
            </p>
          </div>

          {/* Team Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '60px',
            position: 'relative',
            zIndex: 1
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Team Card */}
                <div
                  className="card-modern"
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: hoveredMember === index
                      ? '0 25px 50px rgba(10, 77, 140, 0.15)'
                      : '0 8px 24px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: hoveredMember === index ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
                    border: '1px solid rgba(10, 77, 140, 0.08)',
                    padding: 0
                  }}
                >
                  {/* Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '1',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.05))'
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease',
                        transform: hoveredMember === index ? 'scale(1.1)' : 'scale(1)',
                        filter: hoveredMember === index ? 'brightness(0.85)' : 'brightness(1)'
                      }}
                    />

                    {/* Social Links Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(10, 77, 140, 0.7) 0%, rgba(10, 77, 140, 0.9) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px',
                        opacity: hoveredMember === index ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0A4D8C',
                          transition: 'all 0.3s ease',
                          fontSize: '18px'
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = '#0A4D8C';
                          el.style.color = 'white';
                          el.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = 'white';
                          el.style.color = '#0A4D8C';
                          el.style.transform = 'scale(1)';
                        }}
                      >
                        <i className="bx bxl-facebook"></i>
                      </a>
                      <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0A4D8C',
                          transition: 'all 0.3s ease',
                          fontSize: '18px'
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = '#0A4D8C';
                          el.style.color = 'white';
                          el.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = 'white';
                          el.style.color = '#0A4D8C';
                          el.style.transform = 'scale(1)';
                        }}
                      >
                        <i className="bx bxl-twitter"></i>
                      </a>
                      <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0A4D8C',
                          transition: 'all 0.3s ease',
                          fontSize: '18px'
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = '#0A4D8C';
                          el.style.color = 'white';
                          el.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = 'white';
                          el.style.color = '#0A4D8C';
                          el.style.transform = 'scale(1)';
                        }}
                      >
                        <i className="bx bxl-linkedin"></i>
                      </a>
                      <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0A4D8C',
                          transition: 'all 0.3s ease',
                          fontSize: '18px'
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = '#0A4D8C';
                          el.style.color = 'white';
                          el.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = 'white';
                          el.style.color = '#0A4D8C';
                          el.style.transform = 'scale(1)';
                        }}
                      >
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '25px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#0e0129',
                      marginBottom: '8px',
                      margin: '0 0 8px 0'
                    }}>
                      {member.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#0A4D8C',
                      fontWeight: '600',
                      margin: '0',
                      marginBottom: '10px'
                    }}>
                      {member.role}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#999',
                      margin: '0',
                      lineHeight: '1.5'
                    }}>
                      {member.bio}
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

export default TeamCard;
