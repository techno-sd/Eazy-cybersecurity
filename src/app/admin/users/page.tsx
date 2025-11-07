import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

  // Get user from database with Prisma
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

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout user={{
      full_name: user.full_name,
      email: user.email,
      role: user.role || 'admin'
    }}>
      <UsersList />
    </AdminLayout>
  );
}
