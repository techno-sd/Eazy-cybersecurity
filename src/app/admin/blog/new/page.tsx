import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import AdminLayout from "@/components/Admin/AdminLayout";
import BlogPostEditor from "@/components/Admin/BlogPostEditor";

export const dynamic = 'force-dynamic';

export default async function NewBlogPostPage() {
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

  return (
    <AdminLayout user={user}>
      <BlogPostEditor user={user} />
    </AdminLayout>
  );
}
