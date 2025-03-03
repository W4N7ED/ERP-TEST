
export interface QuoteItem {
  id: number;
  type: 'Produit' | 'Service' | 'Forfait';
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  discount?: number; // en pourcentage
  taxRate: number; // en pourcentage
  total: number; // Prix total avec remise et taxes
  inventoryItemId?: number; // Pour les produits liés à l'inventaire
  brand?: string;
  model?: string;
  application?: string;
  license?: string;
  priceHT?: number;
}
