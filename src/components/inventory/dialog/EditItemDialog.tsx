
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "@/types/inventory";
import ItemFormFields from "./ItemFormFields";

interface EditItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const EditItemDialog: React.FC<EditItemDialogProps> = ({
  isOpen,
  onClose,
  item,
  onInputChange,
  onSelectChange,
  onSubmit
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Modifier l'article</DialogTitle>
        </DialogHeader>
        
        <ItemFormFields
          newItem={item}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
        />
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" onClick={onSubmit}>
            Enregistrer les modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemDialog;
