
import React from 'react';
import { Permission } from '@/types/permissions';
import PermissionGroup from './PermissionGroup';

interface PermissionGroupData {
  name: string;
  permissions: Permission[];
}

interface PermissionsListProps {
  permissionGroups: PermissionGroupData[];
  selectedPermissions: Permission[];
  onTogglePermission: (permission: Permission) => void;
  isAdmin: boolean;
}

const PermissionsList: React.FC<PermissionsListProps> = ({ 
  permissionGroups, 
  selectedPermissions, 
  onTogglePermission,
  isAdmin
}) => {
  return (
    <div className="space-y-6">
      {permissionGroups.map((group) => (
        <PermissionGroup
          key={group.name}
          groupName={group.name}
          permissions={group.permissions}
          selectedPermissions={selectedPermissions}
          onTogglePermission={onTogglePermission}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default PermissionsList;
