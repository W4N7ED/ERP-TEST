
import { Permission } from '../types';

/**
 * Checks if the user has a specific permission
 */
export const checkPermission = (
  userPermissions: Permission[],
  isAuthenticated: boolean | undefined,
  permission: Permission
): boolean => {
  // If the user isn't authenticated, they have no permissions
  if (!isAuthenticated) return false;
  return userPermissions.includes(permission);
};

/**
 * Checks if the user has all of the specified permissions
 */
export const checkAllPermissions = (
  userPermissions: Permission[],
  isAuthenticated: boolean | undefined,
  permissions: Permission[]
): boolean => {
  // If the user isn't authenticated, they have no permissions
  if (!isAuthenticated) return false;
  return permissions.every(permission => userPermissions.includes(permission));
};

/**
 * Checks if the user has any of the specified permissions
 */
export const checkAnyPermission = (
  userPermissions: Permission[],
  isAuthenticated: boolean | undefined,
  permissions: Permission[]
): boolean => {
  // If the user isn't authenticated, they have no permissions
  if (!isAuthenticated) return false;
  return permissions.some(permission => userPermissions.includes(permission));
};
