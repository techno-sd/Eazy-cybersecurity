"use client";

import React from "react";

interface CoreValue {
  title: string;
  description: string;
}

interface CoreValuesProps {
  lang: string;
  coreValuesTitle: string;
  coreValues: CoreValue[];
}

const CoreValues: React.FC<CoreValuesProps> = ({ lang, coreValuesTitle, coreValues }) => {
  const isArabic = lang === "ar";

  // Color scheme for cards
  const colors = [
    { primary: '#FF6B6B', light: 'rgba(255, 107, 107, 0.1)', icon: 'bx-heart' },
    { primary: '#4ECDC4', light: 'rgba(78, 205, 196, 0.1)', icon: 'bx-shield-alt-2' },
    { primary: '#45B7D1', light: 'rgba(69, 183, 209, 0.1)', icon: 'bx-lightbulb' },
    { primary: '#96CEB4', light: 'rgba(150, 206, 180, 0.1)', icon: 'bx-rocket' },
    { primary: '#FFEAA7', light: 'rgba(255, 234, 167, 0.1)', icon: 'bx-crown', textColor: '#333' }
  ];

  return (
    <>
      {/* Core Values Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
          padding: '100px 0',
          direction: isArabic ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              marginBottom: '20px', 
              color: '#0e0129',
              background: 'linear-gradient(135deg, #0A4D8C 0%, #0e0129 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {coreValuesTitle}
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: '#666', 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              {isArabic 
                ? 'القيم الأساسية التي تحكم عملنا وتوجه قراراتنا نحو التميز والابتكار'
                : 'The core values that guide our work and direct our decisions toward excellence and innovation'}
            </p>
          </div>

          {/* Values Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            direction: isArabic ? 'rtl' : 'ltr'
          }}>
            {coreValues.map((value, index) => {
              const color = colors[index % colors.length];
              return (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '40px 30px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${color.light}`,
                    borderTop: `4px solid ${color.primary}`
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-10px)';
                    el.style.boxShadow = `0 16px 40px rgba(${color.primary}, 0.15)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Icon Container */}
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: color.light,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '25px'
                  }}>
                    <i 
                      className={`bx ${color.icon}`} 
                      style={{ 
                        fontSize: '36px', 
                        color: color.primary
                      }}
                    ></i>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#0e0129',
                    marginBottom: '15px',
                    lineHeight: '1.3'
                  }}>
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.7',
                    margin: '0',
                    minHeight: '80px'
                  }}>
                    {value.description}
                  </p>

                  {/* Accent Line */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '3px',
                    background: `linear-gradient(90deg, ${color.primary}, transparent)`,
                    opacity: '0'
                  }}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoreValues;
