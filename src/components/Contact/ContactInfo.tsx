"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLang } from "@/context/LangContext";

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

const ContactInfo: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  // Scroll reveal
  const sectionRef = useInView(0.1);

  const content = {
    en: {
      location: "Our Location",
      address: "Yanbu, Saudi Arabia",
      fullAddress: "Yanbu, Kingdom of Saudi Arabia",
      email: "Email",
      phone: "Phone",
      hours: "Business Hours",
      hoursText: "Sunday - Thursday: 9:00 AM - 6:00 PM",
    },
    ar: {
      location: "موقعنا",
      address: "ينبع، المملكة العربية السعودية",
      fullAddress: "",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      hours: "ساعات العمل",
      hoursText: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  return (
    <>
      <div
        ref={sectionRef.ref}
        id="location"
        className={`contact-info-area ${isArabic ? 'rtl' : ''}`}
        style={{
          background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.02) 0%, rgba(14, 165, 233, 0.02) 100%)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite'
        }}></div>

        <div className="container">
          <div className="row align-items-stretch">
            {/* Contact Information Cards */}
            <div
              className="col-lg-6 mb-4 mb-lg-0"
              style={{
                opacity: sectionRef.isInView ? 1 : 0,
                transform: sectionRef.isInView ? 'translateX(0)' : `translateX(${isArabic ? '40px' : '-40px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(10, 77, 140, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#0A4D8C',
                  marginBottom: '30px',
                  textAlign: isArabic ? 'right' : 'left'
                }}>
                  {currentContent.location}
                </h2>

                {/* Location Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05) 0%, rgba(96, 126, 172, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '25px',
                  marginBottom: '25px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '2px solid rgba(10, 77, 140, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="contact-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 77, 140, 0.15)';
                  e.currentTarget.style.borderColor = '#0A4D8C';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.1)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(10, 77, 140, 0.05) 0%, rgba(96, 126, 172, 0.05) 100%)';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '55px',
                      height: '55px',
                      background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 8px 20px rgba(10, 77, 140, 0.25)'
                    }}>
                      <i className="bx bx-location-plus" style={{
                        fontSize: '28px',
                        color: 'white'
                      }}></i>
                    </div>
                    <div style={{ textAlign: isArabic ? 'right' : 'left', flex: 1 }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>
                        {currentContent.location}
                      </p>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', margin: 0, color: '#0A4D8C' }}>
                        {currentContent.address}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05) 0%, rgba(96, 126, 172, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '25px',
                  marginBottom: '25px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '2px solid rgba(10, 77, 140, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="contact-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 77, 140, 0.15)';
                  e.currentTarget.style.borderColor = '#0A4D8C';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.1)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(10, 77, 140, 0.05) 0%, rgba(96, 126, 172, 0.05) 100%)';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '55px',
                      height: '55px',
                      background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 8px 20px rgba(10, 77, 140, 0.25)'
                    }}>
                      <i className="bx bx-envelope" style={{
                        fontSize: '28px',
                        color: 'white'
                      }}></i>
                    </div>
                    <div style={{ textAlign: isArabic ? 'right' : 'left', flex: 1 }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>
                        {currentContent.email}
                      </p>
                      <a href="mailto:info@eazycyber.sa" style={{
                        color: '#0A4D8C',
                        fontWeight: '700',
                        textDecoration: 'none',
                        fontSize: '17px',
                        transition: 'color 0.3s ease'
                      }}>
                        info@eazycyber.sa
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05) 0%, rgba(96, 126, 172, 0.05) 100%)',
                  borderRadius: '20px',
                  padding: '25px',
                  marginBottom: '20px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '2px solid rgba(10, 77, 140, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="contact-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 77, 140, 0.15)';
                  e.currentTarget.style.borderColor = '#0A4D8C';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.1)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(10, 77, 140, 0.05) 0%, rgba(96, 126, 172, 0.05) 100%)';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '55px',
                      height: '55px',
                      background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 8px 20px rgba(10, 77, 140, 0.25)'
                    }}>
                      <i className="bx bx-phone" style={{
                        fontSize: '28px',
                        color: 'white'
                      }}></i>
                    </div>
                    <div style={{ textAlign: isArabic ? 'right' : 'left', flex: 1 }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666', fontWeight: '500' }}>
                        {currentContent.phone}
                      </p>
                      <a href="tel:+966563664008" style={{
                        color: '#0A4D8C',
                        fontWeight: '700',
                        textDecoration: 'none',
                        fontSize: '17px',
                        direction: 'ltr',
                        display: 'inline-block',
                        transition: 'color 0.3s ease'
                      }}>
                        +966 56 366 4008
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div
              className="col-lg-6"
              style={{
                opacity: sectionRef.isInView ? 1 : 0,
                transform: sectionRef.isInView ? 'translateX(0)' : `translateX(${isArabic ? '-40px' : '40px'})`,
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s'
              }}
            >
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                height: '100%',
                minHeight: '500px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(10, 77, 140, 0.1)'
              }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232345.67891234!2d38.0!3d24.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbe6a7b1b8d45%3A0x2e9c5f1e3c5a7b8e!2sYanbu%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
