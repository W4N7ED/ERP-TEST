
// Basic inventory types
export type ProductStatus = "Neuf" | "Occasion" | "Défectueux" | "À réparer";
export type StockLocation = "Magasin central" | "Entrepôt" | "Technicien";

// Supplier interface
export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  deliveryTime: number; // Average delivery time in days
  notes?: string; // Optional notes about the supplier
}

// Product movement tracking
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
