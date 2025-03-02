
import { useState, useEffect } from 'react';

// Types de permissions disponibles dans l'application
export type Permission = 'inventory.add' | 'inventory.edit' | 'inventory.delete' | 'suppliers.add' | 'suppliers.edit';

// Définition d'un utilisateur avec ses permissions
interface User {
  id: number;
  name: string;
  role: string;
  permissions: Permission[];
}

// Mock des utilisateurs avec leurs permissions
// Dans une vraie application, cela viendrait d'une API ou d'un système d'authentification
const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin",
    role: "Administrateur",
    permissions: ['inventory.add', 'inventory.edit', 'inventory.delete', 'suppliers.add', 'suppliers.edit']
  },
  {
    id: 2,
    name: "Technicien",
    role: "Technicien",
    permissions: ['inventory.add']
  },
  {
    id: 3,
    name: "Gestionnaire",
    role: "Gestionnaire",
    permissions: ['inventory.add', 'inventory.edit', 'suppliers.add']
  },
  {
    id: 4,
    name: "Invité",
    role: "Invité",
    permissions: []
  }
];

// Par défaut, nous utilisons l'utilisateur Admin pour la démonstration
// Dans une vraie application, l'utilisateur actuel viendrait du système d'authentification
const defaultUser = mockUsers[0];

export const usePermissions = () => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

  // Vérifie si l'utilisateur a une permission spécifique
  const hasPermission = (permission: Permission): boolean => {
    return currentUser.permissions.includes(permission);
  };

  // Change l'utilisateur actuel (pour la démonstration)
  const switchUser = (userId: number) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return {
    currentUser,
    hasPermission,
    switchUser,
    availableUsers: mockUsers
  };
};
