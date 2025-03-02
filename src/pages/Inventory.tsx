
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  AlertCircle,
  Wrench,
  Edit,
  History,
  Trash2,
  BarChart,
  ArrowUpDown,
  ShoppingCart,
  Building,
  Tag,
  Save,
  Eye,
  RefreshCcw,
  Bookmark,
  Calendar,
  Clock,
  DollarSign,
  Truck,
  ShieldCheck,
  Server,
  Battery,
  Cable
} from "lucide-react";

// Types for inventory management
type ProductStatus = "Neuf" | "Occasion" | "Défectueux" | "À réparer";
type StockLocation = "Magasin central" | "Entrepôt" | "Technicien";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  deliveryTime: number; // Average delivery time in days
}

interface ProductMovement {
  id: number;
  date: string;
  type: "Entrée" | "Sortie" | "Transfert" | "Retour SAV";
  quantity: number;
  user: string;
  reason: string;
  sourceLocation?: StockLocation;
  destinationLocation?: StockLocation;
  relatedIntervention?: number;
}

// Extended inventory item model
interface InventoryItem {
  id: number;
  name: string;
  reference: string; // SKU/Internal reference
  brand: string;
  model: string;
  category: string;
  subcategory?: string;
  supplier: number; // Supplier ID
  supplierName?: string; // For display purposes
  serialNumber?: string;
  location: StockLocation;
  status: ProductStatus;
  entryDate: string;
  warrantyEnd?: string;
  quantity: number;
  threshold: number; // Minimum stock
  maxStock?: number; // Maximum stock
  unitCost?: number;
  sellingPrice?: number;
  description?: string;
  lastUpdated: string;
  movements?: ProductMovement[];
  assignedTo?: string; // Technician or project name
}

// Category and subcategory structure
const productCategories = {
  "Imprimantes": ["Laser", "Jet d'encre", "3D", "Multifonction", "Accessoires"],
  "Stockage": ["SSD", "HDD", "NAS", "Clés USB", "Cartes SD"],
  "Réseau": ["Routeurs", "Switchs", "Access Points", "Câbles", "Modems"],
  "Mémoire": ["RAM", "Cartes SD", "Mémoire Flash"],
  "Ordinateurs": ["PC Fixes", "PC Portables", "Stations de travail", "Serveurs", "Mini PC"],
  "Accessoires": ["Câbles", "Cartouches", "Batteries", "Chargeurs", "Adaptateurs"],
  "Composants": ["Cartes mères", "Processeurs", "Cartes graphiques", "Alimentations"]
};

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Imprimantes": <Printer size={18} />,
  "Stockage": <HardDrive size={18} />,
  "Réseau": <Router size={18} />,
  "Mémoire": <Memory size={18} />,
  "Ordinateurs": <Laptop size={18} />,
  "Accessoires": <Cable size={18} />,
  "Composants": <Cpu size={18} />
};

