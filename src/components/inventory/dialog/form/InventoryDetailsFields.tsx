
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InventoryItem, ProductStatus, StockLocation, suppliersMock } from "@/types/inventory";

interface InventoryDetailsFieldsProps {
  newItem: Partial<InventoryItem>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const InventoryDetailsFields: React.FC<InventoryDetailsFieldsProps> = ({
  newItem,
  onInputChange,
  onSelectChange
}) => {
  return (
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
  );
};

export default InventoryDetailsFields;
