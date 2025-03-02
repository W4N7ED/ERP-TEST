
import { Permission } from './types';

export const usePermissionChecks = (
  currentUser: { permissions: Permission[], isAuthenticated?: boolean }
) => {
  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    // Si l'utilisateur n'est pas authentifié, il n'a aucune permission
    if (!currentUser.isAuthenticated) return false;
    return currentUser.permissions.includes(permission);
  };

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    // Si l'utilisateur n'est pas authentifié, il n'a aucune permission
    if (!currentUser.isAuthenticated) return false;
    return permissions.every(permission => 
      currentUser.permissions.includes(permission)
    );
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    // Si l'utilisateur n'est pas authentifié, il n'a aucune permission
    if (!currentUser.isAuthenticated) return false;
    return permissions.some(permission => 
      currentUser.permissions.includes(permission)
    );
  };

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission
  };
};
