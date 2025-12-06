"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLang } from "@/context/LangContext";

// Custom hook for scroll-triggered animations
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

const ContactForm: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  // Scroll reveal
  const sectionRef = useInView(0.1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: "Request Consultation",
      subtitle: "Fill out the form and our specialized team will contact you to provide the appropriate consultation for your needs.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      phonePlaceholder: "Phone Number",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Write your message...",
      submitButton: "Submit Request",
      submitting: "Sending...",
    },
    ar: {
      title: "اطلب استشارة",
      subtitle: "املأ النموذج وسيتواصل معك فريقنا المتخصص لتقديم الاستشارة المناسبة لاحتياجاتك.",
      namePlaceholder: "الاسم",
      emailPlaceholder: "البريد الإلكتروني",
      phonePlaceholder: "رقم الهاتف",
      subjectPlaceholder: "الموضوع",
      messagePlaceholder: "اكتب رسالتك...",
      submitButton: "إرسال الطلب",
      submitting: "جاري الإرسال...",
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(isArabic ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(isArabic ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(isArabic ? 'حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.' : 'Connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div
        ref={sectionRef.ref}
        className={`faq-contact-area ptb-100 ${isArabic ? 'rtl' : ''}`}
        style={{
          background: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Section Header */}
              <div style={{
                textAlign: 'center',
                marginBottom: 'clamp(30px, 5vw, 50px)',
                opacity: sectionRef.isInView ? 1 : 0,
                transform: sectionRef.isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
              }}>
                <span style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #0A4D8C 0%, #0EA5E9 100%)',
                  color: 'white',
                  padding: 'clamp(6px, 1.5vw, 8px) clamp(14px, 3vw, 20px)',
                  borderRadius: '50px',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  fontWeight: '600',
                  marginBottom: 'clamp(10px, 2vw, 15px)'
                }}>
                  {isArabic ? "نموذج الاتصال" : "Contact Form"}
                </span>
                <h2 style={{
                  fontSize: 'clamp(24px, 6vw, 42px)',
                  fontWeight: '800',
                  color: '#0A4D8C',
                  marginBottom: 'clamp(10px, 2vw, 15px)',
                  lineHeight: '1.2'
                }}>
                  {currentContent.title}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  color: '#666',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                  padding: '0 10px'
                }}>
                  {currentContent.subtitle}
                </p>
              </div>

              {/* Contact Form */}
              <div style={{
                background: 'white',
                borderRadius: 'clamp(12px, 3vw, 20px)',
                padding: 'clamp(20px, 5vw, 50px)',
                boxShadow: '0 10px 50px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(10, 77, 140, 0.1)'
              }}>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#0A4D8C',
                          marginBottom: '8px',
                          textAlign: isArabic ? 'right' : 'left'
                        }}>
                          {currentContent.namePlaceholder} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={currentContent.namePlaceholder}
                          className="form-control"
                          required
                          style={{
                            border: '2px solid #E0E0E0',
                            borderRadius: '10px',
                            padding: '15px 20px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#0A4D8C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 77, 140, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E0E0E0';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#0A4D8C',
                          marginBottom: '8px',
                          textAlign: isArabic ? 'right' : 'left'
                        }}>
                          {currentContent.emailPlaceholder} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={currentContent.emailPlaceholder}
                          className="form-control"
                          required
                          style={{
                            border: '2px solid #E0E0E0',
                            borderRadius: '10px',
                            padding: '15px 20px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#0A4D8C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 77, 140, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E0E0E0';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#0A4D8C',
                          marginBottom: '8px',
                          textAlign: isArabic ? 'right' : 'left'
                        }}>
                          {currentContent.phonePlaceholder}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={currentContent.phonePlaceholder}
                          className="form-control"
                          style={{
                            border: '2px solid #E0E0E0',
                            borderRadius: '10px',
                            padding: '15px 20px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#0A4D8C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 77, 140, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E0E0E0';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#0A4D8C',
                          marginBottom: '8px',
                          textAlign: isArabic ? 'right' : 'left'
                        }}>
                          {currentContent.subjectPlaceholder} *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={currentContent.subjectPlaceholder}
                          className="form-control"
                          required
                          style={{
                            border: '2px solid #E0E0E0',
                            borderRadius: '10px',
                            padding: '15px 20px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#0A4D8C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 77, 140, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E0E0E0';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group" style={{ marginBottom: '30px' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#0A4D8C',
                          marginBottom: '8px',
                          textAlign: isArabic ? 'right' : 'left'
                        }}>
                          {currentContent.messagePlaceholder} *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          cols={30}
                          rows={7}
                          placeholder={currentContent.messagePlaceholder}
                          className="form-control"
                          required
                          style={{
                            border: '2px solid #E0E0E0',
                            borderRadius: '10px',
                            padding: '15px 20px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            resize: 'vertical',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#0A4D8C';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 77, 140, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E0E0E0';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-12 col-sm-12">
                      <div style={{ textAlign: 'center' }}>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isSubmitting ? '#999' : 'linear-gradient(135deg, #0A4D8C 0%, #0EA5E9 100%)',
                            color: 'white',
                            padding: 'clamp(14px, 2.5vw, 18px) clamp(30px, 8vw, 60px)',
                            borderRadius: '50px',
                            fontWeight: '700',
                            fontSize: 'clamp(14px, 2.5vw, 18px)',
                            border: 'none',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(10, 77, 140, 0.3)',
                            minWidth: 'clamp(160px, 40vw, 200px)',
                            width: 'auto',
                            maxWidth: '100%'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSubmitting) {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 77, 140, 0.5)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSubmitting) {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 77, 140, 0.3)';
                            }
                          }}
                        >
                          {isSubmitting ? currentContent.submitting : currentContent.submitButton}
                          {!isSubmitting && (
                            <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{
                              marginLeft: isArabic ? '0' : '10px',
                              marginRight: isArabic ? '10px' : '0',
                              fontSize: '20px'
                            }}></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