// Extended mock data for inventory items
const inventoryMock: InventoryItem[] = [
  {
    id: 1,
    name: "SSD Kingston A2000 500GB",
    reference: "SSD-KST-A2000-500",
    brand: "Kingston",
    model: "A2000",
    category: "Stockage",
    subcategory: "SSD",
    supplier: 1,
    supplierName: "TechDistribution",
    serialNumber: "KST5012345678",
    location: "Magasin central",
    status: "Neuf",
    entryDate: "2023-08-15",
    warrantyEnd: "2025-08-15",
    quantity: 15,
    threshold: 5,
    maxStock: 20,
    unitCost: 65.50,
    sellingPrice: 89.99,
    description: "SSD NVMe M.2 haute performance",
    lastUpdated: "2023-09-08"
  },
  {
    id: 2,
    name: "Imprimante HP LaserJet Pro",
    reference: "PRT-HP-LJ-P2035",
    brand: "HP",
    model: "LaserJet Pro P2035",
    category: "Imprimantes",
    subcategory: "Laser",
    supplier: 2,
    supplierName: "HP Direct",
    serialNumber: "HPLJP2035789456",
    location: "Entrepôt",
    status: "Neuf",
    entryDate: "2023-07-22",
    warrantyEnd: "2025-07-22",
    quantity: 3,
    threshold: 2,
    maxStock: 5,
    unitCost: 229.99,
    sellingPrice: 299.99,
    description: "Imprimante laser monochrome pour entreprise",
    lastUpdated: "2023-09-05"
  },
  {
    id: 3,
    name: "Lenovo ThinkPad T14",
    reference: "PC-LNV-TP-T14",
    brand: "Lenovo",
    model: "ThinkPad T14",
    category: "Ordinateurs",
    subcategory: "PC Portables",
    supplier: 3,
    supplierName: "Lenovo Business",
    serialNumber: "LNV-T14-987654321",
    location: "Magasin central",
    status: "Neuf",
    entryDate: "2023-08-01",
    warrantyEnd: "2026-08-01",
    quantity: 7,
    threshold: 3,
    maxStock: 10,
    unitCost: 1200,
    sellingPrice: 1499.99,
    description: "Ordinateur portable professionnel, i5, 16Go RAM, 512Go SSD",
    lastUpdated: "2023-09-10"
  },
  {
    id: 4,
    name: "Mémoire RAM Crucial 8GB DDR4",
    reference: "RAM-CRU-8G-DDR4",
    brand: "Crucial",
    model: "DDR4-3200",
    category: "Mémoire",
    subcategory: "RAM",
    supplier: 1,
    supplierName: "TechDistribution",
    serialNumber: null,
    location: "Magasin central",
    status: "Neuf",
    entryDate: "2023-08-20",
    warrantyEnd: "2025-08-20",
    quantity: 22,
    threshold: 10,
    maxStock: 30,
    unitCost: 35.75,
    sellingPrice: 49.99,
    description: "Barrette mémoire 8GB DDR4 3200MHz",
    lastUpdated: "2023-09-11"
  },
  {
    id: 5,
    name: "Switch Cisco 24 ports",
    reference: "NET-CSO-SW-24",
    brand: "Cisco",
    model: "Catalyst 2960",
    category: "Réseau",
    subcategory: "Switchs",
    supplier: 4,
    supplierName: "Cisco Systems",
    serialNumber: "CSC29601234567",
    location: "Entrepôt",
    status: "Neuf",
    entryDate: "2023-06-15",
    warrantyEnd: "2025-06-15",
    quantity: 2,
    threshold: 2,
    maxStock: 4,
    unitCost: 450,
    sellingPrice: 599.99,
    description: "Switch manageable 24 ports Gigabit",
    lastUpdated: "2023-09-07"
  },
  {
    id: 6,
    name: "Routeur Ubiquiti EdgeRouter",
    reference: "NET-UBQ-ER-X",
    brand: "Ubiquiti",
    model: "EdgeRouter X",
    category: "Réseau",
    subcategory: "Routeurs",
    supplier: 5,
    supplierName: "Ubiquiti Store",
    serialNumber: "UBQERX7654321",
    location: "Magasin central",
    status: "Neuf",
    entryDate: "2023-07-10",
    warrantyEnd: "2025-07-10",
    quantity: 4,
    threshold: 2,
    maxStock: 6,
    unitCost: 85,
    sellingPrice: 119.99,
    description: "Routeur 5 ports Gigabit",
    lastUpdated: "2023-09-09"
  },
  {
    id: 7,
    name: "Dell OptiPlex 7080",
    reference: "PC-DEL-OP-7080",
    brand: "Dell",
    model: "OptiPlex 7080",
    category: "Ordinateurs",
    subcategory: "PC Fixes",
    supplier: 6,
    supplierName: "Dell Pro",
    serialNumber: "DELL708012345",
    location: "Entrepôt",
    status: "Neuf",
    entryDate: "2023-07-05",
    warrantyEnd: "2026-07-05",
    quantity: 5,
    threshold: 3,
    maxStock: 8,
    unitCost: 850,
    sellingPrice: 999.99,
    description: "PC de bureau i7, 16Go RAM, 1TB SSD",
    lastUpdated: "2023-09-06"
  },
  {
    id: 8,
    name: "Câble réseau Cat 6 (5m)",
    reference: "CBL-NET-CAT6-5",
    brand: "Generic",
    model: "CAT6-5M",
    category: "Accessoires",
    subcategory: "Câbles",
    supplier: 1,
    supplierName: "TechDistribution",
    serialNumber: null,
    location: "Magasin central",
    status: "Neuf",
    entryDate: "2023-08-25",
    warrantyEnd: null,
    quantity: 30,
    threshold: 15,
    maxStock: 50,
    unitCost: 5.75,
    sellingPrice: 9.99,
    description: "Câble Ethernet Cat 6 blindé 5 mètres",
    lastUpdated: "2023-09-12"
  }
];

