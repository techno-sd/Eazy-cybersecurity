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

  // Get user from database
  const users = await query<any[]>(
    "SELECT id, email, full_name, role, is_active FROM users WHERE id = ? AND is_active = true",
    [decoded.userId]
  );

  if (users.length === 0 || (users[0].role !== "admin" && users[0].role !== "moderator")) {
    redirect("/");
  }

  const user = users[0];

  // Get consultations
  const consultations = await query<any[]>(`
    SELECT
      c.*,
      u.full_name as assigned_to_name
    FROM consultations c
    LEFT JOIN users u ON c.assigned_to = u.id
    ORDER BY
      CASE c.priority
        WHEN 'urgent' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
      END,
      c.created_at DESC
  `);

  return (
    <AdminLayout user={user}>
      <ConsultationsList consultations={consultations} />
    </AdminLayout>
  );
}
