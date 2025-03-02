
import { useState } from 'react';
import { Permission, User, UserRole } from '@/types/permissions';
import mockUsers, { defaultUser } from '@/data/mockUsers';

export const usePermissions = () => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [allRoles, setAllRoles] = useState<UserRole[]>(
    [...new Set(mockUsers.map(user => user.role))]
  );

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

  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    return currentUser.permissions.includes(permission);
  };

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => 
      currentUser.permissions.includes(permission)
    );
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => 
      currentUser.permissions.includes(permission)
    );
  };

  // Switch to a different user (for demonstration purposes)
  const switchUser = (userId: number) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };
  
  // Mettre à jour la liste des rôles
  const updateRoles = (roles: UserRole[]) => {
    setAllRoles(roles);
  };
  
  // Obtenir les permissions d'un rôle spécifique
  const getRolePermissions = (role: UserRole): Permission[] => {
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

  // Ajouter un nouvel utilisateur
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Math.max(...allUsers.map(user => user.id)) + 1,
      ...user
    };
    
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    return newUser;
  };
  
  // Supprimer un utilisateur
  const removeUser = (userId: number) => {
    const updatedUsers = allUsers.filter(user => user.id !== userId);
    setAllUsers(updatedUsers);
  };
  
  // Mettre à jour un utilisateur existant
  const updateUser = (userId: number, updates: Partial<Omit<User, 'id'>>) => {
    const updatedUsers = allUsers.map(user => {
      if (user.id === userId) {
        return { ...user, ...updates };
      }
      return user;
    });
    
    setAllUsers(updatedUsers);
    
    // Si l'utilisateur actuel est modifié, mettez-le également à jour
    if (currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  return {
    currentUser,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    switchUser,
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
export type { Permission, User, UserRole } from '@/types/permissions';
