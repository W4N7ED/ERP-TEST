
import React from "react";
import { InventoryItem } from "@/types/inventory";

interface SupplierProductsTabProps {
  supplierProducts: InventoryItem[];
}

const SupplierProductsTab: React.FC<SupplierProductsTabProps> = ({ supplierProducts }) => {
  return (
    <div className="bg-muted/20 rounded-lg p-5">
      <h3 className="text-lg font-medium mb-4">Produits de ce fournisseur</h3>
      
      {supplierProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Référence</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Nom</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Catégorie</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Prix d'achat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {supplierProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/10">
                  <td className="px-4 py-3 text-sm">{product.reference}</td>
                  <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.category} / {product.subcategory || "-"}</td>
                  <td className="px-4 py-3 text-sm">{product.quantity}</td>
                  <td className="px-4 py-3 text-sm">{product.unitCost ? `${product.unitCost.toFixed(2)} €` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-muted-foreground">
          Aucun produit enregistré pour ce fournisseur.
        </div>
      )}
    </div>
  );
};

export default SupplierProductsTab;
