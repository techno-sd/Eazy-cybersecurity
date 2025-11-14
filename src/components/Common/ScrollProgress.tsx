'use client';

import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'rgba(10, 77, 140, 0.1)',
      }}
    >
      <div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #0A4D8C 0%, #607EAC 50%, #3fa0ff 100%)',
          transition: 'transform 0.1s ease-out',
          transformOrigin: 'left',
          transform: `scaleX(${scrollProgress / 100})`,
          boxShadow: scrollProgress > 5 ? '0 0 10px rgba(10, 77, 140, 0.5)' : 'none',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
