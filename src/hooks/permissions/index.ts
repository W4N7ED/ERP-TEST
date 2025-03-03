
import { Permission } from './types';
import { useAuth } from './useAuth';
import { usePermissionChecks } from './usePermissionChecks';
import { useUserManagement } from './useUserManagement';
import { useRoleManagement } from './useRoleManagement';
import { availablePermissions } from './availablePermissions';

export const usePermissions = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    allUsers, 
    setAllUsers, 
    loginUser, 
    logoutUser, 
    switchUser,
    addUser 
  } = useAuth();

  const { 
    hasPermission, 
    hasAllPermissions, 
    hasAnyPermission 
  } = usePermissionChecks(currentUser);

  const { 
    removeUser, 
    updateUser 
  } = useUserManagement(allUsers, setAllUsers, currentUser, setCurrentUser);

  const { 
    allRoles, 
    updateRoles, 
    getRolePermissions, 
    updateRolePermissions 
  } = useRoleManagement(allUsers, setAllUsers, currentUser, setCurrentUser);

  return {
    currentUser,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    switchUser,
    loginUser,
    logoutUser,
    availableUsers: allUsers,
    availableRoles: allRoles,
    availablePermissions,
    updateRoles,
    getRolePermissions,
    updateRolePermissions,
    addUser,
    removeUser,
    updateUser
  };
};

// Re-export types for convenience
export type { Permission, User, UserRole } from './types';
