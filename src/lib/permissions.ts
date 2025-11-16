import { Role, MenuPermissions, AdminMenuKey } from '@/types/roles';

/**
 * Check if a user has access to a specific menu
 * @param userRole - User's role object with menu_access
 * @param menuKey - The menu to check (e.g., 'blog', 'users')
 * @returns boolean - true if user has access to the menu
 */
export function hasMenuAccess(
  userRole: { menu_access?: MenuPermissions } | null | undefined,
  menuKey: AdminMenuKey
): boolean {
  if (!userRole || !userRole.menu_access) {
    return false;
  }

  return userRole.menu_access[menuKey] === true;
}

/**
 * Check if user can access admin panel at all
 * @param userRole - User's role object with menu_access
 * @returns boolean - true if user has any admin access
 */
export function canAccessAdmin(userRole: { menu_access?: MenuPermissions } | null | undefined): boolean {
  return hasMenuAccess(userRole, 'dashboard');
}

/**
 * Get accessible menu items for user based on menu permissions
 * @param userRole - User's role object with menu_access
 * @returns Array of menu item keys that user can access
 */
export function getAccessibleMenuItems(userRole: { menu_access?: MenuPermissions } | null | undefined): AdminMenuKey[] {
  if (!userRole || !userRole.menu_access) {
    return [];
  }

  const menuKeys: AdminMenuKey[] = [
    'dashboard',
    'blog',
    'consultations',
    'users',
    'roles'
  ];

  return menuKeys.filter(menuKey => userRole.menu_access![menuKey] === true);
}

/**
 * Get all menu permissions for a user
 * @param userRole - User's role object with menu_access
 * @returns Menu permissions object
 */
export function getUserMenuAccess(userRole: { menu_access?: MenuPermissions } | null | undefined): MenuPermissions | null {
  if (!userRole || !userRole.menu_access) {
    return null;
  }

  return userRole.menu_access;
}
