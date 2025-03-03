import { useState } from "react";
import { InventoryItem, inventoryMock, productCategories as initialProductCategories } from "@/types/inventory";
import { filterInventory } from "@/utils/inventoryUtils";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";

export const useInventoryState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(inventoryMock);
  const [inventory, setInventory] = useState(inventoryMock);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "card" | "detail">("list");
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCategoriesDialogOpen, setIsCategoriesDialogOpen] = useState(false);
  const [productCategories, setProductCategories] = useState(initialProductCategories);
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
    const filtered = filterInventory(inventory, term, category);
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
    if (!newItem.name || !newItem.reference || !newItem.brand || !newItem.model || !newItem.category) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const nextId = Math.max(...inventory.map(item => item.id)) + 1;
    const newInventoryItem: InventoryItem = {
      id: nextId,
      name: newItem.name || "",
      reference: newItem.reference || "",
      brand: newItem.brand || "",
      model: newItem.model || "",
      category: newItem.category || "",
      subcategory: newItem.subcategory,
      supplier: Number(newItem.supplier) || 1,
      supplierName: "TechDistribution",
      serialNumber: newItem.serialNumber || undefined,
      location: newItem.location as any || "Magasin central",
      status: newItem.status as any || "Neuf",
      entryDate: newItem.entryDate || new Date().toISOString().split('T')[0],
      warrantyEnd: newItem.warrantyEnd || undefined,
      quantity: Number(newItem.quantity) || 0,
      threshold: Number(newItem.threshold) || 0,
      maxStock: Number(newItem.maxStock) || undefined,
      unitCost: Number(newItem.unitCost) || undefined,
      sellingPrice: Number(newItem.sellingPrice) || undefined,
      description: newItem.description || undefined,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    const updatedInventory = [...inventory, newInventoryItem];
    setInventory(updatedInventory);
    
    applyFilters(searchTerm, activeCategory);
    
    toast.success(`Article "${newInventoryItem.name}" ajouté avec succès`);
    setIsAddDialogOpen(false);
  };

  const handleUserChange = (userId: string) => {
    switchUser(Number(userId));
    toast.info(`Utilisateur changé pour: ${availableUsers.find(u => u.id === Number(userId))?.name}`);
  };

  const handleBackToList = () => {
    setViewMode("list");
  };

  const handleOpenCategoriesDialog = () => {
    if (!hasPermission('inventory.edit')) {
      toast.error(`${currentUser.name} n'a pas les droits pour gérer les catégories.`);
      return;
    }
    setIsCategoriesDialogOpen(true);
  };

  const handleAddCategory = (category: string, subcategories: string[]) => {
    if (!category.trim()) {
      toast.error("Le nom de la catégorie ne peut pas être vide");
      return;
    }
    
    if (Object.keys(productCategories).includes(category)) {
      toast.error(`La catégorie "${category}" existe déjà`);
      return;
    }
    
    setProductCategories(prev => ({
      ...prev,
      [category]: subcategories
    }));
    
    toast.success(`Catégorie "${category}" ajoutée avec succès`);
  };

  const handleDeleteCategory = (category: string) => {
    const { [category]: _, ...rest } = productCategories;
    setProductCategories(rest);
    
    if (activeCategory === category) {
      setActiveCategory(null);
      applyFilters(searchTerm, null);
    }
    
    toast.success(`Catégorie "${category}" supprimée avec succès`);
  };

  return {
    searchTerm,
    filteredInventory,
    activeCategory,
    viewMode,
    currentItem,
    isAddDialogOpen,
    isCategoriesDialogOpen,
    newItem,
    currentUser,
    availableUsers,
    productCategories,
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
    setIsAddDialogOpen,
    handleOpenCategoriesDialog,
    setIsCategoriesDialogOpen,
    handleAddCategory,
    handleDeleteCategory
  };
};
