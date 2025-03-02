
import React from "react";
import { Supplier } from "@/types/inventory";
import { Eye, Edit, Trash2, Clock, Truck } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SuppliersListProps {
  suppliers: Supplier[];
  onViewDetail: (supplier: Supplier) => void;
}

const SuppliersList: React.FC<SuppliersListProps> = ({ suppliers, onViewDetail }) => {
  const getDeliveryTimeIndicator = (days: number) => {
    if (days <= 2) return "bg-green-100 text-green-800";
    if (days <= 5) return "bg-blue-100 text-blue-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <div className="card-glass rounded-xl p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Délai de livraison</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Truck size={20} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{supplier.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {supplier.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a href={`mailto:${supplier.email}`} className="text-primary hover:underline">
                    {supplier.email}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a href={`tel:${supplier.phone}`} className="hover:underline">
                    {supplier.phone}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${getDeliveryTimeIndicator(supplier.deliveryTime)}`}>
                          <Clock size={12} />
                          {supplier.deliveryTime} jours
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Délai de livraison moyen</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <CustomButton 
                    variant="ghost" 
                    className="h-8 px-2 text-primary"
                    onClick={() => onViewDetail(supplier)}
                  >
                    <Eye size={16} />
                  </CustomButton>
                  <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">
                    <Edit size={16} />
                  </CustomButton>
                  <CustomButton variant="ghost" className="h-8 px-2 text-muted-foreground">
                    <Trash2 size={16} />
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuppliersList;
