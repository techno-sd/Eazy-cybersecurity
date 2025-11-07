import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";

  return {
    title: cookieLang === "ar"
      ? "Eazy Cyber Agent | تسجيل دخول الإدارة"
      : "Eazy Cyber Agent | Admin Login",
    description: cookieLang === "ar"
      ? "تسجيل الدخول إلى لوحة الإدارة لإدارة المحتوى والاستشارات والمستخدمين"
      : "Login to the admin panel to manage content, consultations, and users",
  };
}

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";
  const isArabic = cookieLang === "ar";

  const content = {
    en: {
      title: "Admin Panel Access",
      subtitle: "Secure login for authorized personnel only",
      description: "Access the Eazy Cyber Agent admin panel to manage website content, consultations, blog posts, and user accounts.",
      loginButton: "Login to Admin Panel",
      features: {
        title: "Admin Panel Features",
        dashboard: "Comprehensive Dashboard",
        dashboardDesc: "Real-time analytics and statistics",
        consultations: "Consultations Management",
        consultationsDesc: "Track and manage consultation requests",
        blog: "Content Management",
        blogDesc: "Create and manage blog posts",
        users: "User Management",
        usersDesc: "Manage user accounts and permissions"
      },
      security: {
        title: "Security Notice",
        message: "This area is restricted to authorized administrators only. All access attempts are logged and monitored for security purposes."
      },
      backHome: "Back to Home"
    },
    ar: {
      title: "الدخول إلى لوحة الإدارة",
      subtitle: "تسجيل دخول آمن للموظفين المصرح لهم فقط",
      description: "الوصول إلى لوحة إدارة Eazy Cyber Agent لإدارة محتوى الموقع والاستشارات والمقالات وحسابات المستخدمين.",
      loginButton: "تسجيل الدخول إلى لوحة الإدارة",
      features: {
        title: "مميزات لوحة الإدارة",
        dashboard: "لوحة تحكم شاملة",
        dashboardDesc: "تحليلات وإحصائيات في الوقت الفعلي",
        consultations: "إدارة الاستشارات",
        consultationsDesc: "تتبع وإدارة طلبات الاستشارات",
        blog: "إدارة المحتوى",
        blogDesc: "إنشاء وإدارة المقالات",
        users: "إدارة المستخدمين",
        usersDesc: "إدارة حسابات المستخدمين والصلاحيات"
      },
      security: {
        title: "تنبيه أمني",
        message: "هذه المنطقة مقيدة للمسؤولين المصرح لهم فقط. يتم تسجيل ومراقبة جميع محاولات الدخول لأغراض أمنية."
      },
      backHome: "العودة للرئيسية"
    }
  };

  const t = content[cookieLang];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 50%, #052A4F 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        direction: isArabic ? 'rtl' : 'ltr',
        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: 'white',
              padding: '20px 40px',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
            }}
          >
            <img
              src="/img/logo.png"
              alt="Eazy Cyber Agent"
              style={{ height: '50px', width: 'auto' }}
            />
          </Link>
        </div>

        {/* Main Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '50px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #0A4D8C, #0EA5E9)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(10,77,140,0.3)'
              }}
            >
              <i className="bx bx-shield-alt-2" style={{ fontSize: '40px', color: 'white' }}></i>
            </div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#0A4D8C',
                marginBottom: '10px'
              }}
            >
              {t.title}
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '15px'
              }}
            >
              {t.subtitle}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: '#888',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              {t.description}
            </p>
          </div>

          {/* Login Button */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Link
              href="/sign-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #0A4D8C, #0EA5E9)',
                color: 'white',
                padding: '18px 50px',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(10,77,140,0.3)',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(10,77,140,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(10,77,140,0.3)';
              }}
            >
              <i className="bx bx-lock-alt" style={{ fontSize: '24px' }}></i>
              {t.loginButton}
              <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '24px' }}></i>
            </Link>
          </div>

          {/* Features Grid */}
          <div style={{ marginBottom: '40px' }}>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0A4D8C',
                textAlign: 'center',
                marginBottom: '30px'
              }}
            >
              {t.features.title}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}
            >
              {[
                { icon: 'bx-bar-chart-alt-2', title: t.features.dashboard, desc: t.features.dashboardDesc },
                { icon: 'bx-message-dots', title: t.features.consultations, desc: t.features.consultationsDesc },
                { icon: 'bx-edit-alt', title: t.features.blog, desc: t.features.blogDesc },
                { icon: 'bx-user-circle', title: t.features.users, desc: t.features.usersDesc }
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    padding: '25px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(10,77,140,0.15)';
                    e.currentTarget.style.borderColor = '#0A4D8C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: 'rgba(10,77,140,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}
                  >
                    <i className={feature.icon} style={{ fontSize: '24px', color: '#0A4D8C' }}></i>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0A4D8C', marginBottom: '8px' }}>
                    {feature.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '20px 25px',
              borderRadius: '12px',
              border: '1px solid #fcd34d',
              display: 'flex',
              gap: '15px',
              alignItems: 'start'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <i className="bx bx-info-circle" style={{ fontSize: '24px', color: '#f59e0b' }}></i>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#92400e', marginBottom: '5px' }}>
                {t.security.title}
              </h4>
              <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
                {t.security.message}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link
            href="/"
            style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className={`bx ${isArabic ? 'bx-right-arrow-alt' : 'bx-left-arrow-alt'}`} style={{ fontSize: '20px' }}></i>
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
