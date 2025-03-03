
import { useState } from "react";
import { InventoryItem, inventoryMock } from "@/types/inventory";

export const useInventoryBasicState = () => {
  const [inventory, setInventory] = useState(inventoryMock);
  const [viewMode, setViewMode] = useState<"list" | "card" | "detail">("list");
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCategoriesDialogOpen, setIsCategoriesDialogOpen] = useState(false);
  
  const handleViewDetail = (item: InventoryItem) => {
    setCurrentItem(item);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  return {
    inventory,
    setInventory,
    viewMode,
    setViewMode,
    currentItem,
    setCurrentItem,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isCategoriesDialogOpen,
    setIsCategoriesDialogOpen,
    handleViewDetail,
    handleBackToList
  };
};
