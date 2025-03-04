
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Supplier, inventoryMock } from "@/types/inventory";
import { Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactCard from "./detail/ContactCard";
import StatsCard from "./detail/StatsCard";
import NotesCard from "./detail/NotesCard";
import SupplierProductsTab from "./detail/SupplierProductsTab";
import OrderHistoryTab from "./detail/OrderHistoryTab";

interface SupplierDetailProps {
  supplier: Supplier;
  onBack: () => void;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplier, onBack }) => {
  // Get all products from this supplier
  const supplierProducts = inventoryMock.filter(item => item.supplier === supplier.id);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{supplier.name}</h2>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <Truck size={16} className="text-primary" />
            Fournisseur #{supplier.id}
          </p>
        </div>
        <CustomButton 
          variant="outline" 
          onClick={onBack}
        >
          Retour à la liste
        </CustomButton>
      </div>
      
      <Tabs defaultValue="info" className="mb-8">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="products">Produits ({supplierProducts.length})</TabsTrigger>
          <TabsTrigger value="history">Historique des commandes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact card */}
            <ContactCard supplier={supplier} />
            
            {/* Stats card */}
            <StatsCard productCount={supplierProducts.length} />
            
            {/* Additional info card */}
            <NotesCard />
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <SupplierProductsTab supplierProducts={supplierProducts} />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <OrderHistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDetail;
