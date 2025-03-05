
// Types for user permissions system

// All available permissions in the application
export type Permission = 
  // Inventory permissions
  | 'inventory.view'
  | 'inventory.add' 
  | 'inventory.edit' 
  | 'inventory.delete' 
  | 'inventory.export'
  | 'inventory.import'
  // Supplier permissions
  | 'suppliers.view'
  | 'suppliers.add' 
  | 'suppliers.edit'
  | 'suppliers.delete'
  // Movement permissions
  | 'movements.view'
  | 'movements.add'
  | 'movements.approve'
  // Project permissions
  | 'projects.view'
  | 'projects.add'
  | 'projects.edit'
  | 'projects.delete'
  | 'projects.archive'
  // Intervention permissions
  | 'interventions.view'
  | 'interventions.add'
  | 'interventions.edit'
  | 'interventions.delete'
  | 'interventions.archive'
  // User management permissions
  | 'users.view'
  | 'users.add'
  | 'users.edit'
  | 'users.delete'
  // Quote permissions
  | 'quotes.view'
  | 'quotes.add'
  | 'quotes.edit'
  | 'quotes.delete'
  | 'quotes.approve'
  // Client permissions
  | 'clients.view'
  | 'clients.add'
  | 'clients.edit'
  | 'clients.delete'
  // HR permissions
  | 'hr.view'
  | 'hr.employees.view'
  | 'hr.employees.add'
  | 'hr.employees.edit'
  | 'hr.employees.delete'
  | 'hr.contracts.view'
  | 'hr.contracts.add'
  | 'hr.contracts.edit'
  | 'hr.planning.view'
  | 'hr.planning.edit'
  | 'hr.leaves.view'
  | 'hr.leaves.add'
  | 'hr.leaves.approve'
  | 'hr.performance.view'
  | 'hr.performance.edit'
  | 'hr.reports.view';

// Define standard roles in the system
export type StandardRole = 
  | 'Administrateur' 
  | 'RH' 
  | 'Technicien' 
  | 'Commerçant' 
  | 'Comptable' 
  | 'Gestion Stock' 
  | 'Chef de Projet' 
  | 'Support Client' 
  | 'Gestion Fournisseurs' 
  | 'Utilisateur';

// User role definition - can be any string to allow custom roles
export type UserRole = string;

// User interface with permissions
export interface User {
  id: number;
  name: string;
  role: UserRole;
  permissions: Permission[];
  isAuthenticated?: boolean;
}

// Default permissions for standard roles
export const defaultRolePermissions: Record<StandardRole, Permission[]> = {
  'Administrateur': [
    // All permissions for administrator
    'inventory.view', 'inventory.add', 'inventory.edit', 'inventory.delete', 'inventory.export', 'inventory.import',
    'suppliers.view', 'suppliers.add', 'suppliers.edit', 'suppliers.delete',
    'movements.view', 'movements.add', 'movements.approve',
    'projects.view', 'projects.add', 'projects.edit', 'projects.delete', 'projects.archive',
    'interventions.view', 'interventions.add', 'interventions.edit', 'interventions.delete', 'interventions.archive',
    'users.view', 'users.add', 'users.edit', 'users.delete',
    'quotes.view', 'quotes.add', 'quotes.edit', 'quotes.delete', 'quotes.approve',
    'clients.view', 'clients.add', 'clients.edit', 'clients.delete',
    'hr.view', 'hr.employees.view', 'hr.employees.add', 'hr.employees.edit', 'hr.employees.delete',
    'hr.contracts.view', 'hr.contracts.add', 'hr.contracts.edit',
    'hr.planning.view', 'hr.planning.edit',
    'hr.leaves.view', 'hr.leaves.add', 'hr.leaves.approve',
    'hr.performance.view', 'hr.performance.edit',
    'hr.reports.view'
  ],
  'RH': [
    'hr.view', 'hr.employees.view', 'hr.employees.add', 'hr.employees.edit', 'hr.employees.delete',
    'hr.contracts.view', 'hr.contracts.add', 'hr.contracts.edit',
    'hr.planning.view', 'hr.planning.edit',
    'hr.leaves.view', 'hr.leaves.add', 'hr.leaves.approve',
    'hr.performance.view', 'hr.performance.edit',
    'hr.reports.view'
  ],
  'Technicien': [
    'inventory.view',
    'movements.view', 'movements.add',
    'interventions.view', 'interventions.add', 'interventions.edit'
  ],
  'Commerçant': [
    'clients.view', 'clients.add', 'clients.edit',
    'quotes.view', 'quotes.add', 'quotes.edit'
  ],
  'Comptable': [
    'quotes.view', 'quotes.edit', 'quotes.approve',
    'clients.view',
    'suppliers.view',
    'hr.contracts.view'
  ],
  'Gestion Stock': [
    'inventory.view', 'inventory.add', 'inventory.edit', 'inventory.export', 'inventory.import',
    'suppliers.view', 'suppliers.add', 'suppliers.edit',
    'movements.view', 'movements.add', 'movements.approve'
  ],
  'Chef de Projet': [
    'projects.view', 'projects.add', 'projects.edit', 'projects.archive',
    'interventions.view', 'interventions.add', 'interventions.edit',
    'quotes.view', 'quotes.add'
  ],
  'Support Client': [
    'clients.view', 'clients.edit',
    'interventions.view', 'interventions.add'
  ],
  'Gestion Fournisseurs': [
    'suppliers.view', 'suppliers.add', 'suppliers.edit', 'suppliers.delete',
    'inventory.view'
  ],
  'Utilisateur': [
    'inventory.view',
    'projects.view',
    'interventions.view',
    'clients.view',
    'quotes.view'
  ]
};
