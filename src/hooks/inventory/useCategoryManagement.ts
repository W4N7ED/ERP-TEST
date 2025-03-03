
import { useState } from "react";
import { productCategories as initialProductCategories } from "@/types/inventory";
import { toast } from "sonner";

export const useCategoryManagement = (
  hasPermission: (permission: string) => boolean,
  currentUser: { name: string }
) => {
  const [productCategories, setProductCategories] = useState(initialProductCategories);

  const handleOpenCategoriesDialog = () => {
    if (!hasPermission('inventory.edit')) {
      toast.error(`${currentUser.name} n'a pas les droits pour gérer les catégories.`);
      return false;
    }
    return true;
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
    
    toast.success(`Catégorie "${category}" supprimée avec succès`);
    return category;
  };

  return {
    productCategories,
    handleOpenCategoriesDialog,
    handleAddCategory,
    handleDeleteCategory
  };
};
