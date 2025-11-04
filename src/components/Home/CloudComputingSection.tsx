"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const CloudComputingSection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="approach-area pb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" style={{ order: isArabic ? 2 : 1 }}>
            <div className="approach-content" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
              <h2>{t.cloudHosting.section_title}</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                {isArabic
                  ? 'بنية تحتية سحابية آمنة وقابلة للتوسع مصممة للمؤسسات السعودية مع امتثال تنظيمي كامل.'
                  : 'Secure, scalable cloud infrastructure designed for Saudi organizations with full regulatory compliance.'}
              </p>

              <ul>
                <li>
                  <i className="flaticon-cyber-security"></i>
                  <h3>{t.cloudHosting.hosting_title}</h3>
                  <p>{t.cloudHosting.hosting_desc}</p>
                </li>
                <li>
                  <i className="flaticon-database"></i>
                  <h3>{t.cloudHosting.backup_title}</h3>
                  <p>{t.cloudHosting.backup_desc}</p>
                </li>
                <li>
                  <i className="flaticon-password"></i>
                  <h3>{t.cloudHosting.encryption_title}</h3>
                  <p>{t.cloudHosting.encryption_desc}</p>
                </li>
                <li>
                  <i className="flaticon-profile"></i>
                  <h3>{t.cloudHosting.iam_title}</h3>
                  <p>{t.cloudHosting.iam_desc}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6" style={{ order: isArabic ? 1 : 2 }}>
            <div className="approach-img">
              <Image
                src="/img/cybersecurity-img-2.jpg"
                alt="Cloud Computing & Hosting"
                width={660}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudComputingSection;
