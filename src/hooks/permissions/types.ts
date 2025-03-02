
import { Permission, UserRole, User } from '@/types/permissions';

// Re-export types for convenience
export type { Permission, User, UserRole };

// Clé pour stocker l'utilisateur connecté dans localStorage
export const CURRENT_USER_KEY = 'edr-solution-current-user';

export interface PermissionsContextType {
  currentUser: User & { isAuthenticated?: boolean };
  hasPermission: (permission: Permission) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  switchUser: (userId: number) => void;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  availableUsers: User[];
  availableRoles: UserRole[];
  availablePermissions: Permission[];
  updateRoles: (roles: UserRole[]) => void;
  getRolePermissions: (role: UserRole) => Permission[];
  updateRolePermissions: (role: UserRole, permissions: Permission[]) => void;
  addUser: (user: Omit<User, 'id'>) => User;
  removeUser: (userId: number) => void;
  updateUser: (userId: number, updates: Partial<Omit<User, 'id'>>) => void;
}
