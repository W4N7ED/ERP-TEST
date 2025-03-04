
import React from 'react';
import { CustomButton } from "@/components/ui/custom-button";
import { Archive, Plus } from 'lucide-react';

interface InterventionHeaderProps {
  showArchived: boolean;
  toggleArchivedView: () => void;
  setIsNewInterventionDialogOpen: (open: boolean) => void;
}

const InterventionHeader: React.FC<InterventionHeaderProps> = ({
  showArchived,
  toggleArchivedView,
  setIsNewInterventionDialogOpen
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Interventions</h1>
        <p className="text-muted-foreground mt-1">Gestion des interventions techniques</p>
      </div>
      
      <div className="mt-4 sm:mt-0 flex space-x-2">
        <CustomButton 
          variant="outline" 
          icon={<Archive size={16} />}
          onClick={toggleArchivedView}
        >
          {showArchived ? "Masquer les archives" : "Afficher les archives"}
        </CustomButton>
        
        <CustomButton 
          variant="primary" 
          icon={<Plus size={16} />}
          onClick={() => setIsNewInterventionDialogOpen(true)}
        >
          Nouvelle intervention
        </CustomButton>
      </div>
    </div>
  );
};

export default InterventionHeader;
