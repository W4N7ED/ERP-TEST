
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palmtree } from 'lucide-react';

const LeaveRequestsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Congés & Absences</h2>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Palmtree className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Module en cours de développement</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Le module de gestion des congés et absences sera bientôt disponible avec les fonctionnalités complètes de demande et suivi des congés et absences.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LeaveRequestsTab;
