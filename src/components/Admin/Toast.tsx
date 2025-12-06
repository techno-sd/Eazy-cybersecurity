"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
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
    bg: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
    border: '#10b981',
    text: '#065f46',
    icon: '#10b981',
  },
  error: {
    bg: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)',
    border: '#ef4444',
    text: '#991b1b',
    icon: '#ef4444',
  },
  warning: {
    bg: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
    border: '#f59e0b',
    text: '#92400e',
    icon: '#f59e0b',
  },
  info: {
    bg: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    border: '#3b82f6',
    text: '#1e40af',
    icon: '#3b82f6',
  },
};

const ToastItem: React.FC<{ toast: Toast; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const colors = toastColors[toast.type];
  const duration = toast.duration || 4000;

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

  return (
    <div
      style={{
        background: colors.bg,
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
        border: `1px solid ${colors.border}30`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        minWidth: '320px',
        maxWidth: '420px',
        position: 'relative',
        overflow: 'hidden',
        animation: isExiting
          ? 'toastSlideOut 0.3s ease-out forwards'
          : 'toastSlideIn 0.3s ease-out',
        transform: 'translateX(0)',
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: colors.border,
          width: `${progress}%`,
          transition: 'width 50ms linear',
          borderRadius: '0 0 12px 12px',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          background: `${colors.icon}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <i className={`bx ${toastIcons[toast.type]}`} style={{ fontSize: '18px', color: colors.icon }} />
      </div>

      {/* Message */}
      <p
        style={{
          margin: 0,
          color: colors.text,
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.5,
          flex: 1,
          paddingTop: '3px',
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
          padding: '4px',
          cursor: 'pointer',
          color: colors.text,
          opacity: 0.6,
          transition: 'all 0.2s ease',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.background = `${colors.icon}15`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.6';
          e.currentTarget.style.background = 'none';
        }}
      >
        <i className="bx bx-x" style={{ fontSize: '20px' }} />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Container */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'none',
        }}
      >
        <style>{`
          @keyframes toastSlideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes toastSlideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(100%);
            }
          }
          @media (max-width: 480px) {
            .toast-container {
              left: 12px !important;
              right: 12px !important;
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
