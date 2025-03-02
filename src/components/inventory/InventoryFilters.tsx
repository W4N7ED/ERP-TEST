
import React from "react";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/custom-button";
import { Search, Filter } from "lucide-react";

interface InventoryFiltersProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InventoryFilters: React.FC<InventoryFiltersProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Rechercher un article par nom, référence, marque..." 
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-10"
        />
      </div>
      <CustomButton variant="outline">
        <Filter size={16} className="mr-2" />
        Filtres avancés
      </CustomButton>
    </div>
  );
};

export default InventoryFilters;
