
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Permission, UserRole } from '@/types/permissions';
import EmptyPermissionsState from './EmptyPermissionsState';
import PermissionsList from './PermissionsList';
import PermissionsFooter from './PermissionsFooter';

interface PermissionGroupData {
  name: string;
  permissions: Permission[];
}

interface PermissionsPanelProps {
  role: UserRole | null;
  permissionGroups: PermissionGroupData[];
  selectedPermissions: Permission[];
  onTogglePermission: (permission: Permission) => void;
}

const PermissionsPanel: React.FC<PermissionsPanelProps> = ({ 
  role, 
  permissionGroups, 
  selectedPermissions, 
  onTogglePermission 
}) => {
  if (!role) {
    return <EmptyPermissionsState />;
  }
  
  const isAdmin = role === "Administrateur";
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions pour {role}</CardTitle>
        <CardDescription>
          Configurez les permissions accordées à ce rôle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PermissionsList 
          permissionGroups={permissionGroups}
          selectedPermissions={selectedPermissions}
          onTogglePermission={onTogglePermission}
          isAdmin={isAdmin}
        />
      </CardContent>
      <PermissionsFooter isAdmin={isAdmin} />
    </Card>
  );
};

export default PermissionsPanel;
