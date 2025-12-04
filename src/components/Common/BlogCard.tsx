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
  index?: number;
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
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        opacity: 1,
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <div
        className="modern-card card-gradient-hover"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          boxShadow: isHovered
            ? '0 25px 50px rgba(10, 77, 140, 0.2), 0 0 0 1px rgba(10, 77, 140, 0.1)'
            : '0 8px 24px rgba(0, 0, 0, 0.08)',
          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
          position: 'relative'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '240px',
          width: '100%',
          background: 'linear-gradient(135deg, #f0f5f9 0%, #e8f0f7 100%)'
        }}>
          <Image
            src={image}
            alt={alt}
            width={420}
            height={240}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease',
              transform: isHovered ? 'scale(1.12)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.05)' : 'brightness(1)',
            }}
          />
          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(10, 77, 140, 0.4) 100%)',
              opacity: isHovered ? 1 : 0.5,
              transition: 'opacity 0.4s ease',
            }}
          ></div>
          {/* Shine Effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 0.6s ease',
            }}
          ></div>

          {/* Category Badge */}
          <span
            style={{
              position: 'absolute',
              top: '16px',
              right: isArabic ? 'auto' : '16px',
              left: isArabic ? '16px' : 'auto',
              zIndex: 10,
              background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              boxShadow: isHovered
                ? '0 8px 20px rgba(10, 77, 140, 0.4)'
                : '0 4px 12px rgba(10, 77, 140, 0.25)',
              transform: isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
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
            className="btn-animated"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              width: 'fit-content',
              boxShadow: isHovered
                ? '0 12px 24px rgba(10, 77, 140, 0.35)'
                : '0 6px 16px rgba(10, 77, 140, 0.2)',
              transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isArabic ? 'اقرأ المزيد' : 'Read More'}
            <i
              className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}
              style={{
                transition: 'transform 0.3s ease',
                transform: isHovered ? `translateX(${isArabic ? '-5px' : '5px'})` : 'translateX(0)'
              }}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
