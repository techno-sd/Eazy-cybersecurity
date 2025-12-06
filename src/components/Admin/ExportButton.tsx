"use client";

import React, { useState } from 'react';

interface ExportButtonProps {
  data: Record<string, any>[];
  filename: string;
  columns: { key: string; label: string }[];
  isArabic?: boolean;
  isMobile?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  filename,
  columns,
  isArabic = false,
  isMobile = false,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const t = {
    export: isArabic ? 'تصدير' : 'Export',
    csv: 'CSV',
    exporting: isArabic ? 'جاري التصدير...' : 'Exporting...',
  };

  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const formatValue = (value: any, key: string): string => {
    if (value === null || value === undefined) return '-';

    // Handle dates
    if (key.includes('date') || key.includes('_at') || key.includes('login')) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      } catch {
        return String(value);
      }
    }

    // Handle booleans
    if (typeof value === 'boolean') {
      return value ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No');
    }

    return String(value);
  };

  const exportToCSV = () => {
    setIsExporting(true);

    try {
      // Create header row
      const headers = columns.map(col => escapeCSV(col.label)).join(',');

      // Create data rows
      const rows = data.map(item =>
        columns.map(col => escapeCSV(formatValue(item[col.key], col.key))).join(',')
      );

      // Combine with BOM for Excel UTF-8 compatibility
      const BOM = '\uFEFF';
      const csvContent = BOM + [headers, ...rows].join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setTimeout(() => setIsExporting(false), 500);
    }
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={isExporting || data.length === 0}
      style={{
        padding: isMobile ? '10px 16px' : '12px 20px',
        background: data.length === 0
          ? '#f3f4f6'
          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: data.length === 0 ? '#9ca3af' : '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: data.length === 0 ? 'not-allowed' : 'pointer',
        fontSize: isMobile ? '13px' : '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
        transition: 'all 0.2s ease',
        boxShadow: data.length === 0 ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.25)',
        opacity: isExporting ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (data.length > 0 && !isExporting) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.35)';
        }
      }}
      onMouseLeave={(e) => {
        if (data.length > 0) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.25)';
        }
      }}
    >
      {isExporting ? (
        <>
          <i className="bx bx-loader-alt bx-spin" style={{ fontSize: '18px' }} />
          {t.exporting}
        </>
      ) : (
        <>
          <i className="bx bx-download" style={{ fontSize: '18px' }} />
          {t.export} {t.csv}
        </>
      )}
    </button>
  );
};

export default ExportButton;
