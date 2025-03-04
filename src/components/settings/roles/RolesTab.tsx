
import React from 'react';
import RoleList from './RoleList';
import PermissionsPanel from './PermissionsPanel';
import NewRoleDialog from './NewRoleDialog';
import { UserRole, Permission } from '@/types/permissions';

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
