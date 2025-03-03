
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomButton } from "@/components/ui/custom-button";
import { productCategories } from "@/types/inventory";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ManageCategoriesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: string, subcategories: string[]) => void;
  onDeleteCategory: (category: string) => void;
  categories: Record<string, string[]>;
}

const ManageCategoriesDialog: React.FC<ManageCategoriesDialogProps> = ({
  isOpen,
  onClose,
  onAddCategory,
  onDeleteCategory,
  categories
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategories, setNewSubcategories] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Veuillez saisir un nom de catégorie");
      return;
    }

    if (categories[newCategory]) {
      toast.error("Cette catégorie existe déjà");
      return;
    }

    const subcategories = newSubcategories
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    onAddCategory(newCategory, subcategories);
    setNewCategory("");
    setNewSubcategories("");
    toast.success(`Catégorie "${newCategory}" ajoutée avec succès`);
  };

  const handleDeleteCategory = (category: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category}" ?`)) {
      onDeleteCategory(category);
      toast.success(`Catégorie "${category}" supprimée avec succès`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestion des catégories</DialogTitle>
          <DialogDescription>
            Ajoutez ou supprimez des catégories de produits pour l'inventaire.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Ajouter une nouvelle catégorie */}
          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-medium">Ajouter une nouvelle catégorie</h3>
            <div className="space-y-2">
              <Label htmlFor="newCategory">Nom de la catégorie</Label>
              <Input
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Ex: Périphériques"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newSubcategories">Sous-catégories (séparées par des virgules)</Label>
              <Input
                id="newSubcategories"
                value={newSubcategories}
                onChange={(e) => setNewSubcategories(e.target.value)}
                placeholder="Ex: Claviers, Souris, Écrans"
              />
            </div>
            <CustomButton onClick={handleAddCategory}>
              <Plus size={16} className="mr-2" />
              Ajouter la catégorie
            </CustomButton>
          </div>

          {/* Liste des catégories existantes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Catégories existantes</h3>
            <div className="space-y-2">
              {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">{category}</span>
                    <div className="text-sm text-muted-foreground mt-1">
                      Sous-catégories: {subcategories.join(", ") || "Aucune"}
                    </div>
                  </div>
                  <CustomButton 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteCategory(category)}
                  >
                    <Trash2 size={16} />
                  </CustomButton>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <CustomButton variant="outline" onClick={onClose}>Fermer</CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCategoriesDialog;