// Suppliers mock data
const suppliersMock: Supplier[] = [
  { id: 1, name: "TechDistribution", contact: "Jean Dupont", email: "contact@techdistrib.fr", phone: "01 23 45 67 89", deliveryTime: 3 },
  { id: 2, name: "HP Direct", contact: "Marie Laurent", email: "b2b@hp.fr", phone: "01 98 76 54 32", deliveryTime: 5 },
  { id: 3, name: "Lenovo Business", contact: "Thomas Martin", email: "pro@lenovo.fr", phone: "01 45 67 89 10", deliveryTime: 4 },
  { id: 4, name: "Cisco Systems", contact: "Sophie Dubois", email: "ventes@cisco.fr", phone: "01 34 56 78 90", deliveryTime: 7 },
  { id: 5, name: "Ubiquiti Store", contact: "Pierre Leroy", email: "sales@ubnt.fr", phone: "01 87 65 43 21", deliveryTime: 2 },
  { id: 6, name: "Dell Pro", contact: "Julie Bernard", email: "entreprise@dell.fr", phone: "01 65 43 21 09", deliveryTime: 4 }
];

// Movement history mock data
const movementsMock: ProductMovement[] = [
  { id: 1, date: "2023-09-15", type: "Entrée", quantity: 10, user: "Admin", reason: "Commande fournisseur #12345", destinationLocation: "Magasin central" },
  { id: 2, date: "2023-09-16", type: "Sortie", quantity: 2, user: "Technicien 1", reason: "Intervention #789", sourceLocation: "Magasin central", relatedIntervention: 789 },
  { id: 3, date: "2023-09-17", type: "Transfert", quantity: 5, user: "Logistique", reason: "Optimisation stock", sourceLocation: "Magasin central", destinationLocation: "Entrepôt" },
  { id: 4, date: "2023-09-18", type: "Retour SAV", quantity: 1, user: "Service client", reason: "Produit défectueux", destinationLocation: "Magasin central" },
  { id: 5, date: "2023-09-19", type: "Sortie", quantity: 3, user: "Technicien 2", reason: "Projet #456", sourceLocation: "Entrepôt", relatedIntervention: 456 }
];

