"use client";
  
import React from "react";
import { usePathname } from "next/navigation";
import { useLang } from "../../context/LangContext";
import en from "../../i18n/messages/en.json";
import ar from "../../i18n/messages/ar.json";

const WebsiteSecurity: React.FC = () => {
  const { lang } = useLang();
  const t = lang === "ar" ? ar : en;
  const visionText = t.home.about_preview.vision_text;
  const visionTitle = t.home.about_preview.vision_card;
  return (
    <>
      <section className="security-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Complete Website Security</h2>
            <p>
              {visionText}
            </p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-security">
                <i className="flaticon-bug"></i>
                <h3>{visionTitle}</h3>
                <p>{visionText}</p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-security">
                <i className="flaticon-content"></i>
                <h3>{visionTitle}</h3>
                <p>{visionText}</p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-security">
                <i className="flaticon-support"></i>
                <h3>{visionTitle}</h3>
                <p>{visionText}</p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-security">
                <i className="flaticon-profile"></i>
                <h3>{visionTitle}</h3>
                <p>{visionText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebsiteSecurity;
