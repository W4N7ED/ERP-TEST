
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  onAddMember: (projectId: number, memberData: {
    name: string;
    role: string;
  }) => void;
}

export const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  open,
  onOpenChange,
  projectId,
  onAddMember
}) => {
  const [formData, setFormData] = useState({
    name: "",
    role: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.role) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Add member
    onAddMember(projectId, {
      name: formData.name,
      role: formData.role
    });
    
    // Reset and close
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un membre à l'équipe</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau membre à l'équipe du projet.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom du membre *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Prénom et nom"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Rôle dans le projet *</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Ex: Chef de projet, Technicien, Expert..."
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onOpenChange(false);
            }}>
              Annuler
            </Button>
            <Button type="submit">Ajouter le membre</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
