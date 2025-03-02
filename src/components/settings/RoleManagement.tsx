
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { Permission, UserRole } from '@/types/permissions';
import { CustomButton } from '../ui/custom-button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface RoleManagementProps {
  availableRoles: UserRole[];
  availablePermissions: Permission[];
  onUpdateRoles: (roles: UserRole[]) => void;
  onUpdatePermissions: (role: UserRole, permissions: Permission[]) => void;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

// Regrouper les permissions par catégorie
const groupPermissions = (permissions: Permission[]): PermissionGroup[] => {
  const groups: Record<string, Permission[]> = {};
  
  permissions.forEach(permission => {
    const [category] = permission.split('.');
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
  });
  
  return Object.entries(groups).map(([name, permissions]) => ({
    name,
    permissions
  }));
};

const RoleManagement: React.FC<RoleManagementProps> = ({ 
  availableRoles, 
  availablePermissions, 
  onUpdateRoles,
  onUpdatePermissions
}) => {
  const [roles, setRoles] = useState<UserRole[]>(availableRoles);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(availableRoles[0]);
  const [newRoleName, setNewRoleName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<Permission[]>([]);
  
  // Grouper les permissions par catégorie
  const permissionGroups = groupPermissions(availablePermissions);
  
  // Gestionnaire pour sélectionner un rôle
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    // Charger les permissions de ce rôle (à implémenter depuis un contexte/API)
    // Pour l'instant, nous simulons cela
    const permissions = availablePermissions.filter(() => Math.random() > 0.5);
    setSelectedRolePermissions(permissions);
  };
  
  // Gestionnaire pour créer un nouveau rôle
  const handleCreateRole = () => {
    if (!newRoleName || newRoleName.trim() === "") {
      toast.error("Le nom du rôle ne peut pas être vide");
      return;
    }
    
    if (roles.includes(newRoleName as UserRole)) {
      toast.error("Ce rôle existe déjà");
      return;
    }
    
    const updatedRoles = [...roles, newRoleName as UserRole];
    setRoles(updatedRoles);
    onUpdateRoles(updatedRoles);
    setNewRoleName("");
    setOpenDialog(false);
    toast.success(`Le rôle "${newRoleName}" a été créé`);
  };
  
  // Gestionnaire pour supprimer un rôle
  const handleDeleteRole = (roleToDelete: UserRole) => {
    if (roleToDelete === "Administrateur") {
      toast.error("Le rôle Administrateur ne peut pas être supprimé");
      return;
    }
    
    const updatedRoles = roles.filter(role => role !== roleToDelete);
    setRoles(updatedRoles);
    onUpdateRoles(updatedRoles);
    
    if (selectedRole === roleToDelete) {
      setSelectedRole(updatedRoles[0] || null);
    }
    
    toast.success(`Le rôle "${roleToDelete}" a été supprimé`);
  };
  
  // Gestionnaire pour mettre à jour les permissions d'un rôle
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
  
  // Vérifier si une permission est actuellement activée
  const hasPermission = (permission: Permission): boolean => {
    return selectedRolePermissions.includes(permission);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des rôles</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <CustomButton variant="primary" icon={<Plus size={16} />}>
              Nouveau rôle
            </CustomButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau rôle</DialogTitle>
              <DialogDescription>
                Définissez un nom pour le nouveau rôle. Vous pourrez configurer ses permissions après sa création.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Nom du rôle</Label>
                <Input
                  id="roleName"
                  placeholder="Ex: Responsable commercial"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Annuler</Button>
              <Button onClick={handleCreateRole}>Créer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Rôles disponibles</CardTitle>
              <CardDescription>Sélectionnez un rôle pour configurer ses permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roles.map((role) => (
                  <div 
                    key={role} 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${selectedRole === role ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
                    onClick={() => handleSelectRole(role)}
                  >
                    <span className="font-medium">{role}</span>
                    {role !== "Administrateur" && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedRole ? (
            <Card>
              <CardHeader>
                <CardTitle>Permissions pour {selectedRole}</CardTitle>
                <CardDescription>
                  Configurez les permissions accordées à ce rôle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="space-y-4">
                    <h3 className="text-lg font-medium capitalize">{group.name}</h3>
                    <div className="space-y-2">
                      {group.permissions.map((permission) => (
                        <div key={permission} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                          <div>
                            <p>{getPermissionLabel(permission)}</p>
                            <p className="text-sm text-gray-500">{getPermissionDescription(permission)}</p>
                          </div>
                          <Switch 
                            checked={hasPermission(permission)} 
                            onCheckedChange={() => handleTogglePermission(permission)}
                            disabled={selectedRole === "Administrateur"} // L'administrateur a toujours toutes les permissions
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  {selectedRole === "Administrateur" 
                    ? "Le rôle Administrateur a toutes les permissions par défaut et ne peut pas être modifié." 
                    : "Les modifications des permissions sont enregistrées automatiquement."}
                </p>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Sélectionnez un rôle pour voir et configurer ses permissions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fonctions utilitaires pour afficher des libellés et descriptions conviviaux pour les permissions
const getPermissionLabel = (permission: Permission): string => {
  const labels: Record<Permission, string> = {
    'inventory.view': 'Consulter l\'inventaire',
    'inventory.add': 'Ajouter des éléments à l\'inventaire',
    'inventory.edit': 'Modifier les éléments de l\'inventaire',
    'inventory.delete': 'Supprimer des éléments de l\'inventaire',
    'inventory.export': 'Exporter l\'inventaire',
    'inventory.import': 'Importer des données dans l\'inventaire',
    'suppliers.view': 'Consulter les fournisseurs',
    'suppliers.add': 'Ajouter des fournisseurs',
    'suppliers.edit': 'Modifier les fournisseurs',
    'suppliers.delete': 'Supprimer des fournisseurs',
    'movements.view': 'Consulter les mouvements',
    'movements.add': 'Ajouter des mouvements',
    'movements.approve': 'Approuver des mouvements'
  };
  
  return labels[permission] || permission;
};

const getPermissionDescription = (permission: Permission): string => {
  const descriptions: Record<Permission, string> = {
    'inventory.view': 'Permet de consulter tous les éléments de l\'inventaire',
    'inventory.add': 'Permet d\'ajouter de nouveaux éléments à l\'inventaire',
    'inventory.edit': 'Permet de modifier les informations des éléments existants',
    'inventory.delete': 'Permet de supprimer des éléments de l\'inventaire',
    'inventory.export': 'Permet d\'exporter les données de l\'inventaire',
    'inventory.import': 'Permet d\'importer des données dans l\'inventaire',
    'suppliers.view': 'Permet de consulter la liste des fournisseurs',
    'suppliers.add': 'Permet d\'ajouter de nouveaux fournisseurs',
    'suppliers.edit': 'Permet de modifier les informations des fournisseurs',
    'suppliers.delete': 'Permet de supprimer des fournisseurs',
    'movements.view': 'Permet de consulter les mouvements de stock',
    'movements.add': 'Permet d\'enregistrer de nouveaux mouvements',
    'movements.approve': 'Permet d\'approuver les mouvements en attente'
  };
  
  return descriptions[permission] || '';
};

export default RoleManagement;
