
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSignature } from 'lucide-react';

const ContractsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Contrats & Paie</h2>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileSignature className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Module en cours de développement</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Le module de gestion des contrats et de la paie sera bientôt disponible avec les fonctionnalités complètes de gestion contractuelle et calcul automatique des salaires.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ContractsTab;
