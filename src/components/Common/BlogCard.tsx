'use client';

import React from 'react';
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
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  alt,
  category,
  date,
  title,
  description,
  isArabic,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <div
        className="modern-card hover-lift"
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', height: '220px', width: '100%' }}>
          <Image
            src={image}
            alt={alt}
            width={420}
            height={220}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)',
              opacity: '0',
              transition: 'opacity 0.3s ease',
            }}
            className="gradient-overlay-hover"
          ></div>
          <span
            className="modern-badge"
            style={{
              position: 'absolute',
              top: '15px',
              right: isArabic ? 'auto' : '15px',
              left: isArabic ? '15px' : 'auto',
              zIndex: '10',
              background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {category}
          </span>
        </div>

        <div className="blog-content" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#0A4D8C',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <i className="bx bx-calendar"></i>
              {date}
            </div>
            <h3 className="gradient-text" style={{ fontSize: '18px', marginBottom: '10px', lineHeight: '1.3', fontWeight: '600', textAlign: isArabic ? 'right' : 'left' }}>
              <Link href="/blog/details" style={{ textDecoration: 'none' }}>
                {title}
              </Link>
            </h3>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', marginBottom: '15px', textAlign: isArabic ? 'right' : 'left' }}>{description}</p>
          </div>

          <Link
            href="/blog/details"
            className="btn-modern"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              width: 'fit-content',
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
