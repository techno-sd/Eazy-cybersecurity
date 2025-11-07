'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  image: string;
  alt: string;
  category: string;
  date: string;
  title: string;
  description: string;
  isArabic: boolean;
  slug?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  alt,
  category,
  date,
  title,
  description,
  isArabic,
  slug = 'details',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      <div
        className="modern-card hover-lift"
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          boxShadow: isHovered ? '0 16px 40px rgba(10, 77, 140, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '240px', width: '100%', background: 'linear-gradient(135deg, #f0f5f9 0%, #e8f0f7 100%)' }}>
          <Image
            src={image}
            alt={alt}
            width={420}
            height={240}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.15) 0%, rgba(96, 126, 172, 0.2) 100%)',
              opacity: isHovered ? '0.7' : '0',
              transition: 'opacity 0.4s ease',
            }}
            className="gradient-overlay-hover"
          ></div>

          {/* Category Badge */}
          <span
            style={{
              position: 'absolute',
              top: '16px',
              right: isArabic ? 'auto' : '16px',
              left: isArabic ? '16px' : 'auto',
              zIndex: '10',
              background: isHovered ? 'linear-gradient(135deg, #607EAC, #0A4D8C)' : 'linear-gradient(135deg, #0A4D8C, #607EAC)',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: '24px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(10, 77, 140, 0.3)',
            }}
          >
            {category}
          </span>
        </div>

        {/* Content Container */}
        <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Date */}
          <div
            style={{
              fontSize: '12px',
              color: '#0A4D8C',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              textAlign: isArabic ? 'right' : 'left',
            }}
          >
            <i className="bx bx-calendar" style={{ fontSize: '14px' }}></i>
            {date}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '18px',
            marginBottom: '12px',
            lineHeight: '1.4',
            fontWeight: '700',
            textAlign: isArabic ? 'right' : 'left',
            background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
              {title}
            </Link>
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px',
            textAlign: isArabic ? 'right' : 'left',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {description}
          </p>

          {/* Read More Button */}
          <Link
            href={`/blog/${slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '8px',
              background: isHovered ? 'linear-gradient(135deg, #607EAC, #0A4D8C)' : 'linear-gradient(135deg, #0A4D8C, #607EAC)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              width: 'fit-content',
              boxShadow: '0 4px 12px rgba(10, 77, 140, 0.2)',
            }}
          >
            {isArabic ? 'اقرأ المزيد' : 'Read More'}
            <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
