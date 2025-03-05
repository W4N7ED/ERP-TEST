
import { useState } from 'react';
import { UserRole, Permission, User, StandardRole, defaultRolePermissions } from '@/types/permissions';

export const useRoleManagement = (
  allUsers: User[], 
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>,
  currentUser: User & { isAuthenticated?: boolean },
  setCurrentUser: React.Dispatch<React.SetStateAction<User & { isAuthenticated?: boolean }>>
) => {
  const [allRoles, setAllRoles] = useState<UserRole[]>(
    [...new Set(allUsers.map(user => user.role))]
  );

  // Mettre à jour la liste des rôles
  const updateRoles = (roles: UserRole[]) => {
    setAllRoles(roles);
  };
  
  // Obtenir les permissions d'un rôle spécifique
  const getRolePermissions = (role: UserRole): Permission[] => {
    // Check if it's a standard role with default permissions
    if (role in defaultRolePermissions) {
      return defaultRolePermissions[role as StandardRole];
    }
    
    // Recherchez un utilisateur avec ce rôle et retournez ses permissions
    const userWithRole = allUsers.find(user => user.role === role);
    return userWithRole?.permissions || [];
  };
  
  // Mettre à jour les permissions d'un rôle
  const updateRolePermissions = (role: UserRole, permissions: Permission[]) => {
    // Mettre à jour les permissions pour tous les utilisateurs ayant ce rôle
    const updatedUsers = allUsers.map(user => {
      if (user.role === role) {
        return { ...user, permissions };
      }
      return user;
    });
    
    setAllUsers(updatedUsers);
    
    // Si l'utilisateur actuel a ce rôle, mettez également à jour ses permissions
    if (currentUser.role === role) {
      setCurrentUser({ ...currentUser, permissions });
    }
  };

  return {
    allRoles,
    updateRoles,
    getRolePermissions,
    updateRolePermissions
  };
};
