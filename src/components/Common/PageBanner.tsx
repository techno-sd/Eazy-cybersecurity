"use client";

import React from "react";
import Link from "next/link";

interface PageBannerProps {
  pageTitle: string;
  homePageUrl: string;
  homePageText: string;
  activePageText: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  pageTitle,
  homePageUrl,
  homePageText,
  activePageText,
}) => {
  // Deterministic particle positions and timings (for SSR consistency)
  const particles = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: ((i * 7 + 13) % 100),
      delay: ((i * 3 + 5) % 50) / 10,
      duration: 3 + ((i * 2) % 40) / 10,
    }));
  }, []);

  return (
    <>
      <div className="page-banner-area">
        {/* Cyber Grid Background */}
        <div style={{
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
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        {/* Glowing Orb Top Right */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(63, 160, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        {/* Glowing Orb Bottom Left */}
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 10s ease-in-out infinite 2s',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        {/* Animated Falling Stars/Particles */}
        <div className="cyber-particles">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-title-content">
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: 'clamp(15px, 3vw, 25px)',
              lineHeight: '1.2',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(63, 160, 255, 0.4)',
              fontFamily: 'var(--font-barlow-condensed)',
              animation: 'fadeInDown 0.8s ease-out'
            }}>
              {pageTitle}
            </h2>
            <ul style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
              flexWrap: 'wrap',
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                fontSize: 'clamp(14px, 2vw, 16px)',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500'
              }}>
                <Link
                  href={homePageUrl}
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3fa0ff';
                    e.currentTarget.style.textShadow = '0 0 10px rgba(63, 160, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {homePageText}
                </Link>
              </li>
              <li style={{
                fontSize: 'clamp(14px, 2vw, 16px)',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500'
              }}>
                <i className="bx bx-chevron-right" style={{
                  color: '#3fa0ff',
                  margin: '0 8px',
                  fontSize: '12px'
                }}></i>
                {activePageText}
              </li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          @keyframes gridMove {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(30px);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(0) translateX(-10px);
            }
            75% {
              transform: translateY(20px) translateX(5px);
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .cyber-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 5;
          }

          .particle {
            position: absolute;
            top: -10px;
            width: 2px;
            height: 2px;
            background: #3fa0ff;
            border-radius: 50%;
            box-shadow: 0 0 6px #3fa0ff, 0 0 12px #3fa0ff;
            animation: particleFall linear infinite;
          }

          @keyframes particleFall {
            0% {
              top: -10px;
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @media only screen and (max-width: 991px) {
            .particle {
              width: 1.5px;
              height: 1.5px;
              box-shadow: 0 0 4px #3fa0ff, 0 0 8px #3fa0ff;
            }
          }

          @media only screen and (max-width: 767px) {
            .particle {
              width: 1px;
              height: 1px;
              box-shadow: 0 0 3px #3fa0ff, 0 0 6px #3fa0ff;
            }

            .cyber-particles {
              opacity: 0.7;
            }
          }

          @media only screen and (max-width: 575px) {
            .page-title-content ul {
              flex-direction: column !important;
              gap: 10px !important;
            }

            .page-title-content ul li i {
              display: none !important;
            }

            .particle {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PageBanner;
