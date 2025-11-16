import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
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

  // Execute stat queries sequentially to avoid connection pool exhaustion
  const blogStats = await query<any[]>("SELECT COUNT(*) as total FROM blog_posts");
  const consultationStats = await query<any[]>("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count FROM consultations");
  const userStats = await query<any[]>("SELECT COUNT(*) as total FROM users");

  // Get recent items in parallel (only 2 connections needed)
  const [
    recentConsultations,
    recentPosts
  ] = await Promise.all([
    query<any[]>("SELECT id, company_name as name, email, service_type, status, created_at FROM consultations ORDER BY created_at DESC LIMIT 5"),
    query<any[]>("SELECT id, title, title_ar, status, views, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5")
  ]);

  const stats = {
    blog: blogStats[0]?.total || 0,
    consultations: consultationStats[0]?.total || 0,
    newConsultations: consultationStats[0]?.new_count || 0,
    contacts: 0,
    users: userStats[0]?.total || 0,
  };

  return (
    <AdminLayout user={user}>
      <AdminDashboard
        stats={stats}
        recentConsultations={recentConsultations}
        recentPosts={recentPosts}
        user={user}
      />
    </AdminLayout>
  );
}
