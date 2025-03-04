
import { useState, useEffect } from "react";
import { Intervention } from "@/types/intervention";
import { useToast } from "@/hooks/use-toast";

export const useInterventionsData = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [filteredInterventions, setFilteredInterventions] = useState<Intervention[]>([]);
  const { toast } = useToast();

  // Load interventions from an API in a real implementation
  useEffect(() => {
    // This would be replaced with an API call in production
    setInterventions([]);
  }, []);

  const handleCreateIntervention = (newIntervention: Partial<Intervention>) => {
    if (!newIntervention.title || !newIntervention.client || !newIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }

    // In a real app, this would call an API to create the intervention
    const intervention: Intervention = {
      ...(newIntervention as Intervention),
      id: interventions.length ? Math.max(...interventions.map(i => i.id)) + 1 : 1,
      dateCreated: new Date().toISOString().split('T')[0],
      deadline: newIntervention.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setInterventions(prev => [...prev, intervention]);
    
    toast({
      title: "Intervention créée",
      description: `L'intervention #${intervention.id} a été créée avec succès`,
    });
    
    return true;
  };

  const handleUpdateIntervention = (updatedIntervention: Partial<Intervention>) => {
    if (!updatedIntervention.id || !updatedIntervention.title || !updatedIntervention.client || !updatedIntervention.technician) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }

    const index = interventions.findIndex(i => i.id === updatedIntervention.id);
    if (index === -1) {
      toast({
        title: "Erreur",
        description: "Intervention non trouvée",
        variant: "destructive",
      });
      return false;
    }

    // In a real app, this would call an API to update the intervention
    const updatedInterventions = [...interventions];
    updatedInterventions[index] = { ...updatedInterventions[index], ...updatedIntervention as Intervention };
    setInterventions(updatedInterventions);
    
    toast({
      title: "Intervention mise à jour",
      description: `L'intervention #${updatedIntervention.id} a été mise à jour`,
    });
    
    return true;
  };

  const handleArchiveIntervention = (intervention: Intervention) => {
    if (window.confirm(`Êtes-vous sûr de vouloir archiver l'intervention "${intervention.title}" ?`)) {
      const index = interventions.findIndex(i => i.id === intervention.id);
      if (index !== -1) {
        // In a real app, this would call an API to archive the intervention
        const updatedInterventions = [...interventions];
        updatedInterventions[index] = {
          ...updatedInterventions[index],
          status: "Archivée",
          archived: true
        };
        
        setInterventions(updatedInterventions);
        
        toast({
          title: "Intervention archivée",
          description: `L'intervention #${intervention.id} a été archivée`,
        });
        
        return true;
      }
    }
    
    return false;
  };

  return {
    interventions,
    filteredInterventions,
    setFilteredInterventions,
    handleCreateIntervention,
    handleUpdateIntervention,
    handleArchiveIntervention
  };
};
