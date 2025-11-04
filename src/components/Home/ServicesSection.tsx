"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesSection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="approach-area pb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="approach-img">
              <Image
                src="/img/approach-img.jpg"
                alt="Our Services"
                width={660}
                height={700}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
              <h2>{isArabic ? 'خدماتنا المتكاملة' : 'Our Comprehensive Services'}</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                {isArabic
                  ? 'نقدم حلولاً متكاملة في الأمن السيبراني والذكاء الاصطناعي والبيانات الضخمة والحوسبة السحابية لتمكين مؤسستك من التفوق في العصر الرقمي.'
                  : 'We deliver comprehensive solutions in cybersecurity, artificial intelligence, big data, and cloud computing to empower your organization to excel in the digital age.'}
              </p>

              <ul>
                <li>
                  <i className="flaticon-cyber"></i>
                  <h3>{t.home.services_overview.ai_title}</h3>
                  <p>{isArabic ? 'حلول ذكاء اصطناعي متقدمة تشمل روبوتات المحادثة والتحليلات التنبؤية لنمو أعمالك' : 'Advanced AI solutions including chatbots and predictive analytics for business growth'}</p>
                </li>
                <li>
                  <i className="flaticon-cyber-security"></i>
                  <h3>{t.home.services_overview.cybersecurity_title}</h3>
                  <p>{isArabic ? 'حماية شاملة متوافقة مع NCA وISO 27001 لحماية أصولك الرقمية' : 'Comprehensive protection compliant with NCA & ISO 27001 to secure your digital assets'}</p>
                </li>
                <li>
                  <i className="flaticon-database"></i>
                  <h3>{t.home.services_overview.bigdata_title}</h3>
                  <p>{isArabic ? 'تحويل البيانات الضخمة إلى رؤى استراتيجية قابلة للتنفيذ' : 'Transform big data into strategic, actionable insights'}</p>
                </li>
                <li>
                  <i className="flaticon-password"></i>
                  <h3>{t.home.services_overview.cloud_title}</h3>
                  <p>{isArabic ? 'بنية تحتية سحابية آمنة ومتوافقة مع الأنظمة السعودية' : 'Secure cloud infrastructure compliant with Saudi regulations'}</p>
                </li>
              </ul>

              <Link href="/services" className="default-btn" style={{ marginTop: '20px' }}>
                {t.home.services_overview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
