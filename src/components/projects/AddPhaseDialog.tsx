
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddPhaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  onAddPhase: (projectId: number, phaseData: {
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
  }) => void;
}

export const AddPhaseDialog: React.FC<AddPhaseDialogProps> = ({
  open,
  onOpenChange,
  projectId,
  onAddPhase
}) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Validate dates
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      toast.error("La date de fin doit être postérieure à la date de début");
      return;
    }
    
    // Add phase
    onAddPhase(projectId, {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description || undefined
    });
    
    // Reset and close
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle phase</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle phase au projet pour organiser votre travail.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom de la phase *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Préparation, Développement, Tests..."
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endDate">Date de fin *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description détaillée de la phase..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onOpenChange(false);
            }}>
              Annuler
            </Button>
            <Button type="submit">Ajouter la phase</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
