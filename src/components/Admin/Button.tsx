"use client";

import React, { useState, forwardRef, useMemo } from 'react';
import { colors, radius, transitions, typography } from './theme';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

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

// Minimalist variant styles - flat design with subtle depth
const variantStyles: Record<ButtonVariant, {
  bg: string;
  hoverBg: string;
  activeBg: string;
  color: string;
  border: string;
}> = {
  primary: {
    bg: colors.primary,
    hoverBg: colors.primaryHover,
    activeBg: colors.primaryDark,
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    bg: colors.surfaceHover,
    hoverBg: colors.borderDark,
    activeBg: colors.border,
    color: colors.textSecondary,
    border: 'none',
  },
  success: {
    bg: colors.success,
    hoverBg: colors.successDark,
    activeBg: '#15803d',
    color: '#ffffff',
    border: 'none',
  },
  danger: {
    bg: colors.danger,
    hoverBg: colors.dangerDark,
    activeBg: '#b91c1c',
    color: '#ffffff',
    border: 'none',
  },
  warning: {
    bg: colors.warning,
    hoverBg: colors.warningDark,
    activeBg: '#b45309',
    color: '#ffffff',
    border: 'none',
  },
  info: {
    bg: colors.info,
    hoverBg: colors.infoDark,
    activeBg: colors.primaryDark,
    color: '#ffffff',
    border: 'none',
  },
  ghost: {
    bg: 'transparent',
    hoverBg: colors.primaryLight,
    activeBg: 'rgba(59, 130, 246, 0.15)',
    color: colors.primary,
    border: 'none',
  },
  outline: {
    bg: 'transparent',
    hoverBg: colors.primaryLight,
    activeBg: 'rgba(59, 130, 246, 0.15)',
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
  },
};

const sizeStyles: Record<ButtonSize, {
  padding: string;
  fontSize: string;
  iconSize: string;
  borderRadius: string;
  gap: string;
}> = {
  xs: {
    padding: '6px 10px',
    fontSize: '12px',
    iconSize: '14px',
    borderRadius: radius.md,
    gap: '4px',
  },
  sm: {
    padding: '8px 12px',
    fontSize: '13px',
    iconSize: '16px',
    borderRadius: radius.md,
    gap: '6px',
  },
  md: {
    padding: '10px 16px',
    fontSize: '14px',
    iconSize: '18px',
    borderRadius: radius.lg,
    gap: '8px',
  },
  lg: {
    padding: '12px 20px',
    fontSize: '15px',
    iconSize: '20px',
    borderRadius: radius.lg,
    gap: '8px',
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

  const computedAriaLabel = ariaLabel || (icon && !children ? `${icon.replace('bx-', '')} button` : undefined);

  const buttonStyle = useMemo<React.CSSProperties>(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeStyle.gap,
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: typography.fontWeight.medium,
    borderRadius: sizeStyle.borderRadius,
    border: variantStyle.border,
    background: isDisabled
      ? colors.border
      : isPressed
        ? variantStyle.activeBg
        : isHovered
          ? variantStyle.hoverBg
          : variantStyle.bg,
    color: isDisabled ? colors.textMuted : variantStyle.color,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: transitions.normal,
    transform: isPressed && !isDisabled ? 'scale(0.98)' : 'scale(1)',
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? 0.6 : 1,
    outline: 'none',
    boxShadow: isFocused ? `0 0 0 3px ${colors.primaryLight}` : 'none',
    whiteSpace: 'nowrap',
    ...style,
  }), [isHovered, isPressed, isFocused, isDisabled, variantStyle, sizeStyle, fullWidth, style]);

  const iconElement = icon && !loading && (
    <i
      className={`bx ${icon}`}
      style={{ fontSize: sizeStyle.iconSize }}
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
    <button
      ref={ref}
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
  );
});

Button.displayName = 'Button';

