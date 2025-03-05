
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { CalendarOff, CalendarCheck, BadgeCheck } from 'lucide-react';

const LeavesTab = () => {
  const { hasPermission } = usePermissions();
  const canAddLeave = hasPermission('hr.leaves.add');
  const canApproveLeave = hasPermission('hr.leaves.approve');

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
              Demandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Demandes en attente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
              Approuvées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
            <p className="text-sm text-muted-foreground">Ce trimestre</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarOff className="mr-2 h-5 w-5 text-primary" />
              Absences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Actuellement absents</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mb-6 gap-4">
        {canAddLeave && (
          <Button>
            Nouvelle demande
          </Button>
        )}
        {canApproveLeave && (
          <Button variant="outline">
            Valider les demandes
          </Button>
        )}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center border rounded-md p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Module de gestion des congés et absences</h3>
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

export default LeavesTab;
