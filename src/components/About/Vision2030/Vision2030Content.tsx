"use client";

import React from "react";
import Image from "next/image";

interface Vision2030Props {
  lang: string;
}

const Vision2030Content: React.FC<Vision2030Props> = ({ lang }) => {
  const isArabic = lang === "ar";

  const content = {
    en: {
      title: "Vision 2030 Alignment",
      subtitle: "Building a Secure Digital Future",
      description: "We believe that cybersecurity and digital innovation are fundamental pillars of Saudi Vision 2030",
      points: [
        {
          text: "Empowering digital transformation in government and private sectors.",
          icon: "bx bx-check"
        },
        {
          text: "Protecting critical national infrastructure.",
          icon: "bx bx-check"
        },
        {
          text: "Supporting technical entrepreneurship and startups.",
          icon: "bx bx-check"
        },
        {
          text: "Contributing to the development of national expertise through training and capacity building.",
          icon: "bx bx-check"
        }
      ]
    },
    ar: {
      title: "رؤيتنا 2030",
      subtitle: "التوافق مع رؤية المملكة 2030",
      description: "نحن نؤمن أن الأمن السيبراني والابتكار الرقمي هما ركيزتان أساسيتان في رؤية المملكة 2030",
      points: [
        {
          text: "تمكين التحول الرقمي في الجهات الحكومية والخاصة.",
          icon: "bx bx-check"
        },
        {
          text: "حماية البنية التحتية الحيوية الوطنية.",
          icon: "bx bx-check"
        },
        {
          text: "دعم ريادة الأعمال التقنية والشركات الناشئة.",
          icon: "bx bx-check"
        },
        {
          text: "المساهمة في تطوير الكفاءات الوطنية عبر التدريب وبناء القدرات.",
          icon: "bx bx-check"
        }
      ]
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  return (
    <>
      <section className={`vision-2030-area py-100 ${isArabic ? 'rtl' : ''}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <Image
                src="/img/vision-2020.jpg"
                alt={isArabic ? "رؤيتنا 2030" : "Vision 2030"}
                width={500}
                height={400}
                className="vision-2030-image"
              />
            </div>
            <div className="col-lg-6" data-aos="fade-up">
              <div className={`vision-2030-content ${isArabic ? 'text-right' : 'text-left'}`}>
                <h2 className="vision-2030-title">{currentContent.title}</h2>
                
                <p className="vision-2030-subtitle">{currentContent.subtitle}</p>

                <p className="vision-2030-description">
                  {currentContent.description}
                </p>

                <ul className="vision-2030-list">
                  {currentContent.points.map((point, index) => (
                    <li key={index} className="vision-2030-item">
                      <div className="vision-2030-card">
                        <span className="vision-2030-text">{point.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="vision-2030-cta mt-5">
                  <a href="/contact/" className="default-btn">
                    {isArabic ? "تواصل معنا" : "Contact Us"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="vision-2030-background">
          <div className="vision-2030-shape-1"></div>
          <div className="vision-2030-shape-2"></div>
        </div>
      </section>
    </>
  );
};

export default Vision2030Content;
