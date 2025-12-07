"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import Button from './Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isArabic?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onCancel,
  isArabic = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const defaultConfirmText = isArabic ? 'تأكيد' : 'Confirm';
  const defaultCancelText = isArabic ? 'إلغاء' : 'Cancel';

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      onCancel();
    }
    // Trap focus within dialog
    if (e.key === 'Tab' && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, [isLoading, onCancel]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the cancel button (safer default)
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 50);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to previous element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      icon: 'bx-error-circle',
      iconColor: '#ef4444',
      iconBg: '#fef2f2',
      buttonVariant: 'danger' as const,
    },
    warning: {
      icon: 'bx-error',
      iconColor: '#f59e0b',
      iconBg: '#fffbeb',
      buttonVariant: 'warning' as const,
    },
    info: {
      icon: 'bx-info-circle',
      iconColor: '#3b82f6',
      iconBg: '#eff6ff',
      buttonVariant: 'info' as const,
    },
  };

  const config = variantConfig[variant];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(4px)',
        padding: '20px',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onCancel();
        }
      }}
    >
      <div
        ref={dialogRef}
        style={{
          background: '#fff',
          borderRadius: '16px',
          maxWidth: '400px',
          width: '100%',
          padding: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'confirmDialogEnter 0.2s ease-out',
          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: config.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <i
            className={`bx ${config.icon}`}
            style={{ fontSize: '28px', color: config.iconColor }}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h2
          id="confirm-dialog-title"
          style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '700',
            color: '#1f2937',
            textAlign: 'center',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
        >
          {title}
        </h2>

        {/* Message */}
        <p
          id="confirm-dialog-message"
          style={{
            margin: '0 0 24px 0',
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            lineHeight: 1.6,
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
        >
          {message}
        </p>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexDirection: isArabic ? 'row-reverse' : 'row',
          }}
        >
          <Button
            variant="secondary"
            size="md"
            onClick={onCancel}
            disabled={isLoading}
            style={{ minWidth: '100px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}
          >
            {cancelText || defaultCancelText}
          </Button>
          <Button
            ref={confirmButtonRef}
            variant={config.buttonVariant}
            size="md"
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
            style={{ minWidth: '100px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}
          >
            {confirmText || defaultConfirmText}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes confirmDialogEnter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Hook for easier usage
export interface UseConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isArabic?: boolean;
}

export interface UseConfirmDialogReturn {
  isOpen: boolean;
  isLoading: boolean;
  confirm: () => Promise<boolean>;
  ConfirmDialogComponent: React.FC;
}

export const useConfirmDialog = (options: UseConfirmDialogOptions): UseConfirmDialogReturn => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

  const confirm = React.useCallback((): Promise<boolean> => {
    setIsOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = React.useCallback(() => {
    resolveRef.current?.(true);
    setIsOpen(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    resolveRef.current?.(false);
    setIsOpen(false);
  }, []);

  const ConfirmDialogComponent: React.FC = React.useCallback(() => (
    <ConfirmDialog
      isOpen={isOpen}
      title={options.title}
      message={options.message}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      variant={options.variant}
      isLoading={isLoading}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      isArabic={options.isArabic}
    />
  ), [isOpen, isLoading, options, handleConfirm, handleCancel]);

  return {
    isOpen,
    isLoading,
    confirm,
    ConfirmDialogComponent,
  };
};

export default ConfirmDialog;
