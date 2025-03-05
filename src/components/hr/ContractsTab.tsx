
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { FileText, DollarSign, FileUp } from 'lucide-react';

const ContractsTab = () => {
  const { hasPermission } = usePermissions();
  const canAddContract = hasPermission('hr.contracts.add');
  const canEditContract = hasPermission('hr.contracts.edit');

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Contrats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
            <p className="text-sm text-muted-foreground">Contrats actifs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Fiches de paie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-sm text-muted-foreground">Générées ce mois-ci</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileUp className="mr-2 h-5 w-5 text-primary" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <p className="text-sm text-muted-foreground">Documents stockés</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mb-6 gap-4">
        {canAddContract && (
          <Button>
            Nouveau contrat
          </Button>
        )}
        {canEditContract && (
          <Button variant="outline">
            Générer les fiches de paie
          </Button>
        )}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center border rounded-md p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Module de gestion des contrats et paies</h3>
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

export default ContractsTab;
