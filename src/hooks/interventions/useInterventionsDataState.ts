
import { useState } from "react";
import { Intervention } from "@/types/intervention";

/**
 * Hook gérant l'état des données d'interventions
 */
export const useInterventionsDataState = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [filteredInterventions, setFilteredInterventions] = useState<Intervention[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    interventions,
    filteredInterventions,
    isLoading,
    error,
    setInterventions,
    setFilteredInterventions,
    setIsLoading,
    setError
  };
};
