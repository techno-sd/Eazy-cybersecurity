"use client";
  
import React from "react";
import { useLang } from "@/context/LangContext";

const ContactInfo: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  const content = {
    en: {
      location: "Our Location",
      address: "Riyadh, Saudi Arabia",
      fullAddress: "Riyadh, Kingdom of Saudi Arabia",
      email: "Email",
      phone: "Phone",
      hours: "Business Hours",
      hoursText: "Sunday - Thursday: 9:00 AM - 6:00 PM",
    },
    ar: {
      location: "موقعنا",
      address: "الرياض، المملكة العربية السعودية",
      fullAddress: "الرياض، المملكة العربية السعودية",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      hours: "ساعات العمل",
      hoursText: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  return (
    <>
      <div className={`contact-info-area ${isArabic ? 'rtl' : ''}`} style={{
        background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.02) 0%, rgba(14, 165, 233, 0.02) 100%)',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="row align-items-stretch">
            {/* Contact Information Cards */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                height: '100%',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(10, 77, 140, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#0A4D8C',
                  marginBottom: '30px',
                  textAlign: isArabic ? 'right' : 'left'
                }}>
                  {currentContent.location}
                </h2>

                {/* Location Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #0A4D8C 0%, #0EA5E9 100%)',
                  borderRadius: '15px',
                  padding: '25px',
                  marginBottom: '20px',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 77, 140, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <i className="bx bx-location-plus" style={{
                      fontSize: '32px',
                      marginRight: isArabic ? '0' : '15px',
                      marginLeft: isArabic ? '15px' : '0'
                    }}></i>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>
                      {currentContent.address}
                    </h3>
                  </div>
                  <p style={{ margin: '0', opacity: '0.9', paddingLeft: isArabic ? '0' : '47px', paddingRight: isArabic ? '47px' : '0' }}>
                    {currentContent.fullAddress}
                  </p>
                </div>

                {/* Email Card */}
                <div style={{
                  background: '#F8F9FA',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A4D8C';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.background = '#F8F9FA';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bx bx-envelope" style={{
                      fontSize: '28px',
                      color: '#0A4D8C',
                      marginRight: isArabic ? '0' : '15px',
                      marginLeft: isArabic ? '15px' : '0'
                    }}></i>
                    <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{currentContent.email}</p>
                      <a href="mailto:support@eazycyber.sa" style={{
                        color: '#0A4D8C',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '16px'
                      }}>
                        support@eazycyber.sa
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div style={{
                  background: '#F8F9FA',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A4D8C';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.background = '#F8F9FA';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bx bx-phone" style={{
                      fontSize: '28px',
                      color: '#0A4D8C',
                      marginRight: isArabic ? '0' : '15px',
                      marginLeft: isArabic ? '15px' : '0'
                    }}></i>
                    <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{currentContent.phone}</p>
                      <a href="tel:+966563664008" style={{
                        color: '#0A4D8C',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '16px',
                        direction: 'ltr',
                        display: 'inline-block'
                      }}>
                        +966 56 366 4008
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div style={{
                  background: '#F8F9FA',
                  borderRadius: '15px',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A4D8C';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.background = '#F8F9FA';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bx bx-time" style={{
                      fontSize: '28px',
                      color: '#0A4D8C',
                      marginRight: isArabic ? '0' : '15px',
                      marginLeft: isArabic ? '15px' : '0'
                    }}></i>
                    <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{currentContent.hours}</p>
                      <p style={{
                        color: '#0A4D8C',
                        fontWeight: '600',
                        margin: '5px 0 0',
                        fontSize: '16px'
                      }}>
                        {currentContent.hoursText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="col-lg-6">
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                height: '100%',
                minHeight: '500px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(10, 77, 140, 0.1)'
              }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462565.7588224952!2d46.345651999999996!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
