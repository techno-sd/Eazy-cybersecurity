"use client";

import React, { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  isArabic?: boolean;
  isMobile?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  isArabic = false,
  isMobile = false,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const t = {
    showing: isArabic ? 'عرض' : 'Showing',
    to: isArabic ? 'إلى' : 'to',
    of: isArabic ? 'من' : 'of',
    results: isArabic ? 'نتيجة' : 'results',
    itemsPerPage: isArabic ? 'لكل صفحة' : 'per page',
    previous: isArabic ? 'السابق' : 'Previous',
    next: isArabic ? 'التالي' : 'Next',
    page: isArabic ? 'صفحة' : 'Page',
  };

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Calculate range around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, isMobile]);

  if (totalItems === 0) return null;

  const buttonStyle = (isActive: boolean, isDisabled: boolean): React.CSSProperties => ({
    padding: isMobile ? '8px 12px' : '10px 16px',
    border: isActive ? '2px solid #0A4D8C' : '1px solid #e5e7eb',
    borderRadius: '8px',
    background: isActive
      ? 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)'
      : isDisabled
        ? '#f9fafb'
        : '#fff',
    color: isActive ? '#fff' : isDisabled ? '#9ca3af' : '#374151',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: isMobile ? '13px' : '14px',
    fontWeight: isActive ? '600' : '500',
    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
    transition: 'all 0.2s ease',
    minWidth: isMobile ? '36px' : '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const navButtonStyle = (isDisabled: boolean): React.CSSProperties => ({
    padding: isMobile ? '8px 12px' : '10px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    background: isDisabled ? '#f9fafb' : '#fff',
    color: isDisabled ? '#9ca3af' : '#0A4D8C',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: isMobile ? '13px' : '14px',
    fontWeight: '600',
    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '16px' : '20px',
        marginTop: '24px',
        padding: isMobile ? '16px' : '20px',
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      {/* Info Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '12px' : '16px',
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        <span
          style={{
            fontSize: isMobile ? '13px' : '14px',
            color: '#6b7280',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
        >
          {t.showing}{' '}
          <strong style={{ color: '#1f2937' }}>{startItem}</strong> {t.to}{' '}
          <strong style={{ color: '#1f2937' }}>{endItem}</strong> {t.of}{' '}
          <strong style={{ color: '#1f2937' }}>{totalItems}</strong> {t.results}
        </span>

        {onItemsPerPageChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              style={{
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#374151',
                background: '#fff',
                cursor: 'pointer',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}
            >
              {[10, 20, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span
              style={{
                fontSize: '13px',
                color: '#6b7280',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}
            >
              {t.itemsPerPage}
            </span>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          justifyContent: isMobile ? 'center' : 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={navButtonStyle(currentPage === 1)}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.borderColor = '#0A4D8C';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }
          }}
        >
          <i className={`bx bx-chevron-${isArabic ? 'right' : 'left'}`} style={{ fontSize: '18px' }} />
          {!isMobile && t.previous}
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              style={{
                padding: '8px 4px',
                color: '#9ca3af',
                fontSize: '14px',
              }}
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              style={buttonStyle(currentPage === page, false)}
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#0A4D8C40';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={navButtonStyle(currentPage === totalPages)}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.borderColor = '#0A4D8C';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }
          }}
        >
          {!isMobile && t.next}
          <i className={`bx bx-chevron-${isArabic ? 'left' : 'right'}`} style={{ fontSize: '18px' }} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
