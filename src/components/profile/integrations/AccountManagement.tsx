
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Trash2 } from "lucide-react";

const AccountManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDataExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Vos données ont été exportées. Le téléchargement va commencer.");
    }, 1500);
  };
  
  const handleAccountDeletion = () => {
    toast("Cette action est irréversible. Êtes-vous sûr ?", {
      action: {
        label: "Confirmer",
        onClick: () => toast.error("Requête de suppression de compte envoyée à l'administrateur")
      },
      cancel: {
        label: "Annuler",
        onClick: () => {}
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <div className="flex items-start space-x-3">
          <Download className="h-5 w-5 text-muted-foreground" />
          <div>
            <h4 className="text-sm font-medium">Exporter vos données personnelles</h4>
            <p className="text-sm text-muted-foreground">
              Téléchargez une copie de vos données, y compris votre historique d'activité
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2" 
              onClick={handleDataExport}
              disabled={isLoading}
            >
              {isLoading ? "Préparation..." : "Exporter les données"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-red-200 p-4">
        <div className="flex items-start space-x-3">
          <Trash2 className="h-5 w-5 text-red-500" />
          <div>
            <h4 className="text-sm font-medium text-red-600">Supprimer votre compte</h4>
            <p className="text-sm text-muted-foreground">
              Cette action est irréversible et supprimera toutes vos données personnelles
            </p>
            <Button 
              variant="destructive" 
              size="sm" 
              className="mt-2" 
              onClick={handleAccountDeletion}
            >
              Demander la suppression du compte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
