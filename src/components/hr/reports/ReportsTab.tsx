
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from 'lucide-react';

const ReportsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rapports RH</h2>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BarChart className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Module en cours de développement</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Le module de rapports RH sera bientôt disponible avec les fonctionnalités complètes de statistiques, d'analyse et de reporting sur les données RH.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ReportsTab;
