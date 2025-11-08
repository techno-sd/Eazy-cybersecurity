import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, isValidPassword, isValidEmail, createUser } from '@/lib/auth';
import { rateLimit, getClientIp, RATE_LIMITS, getSecurityHeaders } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const clientIp = getClientIp(request);

    // Apply rate limiting
    const limit = rateLimit(clientIp, RATE_LIMITS.AUTH_REGISTER);

    if (!limit.allowed) {
      const retryAfter = Math.ceil((limit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          message: 'Too many registration attempts. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(RATE_LIMITS.AUTH_REGISTER.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(limit.resetTime / 1000)),
            ...getSecurityHeaders()
          }
        }
      );
    }

    const body = await request.json();
    const { email, password, full_name, phone, company } = body;

    // Validate required fields
    if (!email || !password || !full_name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email, password, and full name are required'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format'
        },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: passwordValidation.message
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await query<any[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists'
        },
        { status: 409 }
      );
    }

    // Create new user
    const user = await createUser({
      email,
      password,
      full_name,
      phone: phone || null,
      company: company || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        data: user
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMITS.AUTH_REGISTER.maxRequests),
          'X-RateLimit-Remaining': String(limit.remaining),
          'X-RateLimit-Reset': String(Math.floor(limit.resetTime / 1000)),
          ...getSecurityHeaders()
        }
      }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to register user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      {
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}
