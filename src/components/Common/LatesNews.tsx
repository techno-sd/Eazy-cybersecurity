"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import HorizontalScrollCarousel from "./HorizontalScrollCarousel";
import BlogCard from "./BlogCard";

const LatesNews: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <>
      <section className="blog-area pb-70" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', paddingTop: '100px' }}>
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', margin: '0 auto 20px 0' }}></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0A4D8C', fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>
              <i className="bx bx-news"></i>
              {isArabic ? 'آخر الأخبار' : 'Latest News'}
            </span>
            <h2 className="gradient-text" style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px' }}>
              {isArabic ? 'آخر الأخبار من المدونة' : 'Latest News From Blog'}
            </h2>
            <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', color: '#666' }}>
              {isArabic 
                ? 'ابق على اطلاع بأحدث المقالات والأخبار حول الأمن السيبراني والحلول الرقمية المتقدمة.'
                : 'Stay up to date with the latest articles and news on cybersecurity and digital transformation.'}
            </p>
          </div>

          <HorizontalScrollCarousel 
            cardWidth={420}
            gap={24}
            showArrows={true}
          >
            <BlogCard
              image="/img/blog/blog1.jpg"
              alt="Blog 1"
              category={isArabic ? 'أمن سيبراني' : 'Cybersecurity'}
              date={isArabic ? '٢٠ يونيو ٢٠٢٤' : 'Jun 20 2024'}
              title={isArabic ? 'تحسين إدارة تكنولوجيا المعلومات' : 'Secure Managed IT'}
              description={
                isArabic
                  ? 'خدمات إدارة تكنولوجيا المعلومات الآمنة والموثوقة لضمان استمرارية الأعمال.'
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer'
              }
              isArabic={isArabic}
            />
            <BlogCard
              image="/img/blog/blog2.jpg"
              alt="Blog 2"
              category={isArabic ? 'أمن السحابة' : 'Cloud Security'}
              date={isArabic ? '٢١ يونيو ٢٠٢٤' : 'Jun 21 2024'}
              title={isArabic ? 'أمان السحابة المتقدم' : 'Cloud Security'}
              description={
                isArabic
                  ? 'حلول أمان شاملة للبيئات السحابية مع ضمانات الامتثال التنظيمي.'
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer'
              }
              isArabic={isArabic}
            />
            <BlogCard
              image="/img/blog/blog3.jpg"
              alt="Blog 3"
              category={isArabic ? 'حماية الويب' : 'Web Protection'}
              date={isArabic ? '٢٢ يونيو ٢٠٢٤' : 'Jun 22 2024'}
              title={isArabic ? 'إدارة الويب الآمنة' : 'Secure Managed Web'}
              description={
                isArabic
                  ? 'خدمات حماية متكاملة لتطبيقات الويب مع مراقبة ٢٤/٧.'
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer'
              }
              isArabic={isArabic}
            />
          </HorizontalScrollCarousel>
        </div>
      </section>
    </>
  );
};

export default LatesNews;
