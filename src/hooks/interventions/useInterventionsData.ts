
import { useEffect } from "react";
import { Intervention } from "@/types/intervention";
import { useInterventionsDataState } from "./useInterventionsDataState";
import { useFetchInterventions } from "./useFetchInterventions";
import { useInterventionCreate } from "./useInterventionCreate";
import { useInterventionUpdate } from "./useInterventionUpdate";
import { useInterventionArchive } from "./useInterventionArchive";

/**
 * Hook principal combinant tous les hooks liés aux données d'interventions
 */
export const useInterventionsData = () => {
  const {
    interventions,
    filteredInterventions,
    isLoading,
    error,
    setInterventions,
    setFilteredInterventions,
    setIsLoading,
    setError
  } = useInterventionsDataState();

  // Utilise le hook de récupération des données
  useFetchInterventions(setInterventions, setFilteredInterventions, setIsLoading, setError);

  // Utilise les hooks d'actions CRUD
  const { handleCreateIntervention: createIntervention } = useInterventionCreate();
  const { handleUpdateIntervention: updateIntervention } = useInterventionUpdate();
  const { handleArchiveIntervention: archiveIntervention } = useInterventionArchive();

  // Gestion de l'état local après les opérations CRUD
  const handleCreateIntervention = async (newIntervention: Partial<Intervention>) => {
    const { success, intervention } = await createIntervention(newIntervention);
    
    if (success && intervention) {
      setInterventions(prev => [...prev, intervention]);
      setFilteredInterventions(prev => [...prev, intervention]);
      return true;
    }
    
    return false;
  };

  const handleUpdateIntervention = async (updatedIntervention: Partial<Intervention>) => {
    const { success, intervention } = await updateIntervention(updatedIntervention);
    
    if (success && intervention && updatedIntervention.id) {
      setInterventions(prev => 
        prev.map(item => item.id === updatedIntervention.id ? intervention : item)
      );
      
      setFilteredInterventions(prev => 
        prev.map(item => item.id === updatedIntervention.id ? intervention : item)
      );
      
      return true;
    }
    
    return false;
  };

  const handleArchiveIntervention = async (intervention: Intervention) => {
    const { success, intervention: updatedIntervention } = await archiveIntervention(intervention);
    
    if (success && updatedIntervention) {
      setInterventions(prev => 
        prev.map(item => item.id === intervention.id ? updatedIntervention : item)
      );
      
      setFilteredInterventions(prev => 
        prev.map(item => item.id === intervention.id ? updatedIntervention : item)
      );
      
      return true;
    }
    
    return false;
  };

  return {
    interventions,
    filteredInterventions,
    isLoading,
    error,
    setFilteredInterventions,
    handleCreateIntervention,
    handleUpdateIntervention,
    handleArchiveIntervention
  };
};
