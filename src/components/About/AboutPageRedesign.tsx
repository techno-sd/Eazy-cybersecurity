"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const AboutPageRedesign: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0A4D8C 0%, #1a6fad 100%)',
          padding: '120px 0',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          direction: isArabic ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '25px', lineHeight: '1.2' }}>
                {isArabic ? 'من نحن' : 'About Us'}
              </h1>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px', opacity: 0.95 }}>
                {isArabic
                  ? 'نحن Eazy Cyber Agent، شركة سعودية رائدة متخصصة في الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية، ملتزمة بدعم التحول الرقمي وفقاً لرؤية السعودية 2030.'
                  : 'We are Eazy Cyber Agent, a leading Saudi company specializing in cybersecurity, artificial intelligence, and cloud computing, committed to supporting digital transformation aligned with Saudi Vision 2030.'}
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link
                  href="/contact"
                  style={{
                    padding: '14px 32px',
                    background: 'white',
                    color: '#0A4D8C',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isArabic ? 'اتصل بنا' : 'Get In Touch'}
                </Link>
                <Link
                  href="/services"
                  style={{
                    padding: '14px 32px',
                    background: 'transparent',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    border: '2px solid white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isArabic ? 'استكشف الخدمات' : 'Explore Services'}
                </Link>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div style={{
                position: 'relative',
                height: '400px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <i className="bx bx-shield" style={{ fontSize: '120px', opacity: 0.3 }}></i>
                  <p style={{ fontSize: '18px', marginTop: '20px', opacity: 0.8 }}>
                    {isArabic ? 'حماية شاملة' : 'Complete Protection'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
          padding: '80px 0',
          direction: isArabic ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          <div className="row g-4">
            {[
              { icon: 'bx-check-circle', number: '500+', label: isArabic ? 'عميل' : 'Clients' },
              { icon: 'bx-briefcase', number: '1000+', label: isArabic ? 'مشروع' : 'Projects' },
              { icon: 'bx-team', number: '50+', label: isArabic ? 'متخصص' : 'Experts' },
              { icon: 'bx-trophy', number: '15+', label: isArabic ? 'جوائز' : 'Awards' }
            ].map((stat, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 30px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className={`bx ${stat.icon}`} style={{ fontSize: '48px', color: '#0A4D8C', marginBottom: '20px', display: 'block' }}></i>
                  <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#0A4D8C', marginBottom: '10px' }}>
                    {stat.number}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section
        style={{
          padding: '100px 0',
          direction: isArabic ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', color: '#0e0129' }}>
              {isArabic ? 'أساسنا القوي' : 'Our Foundation'}
            </h2>
            <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              {isArabic
                ? 'ثلاث دعائم تحكم عملنا وتوجه قراراتنا نحو النجاح'
                : 'Three pillars that guide our work and drive our decisions toward success'}
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                title: isArabic ? 'رسالتنا' : 'Our Mission',
                desc: isArabic
                  ? 'توفير حلول رقمية وأمنية متقدمة تمكّن المؤسسات السعودية من تحقيق أهدافها في عصر التحول الرقمي'
                  : 'Deliver advanced digital and security solutions that empower Saudi organizations to achieve their goals in the digital transformation era',
                icon: 'bx-target',
                color: '#FF6B6B'
              },
              {
                title: isArabic ? 'رؤيتنا' : 'Our Vision',
                desc: isArabic
                  ? 'أن نكون الخيار الأول في المملكة والمنطقة لتقديم حلول رقمية وأمنية مبتكرة'
                  : 'To be the first choice in the Kingdom and region for delivering innovative digital and security solutions',
                icon: 'bx-glasses',
                color: '#4ECDC4'
              },
              {
                title: isArabic ? 'قيمنا' : 'Our Values',
                desc: isArabic
                  ? 'النزاهة والابتكار والتميز والعمل الجماعي والالتزام برعاية عملائنا'
                  : 'Integrity, innovation, excellence, teamwork, and commitment to customer care',
                icon: 'bx-heart',
                color: '#45B7D1'
              }
            ].map((item, idx) => (
              <div key={idx} className="col-lg-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
                    padding: '40px',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${item.color}`,
                    height: '100%'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: item.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '25px'
                  }}>
                    <i className={`bx ${item.icon}`} style={{ fontSize: '32px', color: 'white' }}></i>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#0e0129' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
          padding: '100px 0',
          direction: isArabic ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '30px', color: '#0e0129' }}>
                {isArabic ? 'لماذا تختار Eazy؟' : 'Why Choose Eazy?'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    title: isArabic ? 'خبرة محلية عميقة' : 'Deep Local Expertise',
                    desc: isArabic ? 'فهم شامل للسوق السعودي والأنظمة المحلية' : 'Complete understanding of Saudi market and local regulations'
                  },
                  {
                    title: isArabic ? 'حلول مخصصة' : 'Customized Solutions',
                    desc: isArabic ? 'تصميم الحلول وفقاً لاحتياجات عملائك الفريدة' : 'Solutions tailored to your unique business needs'
                  },
                  {
                    title: isArabic ? 'دعم 24/7' : '24/7 Support',
                    desc: isArabic ? 'فريق دعم متاح في جميع الأوقات لحل مشاكلك' : 'Support team available round the clock'
                  },
                  {
                    title: isArabic ? 'فريق محترف' : 'Professional Team',
                    desc: isArabic ? 'متخصصون معتمدون بخبرة عملية واسعة' : 'Certified professionals with extensive experience'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <i className="bx bx-check" style={{ fontSize: '24px', color: 'white' }}></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0e0129', marginBottom: '8px' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div style={{
                position: 'relative',
                height: '500px',
                background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(10, 77, 140, 0.2)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <i className="bx bx-star" style={{ fontSize: '100px', color: '#0A4D8C', opacity: 0.3 }}></i>
                  <p style={{ fontSize: '20px', color: '#0A4D8C', fontWeight: '600', marginTop: '20px' }}>
                    {isArabic ? 'التميز في كل مشروع' : 'Excellence in Every Project'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0A4D8C 0%, #1a6fad 100%)',
          padding: '100px 0',
          color: 'white',
          textAlign: 'center',
          direction: isArabic ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '25px' }}>
            {isArabic ? 'جاهز للبدء؟' : 'Ready to Transform?'}
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', opacity: 0.95 }}>
            {isArabic
              ? 'دعنا نساعدك في تحقيق أهدافك الرقمية. تواصل معنا اليوم للحصول على استشارة مجانية.'
              : 'Let us help you achieve your digital goals. Contact us today for a free consultation.'}
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                padding: '16px 40px',
                background: 'white',
                color: '#0A4D8C',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              {isArabic ? 'اتصل بنا الآن' : 'Contact Us Now'}
            </Link>
            <Link
              href="/industries"
              style={{
                padding: '16px 40px',
                background: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '16px',
                border: '2px solid white',
                transition: 'all 0.3s ease'
              }}
            >
              {isArabic ? 'استكشف القطاعات' : 'Explore Industries'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPageRedesign;
