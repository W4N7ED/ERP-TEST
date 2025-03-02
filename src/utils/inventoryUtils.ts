
import { InventoryItem } from "@/types/inventory";

export const filterInventory = (
  items: InventoryItem[],
  searchTerm: string,
  category: string | null
): InventoryItem[] => {
  let filtered = items;
  
  if (category) {
    filtered = filtered.filter(item => item.category === category);
  }
  
  if (searchTerm.trim() !== "") {
    filtered = filtered.filter(
      item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.serialNumber && item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered;
};
