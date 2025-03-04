
import { useInventoryBasicState } from "./useInventoryBasicState";
import { useInventoryFilters } from "./useInventoryFilters";
import { useInventoryItems } from "./useInventoryItems";
import { useCategoryManagement } from "./useCategoryManagement";
import { useUserPermissions } from "./useUserPermissions";

export const useInventoryState = () => {
  const {
    inventory,
    setInventory,
    viewMode,
    currentItem,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isCategoriesDialogOpen,
    setIsCategoriesDialogOpen,
    handleViewDetail,
    handleBackToList
  } = useInventoryBasicState();

  const {
    currentUser,
    availableUsers,
    hasPermission,
    handleUserChange
  } = useUserPermissions();

  const {
    searchTerm,
    filteredInventory,
    activeCategory,
    handleSearch,
    filterByCategory
  } = useInventoryFilters(inventory);

  const {
    productCategories,
    handleOpenCategoriesDialog,
    handleAddCategory,
    handleDeleteCategory
  } = useCategoryManagement(hasPermission, currentUser);

  const {
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
  } = useInventoryItems(inventory, setInventory, hasPermission, currentUser);

  const handleOpenAddDialog = () => {
    if (handleAddItem()) {
      setIsAddDialogOpen(true);
    }
  };

  const openCategoriesDialog = () => {
    if (handleOpenCategoriesDialog()) {
      setIsCategoriesDialogOpen(true);
    }
  };

  const handleCategoryDelete = (category: string) => {
    const deletedCategory = handleDeleteCategory(category);
    if (deletedCategory && activeCategory === deletedCategory) {
      filterByCategory(null);
    }
  };

  const handleItemSubmit = () => {
    if (handleSubmit()) {
      setIsAddDialogOpen(false);
    }
  };

  return {
    // Basic state
    searchTerm,
    filteredInventory,
    activeCategory,
    viewMode,
    currentItem,
    isAddDialogOpen,
    isCategoriesDialogOpen,
    isEditDialogOpen,
    newItem,
    itemToEdit,
    currentUser,
    availableUsers,
    productCategories,
    
    // Functions
    hasPermission,
    handleSearch,
    filterByCategory,
    handleViewDetail,
    handleAddItem: handleOpenAddDialog,
    handleEditItem,
    handleDeleteItem,
    handleExportInventory,
    handleInputChange,
    handleSelectChange,
    handleSubmit: handleItemSubmit,
    handleUserChange,
    handleBackToList,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    handleOpenCategoriesDialog: openCategoriesDialog,
    setIsCategoriesDialogOpen,
    handleAddCategory,
    handleDeleteCategory: handleCategoryDelete,
    handleUpdateItem,
    handleEditInputChange,
    handleEditSelectChange
  };
};
