
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { InventoryItem, movementsMock } from "@/types/inventory";
import { RefreshCcw } from "lucide-react";

interface InventoryDetailProps {
  item: InventoryItem;
  onBack: () => void;
}

const InventoryDetail: React.FC<InventoryDetailProps> = ({ item, onBack }) => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <p className="text-muted-foreground">{item.brand} - {item.model} - Réf: {item.reference}</p>
        </div>
        <CustomButton 
          variant="outline" 
          onClick={onBack}
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
              <span className="font-medium">{item.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seuil d'alerte</span>
              <span className="font-medium">{item.threshold}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock maximum</span>
              <span className="font-medium">{item.maxStock || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">État</span>
              <span className="font-medium">{item.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Emplacement</span>
              <span className="font-medium">{item.location}</span>
            </div>
          </div>
        </div>
        
        {/* Details card */}
        <div className="card-glass rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Détails produit</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Catégorie</span>
              <span className="font-medium">{item.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-catégorie</span>
              <span className="font-medium">{item.subcategory || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">N° de série</span>
              <span className="font-medium">{item.serialNumber || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fournisseur</span>
              <span className="font-medium">{item.supplierName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dernière mise à jour</span>
              <span className="font-medium">{new Date(item.lastUpdated).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
        
        {/* Financial card */}
        <div className="card-glass rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Informations financières</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date d'entrée</span>
              <span className="font-medium">{new Date(item.entryDate).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fin de garantie</span>
              <span className="font-medium">
                {item.warrantyEnd 
                  ? new Date(item.warrantyEnd).toLocaleDateString('fr-FR')
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coût unitaire</span>
              <span className="font-medium">
                {item.unitCost 
                  ? `${item.unitCost.toFixed(2)} €`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Prix de vente</span>
              <span className="font-medium">
                {item.sellingPrice 
                  ? `${item.sellingPrice.toFixed(2)} €`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valeur totale</span>
              <span className="font-medium">
                {item.unitCost 
                  ? `${(item.unitCost * item.quantity).toFixed(2)} €`
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description section */}
      <div className="card-glass rounded-xl p-5 mb-8">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <p className="text-muted-foreground">{item.description || "Aucune description disponible"}</p>
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
                    {movement.sourceLocation && `De: ${movement.sourceLocation}`}
                    {movement.destinationLocation && `Vers: ${movement.destinationLocation}`}
                    {movement.relatedIntervention && `Intervention #${movement.relatedIntervention}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetail;