// Icon Button - compact action buttons
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  'aria-label'?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'md',
  tooltip,
  disabled,
  style,
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const variantConfig = {
    default: { color: colors.textMuted, hoverColor: colors.textSecondary, hoverBg: colors.surfaceHover },
    primary: { color: colors.textMuted, hoverColor: colors.primary, hoverBg: colors.primaryLight },
    danger: { color: colors.textMuted, hoverColor: colors.danger, hoverBg: colors.dangerLight },
    success: { color: colors.textMuted, hoverColor: colors.success, hoverBg: colors.successLight },
    warning: { color: colors.textMuted, hoverColor: colors.warning, hoverBg: colors.warningLight },
    info: { color: colors.textMuted, hoverColor: colors.info, hoverBg: colors.infoLight },
  };

  const sizeConfig = {
    sm: { size: '32px', iconSize: '16px' },
    md: { size: '36px', iconSize: '18px' },
    lg: { size: '40px', iconSize: '20px' },
  };

  const config = variantConfig[variant];
  const sizeInfo = sizeConfig[size];
  const computedAriaLabel = ariaLabel || tooltip || `${icon.replace('bx-', '')} button`;

  const buttonStyle = useMemo<React.CSSProperties>(() => ({
    width: sizeInfo.size,
    height: sizeInfo.size,
    padding: 0,
    borderRadius: radius.lg,
    border: `1px solid ${isHovered && !disabled ? config.hoverColor : colors.border}`,
    background: disabled ? colors.surfaceHover : isHovered ? config.hoverBg : 'transparent',
    color: disabled ? colors.textLight : isHovered ? config.hoverColor : config.color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: transitions.normal,
    outline: 'none',
    boxShadow: isFocused ? `0 0 0 3px ${colors.primaryLight}` : 'none',
    opacity: disabled ? 0.5 : 1,
    ...style,
  }), [isHovered, isFocused, disabled, config, sizeInfo, style]);

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
      <i className={`bx ${icon}`} style={{ fontSize: sizeInfo.iconSize }} aria-hidden="true" />
    </button>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: string;
  customLabels?: Record<string, string>;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, customLabels }) => {
  const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
    draft: { bg: colors.surfaceHover, color: colors.textMuted, label: 'Draft' },
    published: { bg: colors.successLight, color: colors.successDark, label: 'Published' },
    archived: { bg: colors.surfaceHover, color: colors.textLight, label: 'Archived' },
    active: { bg: colors.successLight, color: colors.successDark, label: 'Active' },
    inactive: { bg: colors.dangerLight, color: colors.dangerDark, label: 'Inactive' },
    pending: { bg: colors.warningLight, color: colors.warningDark, label: 'Pending' },
    new: { bg: colors.infoLight, color: colors.infoDark, label: 'New' },
    in_progress: { bg: colors.warningLight, color: colors.warningDark, label: 'In Progress' },
    resolved: { bg: colors.successLight, color: colors.successDark, label: 'Resolved' },
    closed: { bg: colors.surfaceHover, color: colors.textMuted, label: 'Closed' },
    admin: { bg: colors.dangerLight, color: colors.dangerDark, label: 'Admin' },
    moderator: { bg: colors.infoLight, color: colors.infoDark, label: 'Moderator' },
    user: { bg: colors.surfaceHover, color: colors.textMuted, label: 'User' },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.draft;
  const label = customLabels?.[status] || config.label;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: radius.sm,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        background: config.bg,
        color: config.color,
        textTransform: 'capitalize',
      }}
    >
      {label}
    </span>
  );
};

// Empty State Component
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = 'bx-inbox', title, description, action }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
    }}
  >
    <i
      className={`bx ${icon}`}
      style={{
        fontSize: '48px',
        color: colors.textLight,
        marginBottom: '16px',
        opacity: 0.5,
      }}
    />
    <h3
      style={{
        margin: '0 0 8px',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium,
        color: colors.textSecondary,
      }}
    >
      {title}
    </h3>
    {description && (
      <p
        style={{
          margin: '0 0 16px',
          fontSize: typography.fontSize.md,
          color: colors.textMuted,
          maxWidth: '300px',
        }}
      >
        {description}
      </p>
    )}
    {action}
  </div>
);

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: number; isPositive: boolean };
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, color }) => (
  <div
    style={{
      background: colors.surface,
      borderRadius: radius.lg,
      border: `1px solid ${colors.border}`,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}
  >
    <div
      style={{
        width: '44px',
        height: '44px',
        borderRadius: radius.lg,
        background: color ? `${color}15` : colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <i className={`bx ${icon}`} style={{ fontSize: '22px', color: color || colors.textMuted }} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.semibold,
          color: colors.text,
          lineHeight: 1.2,
        }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '2px',
        }}
      >
        <span style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>{label}</span>
        {trend && (
          <span
            style={{
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              color: trend.isPositive ? colors.success : colors.danger,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <i className={`bx ${trend.isPositive ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`} />
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  </div>
);

// Action Buttons - group of action buttons for tables
interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReset?: () => void;
  viewTooltip?: string;
  editTooltip?: string;
  deleteTooltip?: string;
  resetTooltip?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isArabic?: boolean;
  isMobile?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  onReset,
  viewTooltip = 'View',
  editTooltip = 'Edit',
  deleteTooltip = 'Delete',
  resetTooltip = 'Reset',
  disabled,
  size = 'sm',
}) => (
  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
    {onView && (
      <IconButton
        icon="bx-show"
        variant="primary"
        size={size}
        tooltip={viewTooltip}
        onClick={onView}
        disabled={disabled}
      />
    )}
    {onEdit && (
      <IconButton
        icon="bx-edit"
        variant="info"
        size={size}
        tooltip={editTooltip}
        onClick={onEdit}
        disabled={disabled}
      />
    )}
    {onReset && (
      <IconButton
        icon="bx-refresh"
        variant="warning"
        size={size}
        tooltip={resetTooltip}
        onClick={onReset}
        disabled={disabled}
      />
    )}
    {onDelete && (
      <IconButton
        icon="bx-trash"
        variant="danger"
        size={size}
        tooltip={deleteTooltip}
        onClick={onDelete}
        disabled={disabled}
      />
    )}
  </div>
);

export default Button;
