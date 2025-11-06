"use client";
  

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const testimonials = {
  en: [
    {
      text: "Eazy Cyber Agent provided us with world-class cybersecurity solutions tailored for the Saudi market. Their team is highly professional and responsive.",
      name: "Fahad Al Saud",
      title: "IT Director, Riyadh Bank",
      img: "/img/client-img/client1.jpg"
    },
    {
      text: "Their AI and cloud services helped us accelerate our digital transformation securely. We trust Eazy Cyber Agent as a strategic partner.",
      name: "Sara Al Otaibi",
      title: "CIO, Saudi Healthcare Group",
      img: "/img/client-img/client2.jpg"
    },
    {
      text: "Excellent support and deep local expertise. Eazy Cyber Agent’s solutions are fully compliant with Saudi regulations.",
      name: "Mohammed Al Harbi",
      title: "Operations Manager, EnergyCo",
      img: "/img/client-img/client3.jpg"
    },
    {
      text: "We achieved a new level of security and efficiency thanks to their innovative approach and 24/7 support.",
      name: "Lina Al Dossary",
      title: "CEO, TechStart KSA",
      img: "/img/client-img/client4.jpg"
    },
    {
      text: "Their team’s dedication and technical know-how made our cloud migration seamless and secure.",
      name: "Abdullah Al Qahtani",
      title: "Head of IT, Al Shifa Hospital",
      img: "/img/client-img/client5.jpg"
    },
    {
      text: "We recommend Eazy Cyber Agent to any Saudi organization seeking reliable, innovative digital solutions.",
      name: "Mona Al Amri",
      title: "Founder, SME Solutions",
      img: "/img/client-img/client6.jpg"
    }
  ],
  ar: [
    {
      text: "قدمت لنا Eazy Cyber Agent حلول أمن سيبراني عالمية مصممة خصيصاً للسوق السعودي. فريقهم محترف ومتجاوب للغاية.",
      name: "فهد آل سعود",
      title: "مدير تقنية المعلومات، بنك الرياض",
      img: "/img/client-img/client1.jpg"
    },
    {
      text: "خدمات الذكاء الاصطناعي والسحابة من Eazy Cyber Agent ساعدتنا في تسريع التحول الرقمي بأمان. نثق بهم كشريك استراتيجي.",
      name: "سارة العتيبي",
      title: "مديرة تقنية المعلومات، مجموعة الصحة السعودية",
      img: "/img/client-img/client2.jpg"
    },
    {
      text: "دعم ممتاز وخبرة محلية عميقة. حلولهم متوافقة تماماً مع الأنظمة السعودية.",
      name: "محمد الحربي",
      title: "مدير العمليات، EnergyCo",
      img: "/img/client-img/client3.jpg"
    },
    {
      text: "حققنا مستوى جديداً من الأمان والكفاءة بفضل نهجهم المبتكر ودعمهم على مدار الساعة.",
      name: "لينا الدوسري",
      title: "الرئيس التنفيذي، TechStart KSA",
      img: "/img/client-img/client4.jpg"
    },
    {
      text: "تفاني فريقهم ومعرفتهم التقنية جعلت انتقالنا إلى السحابة سلساً وآمناً.",
      name: "عبدالله القحطاني",
      title: "رئيس قسم تقنية المعلومات، مستشفى الشفاء",
      img: "/img/client-img/client5.jpg"
    },
    {
      text: "نوصي بـ Eazy Cyber Agent لأي جهة سعودية تبحث عن حلول رقمية موثوقة ومبتكرة.",
      name: "منى العمري",
      title: "مؤسسة SME Solutions",
      img: "/img/client-img/client6.jpg"
    }
  ]
};

const TestimonialsCard: React.FC = () => {
  const { lang } = useLang();
  const t = lang === 'ar' ? testimonials.ar : testimonials.en;
  const sectionTitle = lang === 'ar' ? 'آراء عملائنا' : "What Client’s Say About Us";
  const sectionDesc = lang === 'ar'
    ? 'نفتخر بثقة عملائنا في المملكة العربية السعودية، ونلتزم بتقديم حلول رقمية وأمنية مبتكرة تدعم نجاحهم.'
    : 'We are proud to earn the trust of leading organizations across Saudi Arabia. Here’s what our clients say about working with Eazy Cyber Agent.';
  return (
    <>
      <div className="client-area-page ptb-100">
        <div className="container">
          <div className="section-title">
            <h2>{sectionTitle}</h2>
            <p>{sectionDesc}</p>
          </div>

          <div className="row">
            {t.map((item, idx) => (
              <div className="col-lg-4 col-sm-6" key={idx}>
                <div 
                  className="single-client"
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
                    border: '1px solid rgba(10, 77, 140, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(10, 77, 140, 0.15)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10, 77, 140, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10, 77, 140, 0.1)';
                  }}
                >
                  {/* Quote Icon */}
                  <i className="quotes bx bxs-quote-alt-left" style={{
                    fontSize: '36px',
                    color: '#0A4D8C',
                    opacity: '0.2',
                    marginBottom: '12px',
                  }}></i>

                  {/* Testimonial Text */}
                  <p style={{
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: '1.8',
                    marginBottom: '18px',
                    fontStyle: 'italic',
                    textAlign: lang === 'ar' ? 'right' : 'left',
                  }}>
                    &quot;{item.text}&quot;
                  </p>

                  {/* Star Rating */}
                  <ul style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '20px',
                    listStyle: 'none',
                    padding: 0,
                    flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <li key={i} style={{ color: '#FFC107', fontSize: '14px' }}>
                        <i className="bx bxs-star"></i>
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(10, 77, 140, 0.2), transparent)',
                    marginBottom: '20px',
                  }}></div>

                  {/* Client Info */}
                  <div className="client-img" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(10, 77, 140, 0.15)',
                      border: '2px solid rgba(10, 77, 140, 0.2)',
                    }}>
                      <Image src={item.img} alt="Image" width={60} height={60} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: lang === 'ar' ? 'right' : 'left', flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#0A4D8C',
                        marginBottom: '4px',
                      }}>
                        {item.name}
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        color: '#999',
                        fontWeight: '600',
                      }}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="col-lg-12">
              <div className="page-navigation-area">
                <ul className="pagination">
                  <li className="page-item">
                    <Link href="#" className="page-link page-links">
                      <i className="bx bx-chevrons-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link href="#" className="page-link">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link">
                      <i className="bx bx-chevrons-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsCard;
