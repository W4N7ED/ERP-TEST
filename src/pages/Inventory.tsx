
import { Navbar } from "@/components/layout/Navbar";
import AddItemDialog from "@/components/inventory/dialog/AddItemDialog";
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
  } = useInventoryState();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 p-6 container max-w-screen-2xl mx-auto">
        <InventoryActions 
          onAddItem={handleAddItem}
          onExportInventory={handleExportInventory}
          currentUser={currentUser}
          availableUsers={availableUsers}
          onUserChange={handleUserChange}
          hasAddPermission={hasPermission('inventory.add')}
          hasExportPermission={hasPermission('inventory.export')}
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
      </div>
    </div>
  );
};

export default Inventory;
