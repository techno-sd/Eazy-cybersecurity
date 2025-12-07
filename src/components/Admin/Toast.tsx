"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { colors, radius, typography, transitions, spacing, shadows, getFontFamily } from './theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  isRTL?: boolean;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastIcons: Record<ToastType, string> = {
  success: 'bx-check-circle',
  error: 'bx-x-circle',
  warning: 'bx-error',
  info: 'bx-info-circle',
};

const toastColors: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
  success: {
    bg: colors.successLight,
    border: colors.success,
    text: colors.successDark,
    icon: colors.success,
  },
  error: {
    bg: colors.dangerLight,
    border: colors.danger,
    text: colors.dangerDark,
    icon: colors.danger,
  },
  warning: {
    bg: colors.warningLight,
    border: colors.warning,
    text: colors.warningDark,
    icon: colors.warning,
  },
  info: {
    bg: colors.infoLight,
    border: colors.info,
    text: colors.infoDark,
    icon: colors.info,
  },
};

const ToastItem: React.FC<{ toast: Toast; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const colorConfig = toastColors[toast.type];
  const duration = toast.duration || 4000;
  const isRTL = toast.isRTL;
  const fontFamily = getFontFamily(isRTL || false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsExiting(true);
        setTimeout(() => onClose(toast.id), 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onClose, toast.id]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  const slideInAnimation = isRTL ? 'toastSlideInRTL' : 'toastSlideIn';
  const slideOutAnimation = isRTL ? 'toastSlideOutRTL' : 'toastSlideOut';

  return (
    <div
      style={{
        background: colorConfig.bg,
        borderRadius: radius.lg,
        padding: spacing.md,
        boxShadow: shadows.lg,
        border: `1px solid ${colorConfig.border}`,
        display: 'flex',
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: spacing.sm,
        minWidth: '300px',
        maxWidth: '400px',
        position: 'relative',
        overflow: 'hidden',
        animation: isExiting
          ? `${slideOutAnimation} 0.3s ease-out forwards`
          : `${slideInAnimation} 0.3s ease-out`,
        direction: isRTL ? 'rtl' : 'ltr',
        fontFamily,
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: isRTL ? 0 : 'auto',
          left: isRTL ? 'auto' : 0,
          height: '2px',
          background: colorConfig.border,
          width: `${progress}%`,
          transition: 'width 50ms linear',
        }}
      />

      {/* Icon */}
      <i
        className={`bx ${toastIcons[toast.type]}`}
        style={{
          fontSize: '20px',
          color: colorConfig.icon,
          flexShrink: 0,
        }}
      />

      {/* Message */}
      <p
        style={{
          margin: 0,
          color: colorConfig.text,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {toast.message}
      </p>

      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          padding: spacing.xs,
          cursor: 'pointer',
          color: colorConfig.text,
          opacity: 0.6,
          transition: transitions.fast,
          borderRadius: radius.sm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.6';
        }}
      >
        <i className="bx bx-x" style={{ fontSize: '18px' }} />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isRTL, setIsRTL] = useState(false);

  // Detect RTL from document direction
  useEffect(() => {
    const checkRTL = () => {
      const dir = document.documentElement.dir || document.body.dir;
      const lang = document.documentElement.lang;
      setIsRTL(dir === 'rtl' || lang === 'ar');
    };

    checkRTL();

    // Watch for changes in document direction
    const observer = new MutationObserver(checkRTL);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['dir'] });

    return () => observer.disconnect();
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    // Pass current RTL state to toast
    setToasts((prev) => [...prev, { id, message, type, duration, isRTL }]);
  }, [isRTL]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Container */}
      <div
        className="toast-container"
        style={{
          position: 'fixed',
          top: spacing.lg,
          right: isRTL ? 'auto' : spacing.lg,
          left: isRTL ? spacing.lg : 'auto',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.sm,
          pointerEvents: 'none',
        }}
      >
        <style>{`
          @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes toastSlideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100%); }
          }
          @keyframes toastSlideInRTL {
            from { opacity: 0; transform: translateX(-100%); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes toastSlideOutRTL {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-100%); }
          }
          @media (max-width: 480px) {
            .toast-container {
              left: ${spacing.sm} !important;
              right: ${spacing.sm} !important;
            }
            .toast-container > div {
              min-width: unset !important;
              max-width: none !important;
              width: 100% !important;
            }
          }
        `}</style>

        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={toast} onClose={hideToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
