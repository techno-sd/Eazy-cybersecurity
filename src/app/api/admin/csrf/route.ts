/**
 * CSRF Token API Endpoint
 *
 * GET /api/admin/csrf - Get a new CSRF token
 *
 * This endpoint generates a new CSRF token and sets it in a secure cookie.
 * The frontend should call this endpoint on page load and include the
 * returned token in the x-csrf-token header for all state-changing requests.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import {
  createCsrfToken,
  getCsrfCookieHeader,
  getSecurityHeaders,
  CSRF_CONFIG,
} from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated admin
    const user = await requireAdmin(request);
    if (user instanceof NextResponse) return user;

    // Generate new CSRF token associated with user
    const token = createCsrfToken(String(user.id));

    // Create response with token
    const response = NextResponse.json(
      {
        success: true,
        token,
        expiresIn: CSRF_CONFIG.TOKEN_EXPIRY_MS,
      },
      { headers: getSecurityHeaders() }
    );

    // Set CSRF token in cookie
    response.headers.set('Set-Cookie', getCsrfCookieHeader(token));

    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate CSRF token' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
