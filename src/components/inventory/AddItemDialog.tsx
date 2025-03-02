
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InventoryItem, productCategories, ProductStatus, StockLocation, suppliersMock } from "@/types/inventory";

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Ex: SSD Samsung 970 EVO Plus 1TB" 
                value={newItem.name || ""} 
                onChange={onInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Référence</Label>
              <Input 
                id="reference" 
                name="reference" 
                placeholder="Ex: SSD-SAM-970P-1TB" 
                value={newItem.reference || ""} 
                onChange={onInputChange} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marque</Label>
                <Input 
                  id="brand" 
                  name="brand" 
                  placeholder="Ex: Samsung" 
                  value={newItem.brand || ""} 
                  onChange={onInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modèle</Label>
                <Input 
                  id="model" 
                  name="model" 
                  placeholder="Ex: 970 EVO Plus" 
                  value={newItem.model || ""} 
                  onChange={onInputChange} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={newItem.category || ""}
                  onValueChange={(value) => onSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(productCategories).map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subcategory">Sous-catégorie</Label>
                <Select
                  value={newItem.subcategory || ""}
                  onValueChange={(value) => onSelectChange("subcategory", value)}
                  disabled={!newItem.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {newItem.category && productCategories[newItem.category]?.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Numéro de série</Label>
              <Input 
                id="serialNumber" 
                name="serialNumber" 
                placeholder="Optionnel" 
                value={newItem.serialNumber || ""} 
                onChange={onInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                rows={3}
                placeholder="Description détaillée du produit..." 
                value={newItem.description || ""} 
                onChange={onInputChange} 
              />
            </div>
          </div>
          
          {/* Second column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantité</Label>
                <Input 
                  id="quantity" 
                  name="quantity" 
                  type="number" 
                  placeholder="0" 
                  value={newItem.quantity || ""} 
                  onChange={onInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Seuil d'alerte</Label>
                <Input 
                  id="threshold" 
                  name="threshold" 
                  type="number" 
                  placeholder="0" 
                  value={newItem.threshold || ""} 
                  onChange={onInputChange} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unitCost">Coût unitaire (€)</Label>
                <Input 
                  id="unitCost" 
                  name="unitCost" 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  value={newItem.unitCost || ""} 
                  onChange={onInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellingPrice">Prix de vente (€)</Label>
                <Input 
                  id="sellingPrice" 
                  name="sellingPrice" 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  value={newItem.sellingPrice || ""} 
                  onChange={onInputChange} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Fournisseur</Label>
              <Select
                value={newItem.supplier?.toString() || ""}
                onValueChange={(value) => onSelectChange("supplier", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un fournisseur" />
                </SelectTrigger>
                <SelectContent>
                  {suppliersMock.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">État</Label>
              <Select
                value={newItem.status || "Neuf"}
                onValueChange={(value) => onSelectChange("status", value as ProductStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Neuf">Neuf</SelectItem>
                  <SelectItem value="Occasion">Occasion</SelectItem>
                  <SelectItem value="Défectueux">Défectueux</SelectItem>
                  <SelectItem value="À réparer">À réparer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <Select
                value={newItem.location || "Magasin central"}
                onValueChange={(value) => onSelectChange("location", value as StockLocation)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'emplacement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Magasin central">Magasin central</SelectItem>
                  <SelectItem value="Entrepôt">Entrepôt</SelectItem>
                  <SelectItem value="Technicien">Technicien</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entryDate">Date d'entrée</Label>
                <Input 
                  id="entryDate" 
                  name="entryDate" 
                  type="date" 
                  value={newItem.entryDate || new Date().toISOString().split('T')[0]} 
                  onChange={onInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warrantyEnd">Fin de garantie</Label>
                <Input 
                  id="warrantyEnd" 
                  name="warrantyEnd" 
                  type="date" 
                  value={newItem.warrantyEnd || ""} 
                  onChange={onInputChange} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <CustomButton variant="outline" onClick={onClose}>Annuler</CustomButton>
          <CustomButton onClick={onSubmit}>Ajouter l'article</CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
