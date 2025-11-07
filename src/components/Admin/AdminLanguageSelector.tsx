"use client";
import React from "react";
import { useAdminLang } from "@/hooks/useAdminLang";

interface Props {
  compact?: boolean;
}

const AdminLanguageSelector: React.FC<Props> = ({ compact }) => {
  const { lang, setLanguage, isArabic } = useAdminLang();

  return (
    <div style={{ position: "relative", direction: isArabic ? 'rtl' : 'ltr' }}>
      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          padding: compact ? '8px 34px 8px 14px' : '10px 40px 10px 16px',
          fontSize: compact ? '13px' : '14px',
          fontWeight: 600,
          borderRadius: '10px',
          border: '1px solid rgba(10,77,140,0.2)',
          background: 'rgba(255,255,255,0.95)',
          color: '#0A4D8C',
          cursor: 'pointer',
          outline: 'none',
          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          transition: 'all .25s ease',
          minWidth: compact ? '140px' : '160px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10,77,140,0.2)';
          e.currentTarget.style.borderColor = 'rgba(10,77,140,0.5)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(10,77,140,0.1)';
          e.currentTarget.style.borderColor = 'rgba(10,77,140,0.2)';
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
        }}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
      <div
        style={{
          position: 'absolute',
          top: 0,
          [isArabic ? 'left' : 'right']: '12px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          fontSize: compact ? '16px' : '18px',
          color: '#0A4D8C',
        }}
      >
        <i className='bx bx-globe'></i>
      </div>
    </div>
  );
};

export default React.memo(AdminLanguageSelector);
