
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";
import InterventionForm from './InterventionForm';
import { Intervention } from '@/types/intervention';

interface InterventionDialogsProps {
  isNewInterventionDialogOpen: boolean;
  setIsNewInterventionDialogOpen: (open: boolean) => void;
  isEditInterventionDialogOpen: boolean;
  setIsEditInterventionDialogOpen: (open: boolean) => void;
  currentIntervention: Partial<Intervention>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCreateIntervention: () => void;
  handleUpdateIntervention: () => void;
}

const InterventionDialogs: React.FC<InterventionDialogsProps> = ({
  isNewInterventionDialogOpen,
  setIsNewInterventionDialogOpen,
  isEditInterventionDialogOpen,
  setIsEditInterventionDialogOpen,
  currentIntervention,
  handleInputChange,
  handleSelectChange,
  handleCreateIntervention,
  handleUpdateIntervention
}) => {
  return (
    <>
      <Dialog open={isNewInterventionDialogOpen} onOpenChange={setIsNewInterventionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle intervention</DialogTitle>
            <DialogDescription>
              Complétez les informations nécessaires pour créer une intervention.
            </DialogDescription>
          </DialogHeader>
          <InterventionForm
            currentIntervention={currentIntervention}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          <DialogFooter>
            <CustomButton variant="outline" onClick={() => setIsNewInterventionDialogOpen(false)}>
              Annuler
            </CustomButton>
            <CustomButton variant="primary" onClick={handleCreateIntervention}>
              Créer l'intervention
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditInterventionDialogOpen} onOpenChange={setIsEditInterventionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'intervention</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'intervention #{currentIntervention.id}
            </DialogDescription>
          </DialogHeader>
          <InterventionForm
            currentIntervention={currentIntervention}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          <DialogFooter>
            <CustomButton variant="outline" onClick={() => setIsEditInterventionDialogOpen(false)}>
              Annuler
            </CustomButton>
            <CustomButton variant="primary" onClick={handleUpdateIntervention}>
              Mettre à jour
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterventionDialogs;
