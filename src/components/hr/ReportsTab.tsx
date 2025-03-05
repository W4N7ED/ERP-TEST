
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { BarChart3, PieChart, Download } from 'lucide-react';

const ReportsTab = () => {
  const { hasPermission } = usePermissions();

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Rapports disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Rapports configurés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-primary" />
              Tableaux de bord
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Tableaux personnalisés</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mb-6 gap-4">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter les données
        </Button>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Rapports RH disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">Rapport d'effectifs</h4>
                  <p className="text-sm text-muted-foreground">Analyse des effectifs par département</p>
                </div>
                <Button variant="outline" size="sm">Générer</Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">Bilan des congés</h4>
                  <p className="text-sm text-muted-foreground">Détails des congés par employé et par type</p>
                </div>
                <Button variant="outline" size="sm">Générer</Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">Analyse des salaires</h4>
                  <p className="text-sm text-muted-foreground">Répartition et évolution des rémunérations</p>
                </div>
                <Button variant="outline" size="sm">Générer</Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">Suivi des performances</h4>
                  <p className="text-sm text-muted-foreground">Indicateurs et évolution des performances</p>
                </div>
                <Button variant="outline" size="sm">Générer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsTab;
