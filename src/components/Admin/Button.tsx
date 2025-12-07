"use client";

import React, { useState, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  'aria-label'?: string;
}

const variantStyles: Record<ButtonVariant, {
  bg: string;
  hoverBg: string;
  color: string;
  border: string;
  shadow: string;
  hoverShadow: string;
}> = {
  primary: {
    bg: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)',
    hoverBg: 'linear-gradient(135deg, #073D6C 0%, #052A4F 100%)',
    color: '#ffffff',
    border: 'none',
    shadow: '0 4px 14px rgba(10, 77, 140, 0.35)',
    hoverShadow: '0 6px 20px rgba(10, 77, 140, 0.45)',
  },
  secondary: {
    bg: 'linear-gradient(135deg, #607EAC 0%, #4A6489 100%)',
    hoverBg: 'linear-gradient(135deg, #4A6489 0%, #3D526F 100%)',
    color: '#ffffff',
    border: 'none',
    shadow: '0 4px 14px rgba(96, 126, 172, 0.35)',
    hoverShadow: '0 6px 20px rgba(96, 126, 172, 0.45)',
  },
  success: {
    bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    hoverBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    color: '#ffffff',
    border: 'none',
    shadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
    hoverShadow: '0 6px 20px rgba(16, 185, 129, 0.45)',
  },
  danger: {
    bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    hoverBg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    color: '#ffffff',
    border: 'none',
    shadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
    hoverShadow: '0 6px 20px rgba(239, 68, 68, 0.45)',
  },
  warning: {
    bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    hoverBg: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    color: '#ffffff',
    border: 'none',
    shadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
    hoverShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
  },
  info: {
    bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    hoverBg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    border: 'none',
    shadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
    hoverShadow: '0 6px 20px rgba(59, 130, 246, 0.45)',
  },
  ghost: {
    bg: 'transparent',
    hoverBg: 'rgba(10, 77, 140, 0.08)',
    color: '#0A4D8C',
    border: 'none',
    shadow: 'none',
    hoverShadow: 'none',
  },
  outline: {
    bg: 'transparent',
    hoverBg: 'rgba(10, 77, 140, 0.05)',
    color: '#0A4D8C',
    border: '2px solid #0A4D8C',
    shadow: 'none',
    hoverShadow: '0 4px 14px rgba(10, 77, 140, 0.15)',
  },
};

const sizeStyles: Record<ButtonSize, {
  padding: string;
  fontSize: string;
  iconSize: string;
  borderRadius: string;
}> = {
  sm: {
    padding: '8px 14px',
    fontSize: '13px',
    iconSize: '16px',
    borderRadius: '8px',
  },
  md: {
    padding: '12px 20px',
    fontSize: '14px',
    iconSize: '18px',
    borderRadius: '10px',
  },
  lg: {
    padding: '14px 28px',
    fontSize: '15px',
    iconSize: '20px',
    borderRadius: '12px',
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled = false,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setIsPressed(false);
    onMouseLeave?.(e);
  };

  // Generate aria-label if icon-only button
  const computedAriaLabel = ariaLabel || (icon && !children ? `${icon.replace('bx-', '')} button` : undefined);

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: 600,
    borderRadius: sizeStyle.borderRadius,
    border: variantStyle.border,
    background: isDisabled
      ? '#e5e7eb'
      : isHovered
        ? variantStyle.hoverBg
        : variantStyle.bg,
    color: isDisabled ? '#9ca3af' : variantStyle.color,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isDisabled
      ? 'none'
      : isPressed
        ? 'translateY(1px) scale(0.98)'
        : isHovered
          ? 'translateY(-2px)'
          : 'translateY(0)',
    boxShadow: isDisabled
      ? 'none'
      : isHovered
        ? variantStyle.hoverShadow
        : variantStyle.shadow,
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? 0.7 : 1,
    position: 'relative',
    overflow: 'hidden',
    outline: isFocused ? `3px solid ${variant === 'outline' || variant === 'ghost' ? '#0A4D8C' : 'rgba(255, 255, 255, 0.8)'}` : 'none',
    outlineOffset: '2px',
    ...style,
  };

  const iconElement = icon && !loading && (
    <i
      className={`bx ${icon}`}
      style={{
        fontSize: sizeStyle.iconSize,
        transition: 'transform 0.2s ease',
        transform: isHovered && !isDisabled ? 'scale(1.1)' : 'scale(1)',
      }}
      aria-hidden="true"
    />
  );

  const loadingSpinner = loading && (
    <i
      className="bx bx-loader-alt bx-spin"
      style={{ fontSize: sizeStyle.iconSize }}
      aria-hidden="true"
    />
  );

  return (
    <>
      <style>{`
        @keyframes buttonRipple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .admin-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .admin-btn:hover::after {
          opacity: 1;
        }
        .admin-btn:active::after {
          opacity: 0;
        }
      `}</style>
      <button
        ref={ref}
        className="admin-btn"
        style={buttonStyle}
        disabled={isDisabled}
        aria-label={computedAriaLabel}
        aria-busy={loading}
        aria-disabled={isDisabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {loading && <span className="sr-only">Loading...</span>}
        {iconPosition === 'left' && (loadingSpinner || iconElement)}
        {children}
        {iconPosition === 'right' && (loadingSpinner || iconElement)}
      </button>
    </>
  );
});

