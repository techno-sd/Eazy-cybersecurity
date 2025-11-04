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
            <div className="col-lg-3 col-md-6">
              <div className="single-widget contact" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <h3>{isArabic ? 'اتصل بنا' : 'Contact Us'}</h3>

                <ul className="contact-info" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <li>
                    <i className="bx bx-phone-call"></i>
                    <span>{isArabic ? 'الهاتف:' : 'Hotline:'}</span>
                    <a href="tel:+966563664008">+966 56 366 4008</a>
                  </li>

                  <li>
                    <i className="bx bx-envelope"></i>
                    <span>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</span>
                    <a href="mailto:support@eazycyber.sa">support@eazycyber.sa</a>
                  </li>

                  <li>
                    <i className="bx bx-location-plus"></i>
                    <span>{isArabic ? 'العنوان:' : 'Address:'}</span>
                    {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Services Column */}
            <div className="col-lg-3 col-md-6">
              <div className="single-widget" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <h3>{isArabic ? 'خدماتنا' : 'Our Services'}</h3>

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
            <div className="col-lg-3 col-md-6">
              <div className="single-widget" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <h3>{isArabic ? 'القطاعات' : 'Industries'}</h3>

                <ul>
                  <li>
                    <Link href="/industries#government">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'القطاع الحكومي' : 'Government & Public Sector'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#finance">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'البنوك والمالية' : 'Banking & Finance'}
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
                      {isArabic ? 'التعليم' : 'Education'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries#smes">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'الشركات الصغيرة' : 'SMEs & Startups'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="col-lg-3 col-md-6">
              <div className="single-widget" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <h3>{isArabic ? 'روابط سريعة' : 'Quick Links'}</h3>

                <ul>
                  <li>
                    <Link href="/about">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'من نحن' : 'About Us'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/vision-2030">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'رؤية 2030' : 'Vision 2030'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/why-choose-us">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'لماذا نحن' : 'Why Choose Us'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'المدونة' : 'Blog'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'اتصل بنا' : 'Contact Us'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <i className="bx bx-chevrons-right"></i>
                      {isArabic ? 'دعم 24/7' : '24/7 Support'}
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
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="copy-right" style={{ textAlign: 'center', direction: isArabic ? 'rtl' : 'ltr' }}>
                <p>
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
