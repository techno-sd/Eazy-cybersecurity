import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { query, queryOne } from './db';
import { RowDataPacket } from 'mysql2';

const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SECURITY ERROR: JWT_SECRET environment variable is required in production');
  }
  console.warn('⚠️  SECURITY WARNING: Using fallback JWT_SECRET for development');
  console.warn('⚠️  Set JWT_SECRET in .env.local for proper security');
  console.warn('⚠️  Generate with: openssl rand -base64 32');
}
const JWT_SECRET = JWT_SECRET_ENV || 'dev-secret-change-me';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

export interface User extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string;
  company?: string;
  role: 'admin' | 'user' | 'moderator';
  is_active: boolean;
  is_verified: boolean;
  failed_login_attempts: number;
  last_failed_login?: Date;
  locked_until?: Date;
  last_login?: Date;
  last_login_ip?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Check if account is locked
 */
export function isAccountLocked(user: User): boolean {
  if (user.locked_until) {
    const now = new Date();
    const lockedUntil = new Date(user.locked_until);
    return lockedUntil > now;
  }
  return false;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }
  return { valid: true };
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return await queryOne<User>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  return await queryOne<User>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
}

/**
 * Create new user
 */
export async function createUser(data: {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  company?: string;
}): Promise<number> {
  const passwordHash = await hashPassword(data.password);

  const result = await query<any>(
    `INSERT INTO users (email, password_hash, full_name, phone, company)
     VALUES (?, ?, ?, ?, ?)`,
    [data.email, passwordHash, data.full_name, data.phone || null, data.company || null]
  );

  return result.insertId;
}

/**
 * Update last login
 */
export async function updateLastLogin(userId: number, ipAddress?: string): Promise<void> {
  await query(
    `UPDATE users
     SET last_login = NOW(),
         last_login_ip = ?,
         failed_login_attempts = 0,
         locked_until = NULL
     WHERE id = ?`,
    [ipAddress || null, userId]
  );
}

/**
 * Increment failed login attempts
 */
export async function incrementFailedAttempts(userId: number): Promise<void> {
  const user = await getUserById(userId);
  if (!user) return;

  const attempts = user.failed_login_attempts + 1;
  const shouldLock = attempts >= MAX_LOGIN_ATTEMPTS;

  if (shouldLock) {
    const lockUntil = new Date(Date.now() + LOCK_TIME);
    await query(
      `UPDATE users
       SET failed_login_attempts = ?,
           last_failed_login = NOW(),
           locked_until = ?
       WHERE id = ?`,
      [attempts, lockUntil, userId]
    );
  } else {
    await query(
      `UPDATE users
       SET failed_login_attempts = ?,
           last_failed_login = NOW()
       WHERE id = ?`,
      [attempts, userId]
    );
  }
}

/**
 * Authenticate user
 */
export async function authenticateUser(
  email: string,
  password: string,
  ipAddress?: string
): Promise<{ success: boolean; token?: string; user?: Partial<User>; message?: string }> {
  // Validate email
  if (!isValidEmail(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  // Get user
  const user = await getUserByEmail(email);
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  // Check if account is active
  if (!user.is_active) {
    return { success: false, message: 'Account is disabled. Please contact support.' };
  }

  // Check if account is locked
  if (isAccountLocked(user)) {
    const lockedUntil = new Date(user.locked_until!);
    const minutesLeft = Math.ceil((lockedUntil.getTime() - Date.now()) / 60000);
    return {
      success: false,
      message: `Account is locked due to too many failed attempts. Try again in ${minutesLeft} minutes.`
    };
  }

  // Compare password
  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) {
    await incrementFailedAttempts(user.id);
    const remainingAttempts = MAX_LOGIN_ATTEMPTS - (user.failed_login_attempts + 1);
    if (remainingAttempts > 0) {
      return {
        success: false,
        message: `Invalid email or password. ${remainingAttempts} attempts remaining.`
      };
    } else {
      return {
        success: false,
        message: 'Account has been locked due to too many failed attempts. Please try again in 15 minutes.'
      };
    }
  }

  // Update last login
  await updateLastLogin(user.id, ipAddress);

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  // Return success with token and user info (without password)
  const { password_hash, verification_token, reset_token, ...userWithoutPassword } = user;

  return {
    success: true,
    token,
    user: userWithoutPassword
  };
}

/**
 * Generate cryptographically secure random token
 * Uses crypto.randomBytes for secure token generation
 */
export function generateRandomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Sanitize user data for client
 */
export function sanitizeUser(user: User): Partial<User> {
  const { password_hash, verification_token, reset_token, ...sanitized } = user;
  return sanitized;
}
