
import { useEffect } from "react";
import { Intervention } from "@/types/intervention";
import { useFiltersState } from "./useFiltersState";
import { applyAllFilters } from "./utils/filterUtils";

/**
 * Hook pour gérer le filtrage des interventions
 */
export const useInterventionFilters = (
  interventions: Intervention[],
  setFilteredInterventions: (interventions: Intervention[]) => void
) => {
  const {
    searchTerm,
    showArchived,
    isAdvancedFiltersOpen,
    filters,
    setIsAdvancedFiltersOpen,
    handleSearch,
    toggleArchivedView,
    resetFilters,
    setFilters
  } = useFiltersState();

  // Applique les filtres lorsque les dépendances changent
  useEffect(() => {
    const filtered = applyAllFilters(interventions, filters, searchTerm, showArchived);
    setFilteredInterventions(filtered);
  }, [filters, searchTerm, showArchived, interventions, setFilteredInterventions]);

  // Fonction simplifiée pour déclencher l'application des filtres
  const applyFilters = () => {
    const filtered = applyAllFilters(interventions, filters, searchTerm, showArchived);
    setFilteredInterventions(filtered);
  };

  return {
    searchTerm,
    showArchived,
    isAdvancedFiltersOpen,
    filters,
    setIsAdvancedFiltersOpen,
    handleSearch,
    toggleArchivedView,
    resetFilters,
    applyFilters,
    setFilters
  };
};
