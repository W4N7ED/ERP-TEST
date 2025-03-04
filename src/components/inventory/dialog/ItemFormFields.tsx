
import React from "react";
import { InventoryItem } from "@/types/inventory";
import BasicInfoFields from "./form/BasicInfoFields";
import InventoryDetailsFields from "./form/InventoryDetailsFields";

interface ItemFormFieldsProps {
  newItem: Partial<InventoryItem>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const ItemFormFields: React.FC<ItemFormFieldsProps> = ({
  newItem,
  onInputChange,
  onSelectChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <BasicInfoFields 
        newItem={newItem}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
      />
      
      <InventoryDetailsFields
        newItem={newItem}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
      />
    </div>
  );
};

export default ItemFormFields;
