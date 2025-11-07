"use client";

import React, { useState } from "react";
import { useLang } from "@/context/LangContext";

const ContactForm: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === "ar";
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
      <div className={`faq-contact-area ptb-100 ${isArabic ? 'rtl' : ''}`} style={{
        background: 'white'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Section Header */}
              <div style={{
                textAlign: 'center',
                marginBottom: '50px'
              }}>
                <span style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #0A4D8C 0%, #0EA5E9 100%)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {isArabic ? "نموذج الاتصال" : "Contact Form"}
                </span>
                <h2 style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  color: '#0A4D8C',
                  marginBottom: '15px'
                }}>
                  {currentContent.title}
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  {currentContent.subtitle}
                </p>
              </div>

              {/* Contact Form */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '50px',
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
                            display: 'inline-block',
                            background: isSubmitting ? '#999' : 'linear-gradient(135deg, #0A4D8C 0%, #0EA5E9 100%)',
                            color: 'white',
                            padding: '18px 60px',
                            borderRadius: '50px',
                            fontWeight: '700',
                            fontSize: '18px',
                            border: 'none',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(10, 77, 140, 0.3)',
                            minWidth: '200px'
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
