
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { toast } from "sonner";
import { UserRole } from '@/types/permissions';

interface NewRoleDialogProps {
  roles: UserRole[];
  onCreateRole: (roleName: string) => void;
}

const NewRoleDialog: React.FC<NewRoleDialogProps> = ({ roles, onCreateRole }) => {
  const [newRoleName, setNewRoleName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleCreateRole = () => {
    if (!newRoleName || newRoleName.trim() === "") {
      toast.error("Le nom du rôle ne peut pas être vide");
      return;
    }
    
    if (roles.includes(newRoleName as UserRole)) {
      toast.error("Ce rôle existe déjà");
      return;
    }
    
    onCreateRole(newRoleName);
    setNewRoleName("");
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
  );
};

export default NewRoleDialog;
