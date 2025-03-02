
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { InventoryItem, inventoryMock } from "@/types/inventory";
import CategoryCards from "@/components/inventory/CategoryCards";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryDetail from "@/components/inventory/InventoryDetail";
import AddItemDialog from "@/components/inventory/AddItemDialog";

const Inventory = () => {
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

  // Filter management
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterInventory(term, activeCategory);
  };

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
    filterInventory(searchTerm, category);
  };

  const filterInventory = (term: string, category: string | null) => {
    let filtered = inventoryMock;
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Apply search term filter
    if (term.trim() !== "") {
      filtered = filtered.filter(
        item => 
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.brand.toLowerCase().includes(term.toLowerCase()) ||
          item.model.toLowerCase().includes(term.toLowerCase()) ||
          item.reference.toLowerCase().includes(term.toLowerCase()) ||
          (item.serialNumber && item.serialNumber.toLowerCase().includes(term.toLowerCase())) ||
          item.location.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredInventory(filtered);
  };

  const handleViewDetail = (item: InventoryItem) => {
    setCurrentItem(item);
    setViewMode("detail");
  };

  const handleAddItem = () => {
    // Reset the form fields
    setNewItem({
      status: "Neuf",
      location: "Magasin central",
      entryDate: new Date().toISOString().split('T')[0]
    });
    setIsAddDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = () => {
    // Here we would normally send the data to the backend
    console.log("New item to save:", newItem);
    setIsAddDialogOpen(false);
    // In a real application, we would add the item to the inventory after saving
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 p-6 container max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion de l'inventaire</h1>
          <CustomButton onClick={handleAddItem}>
            <Plus size={16} className="mr-2" />
            Nouvel article
          </CustomButton>
        </div>

        {/* Search and filter bar */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Rechercher un article par nom, référence, marque..." 
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <CustomButton variant="outline">
            <Filter size={16} className="mr-2" />
            Filtres avancés
          </CustomButton>
        </div>

        {/* Main content area */}
        {viewMode === "list" && (
          <>
            <CategoryCards 
              activeCategory={activeCategory} 
              onCategorySelect={filterByCategory} 
            />
            <InventoryList 
              inventory={filteredInventory} 
              onViewDetail={handleViewDetail} 
            />
          </>
        )}

        {viewMode === "detail" && currentItem && (
          <InventoryDetail 
            item={currentItem} 
            onBack={() => setViewMode("list")} 
          />
        )}

        {/* Add Item Dialog */}
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
