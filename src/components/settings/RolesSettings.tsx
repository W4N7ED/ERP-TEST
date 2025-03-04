
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoleSettings } from '@/hooks/settings/useRoleSettings';
import RolesTab from './roles/RolesTab';
import UsersTab from './users/UsersTab';

const RolesSettings = () => {
  const {
    activeTab,
    setActiveTab,
    availableRoles,
    availableUsers,
    permissionGroups,
    selectedRole,
    rolePermissions,
    isAddUserDialogOpen,
    setIsAddUserDialogOpen,
    handleSelectRole,
    handleDeleteRole,
    handleCreateRole,
    handleTogglePermission,
    handleAddUser,
    handleRemoveUser,
    handleUpdateUser
  } = useRoleSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des rôles et utilisateurs</CardTitle>
        <CardDescription>
          Configurez les rôles d'utilisateurs et leurs permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="roles">Rôles et permissions</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roles" className="space-y-6">
            <RolesTab
              roles={availableRoles}
              selectedRole={selectedRole}
              permissionGroups={permissionGroups}
              rolePermissions={rolePermissions}
              onSelectRole={handleSelectRole}
              onDeleteRole={handleDeleteRole}
              onCreateRole={handleCreateRole}
              onTogglePermission={handleTogglePermission}
            />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersTab
              users={availableUsers}
              availableRoles={availableRoles}
              isAddUserDialogOpen={isAddUserDialogOpen}
              setIsAddUserDialogOpen={setIsAddUserDialogOpen}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onRemoveUser={handleRemoveUser}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RolesSettings;
