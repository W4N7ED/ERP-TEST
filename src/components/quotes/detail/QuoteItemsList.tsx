
import React from "react";
import { QuoteItem } from "@/types/quote";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Trash2 } from "lucide-react";

interface QuoteItemsListProps {
  items: QuoteItem[];
  onDeleteItem: (itemId: number) => void;
  onAddItem: () => void;
  formatCurrency: (amount: number) => string;
  canEdit: boolean;
  canDelete: boolean;
}

export const QuoteItemsList: React.FC<QuoteItemsListProps> = ({
  items,
  onDeleteItem,
  onAddItem,
  formatCurrency,
  canEdit,
  canDelete
}) => {
  const renderItemDetails = (item: QuoteItem) => {
    if (item.type === "Produit" && (item.brand || item.model || item.application || item.license)) {
      return (
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          {item.brand && (
            <div><span className="font-medium">Marque:</span> {item.brand}</div>
          )}
          {item.model && (
            <div><span className="font-medium">Modèle:</span> {item.model}</div>
          )}
          {item.application && (
            <div><span className="font-medium">Application:</span> {item.application}</div>
          )}
          {item.license && (
            <div><span className="font-medium">Licence:</span> {item.license}</div>
          )}
          {item.priceHT !== undefined && (
            <div><span className="font-medium">Prix HT:</span> {formatCurrency(item.priceHT)}</div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-glass rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Articles</h3>
        
        {canEdit && (
          <Button onClick={onAddItem}>
            <Plus size={16} className="mr-2" /> Ajouter un article
          </Button>
        )}
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <FileText size={24} className="mx-auto mb-2" />
          <p>Aucun article dans ce devis</p>
          {canEdit && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onAddItem}
            >
              <Plus size={16} className="mr-2" /> Ajouter un article
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-sm">
                <th className="py-2 text-left font-medium">Description</th>
                <th className="py-2 text-right font-medium">Prix unitaire</th>
                <th className="py-2 text-right font-medium">Qté</th>
                <th className="py-2 text-right font-medium">Remise</th>
                <th className="py-2 text-right font-medium">TVA</th>
                <th className="py-2 text-right font-medium">Total</th>
                {canDelete && <th className="py-2 w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <Badge variant="outline" className="rounded-sm font-normal">
                        {item.type}
                      </Badge>
                    </div>
                    {renderItemDetails(item)}
                  </td>
                  <td className="py-3 text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">{item.discount ? `${item.discount}%` : '-'}</td>
                  <td className="py-3 text-right">{item.taxRate}%</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(item.total)}</td>
                  {canDelete && (
                    <td className="py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDeleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sous-total</span>
              <span>{formatCurrency(items.reduce((acc, item) => acc + item.total, 0))}</span>
            </div>
            
            {items.length > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span>TVA</span>
                  <span>{formatCurrency(items.reduce((acc, item) => {
                    const subtotal = item.unitPrice * item.quantity;
                    const discountAmount = item.discount ? (subtotal * item.discount / 100) : 0;
                    const taxableAmount = subtotal - discountAmount;
                    return acc + (taxableAmount * item.taxRate / 100);
                  }, 0))}</span>
                </div>
                
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{formatCurrency(items.reduce((acc, item) => acc + item.total, 0))}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
