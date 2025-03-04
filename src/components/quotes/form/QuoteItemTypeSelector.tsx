
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inventoryMock } from "@/types/inventory";

interface QuoteItemTypeSelectorProps {
  type: string;
  selectedInventoryItem: string;
  onTypeChange: (value: string) => void;
  onInventoryItemChange: (id: string) => void;
}

const QuoteItemTypeSelector: React.FC<QuoteItemTypeSelectorProps> = ({
  type,
  selectedInventoryItem,
  onTypeChange,
  onInventoryItemChange
}) => {
  // Filtrer les articles d'inventaire pour les produits
  const inventoryItems = inventoryMock.filter(item => item.quantity > 0);
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="type">Type d'article*</Label>
        <Select 
          value={type} 
          onValueChange={onTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Produit">Produit</SelectItem>
            <SelectItem value="Service">Service</SelectItem>
            <SelectItem value="Forfait">Forfait</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {type === "Produit" && (
        <div className="space-y-2">
          <Label htmlFor="inventoryItem">Produit de l'inventaire</Label>
          <Select 
            value={selectedInventoryItem} 
            onValueChange={onInventoryItemChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un produit" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {inventoryItems.map(item => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name} - {item.sellingPrice?.toFixed(2) || "N/A"} € ({item.quantity} en stock)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default QuoteItemTypeSelector;
