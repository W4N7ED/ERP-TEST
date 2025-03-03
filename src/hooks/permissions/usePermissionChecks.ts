
import { Permission } from './types';
import { 
  checkPermission, 
  checkAllPermissions, 
  checkAnyPermission 
} from './utils/permissionCheckUtils';

export const usePermissionChecks = (
  currentUser: { permissions: Permission[], isAuthenticated?: boolean }
) => {
  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    return checkPermission(currentUser.permissions, currentUser.isAuthenticated, permission);
  };

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return checkAllPermissions(currentUser.permissions, currentUser.isAuthenticated, permissions);
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return checkAnyPermission(currentUser.permissions, currentUser.isAuthenticated, permissions);
  };

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission
  };
};
