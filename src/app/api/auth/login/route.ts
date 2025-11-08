import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import { rateLimit, getClientIp, RATE_LIMITS, getSecurityHeaders } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const clientIp = getClientIp(request);

    // Apply rate limiting
    const limit = rateLimit(clientIp, RATE_LIMITS.AUTH_LOGIN);

    if (!limit.allowed) {
      const retryAfter = Math.ceil((limit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          message: 'Too many login attempts. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(RATE_LIMITS.AUTH_LOGIN.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(limit.resetTime / 1000)),
            ...getSecurityHeaders()
          }
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and password are required'
        },
        {
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Get IP address for authentication logging
    const ipAddress = clientIp;

    // Authenticate user
    const result = await authenticateUser(email, password, ipAddress);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message
        },
        {
          status: 401,
          headers: getSecurityHeaders()
        }
      );
    }

    // Set JWT token in httpOnly cookie for security
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: result.user
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMITS.AUTH_LOGIN.maxRequests),
          'X-RateLimit-Remaining': String(limit.remaining),
          'X-RateLimit-Reset': String(Math.floor(limit.resetTime / 1000)),
          ...getSecurityHeaders()
        }
      }
    );

    // Set secure httpOnly cookie
    response.cookies.set('auth_token', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to login',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      {
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}
