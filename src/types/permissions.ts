
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
  | 'movements.approve';

// User role definition
export type UserRole = 'Administrateur' | 'Gestionnaire' | 'Technicien' | 'Invité';

// User interface with permissions
export interface User {
  id: number;
  name: string;
  role: UserRole;
  permissions: Permission[];
}
