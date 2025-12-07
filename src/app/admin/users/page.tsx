import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import UsersList from "@/components/Admin/UsersList";

export const dynamic = 'force-dynamic';

// Error component for database connection issues
function DatabaseError({ message }: { message: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔌</div>
        <h1 style={{ margin: '0 0 16px', color: '#1e293b', fontSize: '24px' }}>
          Database Connection Error
        </h1>
        <p style={{ margin: '0 0 24px', color: '#64748b', lineHeight: '1.6' }}>
          Unable to connect to the database. Please check if the database server is running and accessible.
        </p>
        <details style={{ textAlign: 'left', background: '#f1f5f9', borderRadius: '8px', padding: '12px' }}>
          <summary style={{ cursor: 'pointer', color: '#475569', fontWeight: '500' }}>
            Technical Details
          </summary>
          <pre style={{ margin: '12px 0 0', fontSize: '12px', color: '#64748b', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {message}
          </pre>
        </details>
      </div>
    </div>
  );
}

export default async function UsersPage() {
  // Check authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    redirect("/sign-in");
  }

  try {
    // Get user from database with Prisma and role permissions
    const user = await prisma.users.findFirst({
      where: {
        id: decoded.userId,
        is_active: true,
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        is_active: true,
      },
    });

    // Get role menu_access
    let menu_access = null;
    if (user) {
      const roleData = await query<any[]>(
        'SELECT menu_access FROM roles WHERE name = ?',
        [user.role]
      );

      if (roleData.length > 0 && roleData[0].menu_access) {
        menu_access = typeof roleData[0].menu_access === 'string'
          ? JSON.parse(roleData[0].menu_access)
          : roleData[0].menu_access;
      }
    }

    if (!user || user.role !== "admin") {
      redirect("/");
    }

    return (
      <AdminLayout user={{
        full_name: user.full_name,
        email: user.email,
        role: user.role || 'admin',
        menu_access: menu_access || undefined,
      }}>
        <UsersList />
      </AdminLayout>
    );
  } catch (error) {
    console.error('Database connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    return <DatabaseError message={errorMessage} />;
  }
}
