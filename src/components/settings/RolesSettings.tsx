
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleList from './roles/RoleList';
import PermissionsPanel from './roles/PermissionsPanel';
import NewRoleDialog from './roles/NewRoleDialog';
import { UserRole, Permission } from '@/types/permissions';
import { usePermissions } from '@/hooks/usePermissions';
import { toast } from "sonner";
import UserTable from '../users/UserTable';
import AddUserDialog from '../users/AddUserDialog';

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
  
  // Groupes de permissions
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
  
  // Charger les permissions du rôle sélectionné
  useEffect(() => {
    if (selectedRole) {
      const permissions = getRolePermissions(selectedRole);
      setRolePermissions(permissions);
    }
  }, [selectedRole, getRolePermissions]);
  
  // Gérer le changement de rôle sélectionné
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
  };
  
  // Gérer la suppression d'un rôle
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
  
  // Gérer la création d'un rôle
  const handleCreateRole = (roleName: string) => {
    if (availableRoles.includes(roleName as UserRole)) {
      toast.error("Ce rôle existe déjà");
      return;
    }
    
    const updatedRoles = [...availableRoles, roleName as UserRole];
    updateRoles(updatedRoles);
    toast.success(`Rôle "${roleName}" créé avec succès`);
  };
  
  // Gérer la modification des permissions d'un rôle
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
  
  // Handler pour ajouter un utilisateur
  const handleAddUser = (userData: { 
    name: string; 
    role: UserRole; 
    email?: string; 
    password?: string;
  }) => {
    const result = addUser({
      name: userData.name,
      role: userData.role,
      email: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      password: userData.password || 'defaultpassword123'
    });
    
    if (result.success) {
      toast.success(`Utilisateur "${userData.name}" ajouté avec succès`);
      return true;
    } else {
      toast.error(result.error || "Erreur lors de l'ajout de l'utilisateur");
      return false;
    }
  };
  
  // Handler pour supprimer un utilisateur
  const handleRemoveUser = (userId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      removeUser(userId);
      toast.success("Utilisateur supprimé avec succès");
    }
  };
  
  // Handler pour mettre à jour un utilisateur
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
              <AddUserDialog 
                onAddUser={handleAddUser} 
                availableRoles={availableRoles}
              />
            </div>
            
            <UserTable 
              users={availableUsers}
              roles={availableRoles}
              onRemoveUser={handleRemoveUser}
              onUpdateUser={handleUpdateUser}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RolesSettings;
