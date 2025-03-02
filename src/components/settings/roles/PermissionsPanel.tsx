
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Permission, UserRole } from '@/types/permissions';
import PermissionGroup from './PermissionGroup';

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
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Sélectionnez un rôle pour voir et configurer ses permissions</p>
      </div>
    );
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
      <CardContent className="space-y-6">
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
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          {isAdmin 
            ? "Le rôle Administrateur a toutes les permissions par défaut et ne peut pas être modifié." 
            : "Les modifications des permissions sont enregistrées automatiquement."}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PermissionsPanel;
