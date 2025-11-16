import { Role, RolePermissions, PermissionAction, PermissionResource } from '@/types/roles';

/**
 * Check if a user has permission for a specific action on a resource
 * @param userRoles - Array of roles assigned to the user
 * @param resource - The resource to check (e.g., 'blog', 'users')
 * @param action - The action to check (e.g., 'view', 'edit', 'delete')
 * @returns boolean - true if user has permission, false otherwise
 */
export function hasPermission(
  userRoles: Role[] | null | undefined,
  resource: PermissionResource,
  action: PermissionAction
): boolean {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  // Check if any of the user's roles grant the permission
  return userRoles.some(role => {
    if (!role.is_active) return false;

    const resourcePermissions = role.permissions[resource];
    if (!resourcePermissions) return false;

    return resourcePermissions[action] === true;
  });
}

/**
 * Check if user has any of the specified permissions
 * @param userRoles - Array of roles assigned to the user
 * @param permissions - Array of [resource, action] tuples to check
 * @returns boolean - true if user has at least one permission
 */
export function hasAnyPermission(
  userRoles: Role[] | null | undefined,
  permissions: Array<[PermissionResource, PermissionAction]>
): boolean {
  return permissions.some(([resource, action]) =>
    hasPermission(userRoles, resource, action)
  );
}

/**
 * Check if user has all specified permissions
 * @param userRoles - Array of roles assigned to the user
 * @param permissions - Array of [resource, action] tuples to check
 * @returns boolean - true if user has all permissions
 */
export function hasAllPermissions(
  userRoles: Role[] | null | undefined,
  permissions: Array<[PermissionResource, PermissionAction]>
): boolean {
  return permissions.every(([resource, action]) =>
    hasPermission(userRoles, resource, action)
  );
}

/**
 * Get all permissions for a user across all their roles
 * @param userRoles - Array of roles assigned to the user
 * @returns Merged permissions object
 */
export function getUserPermissions(userRoles: Role[] | null | undefined): RolePermissions | null {
  if (!userRoles || userRoles.length === 0) {
    return null;
  }

  // Initialize empty permissions
  const mergedPermissions: RolePermissions = {
    dashboard: {},
    blog: {},
    consultations: {},
    contacts: {},
    users: {},
    settings: {},
    analytics: {},
  };

  // Merge permissions from all active roles (OR logic - if any role grants permission, user has it)
  userRoles.forEach(role => {
    if (!role.is_active) return;

    Object.keys(role.permissions).forEach(resource => {
      const resourceKey = resource as PermissionResource;
      const resourcePerms = role.permissions[resourceKey];

      Object.keys(resourcePerms).forEach(action => {
        const actionKey = action as PermissionAction;
        if (resourcePerms[actionKey] === true) {
          mergedPermissions[resourceKey][actionKey] = true;
        }
      });
    });
  });

  return mergedPermissions;
}

/**
 * Check if user can access admin panel at all
 * @param userRoles - Array of roles assigned to the user
 * @returns boolean - true if user has any admin access
 */
export function canAccessAdmin(userRoles: Role[] | null | undefined): boolean {
  return hasPermission(userRoles, 'dashboard', 'view');
}

/**
 * Get accessible menu items for user based on permissions
 * @param userRoles - Array of roles assigned to the user
 * @returns Array of menu item keys that user can access
 */
export function getAccessibleMenuItems(userRoles: Role[] | null | undefined): PermissionResource[] {
  if (!userRoles || userRoles.length === 0) {
    return [];
  }

  const resources: PermissionResource[] = [
    'dashboard',
    'blog',
    'consultations',
    'contacts',
    'users',
    'settings',
    'analytics'
  ];

  return resources.filter(resource => hasPermission(userRoles, resource, 'view'));
}
