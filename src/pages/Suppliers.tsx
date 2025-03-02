
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { Supplier, suppliersMock } from "@/types/inventory";
import SuppliersList from "@/components/suppliers/SuppliersList";
import SupplierDetail from "@/components/suppliers/SupplierDetail";
import AddSupplierDialog from "@/components/suppliers/AddSupplierDialog";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliersMock);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    deliveryTime: 3
  });

  // Filter management
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterSuppliers(term);
  };

  const filterSuppliers = (term: string) => {
    if (term.trim() === "") {
      setFilteredSuppliers(suppliersMock);
      return;
    }
    
    const filtered = suppliersMock.filter(
      supplier => 
        supplier.name.toLowerCase().includes(term.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(term.toLowerCase()) ||
        supplier.email.toLowerCase().includes(term.toLowerCase()) ||
        supplier.phone.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredSuppliers(filtered);
  };

  const handleViewDetail = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setViewMode("detail");
  };

  const handleAddSupplier = () => {
    // Reset the form fields
    setNewSupplier({
      deliveryTime: 3
    });
    setIsAddDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setNewSupplier({ ...newSupplier, [name]: numValue });
    }
  };

  const handleSubmit = () => {
    // Here we would normally send the data to the backend
    console.log("New supplier to save:", newSupplier);
    setIsAddDialogOpen(false);
    // In a real application, we would add the supplier to the list after saving
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 p-6 container max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion des fournisseurs</h1>
          <CustomButton onClick={handleAddSupplier}>
            <Plus size={16} className="mr-2" />
            Nouveau fournisseur
          </CustomButton>
        </div>

        {/* Search and filter bar */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Rechercher un fournisseur par nom, contact, email..." 
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
          <SuppliersList 
            suppliers={filteredSuppliers} 
            onViewDetail={handleViewDetail} 
          />
        )}

        {viewMode === "detail" && currentSupplier && (
          <SupplierDetail 
            supplier={currentSupplier} 
            onBack={() => setViewMode("list")} 
          />
        )}

        {/* Add Supplier Dialog */}
        <AddSupplierDialog 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          newSupplier={newSupplier}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onNumberChange={handleNumberChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Suppliers;
