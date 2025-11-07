"use client";
  
import React from "react"; 
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const Features: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isAR = lang === 'ar';

  return (
    <>
  <div className="container pt-70 pb-70">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <div className="single-features" style={{ color: '#e8f3ff' }}>
              <h3 style={{ color: '#e8f3ff', display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="bx bx-show" style={{ color: '#3fa0ff' }}></i> {isAR ? 'الرؤية' : 'Vision'}
              </h3>
              <p style={{ color: '#d6e2f0' }}>
                {t.hero?.vision}
              </p>
              <span className="bx bx-show" style={{ opacity: 0.12 }}></span>
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <div className="single-features" style={{ borderRight: 'none', color: '#e8f3ff' }}>
              <h3 style={{ color: '#e8f3ff', display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="bx bx-target-lock" style={{ color: '#3fa0ff' }}></i> {isAR ? 'الرسالة' : 'Mission'}
              </h3>
              <p style={{ color: '#d6e2f0' }}>
                {t.hero?.mission}
              </p>
              <span className="bx bx-target-lock" style={{ opacity: 0.12 }}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
