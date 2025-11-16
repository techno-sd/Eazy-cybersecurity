import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import ConsultationsList from "@/components/Admin/ConsultationsList";

export const dynamic = 'force-dynamic';

export default async function ConsultationsPage() {
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

  if (users.length === 0 || (users[0].role !== "admin" && users[0].role !== "moderator")) {
    redirect("/");
  }

  const user = users[0];

  // Parse menu_access if it exists
  if (user.menu_access && typeof user.menu_access === 'string') {
    user.menu_access = JSON.parse(user.menu_access);
  }

  // Get consultations
  const consultations = await query<any[]>(`
    SELECT
      c.*
    FROM consultations c
    ORDER BY
      CASE c.status
        WHEN 'pending' THEN 1
        WHEN 'scheduled' THEN 2
        WHEN 'completed' THEN 3
        WHEN 'cancelled' THEN 4
      END,
      c.created_at DESC
  `);

  return (
    <AdminLayout user={user}>
      <ConsultationsList consultations={consultations} />
    </AdminLayout>
  );
}
