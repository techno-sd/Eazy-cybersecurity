import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import UsersList from "@/components/Admin/UsersList";

export const dynamic = 'force-dynamic';

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
}
