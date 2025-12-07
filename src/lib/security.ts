/**
 * Security Utilities and Configuration
 *
 * This file contains security-related utilities including:
 * - Rate limiting
 * - Input sanitization
 * - File validation
 * - CSRF protection helpers
 */

import { NextResponse } from 'next/server';

// Rate Limiting Implementation
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limiter configuration
 */
export const RATE_LIMITS = {
  // Auth endpoints - stricter limits
  AUTH_LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  AUTH_REGISTER: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  AUTH_FORGOT_PASSWORD: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // API endpoints - moderate limits
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  API_CONTACT: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  API_CONSULTATION: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // File upload - very strict
  UPLOAD: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
} as const;

/**
 * Rate limiter function
 *
 * @param identifier - Unique identifier (usually IP address)
 * @param limit - Rate limit configuration
 * @returns Object with allowed status and remaining attempts
 */
export function rateLimit(
  identifier: string,
  limit: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    cleanupExpiredEntries();
  }

  // No previous entry or entry expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + limit.windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: limit.maxRequests - 1,
      resetTime,
    };
  }

  // Entry exists and still valid
  if (entry.count >= limit.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  return {
    allowed: true,
    remaining: limit.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Clean up expired rate limit entries
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client IP address from request
 *
 * @param request - Next.js request object
 * @returns IP address or 'unknown'
 */
export function getClientIp(request: Request): string {
  // Check various headers for IP (in order of preference)
  const headers = request.headers;

  return (
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('cf-connecting-ip') || // Cloudflare
    headers.get('x-client-ip') ||
    'unknown'
  );
}

/**
 * File Upload Validation Configuration
 */
export const FILE_UPLOAD_CONFIG = {
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

/**
 * Validate file upload
 *
 * @param file - File object
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSize - Maximum file size in bytes
 * @returns Validation result
 */
export function validateFileUpload(
  file: File,
  allowedTypes: readonly string[],
  maxSize: number
): { valid: boolean; error?: string } {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Validate file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Validate file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  // Validate file name (prevent path traversal)
  const filename = file.name;
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return {
      valid: false,
      error: 'Invalid filename',
    };
  }

  return { valid: true };
}

/**
 * Sanitize filename to prevent security issues
 *
 * @param filename - Original filename
 * @returns Sanitized filename
 */
export function sanitizeFilename(filename: string): string {
  // Remove path traversal attempts
  let safe = filename.replace(/\.\./g, '');
  safe = safe.replace(/[\/\\]/g, '');

  // Remove special characters except dots, dashes, underscores
  safe = safe.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Prevent multiple dots in a row (potential extension bypass)
  safe = safe.replace(/\.{2,}/g, '.');

  // Limit length
  if (safe.length > 255) {
    const ext = safe.split('.').pop() || '';
    safe = safe.substring(0, 255 - ext.length - 1) + '.' + ext;
  }

  return safe;
}

/**
 * Input Sanitization
 */

/**
 * Sanitize HTML input to prevent XSS
 * Basic sanitization - for production, consider using a library like DOMPurify
 *
 * @param input - Raw HTML string
 * @returns Sanitized string
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize SQL input (use parameterized queries instead!)
 * This is a fallback - ALWAYS use parameterized queries
 *
 * @param input - User input
 * @returns Sanitized string
 */
export function sanitizeSqlInput(input: string): string {
  return input
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0':
          return '\\0';
        case '\x08':
          return '\\b';
        case '\x09':
          return '\\t';
        case '\x1a':
          return '\\z';
        case '\n':
          return '\\n';
        case '\r':
          return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char;
        default:
          return char;
      }
    });
}

/**
 * Validate email format
 *
 * @param email - Email string
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate URL format
 *
 * @param url - URL string
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * CSRF Protection Implementation
 *
 * Uses the double-submit cookie pattern:
 * 1. Server generates a token and stores it in a cookie
 * 2. Client includes the token in request headers
 * 3. Server validates token from header matches cookie
 */

// CSRF Token Configuration
export const CSRF_CONFIG = {
  TOKEN_LENGTH: 32,
  COOKIE_NAME: 'csrf-token',
  HEADER_NAME: 'x-csrf-token',
  TOKEN_EXPIRY_MS: 60 * 60 * 1000, // 1 hour
} as const;

// In-memory token store with expiration (for additional validation)
interface CsrfTokenEntry {
  token: string;
  userId?: string;
  expiresAt: number;
}

const csrfTokenStore = new Map<string, CsrfTokenEntry>();

/**
 * Clean up expired CSRF tokens periodically
 */
function cleanupExpiredCsrfTokens(): void {
  const now = Date.now();
  for (const [key, entry] of csrfTokenStore.entries()) {
    if (now > entry.expiresAt) {
      csrfTokenStore.delete(key);
    }
  }
}

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCsrfToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(CSRF_CONFIG.TOKEN_LENGTH)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Create and store a new CSRF token
 * @param userId - Optional user ID to associate with token
 * @returns The generated token
 */
export function createCsrfToken(userId?: string): string {
  // Clean up if store is large
  if (csrfTokenStore.size > 10000) {
    cleanupExpiredCsrfTokens();
  }

  const token = generateCsrfToken();
  const expiresAt = Date.now() + CSRF_CONFIG.TOKEN_EXPIRY_MS;

  csrfTokenStore.set(token, {
    token,
    userId,
    expiresAt,
  });

  return token;
}

