import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// POST - Run database migrations
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

    // Get user from database - only admins can run migrations
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

    // Read and execute migration file
    const migrationPath = path.join(process.cwd(), 'src', 'db', 'migrations', 'add_roles_permissions.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Split by semicolons and execute each statement
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    const results = [];
    for (const statement of statements) {
      try {
        await query(statement);
        results.push({ statement: statement.substring(0, 50) + '...', success: true });
      } catch (error: any) {
        // Ignore "already exists" errors
        if (error.message?.includes('already exists')) {
          results.push({ statement: statement.substring(0, 50) + '...', success: true, note: 'Already exists' });
        } else {
          results.push({ statement: statement.substring(0, 50) + '...', success: false, error: error.message });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migration executed',
      results,
    });

  } catch (error: any) {
    console.error('Error running migration:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
