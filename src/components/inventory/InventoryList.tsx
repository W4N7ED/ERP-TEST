
import React from "react";
import { InventoryItem } from "@/types/inventory";
import { AlertCircle, Package, Eye, Edit, History } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { getCategoryIcon } from "@/utils/categoryIcons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InventoryListProps {
  inventory: InventoryItem[];
  onViewDetail: (item: InventoryItem) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, onViewDetail }) => {
  const isLowStock = (item: InventoryItem) => {
    return item.quantity <= item.threshold;
  };

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
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-muted/20 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium">
                  {item.name}
                  {isLowStock(item) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex ml-2">
                            <AlertCircle size={16} className="inline-block text-amber-500" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Stock bas</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                    {getCategoryIcon(item.category)}
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
                  onClick={() => onViewDetail(item)}
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

export default InventoryList;
