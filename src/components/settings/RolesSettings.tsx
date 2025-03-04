import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleList from './roles/RoleList';
import PermissionsPanel from './roles/PermissionsPanel';
import NewRoleDialog from './roles/NewRoleDialog';
import { UserRole, Permission } from '@/types/permissions';
import { usePermissions } from '@/hooks/usePermissions';
import { toast } from "sonner";
import { UserTable } from '../users/UserTable'; // Fixed import to use named export
import { AddUserDialog } from '../users/AddUserDialog'; // Fixed import to use named export
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const RolesSettings = () => {
  const { 
    availableRoles, 
    availableUsers,
    availablePermissions,
    getRolePermissions, 
    updateRolePermissions,
    updateRoles,
    addUser,
    removeUser,
    updateUser
  } = usePermissions();
  
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [rolePermissions, setRolePermissions] = useState<Permission[]>([]);
  const [activeTab, setActiveTab] = useState<string>("roles");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  const permissionGroups = [
    {
      name: "Inventaire",
      permissions: availablePermissions.filter(p => p.startsWith("inventory."))
    },
    {
      name: "Fournisseurs",
      permissions: availablePermissions.filter(p => p.startsWith("suppliers."))
    },
    {
      name: "Mouvements",
      permissions: availablePermissions.filter(p => p.startsWith("movements."))
    },
    {
      name: "Projets",
      permissions: availablePermissions.filter(p => p.startsWith("projects."))
    },
    {
      name: "Interventions",
      permissions: availablePermissions.filter(p => p.startsWith("interventions."))
    },
    {
      name: "Utilisateurs",
      permissions: availablePermissions.filter(p => p.startsWith("users."))
    },
    {
      name: "Devis",
      permissions: availablePermissions.filter(p => p.startsWith("quotes."))
    },
    {
      name: "Clients",
      permissions: availablePermissions.filter(p => p.startsWith("clients."))
    }
  ];
  
  useEffect(() => {
    if (selectedRole) {
      const permissions = getRolePermissions(selectedRole);
      setRolePermissions(permissions);
    }
  }, [selectedRole, getRolePermissions]);
  
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
  };
  
  const handleDeleteRole = (role: UserRole) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le rôle "${role}" ?`)) {
      const updatedRoles = availableRoles.filter(r => r !== role);
      updateRoles(updatedRoles);
      
      if (selectedRole === role) {
        setSelectedRole(null);
      }
      
      toast.success(`Rôle "${role}" supprimé avec succès`);
    }
  };
  
  const handleCreateRole = (roleName: string) => {
    if (availableRoles.includes(roleName as UserRole)) {
      toast.error("Ce rôle existe déjà");
      return;
    }
    
    const updatedRoles = [...availableRoles, roleName as UserRole];
    updateRoles(updatedRoles);
    toast.success(`Rôle "${roleName}" créé avec succès`);
  };
  
  const handleTogglePermission = (permission: Permission) => {
    if (!selectedRole || selectedRole === "Administrateur") return;
    
    const newPermissions = rolePermissions.includes(permission)
      ? rolePermissions.filter(p => p !== permission)
      : [...rolePermissions, permission];
    
    setRolePermissions(newPermissions);
    updateRolePermissions(selectedRole, newPermissions);
    
    const action = rolePermissions.includes(permission) ? "retirée" : "ajoutée";
    toast.success(`Permission "${permission}" ${action} du rôle "${selectedRole}"`);
  };
  
  const handleAddUser = async (userData: { 
    name: string; 
    role: string; 
  }): Promise<void> => {
    try {
      const newUser = await addUser({
        name: userData.name,
        role: userData.role as UserRole,
        permissions: []
      });
      
      toast.success(`Utilisateur "${userData.name}" ajouté avec succès`);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'utilisateur");
    }
  };
  
  const handleRemoveUser = (userId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      removeUser(userId);
      toast.success("Utilisateur supprimé avec succès");
    }
  };
  
  const handleUpdateUser = (userId: number, updatedData: { name?: string; role?: UserRole }) => {
    updateUser(userId, updatedData);
    toast.success("Utilisateur mis à jour avec succès");
  };

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
            <div className="flex justify-between mb-4">
              <div></div>
              <NewRoleDialog 
                roles={availableRoles} 
                onCreateRole={handleCreateRole} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <RoleList 
                  roles={availableRoles} 
                  selectedRole={selectedRole}
                  onSelectRole={handleSelectRole}
                  onDeleteRole={handleDeleteRole}
                />
              </div>
              <div className="md:col-span-2">
                <PermissionsPanel 
                  role={selectedRole}
                  permissionGroups={permissionGroups}
                  selectedPermissions={rolePermissions}
                  onTogglePermission={handleTogglePermission}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Liste des utilisateurs</h2>
              <Button 
                onClick={() => setIsAddUserDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <UserPlus size={16} />
                Ajouter un utilisateur
              </Button>
            </div>
            
            <UserTable 
              users={availableUsers.map(user => ({
                id: user.id,
                name: user.name,
                email: `${user.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                role: user.role,
                status: 'active' as const,
                lastActive: 'Aujourd\'hui'
              }))}
              availableRoles={availableRoles}
              canManageUsers={true}
              onUpdateUserRole={(userId, newRole) => handleUpdateUser(userId, { role: newRole })}
              onRemoveUser={(userId, userName) => handleRemoveUser(userId)}
            />

            <AddUserDialog
              availableRoles={availableRoles}
              onAddUser={handleAddUser}
              isOpen={isAddUserDialogOpen}
              onOpenChange={setIsAddUserDialogOpen}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RolesSettings;
