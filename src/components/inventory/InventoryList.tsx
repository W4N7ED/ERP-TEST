
import React from "react";
import { InventoryItem } from "@/types/inventory";
import { Pencil, Trash2, ArrowRight } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

interface InventoryListProps {
  inventory: InventoryItem[];
  onViewDetail: (item: InventoryItem) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  onEditItem?: (item: InventoryItem) => void;
  onDeleteItem?: (item: InventoryItem) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ 
  inventory, 
  onViewDetail, 
  canEdit = false,
  canDelete = false,
  onEditItem,
  onDeleteItem
}) => {
  if (inventory.length === 0) {
    return (
      <div className="mt-8 p-8 text-center border rounded-lg">
        <p className="text-muted-foreground">Aucun article trouvé</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Nom</th>
              <th className="text-left py-3 px-4 font-medium">Référence</th>
              <th className="text-left py-3 px-4 font-medium">Catégorie</th>
              <th className="text-left py-3 px-4 font-medium">Quantité</th>
              <th className="text-left py-3 px-4 font-medium">Emplacement</th>
              <th className="text-left py-3 px-4 font-medium">État</th>
              <th className="text-left py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.reference}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.quantity <= item.threshold
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.quantity}
                  </span>
                </td>
                <td className="py-3 px-4">{item.location}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Neuf"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Occasion"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <CustomButton
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetail(item)}
                    >
                      <ArrowRight size={16} />
                    </CustomButton>
                    
                    {canEdit && onEditItem && (
                      <CustomButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditItem(item);
                        }}
                      >
                        <Pencil size={16} />
                      </CustomButton>
                    )}
                    
                    {canDelete && onDeleteItem && (
                      <CustomButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item);
                        }}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </CustomButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
