// Types for inventory management
export type ProductStatus = "Neuf" | "Occasion" | "Défectueux" | "À réparer";
export type StockLocation = "Magasin central" | "Entrepôt" | "Technicien";

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  deliveryTime: number; // Average delivery time in days
  notes?: string; // Optional notes about the supplier
}

export interface ProductMovement {
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
export interface InventoryItem {
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
export const productCategories: Record<string, string[]> = {
  "Imprimantes": ["Laser", "Jet d'encre", "3D", "Multifonction", "Accessoires"],
  "Stockage": ["SSD", "HDD", "NAS", "Clés USB", "Cartes SD"],
  "Réseau": ["Routeurs", "Switchs", "Access Points", "Câbles", "Modems"],
  "Mémoire": ["RAM", "Cartes SD", "Mémoire Flash"],
  "Ordinateurs": ["PC Fixes", "PC Portables", "Stations de travail", "Serveurs", "Mini PC"],
  "Accessoires": ["Câbles", "Cartouches", "Batteries", "Chargeurs", "Adaptateurs"],
  "Composants": ["Cartes mères", "Processeurs", "Cartes graphiques", "Alimentations"]
};

// Mock data for inventory items
export const inventoryMock: InventoryItem[] = [
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
export const suppliersMock: Supplier[] = [
  { id: 1, name: "TechDistribution", contact: "Jean Dupont", email: "contact@techdistrib.fr", phone: "01 23 45 67 89", deliveryTime: 3, notes: "Fournisseur de qualité" },
  { id: 2, name: "HP Direct", contact: "Marie Laurent", email: "b2b@hp.fr", phone: "01 98 76 54 32", deliveryTime: 5 },
  { id: 3, name: "Lenovo Business", contact: "Thomas Martin", email: "pro@lenovo.fr", phone: "01 45 67 89 10", deliveryTime: 4 },
  { id: 4, name: "Cisco Systems", contact: "Sophie Dubois", email: "ventes@cisco.fr", phone: "01 34 56 78 90", deliveryTime: 7 },
  { id: 5, name: "Ubiquiti Store", contact: "Pierre Leroy", email: "sales@ubnt.fr", phone: "01 87 65 43 21", deliveryTime: 2 },
  { id: 6, name: "Dell Pro", contact: "Julie Bernard", email: "entreprise@dell.fr", phone: "01 65 43 21 09", deliveryTime: 4 }
];

// Movement history mock data
export const movementsMock: ProductMovement[] = [
  { id: 1, date: "2023-09-15", type: "Entrée", quantity: 10, user: "Admin", reason: "Commande fournisseur #12345", destinationLocation: "Magasin central" },
  { id: 2, date: "2023-09-16", type: "Sortie", quantity: 2, user: "Technicien 1", reason: "Intervention #789", sourceLocation: "Magasin central", relatedIntervention: 789 },
  { id: 3, date: "2023-09-17", type: "Transfert", quantity: 5, user: "Logistique", reason: "Optimisation stock", sourceLocation: "Magasin central", destinationLocation: "Entrepôt" },
  { id: 4, date: "2023-09-18", type: "Retour SAV", quantity: 1, user: "Service client", reason: "Produit défectueux", destinationLocation: "Magasin central" },
  { id: 5, date: "2023-09-19", type: "Sortie", quantity: 3, user: "Technicien 2", reason: "Projet #456", sourceLocation: "Entrepôt", relatedIntervention: 456 }
];