// Memory icon component
function Memory({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 19v2"></path>
      <path d="M10 19v2"></path>
      <path d="M14 19v2"></path>
      <path d="M18 19v2"></path>
      <path d="M8 13v-2"></path>
      <path d="M16 13v-2"></path>
      <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5z"></path>
      <path d="M7 9h10"></path>
      <path d="M7 17h10"></path>
    </svg>
  );
}

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
  
  const isLowStock = (item: InventoryItem) => {
    return item.quantity <= item.threshold;
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

  // Rendering helpers
  const renderCategoryCards = () => {
    const categories = Object.keys(productCategories);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <div 
            key={category}
            className={`card-glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:translate-y-[-2px] transition-all duration-300 ${activeCategory === category ? 'ring-2 ring-primary' : ''}`}
            onClick={() => filterByCategory(activeCategory === category ? null : category)}
          >
            <div>
              <h3 className="text-lg font-semibold">{category}</h3>
              <p className="text-muted-foreground mt-1">
                {inventoryMock.filter(item => item.category === category).length} articles
              </p>
            </div>
            <div className={`text-primary ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-primary/10'} p-3 rounded-full`}>
              {categoryIcons[category] || <Package size={18} />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderInventoryList = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Article</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Référence</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
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
                      <AlertCircle size={16} className="inline-block ml-2 text-amber-500" title="Stock bas" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.brand} {item.model}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm">
                    <span className="mr-2">
                      {categoryIcons[item.category] || <Package size={18} />}
                    </span>
                    <div>
                      {item.category}
                      {item.subcategory && (
                        <span className="text-xs text-muted-foreground block">{item.subcategory}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${isLowStock(item) ? 'text-amber-600' : ''}`}>
                    {item.quantity} {isLowStock(item) && `(Seuil: ${item.threshold})`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === "Neuf" ? "bg-green-100 text-green-800" :
                    item.status === "Occasion" ? "bg-blue-100 text-blue-800" :
                    item.status === "Défectueux" ? "bg-red-100 text-red-800" :
                    "bg-amber-100 text-amber-800"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(item.lastUpdated).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <CustomButton 
                    variant="ghost" 
                    className="h-8 px-2 text-primary"
                    onClick={() => handleViewDetail(item)}
                  >
                    <Eye size={16} />
                  </CustomButton>
                  <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">
                    <Edit size={16} />
                  </CustomButton>
                  <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">
                    <History size={16} />
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDetailView = () => {
    if (!currentItem) return null;
    
    return (
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{currentItem.name}</h2>
            <p className="text-muted-foreground">{currentItem.brand} - {currentItem.model} - Réf: {currentItem.reference}</p>
          </div>
          <CustomButton 
            variant="outline" 
            onClick={() => setViewMode("list")}
          >
            Retour à la liste
          </CustomButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Status card */}
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-4">Statut du stock</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantité actuelle</span>
                <span className="font-medium">{currentItem.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seuil d'alerte</span>
                <span className="font-medium">{currentItem.threshold}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock maximum</span>
                <span className="font-medium">{currentItem.maxStock || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">État</span>
                <span className="font-medium">{currentItem.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Emplacement</span>
                <span className="font-medium">{currentItem.location}</span>
              </div>
            </div>
          </div>
          
          {/* Details card */}
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-4">Détails produit</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Catégorie</span>
                <span className="font-medium">{currentItem.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-catégorie</span>
                <span className="font-medium">{currentItem.subcategory || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">N° de série</span>
                <span className="font-medium">{currentItem.serialNumber || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fournisseur</span>
                <span className="font-medium">{currentItem.supplierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dernière mise à jour</span>
                <span className="font-medium">{new Date(currentItem.lastUpdated).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
          
          {/* Financial card */}
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-4">Informations financières</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date d'entrée</span>
                <span className="font-medium">{new Date(currentItem.entryDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fin de garantie</span>
                <span className="font-medium">
                  {currentItem.warrantyEnd 
                    ? new Date(currentItem.warrantyEnd).toLocaleDateString('fr-FR')
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coût unitaire</span>
                <span className="font-medium">
                  {currentItem.unitCost 
                    ? `${currentItem.unitCost.toFixed(2)} €`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prix de vente</span>
                <span className="font-medium">
                  {currentItem.sellingPrice 
                    ? `${currentItem.sellingPrice.toFixed(2)} €`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valeur totale</span>
                <span className="font-medium">
                  {currentItem.unitCost 
                    ? `${(currentItem.unitCost * currentItem.quantity).toFixed(2)} €`
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description section */}
        <div className="card-glass rounded-xl p-5 mb-8">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <p className="text-muted-foreground">{currentItem.description || "Aucune description disponible"}</p>
        </div>
        
        {/* Movements history */}
        <div className="card-glass rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Historique des mouvements</h3>
            <CustomButton variant="outline" size="sm">
              <RefreshCcw size={16} className="mr-2" />
              Actualiser
            </CustomButton>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Quantité</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Utilisateur</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Raison</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {movementsMock.map((movement) => (
                  <tr key={movement.id} className="hover:bg-muted/10">
                    <td className="px-4 py-3 text-sm">{new Date(movement.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        movement.type === "Entrée" ? "bg-green-100 text-green-800" :
                        movement.type === "Sortie" ? "bg-red-100 text-red-800" :
                        movement.type === "Transfert" ? "bg-blue-100 text-blue-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {movement.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{movement.quantity}</td>
                    <td className="px-4 py-3 text-sm">{movement.user}</td>
                    <td className="px-4 py-3 text-sm">{movement.reason}</td>
                    <td className="px-4 py-3 text-sm">
                      {movement.type === "Transfert" && (
                        <>De: {movement.sourceLocation} → Vers: {movement.destinationLocation}</>
                      )}
                      {movement.type === "Sortie" && movement.relatedIntervention && (
                        <>Intervention #{movement.relatedIntervention}</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {movementsMock.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Aucun mouvement enregistré</p>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="mt-8 flex justify-end space-x-2">
          <CustomButton variant="outline">
            <History size={16} className="mr-2" />
            Historique complet
          </CustomButton>
          <CustomButton variant="outline">
            <ArrowUpDown size={16} className="mr-2" />
            Ajuster le stock
          </CustomButton>
          <CustomButton variant="primary">
            <Edit size={16} className="mr-2" />
            Modifier
          </CustomButton>
        </div>
      </div>
    );
  };

  // Add Product Dialog Form
  const renderAddProductDialog = () => {
    return (
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel article</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour ajouter un nouvel article à l'inventaire.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'article *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={newItem.name || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: SSD Kingston A2000 500GB" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marque *</Label>
                  <Input 
                    id="brand" 
                    name="brand" 
                    value={newItem.brand || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: Kingston" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modèle *</Label>
                  <Input 
                    id="model" 
                    name="model" 
                    value={newItem.model || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: A2000" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reference">Référence interne *</Label>
                <Input 
                  id="reference" 
                  name="reference" 
                  value={newItem.reference || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: SSD-KST-A2000-500" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("category", value)}
                    value={newItem.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(productCategories).map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Sous-catégorie</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("subcategory", value)}
                    value={newItem.subcategory}
                    disabled={!newItem.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {newItem.category && 
                        productCategories[newItem.category as keyof typeof productCategories]?.map((subcat) => (
                          <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplier">Fournisseur *</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("supplier", value)}
                  value={newItem.supplier?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliersMock.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Numéro de série</Label>
                <Input 
                  id="serialNumber" 
                  name="serialNumber" 
                  value={newItem.serialNumber || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: KST5012345678" 
                />
              </div>
            </div>
            
            {/* Stock Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité *</Label>
                  <Input 
                    id="quantity" 
                    name="quantity" 
                    type="number"
                    value={newItem.quantity || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold">Seuil d'alerte *</Label>
                  <Input 
                    id="threshold" 
                    name="threshold" 
                    type="number"
                    value={newItem.threshold || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 5" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unitCost">Coût unitaire (€)</Label>
                  <Input 
                    id="unitCost" 
                    name="unitCost" 
                    type="number"
                    step="0.01"
                    value={newItem.unitCost || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 65.50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Prix de vente (€)</Label>
                  <Input 
                    id="sellingPrice" 
                    name="sellingPrice" 
                    type="number"
                    step="0.01"
                    value={newItem.sellingPrice || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 89.99" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">État *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("status", value)}
                    value={newItem.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Neuf">Neuf</SelectItem>
                      <SelectItem value="Occasion">Occasion</SelectItem>
                      <SelectItem value="Défectueux">Défectueux</SelectItem>
                      <SelectItem value="À réparer">À réparer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Emplacement *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("location", value)}
                    value={newItem.location}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Magasin central">Magasin central</SelectItem>
                      <SelectItem value="Entrepôt">Entrepôt</SelectItem>
                      <SelectItem value="Technicien">Technicien</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryDate">Date d'entrée *</Label>
                  <Input 
                    id="entryDate" 
                    name="entryDate" 
                    type="date"
                    value={newItem.entryDate || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warrantyEnd">Fin de garantie</Label>
                  <Input 
                    id="warrantyEnd" 
                    name="warrantyEnd" 
                    type="date"
                    value={newItem.warrantyEnd || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={newItem.description || ''}
                  onChange={handleInputChange}
                  placeholder="Description détaillée du produit..."
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <CustomButton variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </CustomButton>
            <CustomButton variant="primary" onClick={handleSubmit}>
              <Save size={16} className="mr-2" />
              Enregistrer
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pl-64">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Inventaire</h1>
              <p className="text-muted-foreground mt-1">Gestion du stock informatique</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex gap-2">
              <CustomButton 
                variant="outline"
                icon={<BarChart size={16} />}
              >
                Statistiques
              </CustomButton>
              <CustomButton 
                variant="outline"
                icon={<ShoppingCart size={16} />}
              >
                Commandes
              </CustomButton>
              <CustomButton 
                variant="primary" 
                icon={<Plus size={16} />}
                onClick={handleAddItem}
              >
                Ajouter un article
              </CustomButton>
            </div>
          </div>
          
          {/* Dashboard summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card-glass rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Articles en stock</p>
                  <h3 className="text-2xl font-bold mt-1">{inventoryMock.reduce((sum, item) => sum + item.quantity, 0)}</h3>
                </div>
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <Package size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">
                  {inventoryMock.length} références différentes
                </span>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Valeur totale</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {inventoryMock
                      .reduce((sum, item) => sum + (item.unitCost || 0) * item.quantity, 0)
                      .toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </h3>
                </div>
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">
                  Valeur moyenne par article: {(inventoryMock
                    .reduce((sum, item) => sum + (item.unitCost || 0) * item.quantity, 0) / 
                    inventoryMock.reduce((sum, item) => sum + item.quantity, 0)).toFixed(2)} €
                </span>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Articles en alerte</p>
                  <h3 className="text-2xl font-bold mt-1 text-amber-600">
                    {inventoryMock.filter(item => item.quantity <= item.threshold).length}
                  </h3>
                </div>
                <div className="bg-amber-100 text-amber-600 p-3 rounded-full">
                  <AlertCircle size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">
                  {inventoryMock.filter(item => item.quantity === 0).length} articles en rupture
                </span>
              </div>
            </div>
            
            <div className="card-glass rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Fournisseurs</p>
                  <h3 className="text-2xl font-bold mt-1">{suppliersMock.length}</h3>
                </div>
                <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                  <Building size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-muted-foreground">
                  Délai moyen: {(
                    suppliersMock.reduce((sum, supplier) => sum + supplier.deliveryTime, 0) / 
                    suppliersMock.length
                  ).toFixed(1)} jours
                </span>
              </div>
            </div>
          </div>
          
          {/* Category cards */}
          {viewMode === "list" && renderCategoryCards()}
          
          {/* Main content area */}
          <div className="card-glass rounded-xl mb-8">
            <div className="p-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Rechercher par nom, marque, référence..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <CustomButton 
                    variant="outline" 
                    icon={<Filter size={16} />}
                  >
                    Filtres avancés
                  </CustomButton>
                  
                  <CustomButton 
                    variant="outline" 
                    icon={<Tag size={16} />}
                  >
                    Catégories
                  </CustomButton>
                </div>
              </div>
            </div>
            
            {/* Conditional rendering based on view mode */}
            {viewMode === "list" && renderInventoryList()}
            {viewMode === "detail" && renderDetailView()}
            
            {filteredInventory.length === 0 && viewMode === "list" && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Aucun article trouvé</p>
              </div>
            )}
            
            {viewMode === "list" && (
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
            )}
          </div>
        </div>
      </div>
      
      {/* Add Product Dialog */}
      {renderAddProductDialog()}
    </div>
  );
};

export default Inventory;
