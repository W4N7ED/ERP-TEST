
import { Permission, User } from '@/types/permissions';

// Mock users with their respective permissions
const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin",
    role: "Administrateur",
    permissions: [
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
      'movements.approve'
    ]
  },
  {
    id: 2,
    name: "Technicien",
    role: "Technicien",
    permissions: [
      'inventory.view',
      'inventory.add',
      'movements.view',
      'movements.add',
      'suppliers.view'
    ]
  },
  {
    id: 3,
    name: "Gestionnaire",
    role: "Gestionnaire",
    permissions: [
      'inventory.view',
      'inventory.add', 
      'inventory.edit',
      'inventory.export',
      'suppliers.view',
      'suppliers.add',
      'suppliers.edit',
      'movements.view',
      'movements.add',
      'movements.approve'
    ]
  },
  {
    id: 4,
    name: "Invité",
    role: "Invité",
    permissions: [
      'inventory.view',
      'suppliers.view',
      'movements.view'
    ]
  }
];

// Default user for demonstration purposes
export const defaultUser = mockUsers[0];

export default mockUsers;
