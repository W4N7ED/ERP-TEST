import React from "react";
import { InventoryItem } from "@/types/inventory";
import { ChevronLeft, Package, Calendar, Pencil } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface InventoryDetailProps {
  item: InventoryItem;
  onBack: () => void;
  canEdit?: boolean;
  onEditItem?: () => void;
}

const InventoryDetail: React.FC<InventoryDetailProps> = ({ 
  item, 
  onBack,
  canEdit = false,
  onEditItem
}) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR").format(date);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-6">
        <CustomButton variant="ghost" onClick={onBack} className="mb-4">
          <ChevronLeft size={16} className="mr-2" />
          Retour à la liste
        </CustomButton>
        
        {canEdit && onEditItem && (
          <CustomButton onClick={onEditItem}>
            <Pencil size={16} className="mr-2" />
            Modifier
          </CustomButton>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <Badge
                variant={
                  item.status === "Neuf"
                    ? "default"
                    : item.status === "Occasion"
                    ? "secondary"
                    : "destructive"
                }
              >
                {item.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">Ref: {item.reference}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-medium">Détails</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marque:</span>
                    <span>{item.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modèle:</span>
                    <span>{item.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">N° de série:</span>
                    <span>{item.serialNumber || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catégorie:</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-catégorie:</span>
                    <span>{item.subcategory || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Stock & Prix</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantité:</span>
                    <span className={item.quantity <= item.threshold ? "text-red-500 font-medium" : ""}>{item.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seuil minimum:</span>
                    <span>{item.threshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coût unitaire:</span>
                    <span>{item.unitCost ? `${item.unitCost.toFixed(2)} €` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prix de vente:</span>
                    <span>{item.sellingPrice ? `${item.sellingPrice.toFixed(2)} €` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emplacement:</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {item.description && (
              <div className="mt-6">
                <h3 className="font-medium">Description</h3>
                <Separator className="my-2" />
                <p className="text-sm">{item.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="font-medium flex items-center">
              <Calendar size={18} className="mr-2" />
              Dates
            </h3>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date d'entrée:</span>
                <span>{formatDate(item.entryDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dernière mise à jour:</span>
                <span>{formatDate(item.lastUpdated)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fin de garantie:</span>
                <span>{formatDate(item.warrantyEnd)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="font-medium flex items-center">
              <Package size={18} className="mr-2" />
              Fournisseur
            </h3>
            <Separator className="my-2" />
            <div>
              <p className="font-medium">{item.supplierName || "N/A"}</p>
              {/* More supplier details could be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetail;
