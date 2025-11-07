import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import BlogPostsList from "@/components/Admin/BlogPostsList";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
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

  // Get all blog posts with author information
  const blogPosts = await query<any[]>(
    `SELECT
      bp.id,
      bp.title,
      bp.title_ar,
      bp.slug,
      bp.category,
      bp.status,
      bp.views,
      bp.published_at,
      bp.created_at,
      u.full_name as author_name
    FROM blog_posts bp
    LEFT JOIN users u ON bp.author_id = u.id
    ORDER BY bp.created_at DESC`
  );

  return (
    <AdminLayout user={user}>
      <BlogPostsList posts={blogPosts} user={user} />
    </AdminLayout>
  );
}