/**
 * Validate a CSRF token from the request
 * Implements double-submit cookie pattern
 *
 * Security is maintained through:
 * 1. SameSite=Strict cookie prevents cross-site cookie sending
 * 2. Attacker can't read/set cookies on our domain
 * 3. Token in header must match token in cookie
 *
 * @param request - The incoming request
 * @returns Validation result
 */
export function validateCsrfToken(request: Request): { valid: boolean; error?: string } {
  // Get token from header
  const headerToken = request.headers.get(CSRF_CONFIG.HEADER_NAME);

  // Get token from cookie
  const cookieHeader = request.headers.get('cookie');
  const cookieToken = cookieHeader
    ?.split(';')
    .find(c => c.trim().startsWith(`${CSRF_CONFIG.COOKIE_NAME}=`))
    ?.split('=')[1]
    ?.trim();

  // Both must be present
  if (!headerToken) {
    return { valid: false, error: 'Missing CSRF token in header' };
  }

  if (!cookieToken) {
    return { valid: false, error: 'Missing CSRF token in cookie' };
  }

  // Validate token format (must be valid hex of expected length)
  const expectedLength = CSRF_CONFIG.TOKEN_LENGTH * 2; // hex encoding doubles length
  if (headerToken.length !== expectedLength || !/^[a-f0-9]+$/i.test(headerToken)) {
    return { valid: false, error: 'Invalid CSRF token format' };
  }

  // Tokens must match (double-submit pattern)
  if (headerToken !== cookieToken) {
    return { valid: false, error: 'CSRF token mismatch' };
  }

  // Optionally validate against store if entry exists (for extra security)
  // But don't fail if not in store - this handles server restarts gracefully
  const storedEntry = csrfTokenStore.get(headerToken);
  if (storedEntry && Date.now() > storedEntry.expiresAt) {
    csrfTokenStore.delete(headerToken);
    return { valid: false, error: 'CSRF token expired' };
  }

  return { valid: true };
}

/**
 * Get CSRF cookie header value for setting in response
 *
 * @param token - The CSRF token
 * @param options - Cookie options
 * @returns Cookie header string
 */
export function getCsrfCookieHeader(
  token: string,
  options: { secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' } = {}
): string {
  const { secure = process.env.NODE_ENV === 'production', sameSite = 'strict' } = options;
  const maxAge = Math.floor(CSRF_CONFIG.TOKEN_EXPIRY_MS / 1000);

  const parts = [
    `${CSRF_CONFIG.COOKIE_NAME}=${token}`,
    `Path=/`,
    `Max-Age=${maxAge}`,
    `SameSite=${sameSite.charAt(0).toUpperCase() + sameSite.slice(1)}`,
    'HttpOnly',
  ];

  if (secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

/**
 * CSRF protection middleware helper for API routes
 * Returns error response if CSRF validation fails
 *
 * @param request - The incoming request
 * @returns null if valid, NextResponse if invalid
 */
export function requireCsrfToken(request: Request): NextResponse | null {
  // Skip CSRF validation for safe methods
  const method = request.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return null;
  }

  const validation = validateCsrfToken(request);

  if (!validation.valid) {
    return NextResponse.json(
      {
        success: false,
        message: validation.error || 'CSRF validation failed',
      },
      {
        status: 403,
        headers: getSecurityHeaders(),
      }
    );
  }

  return null;
}

/**
 * Invalidate/revoke a CSRF token
 * Call this after sensitive operations or on logout
 *
 * @param token - Token to invalidate
 */
export function revokeCsrfToken(token: string): void {
  csrfTokenStore.delete(token);
}

/**
 * Password Strength Validator
 *
 * @param password - Password string
 * @returns Validation result with strength score
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else if (password.length >= 8) {
    score += 1;
  }
  if (password.length >= 12) {
    score += 1;
  }

  // Complexity checks
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one lowercase letter');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one uppercase letter');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one number');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one special character');
  }

  // Common password check (basic)
  const commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123'];
  if (commonPasswords.some((common) => password.toLowerCase().includes(common))) {
    score = 0;
    feedback.push('Password is too common');
  }

  return {
    valid: score >= 4 && password.length >= 8,
    score,
    feedback,
  };
}

/**
 * Security Headers Helper
 * Returns recommended security headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

/**
 * Sanitize user input to prevent XSS attacks
 * Removes or escapes dangerous characters and patterns
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Escape HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove javascript: and other dangerous protocols
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Trim whitespace
    .trim();
}

/**
 * Validate and sanitize a slug parameter
 * Only allows alphanumeric characters, hyphens, and underscores
 */
export function sanitizeSlug(slug: string): string {
  if (typeof slug !== 'string') return '';
  return slug.replace(/[^a-zA-Z0-9\-_]/g, '').substring(0, 200);
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, hyphens, parentheses, and plus sign
  const phoneRegex = /^[\d\s\-\(\)\+]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Rate limit check helper for API routes
 * Returns NextResponse if rate limited, null if allowed
 */
export function checkRateLimit(
  request: Request,
  limitConfig: { maxRequests: number; windowMs: number },
  prefix: string = ''
): { allowed: boolean; response?: NextResponse } {
  const ip = getClientIp(request);
  const key = `${prefix}:${ip}`;
  const result = rateLimit(key, limitConfig);

  if (!result.allowed) {
    const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            ...getSecurityHeaders(),
          },
        }
      ),
    };
  }

  return { allowed: true };
}
