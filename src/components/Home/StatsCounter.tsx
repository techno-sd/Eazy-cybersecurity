'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '@/context/LangContext';

interface StatItem {
  icon: string;
  endValue: number;
  label_en: string;
  label_ar: string;
  suffix?: string;
  prefix?: string;
}

const stats: StatItem[] = [
  {
    icon: 'bx-check-shield',
    endValue: 50,
    label_en: 'Security Solutions',
    label_ar: 'حلول أمنية',
    suffix: '+',
  },
  {
    icon: 'bx-building',
    endValue: 30,
    label_en: 'Trusted Clients',
    label_ar: 'عميل',
    suffix: '+',
  },
  {
    icon: 'bx-award',
    endValue: 100,
    label_en: 'Reliability',
    label_ar: 'موثوقية',
    suffix: '%',
  },
  {
    icon: 'bx-support',
    endValue: 24,
    label_en: '24/7 Support',
    label_ar: 'دعم فني',
    suffix: '/7',
  },
];

const StatsCounter: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === 'ar';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-counter-section"
      style={{
        background: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 50%, #0A4D8C 100%)',
        padding: 'clamp(50px, 10vw, 80px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cyber Grid Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(96, 126, 172, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 126, 172, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.5,
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Glowing Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row g-3 g-md-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              label={isArabic ? stat.label_ar : stat.label_en}
              isVisible={isVisible}
              delay={index * 100}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps extends Omit<StatItem, 'label_en' | 'label_ar'> {
  label: string;
  isVisible: boolean;
  delay: number;
  isArabic: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  endValue,
  label,
  suffix = '',
  prefix = '',
  isVisible,
  delay,
  isArabic,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepValue = endValue / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const counter = setInterval(() => {
        currentStep++;
        const newValue = Math.min(stepValue * currentStep, endValue);
        setCount(newValue);

        if (currentStep >= steps) {
          clearInterval(counter);
          setCount(endValue);
        }
      }, stepDuration);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, endValue, delay]);

  const displayValue = endValue % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <div className="col-lg-3 col-md-6 col-6">
      <div
        className="stat-card"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          padding: 'clamp(25px, 5vw, 40px) clamp(15px, 4vw, 30px)',
          textAlign: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: `${delay}ms`,
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Icon Circle */}
        <div
          style={{
            width: 'clamp(55px, 12vw, 80px)',
            height: 'clamp(55px, 12vw, 80px)',
            margin: '0 auto clamp(12px, 3vw, 25px)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(360deg) scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(63, 160, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
          }}
        >
          <i
            className={`bx ${icon}`}
            style={{
              fontSize: 'clamp(28px, 6vw, 40px)',
              color: '#ffffff',
              display: 'block',
            }}
          ></i>
        </div>

        {/* Counter */}
        <div
          style={{
            fontSize: 'clamp(28px, 7vw, 48px)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: 'clamp(8px, 2vw, 15px)',
            fontFamily: 'var(--font-barlow-condensed)',
            lineHeight: 1,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            direction: 'ltr',
          }}
        >
          {prefix}
          {displayValue}
          {suffix}
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 'clamp(11px, 2.5vw, 16px)',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(0.5px, 0.15vw, 1px)',
            direction: isArabic ? 'rtl' : 'ltr',
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>

        {/* Pulse Ring Animation */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            animation: 'pulseRing 3s ease-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulseRing {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default StatsCounter;
