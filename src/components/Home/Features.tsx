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
            <div className="single-features mb-0 values-card">
              <h3>
                <i className="bx bx-certification"></i> {t.features.certified_title}
              </h3>
              {Array.isArray((t as any).features?.certified_points) && (t as any).features.certified_points.length > 0 ? (
                <ul style={{ margin: 0, paddingInlineStart: '20px' }}>
                  {(t as any).features.certified_points.map((pt: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{pt}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {t.features.certified_desc}
                </p>
              )}
              <span className="bx bx-certification"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
