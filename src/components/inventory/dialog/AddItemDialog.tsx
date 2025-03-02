
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InventoryItem } from "@/types/inventory";
import ItemFormFields from "./ItemFormFields";

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newItem: Partial<InventoryItem>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({
  isOpen,
  onClose,
  newItem,
  onInputChange,
  onSelectChange,
  onSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel article</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ajouter un nouvel article à l'inventaire.
          </DialogDescription>
        </DialogHeader>
        
        <ItemFormFields
          newItem={newItem}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
        />
        
        <DialogFooter>
          <CustomButton variant="outline" onClick={onClose}>Annuler</CustomButton>
          <CustomButton onClick={onSubmit}>Ajouter l'article</CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
