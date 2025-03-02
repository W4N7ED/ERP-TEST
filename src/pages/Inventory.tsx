import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, UserCircle2 } from "lucide-react";
import { InventoryItem, inventoryMock } from "@/types/inventory";
import CategoryCards from "@/components/inventory/CategoryCards";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryDetail from "@/components/inventory/InventoryDetail";
import AddItemDialog from "@/components/inventory/AddItemDialog";
import { usePermissions } from "@/hooks/usePermissions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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
  
  const { currentUser, hasPermission, switchUser, availableUsers } = usePermissions();

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
    
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }
    
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 p-6 container max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion de l'inventaire</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-muted/30 p-2 rounded-lg">
              <UserCircle2 className="mr-2 text-muted-foreground" size={20} />
              <Select value={currentUser.id.toString()} onValueChange={handleUserChange}>
                <SelectTrigger className="border-0 bg-transparent focus:ring-0 w-[180px]">
                  <SelectValue placeholder="Changer d'utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <CustomButton 
              onClick={handleAddItem} 
              disabled={!hasPermission('inventory.add')}
              title={!hasPermission('inventory.add') ? "Vous n'avez pas les droits" : undefined}
            >
              <Plus size={16} className="mr-2" />
              Nouvel article
            </CustomButton>
            
            {hasPermission('inventory.export') && (
              <CustomButton 
                variant="outline" 
                onClick={handleExportInventory}
              >
                Exporter
              </CustomButton>
            )}
          </div>
        </div>

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
            onBack={() => setViewMode("list")}
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
