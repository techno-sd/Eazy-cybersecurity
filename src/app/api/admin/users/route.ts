import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { isValidPassword } from '@/lib/auth';
import { sanitizeInput, isValidEmail, getSecurityHeaders } from '@/lib/security';

// GET - Get all users
export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const roleFilter = searchParams.get('role') || '';
    const statusFilter = searchParams.get('status') || '';
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { full_name: { contains: search } },
        { company: { contains: search } },
      ];
    }

    if (roleFilter) {
      where.role = roleFilter;
    }

    if (statusFilter) {
      where.is_active = statusFilter === 'active';
    }

    // Get total count and users in parallel
    const [total, users] = await Promise.all([
      prisma.users.count({ where }),
      prisma.users.findMany({
        where,
        select: {
          id: true,
          email: true,
          full_name: true,
          phone: true,
          company: true,
          role: true,
          is_active: true,
          last_login: true,
          created_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
        skip: offset,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  try {
    const body = await request.json();
    const { email, full_name, password, phone, company, role, is_active } = body;

    // Validate required fields
    if (!email || !full_name || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Email, full name, password, and role are required' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedFullName = sanitizeInput(full_name);
    const sanitizedPhone = phone ? sanitizeInput(phone) : null;
    const sanitizedCompany = company ? sanitizeInput(company) : null;

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Validate role
    const validRoles = ['admin', 'moderator', 'user'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role. Must be admin, moderator, or user' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Check if user with email already exists
    const existingUser = await prisma.users.findFirst({
      where: { email: sanitizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409, headers: getSecurityHeaders() }
      );
    }

    // Hash password with stronger salt rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with sanitized data
    const newUser = await prisma.users.create({
      data: {
        email: sanitizedEmail,
        full_name: sanitizedFullName,
        password_hash: hashedPassword,
        phone: sanitizedPhone,
        company: sanitizedCompany,
        role: role as 'admin' | 'moderator' | 'user',
        is_active: is_active !== undefined ? is_active : true,
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        phone: true,
        company: true,
        role: true,
        is_active: true,
        created_at: true,
      },
    });

    // Log activity
    await logActivity(
      admin.id,
      'create_user',
      'users',
      newUser.id,
      `Created user ${newUser.email}`
    );

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    }, { headers: getSecurityHeaders() });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
