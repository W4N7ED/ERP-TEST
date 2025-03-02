
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Permission } from '@/types/permissions';
import { getPermissionLabel, getPermissionDescription } from '../utils/permissionUtils';

interface PermissionGroupProps {
  groupName: string;
  permissions: Permission[];
  selectedPermissions: Permission[];
  onTogglePermission: (permission: Permission) => void;
  isAdmin: boolean;
}

const PermissionGroup: React.FC<PermissionGroupProps> = ({ 
  groupName, 
  permissions, 
  selectedPermissions, 
  onTogglePermission, 
  isAdmin 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium capitalize">{groupName}</h3>
      <div className="space-y-2">
        {permissions.map((permission) => (
          <div key={permission} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
            <div>
              <p>{getPermissionLabel(permission)}</p>
              <p className="text-sm text-gray-500">{getPermissionDescription(permission)}</p>
            </div>
            <Switch 
              checked={selectedPermissions.includes(permission)} 
              onCheckedChange={() => onTogglePermission(permission)}
              disabled={isAdmin} // L'administrateur a toujours toutes les permissions
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionGroup;
