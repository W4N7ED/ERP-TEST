
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, Truck } from "lucide-react";

interface StatsCardProps {
  productCount: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ productCount }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques</CardTitle>
        <CardDescription>Aperçu de l'activité</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-700">
            <Package size={18} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Produits fournis</p>
            <p className="font-medium">{productCount} articles</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full text-green-700">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dernière commande</p>
            <p className="font-medium">15/03/2023</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full text-amber-700">
            <Truck size={18} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total commandes</p>
            <p className="font-medium">5 commandes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
