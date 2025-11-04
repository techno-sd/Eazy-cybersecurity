"use client";
  
import React from "react";
import Image from "next/image";

const SecurityApproach: React.FC = () => {
  return (
    <>
      <section className="approach-area pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="approach-img">
                <Image
                  src="/img/approach-img.jpg"
                  alt="Image"
                  width={660}
                  height={700}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="approach-content">
                <h2>Our Approach To Security</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsumv
                </p>

                <ul>
                  {[1,2,3].map((_, idx) => (
                    <li key={idx}>
                      <i className={[
                        "flaticon-cyber",
                        "flaticon-cyber-security",
                        "flaticon-profile"
                      ][idx]}></i>
                      <h3>{typeof window !== 'undefined' && document.documentElement.lang === 'ar' ? 'الرؤية' : 'Vision'}</h3>
                      <p>{typeof window !== 'undefined' && document.documentElement.lang === 'ar'
                        ? 'أن نكون الخيار الأول في المملكة والمنطقة لتقديم حلول رقمية وأمنية مبتكرة تُمكّن المؤسسات من مواكبة التغيرات وتحقيق الاستدامة الرقمية.'
                        : 'To be the first choice in Saudi Arabia and the region for delivering innovative digital and security solutions that empower organizations to adapt and achieve digital sustainability.'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecurityApproach;
