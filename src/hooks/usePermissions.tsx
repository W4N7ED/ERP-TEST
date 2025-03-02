
import { useState } from 'react';
import { Permission, User } from '@/types/permissions';
import mockUsers, { defaultUser } from '@/data/mockUsers';

export const usePermissions = () => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

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
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return {
    currentUser,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    switchUser,
    availableUsers: mockUsers
  };
};

// Re-export types for convenience
export type { Permission, User } from '@/types/permissions';
