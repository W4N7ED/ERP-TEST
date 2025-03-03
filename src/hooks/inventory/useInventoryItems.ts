
import { useState } from "react";
import { InventoryItem } from "@/types/inventory";
import { toast } from "sonner";

export const useInventoryItems = (
  inventory: InventoryItem[], 
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>,
  hasPermission: (permission: string) => boolean,
  currentUser: { name: string }
) => {
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    status: "Neuf",
    location: "Magasin central",
    entryDate: new Date().toISOString().split('T')[0]
  });
  
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
    return true;
  };

  const handleEditItem = (item: InventoryItem) => {
    if (!hasPermission('inventory.edit')) {
      toast.error(`${currentUser.name} n'a pas les droits pour modifier des articles.`);
      return;
    }
    
    setItemToEdit(item);
    setIsEditDialogOpen(true);
    console.log("Editing item:", item);
    return true;
  };

  const handleDeleteItem = (item: InventoryItem) => {
    if (!hasPermission('inventory.delete')) {
      toast.error(`${currentUser.name} n'a pas les droits pour supprimer des articles.`);
      return;
    }
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${item.name}" ?`)) {
      const updatedInventory = inventory.filter(i => i.id !== item.id);
      setInventory(updatedInventory);
      toast.success(`Article "${item.name}" supprimé avec succès`);
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
    
    toast.success(`Article "${newInventoryItem.name}" ajouté avec succès`);
    return true;
  };

  const handleUpdateItem = () => {
    if (!itemToEdit) return false;
    
    const itemIndex = inventory.findIndex(i => i.id === itemToEdit.id);
    if (itemIndex === -1) {
      toast.error("Article non trouvé");
      return false;
    }
    
    const updatedInventory = [...inventory];
    updatedInventory[itemIndex] = {
      ...itemToEdit,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInventory(updatedInventory);
    setIsEditDialogOpen(false);
    toast.success(`Article "${itemToEdit.name}" mis à jour avec succès`);
    return true;
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!itemToEdit) return;
    
    const { name, value } = e.target;
    setItemToEdit({
      ...itemToEdit,
      [name]: value
    });
  };

  const handleEditSelectChange = (name: string, value: string) => {
    if (!itemToEdit) return;
    
    setItemToEdit({
      ...itemToEdit,
      [name]: value
    });
  };

  return {
    newItem,
    itemToEdit,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    handleExportInventory,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleUpdateItem,
    handleEditInputChange,
    handleEditSelectChange
  };
};
