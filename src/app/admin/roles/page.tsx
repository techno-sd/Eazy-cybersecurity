import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import RolesManagement from "@/components/Admin/RolesManagement";

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
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

  // Get user from database with role permissions
  const users = await query<any[]>(
    `SELECT u.id, u.email, u.full_name, u.role, u.is_active, r.menu_access
     FROM users u
     LEFT JOIN roles r ON u.role COLLATE utf8mb4_unicode_ci = r.name COLLATE utf8mb4_unicode_ci
     WHERE u.id = ? AND u.is_active = true`,
    [decoded.userId]
  );

  if (users.length === 0 || users[0].role !== "admin") {
    redirect("/");
  }

  const user = users[0];

  // Parse menu_access if it exists
  if (user.menu_access && typeof user.menu_access === 'string') {
    user.menu_access = JSON.parse(user.menu_access);
  }

  // Check language preference
  const lang = cookieStore.get("lang")?.value || cookieStore.get("NEXT_LOCALE")?.value || 'en';
  const isArabic = lang === 'ar';

  return (
    <AdminLayout user={user}>
      <RolesManagement isArabic={isArabic} />
    </AdminLayout>
  );
}
