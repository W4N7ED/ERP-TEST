
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Package,
  Printer,
  Laptop,
  HardDrive,
  Cpu,
  Router,
  AlertCircle
} from "lucide-react";

// Mock data for inventory items
const inventoryMock = [
  {
    id: 1,
    name: "SSD Kingston A2000 500GB",
    category: "SSD / HDD",
    quantity: 15,
    threshold: 5,
    location: "Étagère A-3",
    lastUpdated: "2023-09-08"
  },
  {
    id: 2,
    name: "Imprimante HP LaserJet Pro",
    category: "Imprimantes",
    quantity: 3,
    threshold: 2,
    location: "Étagère D-1",
    lastUpdated: "2023-09-05"
  },
  {
    id: 3,
    name: "Lenovo ThinkPad T14",
    category: "PC Portables",
    quantity: 7,
    threshold: 3,
    location: "Armoire B-2",
    lastUpdated: "2023-09-10"
  },
  {
    id: 4,
    name: "Mémoire RAM Crucial 8GB DDR4",
    category: "RAM",
    quantity: 22,
    threshold: 10,
    location: "Tiroir C-4",
    lastUpdated: "2023-09-11"
  },
  {
    id: 5,
    name: "Switch Cisco 24 ports",
    category: "Switchs",
    quantity: 2,
    threshold: 2,
    location: "Étagère E-1",
    lastUpdated: "2023-09-07"
  },
  {
    id: 6,
    name: "Routeur Ubiquiti EdgeRouter",
    category: "Routeurs",
    quantity: 4,
    threshold: 2,
    location: "Étagère E-2",
    lastUpdated: "2023-09-09"
  },
  {
    id: 7,
    name: "Dell OptiPlex 7080",
    category: "PC Fixes",
    quantity: 5,
    threshold: 3,
    location: "Armoire B-1",
    lastUpdated: "2023-09-06"
  },
  {
    id: 8,
    name: "Câble réseau Cat 6 (5m)",
    category: "Câbles",
    quantity: 30,
    threshold: 15,
    location: "Tiroir D-3",
    lastUpdated: "2023-09-12"
  }
];

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "SSD / HDD": <HardDrive size={18} />,
  "Imprimantes": <Printer size={18} />,
  "PC Portables": <Laptop size={18} />,
  "PC Fixes": <Cpu size={18} />,
  "RAM": <Cpu size={18} />,
  "Routeurs": <Router size={18} />,
  "Switchs": <Router size={18} />,
  "Câbles": <Package size={18} />
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(inventoryMock);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredInventory(inventoryMock);
    } else {
      const filtered = inventoryMock.filter(
        item => 
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.category.toLowerCase().includes(term.toLowerCase()) ||
          item.location.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };
  
  const isLowStock = (item: typeof inventoryMock[0]) => {
    return item.quantity <= item.threshold;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Inventaire</h1>
            <p className="text-muted-foreground mt-1">Gestion du stock informatique</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <CustomButton 
              variant="primary" 
              icon={<Plus size={16} />}
            >
              Ajouter un article
            </CustomButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {["SSD / HDD", "Imprimantes", "PC Portables", "Câbles"].map((category) => (
            <div 
              key={category}
              className="card-glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:translate-y-[-2px] transition-all duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold">{category}</h3>
                <p className="text-muted-foreground mt-1">
                  {filteredInventory.filter(item => item.category === category).length} articles
                </p>
              </div>
              <div className="text-primary bg-primary/10 p-3 rounded-full">
                {categoryIcons[category] || <Package size={18} />}
              </div>
            </div>
          ))}
        </div>
        
        <div className="card-glass rounded-xl mb-8">
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <CustomButton variant="outline" icon={<Filter size={16} />}>
                  Filtrer
                </CustomButton>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Article</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Emplacement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dernière MàJ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        {item.name}
                        {isLowStock(item) && (
                          <AlertCircle size={16} className="inline-block ml-2 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm">
                        <span className="mr-2">
                          {categoryIcons[item.category] || <Package size={18} />}
                        </span>
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${isLowStock(item) ? 'text-amber-600' : ''}`}>
                        {item.quantity} {isLowStock(item) && `(Seuil: ${item.threshold})`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{item.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(item.lastUpdated).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <CustomButton variant="ghost" className="h-8 px-2 text-primary">Ajuster</CustomButton>
                      <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">Détails</CustomButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredInventory.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucun article trouvé</p>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de <span className="font-medium">{filteredInventory.length}</span> articles
            </p>
            
            <div className="flex gap-2">
              <CustomButton variant="outline" size="sm" disabled>Précédent</CustomButton>
              <CustomButton variant="outline" size="sm" className="bg-primary/5">1</CustomButton>
              <CustomButton variant="outline" size="sm">Suivant</CustomButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
