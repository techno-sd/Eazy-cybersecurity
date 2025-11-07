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

  // Get user from database
  const users = await query<any[]>(
    "SELECT id, email, full_name, role, is_active FROM users WHERE id = ? AND is_active = true",
    [decoded.userId]
  );

  if (users.length === 0 || (users[0].role !== "admin" && users[0].role !== "moderator")) {
    redirect("/");
  }

  const user = users[0];

  // Get dashboard stats
  const [blogStats] = await query<any[]>("SELECT COUNT(*) as total FROM blog_posts");
  const [consultationStats] = await query<any[]>("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count FROM consultations");
  const [contactStats] = await query<any[]>("SELECT COUNT(*) as total FROM contacts");
  const [userStats] = await query<any[]>("SELECT COUNT(*) as total FROM users");

  // Get recent consultations
  const recentConsultations = await query<any[]>(
    "SELECT id, name, email, service_type, status, created_at FROM consultations ORDER BY created_at DESC LIMIT 5"
  );

  // Get recent blog posts
  const recentPosts = await query<any[]>(
    "SELECT id, title, status, views, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5"
  );

  const stats = {
    blog: blogStats.total || 0,
    consultations: consultationStats.total || 0,
    newConsultations: consultationStats.new_count || 0,
    contacts: contactStats.total || 0,
    users: userStats.total || 0,
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
