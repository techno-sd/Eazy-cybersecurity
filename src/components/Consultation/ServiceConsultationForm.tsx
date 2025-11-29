"use client";

import React, { useState } from "react";
import { useLang } from "@/context/LangContext";

interface ServiceConsultationFormProps {
  preSelectedService?: string;
}

const ServiceConsultationForm: React.FC<ServiceConsultationFormProps> = ({ preSelectedService }) => {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: preSelectedService || '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Services matching the header menu (5 main services)
  const serviceTypes = {
    en: [
      { value: '', label: 'Select Service Type' },
      { value: 'ai-solutions', label: 'AI Solutions' },
      { value: 'cybersecurity', label: 'Cybersecurity Services' },
      { value: 'big-data', label: 'Big Data & Analytics' },
      { value: 'cloud-computing', label: 'Cloud Computing & Hosting' },
      { value: 'sme-eazy', label: 'SME-EAZY Program' },
    ],
    ar: [
      { value: '', label: 'اختر نوع الخدمة' },
      { value: 'ai-solutions', label: 'حلول الذكاء الاصطناعي' },
      { value: 'cybersecurity', label: 'خدمات الأمن السيبراني' },
      { value: 'big-data', label: 'البيانات الضخمة والتحليلات' },
      { value: 'cloud-computing', label: 'الحوسبة السحابية والاستضافة' },
      { value: 'sme-eazy', label: 'برنامج SME-EAZY' },
    ]
  };

  const content = {
    en: {
      title: "Request Service Consultation",
      subtitle: "Tell us about your needs and our team will provide you with a customized consultation.",
      namePlaceholder: "Full Name",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Phone Number",
      companyPlaceholder: "Company Name",
      serviceLabel: "Service Type",
      messagePlaceholder: "Describe your requirements and challenges...",
      submitButton: "Submit",
      submitting: "Sending...",
      successMessage: "Your consultation request has been submitted successfully! Our team will contact you soon.",
      errorMessage: "An error occurred. Please try again.",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      phoneRequired: "Phone number is required",
      serviceRequired: "Please select a service type",
      messageRequired: "Message is required"
    },
    ar: {
      title: "اطلب استشارة خدمة",
      subtitle: "أخبرنا عن احتياجاتك وسيقدم لك فريقنا استشارة مخصصة.",
      namePlaceholder: "الاسم الكامل",
      emailPlaceholder: "البريد الإلكتروني",
      phonePlaceholder: "رقم الهاتف",
      companyPlaceholder: "اسم الشركة",
      serviceLabel: "نوع الخدمة",
      messagePlaceholder: "صف متطلباتك والتحديات التي تواجهها...",
      submitButton: "إرسال",
      submitting: "جاري الإرسال...",
      successMessage: "تم إرسال طلب الاستشارة بنجاح! سيتواصل معك فريقنا قريباً.",
      errorMessage: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      nameRequired: "الاسم مطلوب",
      emailRequired: "البريد الإلكتروني مطلوب",
      phoneRequired: "رقم الهاتف مطلوب",
      serviceRequired: "يرجى اختيار نوع الخدمة",
      messageRequired: "الرسالة مطلوبة"
    }
  };

  const t = isArabic ? content.ar : content.en;
  const services = isArabic ? serviceTypes.ar : serviceTypes.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(t.successMessage);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service_type: preSelectedService || '',
          message: ''
        });
      } else {
        alert(t.errorMessage);
      }
    } catch (error) {
      console.error('Error submitting consultation:', error);
      alert(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      id="consultation"
      className={`consultation-form-section ${isArabic ? 'rtl' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        padding: '80px 0',
        direction: isArabic ? 'rtl' : 'ltr'
      }}
    >
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
                padding: '8px 24px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {isArabic ? "استشارة مجانية" : "Free Consultation"}
              </span>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '800',
                color: '#0A4D8C',
                marginBottom: '15px',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
              }}>
                {t.title}
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#666',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.8',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
              }}>
                {t.subtitle}
              </p>
            </div>

            {/* Consultation Form */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '60px',
              boxShadow: '0 20px 60px rgba(10, 77, 140, 0.15)',
              border: '1px solid rgba(10, 77, 140, 0.1)'
            }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Name Field */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0A4D8C',
                        marginBottom: '10px',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                      }}>
                        {t.namePlaceholder} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className="form-control"
                        required
                        style={{
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0A4D8C';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(10, 77, 140, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0A4D8C',
                        marginBottom: '10px',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                      }}>
                        {t.emailPlaceholder} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        className="form-control"
                        required
                        style={{
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0A4D8C';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(10, 77, 140, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0A4D8C',
                        marginBottom: '10px',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                      }}>
                        {t.phonePlaceholder} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.phonePlaceholder}
                        className="form-control"
                        required
                        style={{
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0A4D8C';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(10, 77, 140, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0A4D8C',
                        marginBottom: '10px',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                      }}>
                        {t.companyPlaceholder} *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t.companyPlaceholder}
                        className="form-control"
                        required
                        style={{
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0A4D8C';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(10, 77, 140, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Service Type Dropdown */}
                  <div className="col-lg-12">
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0A4D8C',
                        marginBottom: '10px',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                      }}>
                        {t.serviceLabel} *
                      </label>
                      <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        className="form-control"
                        required
                        disabled={!!preSelectedService}
                        style={{
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                          background: preSelectedService ? '#f9fafb' : 'white',
                          cursor: preSelectedService ? 'not-allowed' : 'pointer'
                        }}
                        onFocus={(e) => {
                          if (!preSelectedService) {
                            e.currentTarget.style.borderColor = '#0A4D8C';
                            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(10, 77, 140, 0.1)';
                          }
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="col-lg-12">
                    <div className="form-group" style={{ marginBottom: '35px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#0A4D8C',
                        marginBottom: '10px',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                      }}>
                        {t.messagePlaceholder} *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        cols={30}
                        rows={6}
                        placeholder={t.messagePlaceholder}
                        className="form-control"
                        required
                        style={{
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          resize: 'vertical',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#0A4D8C';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(10, 77, 140, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-lg-12">
                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          background: isSubmitting ? '#94A3B8' : 'linear-gradient(135deg, #0A4D8C 0%, #0EA5E9 100%)',
                          color: 'white',
                          padding: '18px 50px',
                          borderRadius: '50px',
                          fontWeight: '700',
                          fontSize: '18px',
                          border: 'none',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: isSubmitting ? 'none' : '0 10px 30px rgba(10, 77, 140, 0.3)',
                          minWidth: '250px',
                          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 77, 140, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 77, 140, 0.3)';
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <i className="bx bx-loader-alt bx-spin" style={{ fontSize: '22px' }}></i>
                            {t.submitting}
                          </>
                        ) : (
                          <>
                            {t.submitButton}
                            <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '22px' }}></i>
                          </>
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
  );
};

export default ServiceConsultationForm;
