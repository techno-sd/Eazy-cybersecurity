"use client";
  
import React from "react"; 
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const Features: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);

  return (
    <>
      <div className="container pt-100">
        <div className="row">
          <div className="col-lg-4 col-sm-6">
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

          <div className="col-lg-4 col-sm-6">
            <div className="single-features">
              <h3>
                <i className="bx bx-lock"></i> {t.features.privacy_title}
              </h3>
              <p>
                {t.features.privacy_desc}
              </p>
              <span className="bx bx-lock"></span>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 offset-sm-3 offset-lg-0">
            <div className="single-features mb-0">
              <h3>
                <i className="bx bx-certification"></i> {t.features.certified_title}
              </h3>
              <p>
                {t.features.certified_desc}
              </p>
              <span className="bx bx-certification"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
