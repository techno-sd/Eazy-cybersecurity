"use client";
  

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useLang } from "@/context/LangContext";


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
  return (
    <>
      <section className="client-area ptb-100">
        <div className="container">
          <div className="section-title white-title" style={{
            direction: isArabic ? 'rtl' : 'ltr',
            textAlign: isArabic ? 'right' : 'left',
            maxWidth: '900px',
            margin: '0 auto 60px'
          }}>
            <span style={{
              display: 'block',
              width: '70px',
              height: '5px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
              borderRadius: '3px',
              marginBottom: '25px',
              [isArabic ? 'marginLeft' : 'marginRight']: 'auto',
              boxShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
            }}></span>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              marginBottom: '20px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px'
            }}>{sectionTitle}</h2>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '25px',
              fontWeight: '500'
            }}>{sectionDesc}</p>
          </div>
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              922: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="client-wrap"
          >
            {t.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="single-client">
                  <i className="quotes bx bxs-quote-alt-left"></i>
                  <p>{item.text}</p>
                  <ul>
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <i className="bx bxs-star"></i>
                      </li>
                    ))}
                  </ul>
                  <div className="client-img">
                    <Image
                      src={getAvatarUrl(item.name, isArabic)}
                      alt={`${item.name} - ${item.title}`}
                      width={70}
                      height={70}
                      style={{
                        borderRadius: '50%',
                        border: '3px solid rgba(10, 77, 140, 0.2)'
                      }}
                    />
                    <h3>{item.name}</h3>
                    <span>{item.title}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
