// Types for Role-Based Access Control (RBAC)
// Simplified menu-based permissions

export interface MenuPermissions {
  [menuKey: string]: boolean; // Dynamic menu access control
}

export interface Role {
  id: number;
  name: string;
  description: string;
  menu_access: MenuPermissions; // Which menus this role can access
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: number;
  user_id: number;
  role_id: number;
  assigned_at: string;
  assigned_by: number | null;
}

export interface UserWithRoles {
  id: number;
  email: string;
  full_name: string;
  role: string; // Legacy role field
  is_active: boolean;
  roles?: Role[]; // New roles array
}

// Available admin menu items (can be extended dynamically)
export const ADMIN_MENUS = {
  dashboard: 'dashboard',
  blog: 'blog',
  consultations: 'consultations',
  users: 'users',
  roles: 'roles',
} as const;

export type AdminMenuKey = keyof typeof ADMIN_MENUS;
