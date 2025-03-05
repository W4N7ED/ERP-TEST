
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { Star, LineChart, Target } from 'lucide-react';

const PerformanceTab = () => {
  const { hasPermission } = usePermissions();
  const canEditPerformance = hasPermission('hr.performance.edit');

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="mr-2 h-5 w-5 text-primary" />
              Évaluations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-sm text-muted-foreground">Réalisées cette année</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Objectifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85%</div>
            <p className="text-sm text-muted-foreground">Taux de réalisation moyen</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-primary" />
              Performance globale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2/5</div>
            <p className="text-sm text-muted-foreground">Note moyenne</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mb-6 gap-4">
        {canEditPerformance && (
          <Button>
            Nouvelle évaluation
          </Button>
        )}
        {canEditPerformance && (
          <Button variant="outline">
            Définir des objectifs
          </Button>
        )}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center border rounded-md p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Module d'évaluation et suivi des performances</h3>
          <p className="text-muted-foreground mb-4">
            Cette fonctionnalité sera implémentée dans une prochaine mise à jour.
          </p>
          <Button variant="outline">
            Consulter la documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
