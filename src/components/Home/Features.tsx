"use client";
  
import React from "react"; 
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const Features: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);

  return (
    <>
  <div className="container pt-70 pb-70">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <div className="single-features">
              <h3>
                <i className="bx bx-check-shield"></i> {t.features.security_title}
              </h3>
              <p>
                {t.features.security_desc}
              </p>
              <span className="bx bx-check-shield"></span>
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <div className="single-features" style={{ borderRight: 'none' }}>
              <h3>
                <i className="bx bx-lock"></i> {t.features.privacy_title}
              </h3>
              <p>
                {t.features.privacy_desc}
              </p>
              <span className="bx bx-lock"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
