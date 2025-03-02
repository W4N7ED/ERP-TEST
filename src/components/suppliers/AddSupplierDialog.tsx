
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Supplier } from "@/types/inventory";

interface AddSupplierDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newSupplier: Partial<Supplier>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onNumberChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({
  isOpen,
  onClose,
  newSupplier,
  onInputChange,
  onNumberChange,
  onSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau fournisseur</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ajouter un nouveau fournisseur.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du fournisseur</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Ex: Tech Distribution" 
              value={newSupplier.name || ""} 
              onChange={onInputChange} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Nom du contact</Label>
            <Input 
              id="contact" 
              name="contact" 
              placeholder="Ex: Jean Dupont" 
              value={newSupplier.contact || ""} 
              onChange={onInputChange} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                placeholder="contact@example.com" 
                value={newSupplier.email || ""} 
                onChange={onInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input 
                id="phone" 
                name="phone" 
                placeholder="Ex: 01 23 45 67 89" 
                value={newSupplier.phone || ""} 
                onChange={onInputChange} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deliveryTime">Délai de livraison moyen (jours)</Label>
            <Input 
              id="deliveryTime" 
              name="deliveryTime" 
              type="number" 
              min="1"
              placeholder="3" 
              value={newSupplier.deliveryTime || ""}
              onChange={(e) => onNumberChange("deliveryTime", e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              rows={3}
              placeholder="Notes supplémentaires..." 
              value={newSupplier.notes || ""} 
              onChange={onInputChange} 
            />
          </div>
        </div>
        
        <DialogFooter>
          <CustomButton variant="outline" onClick={onClose}>Annuler</CustomButton>
          <CustomButton onClick={onSubmit}>Ajouter le fournisseur</CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierDialog;
