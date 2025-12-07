/**
 * Admin Panel Design System
 * Centralized design tokens for consistent styling
 */

// Color Palette
export const colors = {
  // Primary
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: 'rgba(59, 130, 246, 0.1)',
  primaryDark: '#1d4ed8',

  // Neutral
  text: '#0f172a',
  textSecondary: '#1e293b',
  textMuted: '#64748b',
  textLight: '#94a3b8',

  // Backgrounds
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceHover: '#f1f5f9',

  // Borders
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderDark: '#cbd5e1',

  // Status Colors
  success: '#22c55e',
  successLight: '#dcfce7',
  successDark: '#16a34a',

  warning: '#f59e0b',
  warningLight: '#fef3c7',
  warningDark: '#d97706',

  danger: '#ef4444',
  dangerLight: '#fef2f2',
  dangerDark: '#dc2626',

  info: '#3b82f6',
  infoLight: '#eff6ff',
  infoDark: '#2563eb',

  // Sidebar
  sidebar: '#1e293b',
  sidebarHover: '#334155',
  sidebarActive: '#0f172a',
  sidebarText: '#f8fafc',
  sidebarTextMuted: '#94a3b8',
} as const;

// Spacing Scale (in pixels)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
} as const;

// Border Radius
export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

// Typography
export const typography = {
  fontFamily: {
    base: 'inherit',
    arabic: 'Cairo, sans-serif',
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '13px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.05em',
  },
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const;

// Transitions
export const transitions = {
  fast: '0.1s ease',
  normal: '0.15s ease',
  slow: '0.25s ease',
  smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Breakpoints
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

// Z-Index Scale
export const zIndex = {
  dropdown: 100,
  sticky: 200,
  modal: 1000,
  tooltip: 1100,
  toast: 1200,
} as const;

// Status Configuration (for badges, indicators)
export const statusConfig = {
  draft: { bg: colors.surfaceHover, text: colors.textMuted, label: 'Draft' },
  published: { bg: colors.successLight, text: colors.successDark, label: 'Published' },
  archived: { bg: colors.surfaceHover, text: colors.textLight, label: 'Archived' },
  active: { bg: colors.successLight, text: colors.successDark, label: 'Active' },
  inactive: { bg: colors.dangerLight, text: colors.dangerDark, label: 'Inactive' },
  pending: { bg: colors.warningLight, text: colors.warningDark, label: 'Pending' },
  new: { bg: colors.infoLight, text: colors.infoDark, label: 'New' },
  in_progress: { bg: colors.warningLight, text: colors.warningDark, label: 'In Progress' },
  resolved: { bg: colors.successLight, text: colors.successDark, label: 'Resolved' },
  closed: { bg: colors.surfaceHover, text: colors.textMuted, label: 'Closed' },
} as const;

// Common Style Utilities
export const commonStyles = {
  // Card styles
  card: {
    background: colors.surface,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
  },

  // Input styles
  input: {
    padding: `${spacing.md}px ${spacing.lg}px`,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    fontSize: typography.fontSize.md,
    transition: transitions.normal,
    outline: 'none',
  },

  inputFocus: {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primaryLight}`,
  },

  // Badge styles
  badge: {
    padding: `${spacing.xs}px ${spacing.md}px`,
    borderRadius: radius.sm,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },

  // Table header styles
  tableHeader: {
    padding: `${spacing.md}px ${spacing.lg}px`,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase' as const,
    letterSpacing: typography.letterSpacing.wide,
  },

  // Table cell styles
  tableCell: {
    padding: `${spacing.lg}px`,
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },

  // Icon button styles
  iconButton: {
    width: '36px',
    height: '36px',
    padding: spacing.sm,
    background: 'transparent',
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    color: colors.textMuted,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: transitions.normal,
  },

  // Section title
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    letterSpacing: typography.letterSpacing.tight,
    margin: 0,
  },

  // Subtitle/description
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
    margin: `${spacing.xs}px 0 0`,
  },
} as const;

// Get font family based on language
export const getFontFamily = (isArabic: boolean): string => {
  return isArabic ? typography.fontFamily.arabic : typography.fontFamily.base;
};

// Get status styling
export const getStatusStyle = (status: string) => {
  const config = statusConfig[status as keyof typeof statusConfig];
  return config || statusConfig.draft;
};

// Get text alignment based on language
export const getTextAlign = (isArabic: boolean): 'left' | 'right' => {
  return isArabic ? 'right' : 'left';
};

// Get direction based on language
export const getDirection = (isArabic: boolean): 'ltr' | 'rtl' => {
  return isArabic ? 'rtl' : 'ltr';
};

// Get margin direction key
export const getMarginDir = (isArabic: boolean, side: 'start' | 'end'): 'marginLeft' | 'marginRight' => {
  if (side === 'start') {
    return isArabic ? 'marginRight' : 'marginLeft';
  }
  return isArabic ? 'marginLeft' : 'marginRight';
};

// Get padding direction key
export const getPaddingDir = (isArabic: boolean, side: 'start' | 'end'): 'paddingLeft' | 'paddingRight' => {
  if (side === 'start') {
    return isArabic ? 'paddingRight' : 'paddingLeft';
  }
  return isArabic ? 'paddingLeft' : 'paddingRight';
};

export default {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  statusConfig,
  commonStyles,
  getFontFamily,
  getStatusStyle,
  getTextAlign,
  getDirection,
  getMarginDir,
  getPaddingDir,
};
