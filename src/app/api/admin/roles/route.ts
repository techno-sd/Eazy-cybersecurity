import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';
import { Role } from '@/types/roles';

export const dynamic = 'force-dynamic';

// GET - Get all roles
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user from database
    const users = await query<any[]>(
      'SELECT id, role FROM users WHERE id = ? AND is_active = true',
      [decoded.userId]
    );

    if (users.length === 0 || (users[0].role !== 'admin' && users[0].role !== 'moderator')) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }

    // Get all roles
    const roles = await query<Role[]>('SELECT * FROM roles ORDER BY name ASC');

    return NextResponse.json({
      success: true,
      data: roles,
    });

  } catch (error: any) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new role
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user from database - only admins can create roles
    const users = await query<any[]>(
      'SELECT id, role FROM users WHERE id = ? AND is_active = true',
      [decoded.userId]
    );

    if (users.length === 0 || users[0].role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, menu_access } = body;

    // Validate input
    if (!name || !description || !menu_access) {
      return NextResponse.json(
        { success: false, message: 'Name, description, and menu_access are required' },
        { status: 400 }
      );
    }

    // Check if role name already exists
    const existingRoles = await query<any[]>(
      'SELECT id FROM roles WHERE name = ?',
      [name]
    );

    if (existingRoles.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Role name already exists' },
        { status: 409 }
      );
    }

    // Create new role
    const result = await query<any>(
      'INSERT INTO roles (name, description, menu_access) VALUES (?, ?, ?)',
      [name, description, JSON.stringify(menu_access)]
    );

    return NextResponse.json({
      success: true,
      message: 'Role created successfully',
      data: {
        id: result.insertId,
        name,
        description,
        menu_access,
      },
    });

  } catch (error: any) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
