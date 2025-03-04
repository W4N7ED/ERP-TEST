
import Navbar from "@/components/layout/Navbar";
import AddItemDialog from "@/components/inventory/dialog/AddItemDialog";
import EditItemDialog from "@/components/inventory/dialog/EditItemDialog";
import ManageCategoriesDialog from "@/components/inventory/dialog/ManageCategoriesDialog";
import CategoryCards from "@/components/inventory/CategoryCards";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryDetail from "@/components/inventory/InventoryDetail";
import InventoryFilters from "@/components/inventory/InventoryFilters";
import InventoryActions from "@/components/inventory/InventoryActions";
import { useInventoryState } from "@/hooks/useInventoryState";

const Inventory = () => {
  const {
    searchTerm,
    filteredInventory,
    activeCategory,
    viewMode,
    currentItem,
    isAddDialogOpen,
    isEditDialogOpen,
    isCategoriesDialogOpen,
    newItem,
    itemToEdit,
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
    setIsEditDialogOpen,
    handleOpenCategoriesDialog,
    setIsCategoriesDialogOpen,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateItem,
    handleEditInputChange,
    handleEditSelectChange
  } = useInventoryState();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 p-6 container max-w-screen-2xl mx-auto pt-20">
        <InventoryActions 
          onAddItem={handleAddItem}
          onExportInventory={handleExportInventory}
          onManageCategories={handleOpenCategoriesDialog}
          currentUser={currentUser}
          availableUsers={availableUsers}
          onUserChange={handleUserChange}
          hasAddPermission={hasPermission('inventory.add')}
          hasExportPermission={hasPermission('inventory.export')}
          hasEditPermission={hasPermission('inventory.edit')}
        />

        <InventoryFilters 
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
        />

        {viewMode === "list" && (
          <>
            <CategoryCards 
              activeCategory={activeCategory} 
              onCategorySelect={filterByCategory}
              productCategories={productCategories}
            />
            <InventoryList 
              inventory={filteredInventory} 
              onViewDetail={handleViewDetail}
              canEdit={hasPermission('inventory.edit')}
              canDelete={hasPermission('inventory.delete')}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </>
        )}

        {viewMode === "detail" && currentItem && (
          <InventoryDetail 
            item={currentItem} 
            onBack={handleBackToList}
            canEdit={hasPermission('inventory.edit')}
            onEditItem={() => handleEditItem(currentItem)}
          />
        )}

        <AddItemDialog 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          newItem={newItem}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
        />

        <EditItemDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          item={itemToEdit}
          onInputChange={handleEditInputChange}
          onSelectChange={handleEditSelectChange}
          onSubmit={handleUpdateItem}
        />

        <ManageCategoriesDialog
          isOpen={isCategoriesDialogOpen}
          onClose={() => setIsCategoriesDialogOpen(false)}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          categories={productCategories}
        />
      </div>
    </div>
  );
};

export default Inventory;