Button.displayName = 'Button';

// Action Button Group for consistent table/card actions
interface ActionButtonProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReset?: () => void;
  size?: ButtonSize;
  isArabic?: boolean;
  isMobile?: boolean;
  loading?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    reset?: boolean;
  };
}

export const ActionButtons: React.FC<ActionButtonProps> = ({
  onView,
  onEdit,
  onDelete,
  onReset,
  size = 'sm',
  isArabic = false,
  isMobile = false,
  loading = {},
}) => {
  const t = {
    view: isArabic ? 'عرض' : 'View',
    edit: isArabic ? 'تعديل' : 'Edit',
    delete: isArabic ? 'حذف' : 'Delete',
    reset: isArabic ? 'إعادة تعيين' : 'Reset',
  };

  const containerStyle: React.CSSProperties = isMobile
    ? {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
      }
    : {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      };

  return (
    <div style={containerStyle}>
      {onView && (
        <Button
          variant="primary"
          size={size}
          icon="bx-show"
          onClick={onView}
          loading={loading.view}
          fullWidth={isMobile}
        >
          {t.view}
        </Button>
      )}
      {onEdit && (
        <Button
          variant="warning"
          size={size}
          icon="bx-edit"
          onClick={onEdit}
          loading={loading.edit}
          fullWidth={isMobile}
        >
          {t.edit}
        </Button>
      )}
      {onReset && (
        <Button
          variant="info"
          size={size}
          icon="bx-key"
          onClick={onReset}
          loading={loading.reset}
          fullWidth={isMobile}
        >
          {t.reset}
        </Button>
      )}
      {onDelete && (
        <Button
          variant="danger"
          size={size}
          icon="bx-trash"
          onClick={onDelete}
          loading={loading.delete}
          fullWidth={isMobile}
        >
          {t.delete}
        </Button>
      )}
    </div>
  );
};

// Icon Button for compact actions
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tooltip?: string;
  'aria-label'?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  tooltip,
  disabled,
  style,
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const variantStyle = variantStyles[variant];

  const sizeMap: Record<ButtonSize, { size: string; iconSize: string }> = {
    sm: { size: '32px', iconSize: '16px' },
    md: { size: '40px', iconSize: '20px' },
    lg: { size: '48px', iconSize: '24px' },
  };

  // Use tooltip as aria-label if not provided
  const computedAriaLabel = ariaLabel || tooltip || `${icon.replace('bx-', '')} button`;

  const buttonStyle: React.CSSProperties = {
    width: sizeMap[size].size,
    height: sizeMap[size].size,
    borderRadius: '10px',
    border: variantStyle.border,
    background: disabled
      ? '#e5e7eb'
      : isHovered
        ? variantStyle.hoverBg
        : variantStyle.bg,
    color: disabled ? '#9ca3af' : variantStyle.color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered && !disabled ? variantStyle.hoverShadow : variantStyle.shadow,
    outline: isFocused ? `3px solid ${variant === 'ghost' ? '#0A4D8C' : 'rgba(255, 255, 255, 0.8)'}` : 'none',
    outlineOffset: '2px',
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled}
      title={tooltip}
      aria-label={computedAriaLabel}
      aria-disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      <i
        className={`bx ${icon}`}
        style={{
          fontSize: sizeMap[size].iconSize,
          transition: 'transform 0.2s ease',
          transform: isHovered && !disabled ? 'rotate(5deg)' : 'rotate(0)',
        }}
        aria-hidden="true"
      />
    </button>
  );
};

export default Button;
