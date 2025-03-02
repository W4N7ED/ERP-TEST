
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";

interface AddProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProjectDialog: React.FC<AddProjectDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    client: "",
    location: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    description: "",
    estimatedBudget: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.reference || !formData.startDate || !formData.endDate) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Ici, nous simulerions l'ajout du projet à la base de données
    console.log("Données du nouveau projet:", formData);
    toast.success(`Projet "${formData.name}" créé avec succès`);
    
    // Réinitialiser le formulaire et fermer la boîte de dialogue
    setFormData({
      name: "",
      reference: "",
      client: "",
      location: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      description: "",
      estimatedBudget: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouveau projet</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du projet *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Migration serveurs"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Référence interne *</Label>
              <Input
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="Ex: PRJ-2023-005"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="Ex: Entreprise ABC"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Site / Localisation *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ex: Siège social"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin prévue *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estimatedBudget">Budget estimé (€)</Label>
            <Input
              id="estimatedBudget"
              name="estimatedBudget"
              type="number"
              value={formData.estimatedBudget}
              onChange={handleInputChange}
              placeholder="Ex: 25000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description et objectifs</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez le projet, ses objectifs et sa portée..."
              rows={4}
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            * Champs obligatoires
          </div>
          
          <DialogFooter className="pt-4">
            <CustomButton
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </CustomButton>
            <CustomButton type="submit" variant="primary">
              Créer le projet
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
