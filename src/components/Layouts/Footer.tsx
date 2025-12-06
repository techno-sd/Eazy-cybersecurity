"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const Footer: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer-top-area pt-100 pb-70 jarallax">
        <div className="container">
          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {/* Contact Us Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="single-widget contact" style={{ textAlign: isArabic ? 'right' : 'left', marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '700', marginBottom: 'clamp(15px, 2vw, 20px)' }}>{isArabic ? 'اتصل بنا' : 'Contact Us'}</h3>

                <ul className="contact-info" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <li>
                    <i className="bx bx-phone-call"></i>
                    <span>{isArabic ? 'الهاتف:' : 'Phone:'}</span>
                    <a href="tel:+966563664008" dir="ltr">+966 56 366 4008</a>
                  </li>

                  <li>
                    <i className="bx bx-envelope"></i>
                    <span>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</span>
                    <a href="mailto:info@eazycyber.sa" dir="ltr">info@eazycyber.sa</a>
                  </li>

                                    <li>
                    <i className="bx bx-map"></i>
                    {isArabic ? 'ينبع، المملكة العربية السعودية' : 'Yanbu, Kingdom of Saudi Arabia'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Services Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="single-widget" style={{ textAlign: isArabic ? 'right' : 'left', marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '700', marginBottom: 'clamp(15px, 2vw, 20px)' }}>{isArabic ? 'خدماتنا' : 'Our Services'}</h3>

                <ul>
                  <li>
                    <Link href="/services#ai">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#cybersecurity">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'خدمات الأمن السيبراني' : 'Cybersecurity Services'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#bigdata">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'البيانات الضخمة والتحليلات' : 'Big Data & Analytics'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#cloud">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'الحوسبة السحابية' : 'Cloud Computing'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#sme">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'برنامج SME-EAZY' : 'SME-EAZY Program'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Industries Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="single-widget" style={{ textAlign: isArabic ? 'right' : 'left', marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '700', marginBottom: 'clamp(15px, 2vw, 20px)' }}>{isArabic ? 'القطاعات' : 'Industries'}</h3>

                <ul>
                  <li>
                    <Link href="/industries#government">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'القطاع الحكومي (التحول الرقمي الحكومي)' : 'Government & Public Sector'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#banking">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'البنوك والخدمات المالية' : 'Banking & Finance'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#energy">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'الطاقة والاتصالات' : 'Energy & Telecom'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#healthcare">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'الرعاية الصحية' : 'Healthcare'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#education">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'التعليم والجامعات' : 'Education'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#smes">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'الشركات الصغيرة والمتوسطة' : 'SMEs & Startups'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="single-widget" style={{ textAlign: isArabic ? 'right' : 'left', marginBottom: '30px' }}>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: '700', marginBottom: 'clamp(15px, 2vw, 20px)' }}>{isArabic ? 'روابط سريعة' : 'Quick Links'}</h3>

                <ul>
                  <li>
                    <Link href="/about#vision-mission">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'الرؤية والرسالة' : 'Vision & Mission'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#values">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'القيم الأساسية' : 'Core Values'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#team">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'فريقنا' : 'Our Team'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#why-us">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'لماذا نحن' : 'Why Choose Us'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/vision-2030">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'رؤية 2030' : 'Vision 2030'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'المدونة' : 'Blog'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact#location">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'اتصل بنا' : 'Contact Us'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer-bottom-area">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12">
              <div className="copy-right" style={{ textAlign: 'center', direction: isArabic ? 'rtl' : 'ltr', width: '100%', padding: 'clamp(15px, 3vw, 20px) 0' }}>
                <p style={{ margin: '0 auto', textAlign: 'center', fontSize: 'clamp(12px, 2vw, 14px)' }}>
                  {isArabic
                    ? `جميع الحقوق محفوظة © ${currentYear} Eazy Cyber Agent`
                    : `Copyright © ${currentYear} Eazy Cyber Agent`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
