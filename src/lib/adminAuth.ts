import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';
import { query } from './db';
import { requireCsrfToken, getSecurityHeaders } from './security';

export interface AdminUser {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'moderator';
}

/**
 * Verify admin authentication from JWT token
 */
export async function verifyAdminAuth(request: NextRequest): Promise<{
  authenticated: boolean;
  user?: AdminUser;
  error?: string
}> {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return { authenticated: false, error: 'No authentication token' };
    }

    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded) {
      return { authenticated: false, error: 'Invalid token' };
    }

    // Get user from database
    const users = await query<any[]>(
      'SELECT id, email, full_name, role, is_active FROM users WHERE id = ? AND is_active = true',
      [decoded.userId]
    );

    if (users.length === 0) {
      return { authenticated: false, error: 'User not found' };
    }

    const user = users[0];

    // Check if user is admin or moderator
    if (user.role !== 'admin' && user.role !== 'moderator') {
      return { authenticated: false, error: 'Insufficient permissions' };
    }

    return {
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    };
  } catch (error) {
    return { authenticated: false, error: 'Authentication failed' };
  }
}

/**
 * Middleware to protect admin routes
 */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | { id: number; email: string; full_name: string; role: string }> {
  const auth = await verifyAdminAuth(request);

  if (!auth.authenticated || !auth.user) {
    return NextResponse.json(
      {
        success: false,
        message: auth.error || 'Unauthorized',
      },
      { status: 401 }
    );
  }

  return auth.user;
}

/**
 * Log admin activity
 */
export async function logActivity(
  userId: number,
  action: string,
  entityType?: string,
  entityId?: number,
  description?: string,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    await query(
      `INSERT INTO activity_logs
       (user_id, action, entity_type, entity_id, description, ip_address, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [userId, action, entityType || null, entityId || null, description || null, ipAddress || null, userAgent || null]
    );
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

/**
 * Combined middleware for admin routes with CSRF protection
 * Validates both authentication and CSRF token for state-changing requests
 *
 * @param request - The incoming request
 * @param options - Configuration options
 * @returns Admin user object if authorized, or NextResponse error
 */
export async function requireAdminWithCsrf(
  request: NextRequest,
  options: { skipCsrf?: boolean } = {}
): Promise<NextResponse | AdminUser> {
  // First validate CSRF token for non-safe methods
  if (!options.skipCsrf) {
    const csrfError = requireCsrfToken(request);
    if (csrfError) {
      return csrfError;
    }
  }

  // Then validate admin authentication
  const auth = await verifyAdminAuth(request);

  if (!auth.authenticated || !auth.user) {
    return NextResponse.json(
      {
        success: false,
        message: auth.error || 'Unauthorized',
      },
      { status: 401, headers: getSecurityHeaders() }
    );
  }

  return auth.user;
}

/**
 * Helper type guard to check if result is an error response
 */
export function isErrorResponse(
  result: NextResponse | AdminUser
): result is NextResponse {
  return result instanceof NextResponse;
}
