
import React from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Plus, Settings, Save, X } from "lucide-react";

interface DashboardHeaderProps {
  isCustomizing: boolean;
  onStartCustomizing: () => void;
  onSaveCustomization: () => void;
  onCancelCustomization: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isCustomizing,
  onStartCustomizing,
  onSaveCustomization,
  onCancelCustomization,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue sur votre EDR TechManager</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex space-x-3">
        {isCustomizing ? (
          <>
            <CustomButton 
              variant="primary" 
              icon={<Save size={16} />}
              onClick={onSaveCustomization}
            >
              Enregistrer
            </CustomButton>
            <CustomButton 
              variant="outline" 
              icon={<X size={16} />}
              onClick={onCancelCustomization}
            >
              Annuler
            </CustomButton>
          </>
        ) : (
          <>
            <CustomButton 
              variant="primary" 
              icon={<Plus size={16} />}
            >
              Nouvelle intervention
            </CustomButton>
            <CustomButton 
              variant="outline" 
              icon={<Settings size={16} />}
              onClick={onStartCustomizing}
            >
              Personnaliser
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
};
