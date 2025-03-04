
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InventoryItem, productCategories } from "@/types/inventory";

interface BasicInfoFieldsProps {
  newItem: Partial<InventoryItem>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  newItem,
  onInputChange,
  onSelectChange
}) => {
  return (
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
  );
};

export default BasicInfoFields;
