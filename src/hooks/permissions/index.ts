
import { Permission } from './types';
import { useAuth } from './useAuth';
import { usePermissionChecks } from './usePermissionChecks';
import { useUserManagement } from './useUserManagement';
import { useRoleManagement } from './useRoleManagement';

export const usePermissions = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    allUsers, 
    setAllUsers, 
    loginUser, 
    logoutUser, 
    switchUser 
  } = useAuth();

  const { 
    hasPermission, 
    hasAllPermissions, 
    hasAnyPermission 
  } = usePermissionChecks(currentUser);

  const { 
    addUser, 
    removeUser, 
    updateUser 
  } = useUserManagement(allUsers, setAllUsers, currentUser, setCurrentUser);

  const { 
    allRoles, 
    updateRoles, 
    getRolePermissions, 
    updateRolePermissions 
  } = useRoleManagement(allUsers, setAllUsers, currentUser, setCurrentUser);

  // Liste complète des permissions disponibles dans l'application
  const availablePermissions: Permission[] = [
    // Inventory permissions
    'inventory.view',
    'inventory.add', 
    'inventory.edit', 
    'inventory.delete',
    'inventory.export',
    'inventory.import',
    // Supplier permissions
    'suppliers.view',
    'suppliers.add', 
    'suppliers.edit',
    'suppliers.delete',
    // Movement permissions
    'movements.view',
    'movements.add',
    'movements.approve',
    // Project permissions
    'projects.view',
    'projects.add',
    'projects.edit',
    'projects.delete',
    'projects.archive',
    // Intervention permissions
    'interventions.view',
    'interventions.add',
    'interventions.edit',
    'interventions.delete',
    'interventions.archive',
    // User management permissions
    'users.view',
    'users.add',
    'users.edit',
    'users.delete',
    // Quote permissions
    'quotes.view',
    'quotes.add',
    'quotes.edit',
    'quotes.delete',
    'quotes.approve',
    // Client permissions
    'clients.view',
    'clients.add',
    'clients.edit',
    'clients.delete'
  ];

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
