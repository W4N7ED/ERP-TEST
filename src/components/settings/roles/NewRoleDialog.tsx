
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { toast } from "sonner";
import { UserRole, StandardRole } from '@/types/permissions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewRoleDialogProps {
  roles: UserRole[];
  onCreateRole: (roleName: string) => void;
}

const standardRoles: StandardRole[] = [
  'Administrateur',
  'RH', 
  'Technicien', 
  'Commerçant', 
  'Comptable', 
  'Gestion Stock', 
  'Chef de Projet', 
  'Support Client', 
  'Gestion Fournisseurs', 
  'Utilisateur'
];

const NewRoleDialog: React.FC<NewRoleDialogProps> = ({ roles, onCreateRole }) => {
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [useCustomName, setUseCustomName] = useState(false);
  
  const handleCreateRole = () => {
    const roleName = useCustomName ? newRoleName : selectedRoleType;
    
    if (!roleName || roleName.trim() === "") {
      toast.error("Le nom du rôle ne peut pas être vide");
      return;
    }
    
    if (roles.includes(roleName as UserRole)) {
      toast.error("Ce rôle existe déjà");
      return;
    }
    
    onCreateRole(roleName);
    setNewRoleName("");
    setSelectedRoleType("");
    setUseCustomName(false);
    setOpenDialog(false);
  };
  
  return (
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
            Sélectionnez un type de rôle prédéfini ou créez un rôle personnalisé.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Type de rôle</Label>
            <Select
              value={selectedRoleType}
              onValueChange={setSelectedRoleType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type de rôle" />
              </SelectTrigger>
              <SelectContent>
                {standardRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="customName"
              checked={useCustomName}
              onChange={(e) => setUseCustomName(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="customName">Utiliser un nom personnalisé</Label>
          </div>
          
          {useCustomName && (
            <div className="space-y-2">
              <Label htmlFor="roleName">Nom du rôle personnalisé</Label>
              <Input
                id="roleName"
                placeholder="Ex: Responsable commercial"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button 
            onClick={handleCreateRole}
            disabled={(useCustomName && !newRoleName) || (!useCustomName && !selectedRoleType)}
          >
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoleDialog;
