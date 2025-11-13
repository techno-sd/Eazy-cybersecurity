'use client';

import React, { useRef, useState, useEffect } from 'react';

interface HorizontalScrollCarouselProps {
  children: React.ReactNode[];
  cardWidth?: number;
  gap?: number;
  showArrows?: boolean;
  autoScroll?: boolean;
  autoScrollSpeed?: number;
}

/**
 * Horizontal Scrolling Carousel Component
 * Features:
 * - Smooth horizontal scrolling
 * - Left/Right navigation arrows
 * - Auto-scroll capability
 * - Touch/mouse drag support
 * - Responsive design
 * - Industry best practices
 */
const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({
  children,
  cardWidth = 420,
  gap = 24,
  showArrows = true,
  autoScroll = false,
  autoScrollSpeed = 5000,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    return () => container.removeEventListener('scroll', checkScroll);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const newScrollLeft = scrollLeft + cardWidth + gap;

        if (newScrollLeft >= scrollWidth - clientWidth) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
      }
    }, autoScrollSpeed);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollSpeed, cardWidth, gap]);

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 0.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Arrow scroll handlers
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = cardWidth + gap;
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', margin: '0', padding: '0' }} className="horizontal-scroll-carousel">
      {/* Left Arrow */}
      {showArrows && canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="carousel-arrow carousel-arrow-left"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
            border: 'none',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(10, 77, 140, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 77, 140, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 77, 140, 0.3)';
          }}
        >
          <i className="bx bx-chevron-left" style={{ fontSize: '24px' }}></i>
        </button>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="carousel-track"
        style={{
          display: 'flex',
          gap: `${gap}px`,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'thin',
          scrollbarColor: '#0A4D8C #f0f0f0',
          cursor: isDragging ? 'grabbing' : 'grab',
          paddingBottom: '10px',
          paddingLeft: '0',
          paddingRight: '0',
          margin: '0',
          boxSizing: 'border-box',
        }}
      >
        {/* Custom scrollbar styling for webkit browsers */}
        <style>{`
          div::-webkit-scrollbar {
            height: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #0A4D8C, #607EAC);
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #072d5a, #4a5d8a);
          }
        `}</style>

        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: `${cardWidth}px`,
              opacity: isDragging ? 0.8 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showArrows && canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="carousel-arrow carousel-arrow-right"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
            border: 'none',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(10, 77, 140, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 77, 140, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 77, 140, 0.3)';
          }}
        >
          <i className="bx bx-chevron-right" style={{ fontSize: '24px' }}></i>
        </button>
      )}
    </div>
  );
};

export default HorizontalScrollCarousel;
