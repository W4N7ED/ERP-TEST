
import React from 'react';
import RoleList from './RoleList';
import PermissionsPanel from './PermissionsPanel';
import NewRoleDialog from './NewRoleDialog';
import { UserRole, Permission, StandardRole, defaultRolePermissions } from '@/types/permissions';

interface RolesTabProps {
  roles: UserRole[];
  selectedRole: UserRole | null;
  permissionGroups: {
    name: string;
    permissions: Permission[];
  }[];
  rolePermissions: Permission[];
  onSelectRole: (role: UserRole) => void;
  onDeleteRole: (role: UserRole) => void;
  onCreateRole: (roleName: string) => void;
  onTogglePermission: (permission: Permission) => void;
}

const RolesTab: React.FC<RolesTabProps> = ({
  roles,
  selectedRole,
  permissionGroups,
  rolePermissions,
  onSelectRole,
  onDeleteRole,
  onCreateRole,
  onTogglePermission
}) => {
  // Get role descriptions based on module focus
  const getRoleDescription = (role: string): string => {
    switch(role) {
      case 'Administrateur': return 'Accès complet à tous les modules';
      case 'RH': return 'Gestion des ressources humaines';
      case 'Technicien': return 'Interventions et maintenance';
      case 'Commerçant': return 'Gestion des clients et devis';
      case 'Comptable': return 'Gestion financière et validation';
      case 'Gestion Stock': return 'Inventaire et fournisseurs';
      case 'Chef de Projet': return 'Coordination des projets';
      case 'Support Client': return 'Assistance aux clients';
      case 'Gestion Fournisseurs': return 'Relations fournisseurs';
      case 'Utilisateur': return 'Accès limité en lecture seule';
      default: return 'Rôle personnalisé';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-4">
        <div></div>
        <NewRoleDialog 
          roles={roles} 
          onCreateRole={onCreateRole} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <RoleList 
            roles={roles} 
            selectedRole={selectedRole}
            onSelectRole={onSelectRole}
            onDeleteRole={onDeleteRole}
            getRoleDescription={getRoleDescription}
          />
        </div>
        <div className="md:col-span-2">
          <PermissionsPanel 
            role={selectedRole}
            permissionGroups={permissionGroups}
            selectedPermissions={rolePermissions}
            onTogglePermission={onTogglePermission}
          />
        </div>
      </div>
    </div>
  );
};

export default RolesTab;
