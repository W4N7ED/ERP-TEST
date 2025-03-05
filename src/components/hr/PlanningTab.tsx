
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { Calendar, Clock, Users } from 'lucide-react';

const PlanningTab = () => {
  const { hasPermission } = usePermissions();
  const canEditPlanning = hasPermission('hr.planning.edit');

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Plannings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Plannings actifs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Heures travaillées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1205</div>
            <p className="text-sm text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Techniciens disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Sur 12 techniciens</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mb-6 gap-4">
        {canEditPlanning && (
          <Button>
            Créer un planning
          </Button>
        )}
        {canEditPlanning && (
          <Button variant="outline">
            Exporter les données
          </Button>
        )}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center border rounded-md p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Module de gestion des plannings et présences</h3>
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

export default PlanningTab;
