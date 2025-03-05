
import { useState, useEffect } from 'react';
import { UserRole, Permission } from '@/types/permissions';
import { usePermissions } from '@/hooks/usePermissions';
import { toast } from 'sonner';

export const useRoleSettings = () => {
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
    },
    {
      name: "Ressources Humaines",
      permissions: availablePermissions.filter(p => p.startsWith("hr."))
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
      await addUser({
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

  return {
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
  };
};
