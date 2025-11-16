import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET - Get single role by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const roles = await query<any[]>(
      'SELECT * FROM roles WHERE id = ?',
      [id]
    );

    if (roles.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: roles[0],
    });

  } catch (error: any) {
    console.error('Error fetching role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update role
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    // Get user from database - only admins can update roles
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
    const { name, description, menu_access, is_active } = body;

    // Check if role exists
    const existingRoles = await query<any[]>(
      'SELECT id FROM roles WHERE id = ?',
      [id]
    );

    if (existingRoles.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    // If name is being changed, check if new name already exists
    if (name) {
      const duplicateRoles = await query<any[]>(
        'SELECT id FROM roles WHERE name = ? AND id != ?',
        [name, id]
      );

      if (duplicateRoles.length > 0) {
        return NextResponse.json(
          { success: false, message: 'Role name already exists' },
          { status: 409 }
        );
      }
    }

    // Build update query
    const updates: string[] = [];
    const values: any[] = [];

    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (menu_access !== undefined) {
      updates.push('menu_access = ?');
      values.push(JSON.stringify(menu_access));
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(id);

    await query(
      `UPDATE roles SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    // Get updated role
    const updatedRoles = await query<any[]>(
      'SELECT * FROM roles WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Role updated successfully',
      data: updatedRoles[0],
    });

  } catch (error: any) {
    console.error('Error updating role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete role
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    // Get user from database - only admins can delete roles
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

    // Check if role exists
    const existingRoles = await query<any[]>(
      'SELECT id, name FROM roles WHERE id = ?',
      [id]
    );

    if (existingRoles.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Role not found' },
        { status: 404 }
      );
    }

    // Prevent deletion of system roles
    const systemRoles = ['admin', 'moderator'];
    if (systemRoles.includes(existingRoles[0].name)) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete system roles' },
        { status: 403 }
      );
    }

    // Check if role is assigned to any users
    const assignedUsers = await query<any[]>(
      'SELECT COUNT(*) as count FROM user_roles WHERE role_id = ?',
      [id]
    );

    if (assignedUsers[0].count > 0) {
      return NextResponse.json(
        { success: false, message: `Cannot delete role. It is assigned to ${assignedUsers[0].count} user(s)` },
        { status: 409 }
      );
    }

    // Delete role
    await query('DELETE FROM roles WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Role deleted successfully',
    });

  } catch (error: any) {
    console.error('Error deleting role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
