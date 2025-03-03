
import { useState, useEffect } from "react";
import { InventoryItem } from "@/types/inventory";
import { filterInventory } from "@/utils/inventoryUtils";

export const useInventoryFilters = (inventory: InventoryItem[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredInventory, setFilteredInventory] = useState(inventory);
  
  useEffect(() => {
    applyFilters(searchTerm, activeCategory);
  }, [inventory, searchTerm, activeCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
  };

  const applyFilters = (term: string, category: string | null) => {
    const filtered = filterInventory(inventory, term, category);
    setFilteredInventory(filtered);
  };

  return {
    searchTerm,
    filteredInventory,
    activeCategory,
    handleSearch,
    filterByCategory
  };
};
