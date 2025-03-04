
import { useState } from "react";
import { Intervention } from "@/types/intervention";

export const useCurrentIntervention = () => {
  const [isNewInterventionDialogOpen, setIsNewInterventionDialogOpen] = useState(false);
  const [isEditInterventionDialogOpen, setIsEditInterventionDialogOpen] = useState(false);
  const [currentIntervention, setCurrentIntervention] = useState<Partial<Intervention>>({
    priority: "Moyenne",
    status: "À planifier",
    type: "Panne",
    creationMode: "Manuelle"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentIntervention(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentIntervention(prev => ({ ...prev, [name]: value }));
  };

  const handleEditIntervention = (intervention: Intervention) => {
    setCurrentIntervention({ ...intervention });
    setIsEditInterventionDialogOpen(true);
  };

  const resetCurrentIntervention = () => {
    setCurrentIntervention({
      priority: "Moyenne",
      status: "À planifier",
      type: "Panne",
      creationMode: "Manuelle"
    });
  };

  return {
    isNewInterventionDialogOpen,
    isEditInterventionDialogOpen,
    currentIntervention,
    setIsNewInterventionDialogOpen,
    setIsEditInterventionDialogOpen,
    handleInputChange,
    handleSelectChange,
    handleEditIntervention,
    resetCurrentIntervention
  };
};
