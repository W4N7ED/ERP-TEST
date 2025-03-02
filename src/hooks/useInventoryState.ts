
import { useState } from "react";
import { InventoryItem, inventoryMock } from "@/types/inventory";
import { filterInventory } from "@/utils/inventoryUtils";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";

export const useInventoryState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(inventoryMock);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "card" | "detail">("list");
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    status: "Neuf",
    location: "Magasin central",
    entryDate: new Date().toISOString().split('T')[0]
  });
  
  const { currentUser, hasPermission, switchUser, availableUsers } = usePermissions();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, activeCategory);
  };

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
    applyFilters(searchTerm, category);
  };

  const applyFilters = (term: string, category: string | null) => {
    const filtered = filterInventory(inventoryMock, term, category);
    setFilteredInventory(filtered);
  };

  const handleViewDetail = (item: InventoryItem) => {
    setCurrentItem(item);
    setViewMode("detail");
  };

  const handleAddItem = () => {
    if (!hasPermission('inventory.add')) {
      toast.error(`${currentUser.name} n'a pas les droits pour ajouter des articles.`);
      return;
    }
    
    setNewItem({
      status: "Neuf",
      location: "Magasin central",
      entryDate: new Date().toISOString().split('T')[0]
    });
    setIsAddDialogOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    if (!hasPermission('inventory.edit')) {
      toast.error(`${currentUser.name} n'a pas les droits pour modifier des articles.`);
      return;
    }
    console.log("Editing item:", item);
  };

  const handleDeleteItem = (item: InventoryItem) => {
    if (!hasPermission('inventory.delete')) {
      toast.error(`${currentUser.name} n'a pas les droits pour supprimer des articles.`);
      return;
    }
    console.log("Deleting item:", item);
  };

  const handleExportInventory = () => {
    if (!hasPermission('inventory.export')) {
      toast.error(`${currentUser.name} n'a pas les droits pour exporter l'inventaire.`);
      return;
    }
    toast.success("Export de l'inventaire en cours...");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = () => {
    console.log("New item to save:", newItem);
    setIsAddDialogOpen(false);
  };

  const handleUserChange = (userId: string) => {
    switchUser(Number(userId));
    toast.info(`Utilisateur changé pour: ${availableUsers.find(u => u.id === Number(userId))?.name}`);
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  return {
    searchTerm,
    filteredInventory,
    activeCategory,
    viewMode,
    currentItem,
    isAddDialogOpen,
    newItem,
    currentUser,
    availableUsers,
    hasPermission,
    handleSearch,
    filterByCategory,
    handleViewDetail,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    handleExportInventory,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleUserChange,
    handleBackToList,
    setIsAddDialogOpen
  };
};
