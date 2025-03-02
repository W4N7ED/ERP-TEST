
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
  | 'clients.delete';

// User role definition
export type UserRole = string;

// User interface with permissions
export interface User {
  id: number;
  name: string;
  role: UserRole;
  permissions: Permission[];
}
