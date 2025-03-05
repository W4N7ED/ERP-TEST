
import React, { useState } from 'react';
import { Permission, UserRole } from '@/types/permissions';
import { toast } from "sonner";
import { groupPermissions } from './utils/permissionUtils';
import RoleList from './roles/RoleList';
import PermissionsPanel from './roles/PermissionsPanel';
import NewRoleDialog from './roles/NewRoleDialog';

interface RoleManagementProps {
  availableRoles: UserRole[];
  availablePermissions: Permission[];
  onUpdateRoles: (roles: UserRole[]) => void;
  onUpdatePermissions: (role: UserRole, permissions: Permission[]) => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ 
  availableRoles, 
  availablePermissions, 
  onUpdateRoles,
  onUpdatePermissions
}) => {
  const [roles, setRoles] = useState<UserRole[]>(availableRoles);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(availableRoles[0]);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<Permission[]>([]);
  
  // Group permissions by category
  const permissionGroups = groupPermissions(availablePermissions);
  
  // Handler for selecting a role
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    // Load this role's permissions (simulated for now)
    const permissions = availablePermissions.filter(() => Math.random() > 0.5);
    setSelectedRolePermissions(permissions);
  };
  
  // Handler for creating a new role
  const handleCreateRole = (newRoleName: string) => {
    const updatedRoles = [...roles, newRoleName as UserRole];
    setRoles(updatedRoles);
    onUpdateRoles(updatedRoles);
    toast.success(`Le rôle "${newRoleName}" a été créé`);
  };
  
  // Handler for deleting a role
  const handleDeleteRole = (roleToDelete: UserRole) => {
    const updatedRoles = roles.filter(role => role !== roleToDelete);
    setRoles(updatedRoles);
    onUpdateRoles(updatedRoles);
    
    if (selectedRole === roleToDelete) {
      setSelectedRole(updatedRoles[0] || null);
    }
    
    toast.success(`Le rôle "${roleToDelete}" a été supprimé`);
  };
  
  // Handler for toggling a permission
  const handleTogglePermission = (permission: Permission) => {
    if (!selectedRole) return;
    
    let updatedPermissions: Permission[];
    if (selectedRolePermissions.includes(permission)) {
      updatedPermissions = selectedRolePermissions.filter(p => p !== permission);
    } else {
      updatedPermissions = [...selectedRolePermissions, permission];
    }
    
    setSelectedRolePermissions(updatedPermissions);
    onUpdatePermissions(selectedRole, updatedPermissions);
  };

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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des rôles</h2>
        <NewRoleDialog 
          roles={roles} 
          onCreateRole={handleCreateRole} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RoleList 
            roles={roles}
            selectedRole={selectedRole}
            onSelectRole={handleSelectRole}
            onDeleteRole={handleDeleteRole}
            getRoleDescription={getRoleDescription}
          />
        </div>
        
        <div className="lg:col-span-2">
          <PermissionsPanel 
            role={selectedRole}
            permissionGroups={permissionGroups}
            selectedPermissions={selectedRolePermissions}
            onTogglePermission={handleTogglePermission}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
