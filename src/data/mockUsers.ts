
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
      'quotes.approve'
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
      'suppliers.view',
      'projects.view',
      'interventions.view',
      'interventions.add',
      'interventions.edit',
      'quotes.view'
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
      'movements.approve',
      'projects.view',
      'projects.add',
      'projects.edit',
      'interventions.view',
      'interventions.add',
      'interventions.edit',
      'interventions.approve',
      'quotes.view',
      'quotes.add',
      'quotes.edit'
    ]
  },
  {
    id: 4,
    name: "Invité",
    role: "Invité",
    permissions: [
      'inventory.view',
      'suppliers.view',
      'movements.view',
      'projects.view',
      'interventions.view',
      'quotes.view'
    ]
  },
  {
    id: 5,
    name: "Commercial",
    role: "Commercial",
    permissions: [
      'inventory.view',
      'suppliers.view',
      'quotes.view',
      'quotes.add',
      'quotes.edit',
      'clients.view',
      'clients.add',
      'clients.edit'
    ]
  }
];

// Default user for demonstration purposes
export const defaultUser = mockUsers[0];

export default mockUsers;
