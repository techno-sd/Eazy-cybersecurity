import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET - Get user's roles
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;

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

    // Get user roles
    const userRoles = await query<any[]>(
      `SELECT r.*, ur.assigned_at, ur.assigned_by
       FROM roles r
       INNER JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = ?
       ORDER BY ur.assigned_at DESC`,
      [id]
    );

    return NextResponse.json({
      success: true,
      data: userRoles,
    });

  } catch (error: any) {
    console.error('Error fetching user roles:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Assign role to user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;

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

    // Get current user from database - only admins can assign roles
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
    const { role_id } = body;

    if (!role_id) {
      return NextResponse.json(
        { success: false, message: 'role_id is required' },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUsers = await query<any[]>(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (targetUsers.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if role exists and is active
    const roles = await query<any[]>(
      'SELECT id, name FROM roles WHERE id = ? AND is_active = true',
      [role_id]
    );

    if (roles.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Role not found or inactive' },
        { status: 404 }
      );
    }

    // Check if user already has this role
    const existingAssignments = await query<any[]>(
      'SELECT id FROM user_roles WHERE user_id = ? AND role_id = ?',
      [id, role_id]
    );

    if (existingAssignments.length > 0) {
      return NextResponse.json(
        { success: false, message: 'User already has this role' },
        { status: 409 }
      );
    }

    // Assign role to user
    await query(
      'INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES (?, ?, ?)',
      [id, role_id, decoded.userId]
    );

    return NextResponse.json({
      success: true,
      message: 'Role assigned successfully',
    });

  } catch (error: any) {
    console.error('Error assigning role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove role from user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;

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

    // Get current user from database - only admins can remove roles
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

    const { searchParams } = new URL(request.url);
    const role_id = searchParams.get('role_id');

    if (!role_id) {
      return NextResponse.json(
        { success: false, message: 'role_id query parameter is required' },
        { status: 400 }
      );
    }

    // Check if assignment exists
    const existingAssignments = await query<any[]>(
      'SELECT id FROM user_roles WHERE user_id = ? AND role_id = ?',
      [id, role_id]
    );

    if (existingAssignments.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Role assignment not found' },
        { status: 404 }
      );
    }

    // Remove role from user
    await query(
      'DELETE FROM user_roles WHERE user_id = ? AND role_id = ?',
      [id, role_id]
    );

    return NextResponse.json({
      success: true,
      message: 'Role removed successfully',
    });

  } catch (error: any) {
    console.error('Error removing role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
