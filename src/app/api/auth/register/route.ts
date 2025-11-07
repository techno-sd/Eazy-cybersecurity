import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, isValidPassword, isValidEmail, createUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
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
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to register user',
        error: error.message
      },
      { status: 500 }
    );
  }
}
