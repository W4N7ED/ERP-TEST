
import { Permission } from './types';
import { 
  checkPermission, 
  checkAllPermissions, 
  checkAnyPermission 
} from './utils/permissionCheckUtils';

export const usePermissionChecks = (
  currentUser: { permissions: Permission[], isAuthenticated?: boolean, role?: string }
) => {
  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    // Admin role always has all permissions
    if (currentUser.role === "Administrateur") {
      return true;
    }
    return checkPermission(currentUser.permissions, currentUser.isAuthenticated, permission);
  };

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    // Admin role always has all permissions
    if (currentUser.role === "Administrateur") {
      return true;
    }
    return checkAllPermissions(currentUser.permissions, currentUser.isAuthenticated, permissions);
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    // Admin role always has all permissions
    if (currentUser.role === "Administrateur") {
      return true;
    }
    return checkAnyPermission(currentUser.permissions, currentUser.isAuthenticated, permissions);
  };

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission
  };
};
