import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import BlogPostEditor from "@/components/Admin/BlogPostEditor";

export const dynamic = 'force-dynamic';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

  // Get blog post
  const postId = parseInt(id);

  if (isNaN(postId)) {
    redirect("/admin/blog");
  }

  const posts = await query<any[]>(
    `SELECT
      bp.*,
      u.full_name as author_name
     FROM blog_posts bp
     LEFT JOIN users u ON bp.author_id = u.id
     WHERE bp.id = ?`,
    [postId]
  );

  if (posts.length === 0) {
    redirect("/admin/blog");
  }

  const post = posts[0];

  // Parse tags if they exist
  if (post.tags && typeof post.tags === 'string') {
    try {
      post.tags = JSON.parse(post.tags);
    } catch (e) {
      post.tags = [];
    }
  }

  return (
    <AdminLayout user={user}>
      <BlogPostEditor user={user} post={post} />
    </AdminLayout>
  );
}
