
import { Permission } from '@/types/permissions';

// Function to group permissions by category
export const groupPermissions = (permissions: Permission[]) => {
  const groups: Record<string, Permission[]> = {};
  
  permissions.forEach(permission => {
    const [category] = permission.split('.');
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
  });
  
  return Object.entries(groups).map(([name, permissions]) => ({
    name,
    permissions
  }));
};

// Function to get user-friendly label for a permission
export const getPermissionLabel = (permission: Permission): string => {
  const labels: Record<Permission, string> = {
    // Inventory permissions
    'inventory.view': 'Consulter l\'inventaire',
    'inventory.add': 'Ajouter des éléments à l\'inventaire',
    'inventory.edit': 'Modifier les éléments de l\'inventaire',
    'inventory.delete': 'Supprimer des éléments de l\'inventaire',
    'inventory.export': 'Exporter l\'inventaire',
    'inventory.import': 'Importer des données dans l\'inventaire',
    // Supplier permissions
    'suppliers.view': 'Consulter les fournisseurs',
    'suppliers.add': 'Ajouter des fournisseurs',
    'suppliers.edit': 'Modifier les fournisseurs',
    'suppliers.delete': 'Supprimer des fournisseurs',
    // Movement permissions
    'movements.view': 'Consulter les mouvements',
    'movements.add': 'Ajouter des mouvements',
    'movements.approve': 'Approuver des mouvements',
    // Project permissions
    'projects.view': 'Consulter les projets',
    'projects.add': 'Ajouter des projets',
    'projects.edit': 'Modifier les projets',
    'projects.delete': 'Supprimer des projets',
    'projects.archive': 'Archiver des projets',
    // Intervention permissions
    'interventions.view': 'Consulter les interventions',
    'interventions.add': 'Ajouter des interventions',
    'interventions.edit': 'Modifier les interventions',
    'interventions.delete': 'Supprimer des interventions',
    'interventions.archive': 'Archiver des interventions',
    // User management permissions
    'users.view': 'Consulter les utilisateurs',
    'users.add': 'Ajouter des utilisateurs',
    'users.edit': 'Modifier les utilisateurs',
    'users.delete': 'Supprimer des utilisateurs',
    // Quote permissions
    'quotes.view': 'Consulter les devis',
    'quotes.add': 'Ajouter des devis',
    'quotes.edit': 'Modifier les devis',
    'quotes.delete': 'Supprimer des devis',
    'quotes.approve': 'Approuver des devis',
    // Client permissions
    'clients.view': 'Consulter les clients',
    'clients.add': 'Ajouter des clients',
    'clients.edit': 'Modifier les clients',
    'clients.delete': 'Supprimer des clients'
  };
  
  return labels[permission] || permission;
};

// Function to get description for a permission
export const getPermissionDescription = (permission: Permission): string => {
  const descriptions: Record<Permission, string> = {
    // Inventory permissions
    'inventory.view': 'Permet de consulter tous les éléments de l\'inventaire',
    'inventory.add': 'Permet d\'ajouter de nouveaux éléments à l\'inventaire',
    'inventory.edit': 'Permet de modifier les informations des éléments existants',
    'inventory.delete': 'Permet de supprimer des éléments de l\'inventaire',
    'inventory.export': 'Permet d\'exporter les données de l\'inventaire',
    'inventory.import': 'Permet d\'importer des données dans l\'inventaire',
    // Supplier permissions
    'suppliers.view': 'Permet de consulter la liste des fournisseurs',
    'suppliers.add': 'Permet d\'ajouter de nouveaux fournisseurs',
    'suppliers.edit': 'Permet de modifier les informations des fournisseurs',
    'suppliers.delete': 'Permet de supprimer des fournisseurs',
    // Movement permissions
    'movements.view': 'Permet de consulter les mouvements de stock',
    'movements.add': 'Permet d\'enregistrer de nouveaux mouvements',
    'movements.approve': 'Permet d\'approuver les mouvements en attente',
    // Project permissions
    'projects.view': 'Permet de consulter les projets',
    'projects.add': 'Permet de créer de nouveaux projets',
    'projects.edit': 'Permet de modifier les projets existants',
    'projects.delete': 'Permet de supprimer des projets',
    'projects.archive': 'Permet d\'archiver des projets',
    // Intervention permissions
    'interventions.view': 'Permet de consulter les interventions',
    'interventions.add': 'Permet de créer de nouvelles interventions',
    'interventions.edit': 'Permet de modifier les interventions existantes',
    'interventions.delete': 'Permet de supprimer des interventions',
    'interventions.archive': 'Permet d\'archiver des interventions',
    // User management permissions
    'users.view': 'Permet de consulter la liste des utilisateurs',
    'users.add': 'Permet d\'ajouter de nouveaux utilisateurs',
    'users.edit': 'Permet de modifier les informations des utilisateurs',
    'users.delete': 'Permet de supprimer des utilisateurs',
    // Quote permissions
    'quotes.view': 'Permet de consulter les devis',
    'quotes.add': 'Permet de créer de nouveaux devis',
    'quotes.edit': 'Permet de modifier les devis existants',
    'quotes.delete': 'Permet de supprimer des devis',
    'quotes.approve': 'Permet d\'approuver les devis',
    // Client permissions
    'clients.view': 'Permet de consulter la liste des clients',
    'clients.add': 'Permet d\'ajouter de nouveaux clients',
    'clients.edit': 'Permet de modifier les informations des clients',
    'clients.delete': 'Permet de supprimer des clients'
  };
  
  return descriptions[permission] || '';
};
