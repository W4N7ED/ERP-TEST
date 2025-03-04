
import { useInterventionsData } from "./useInterventionsData";
import { useInterventionFilters } from "./useInterventionFilters";
import { useCurrentIntervention } from "./useCurrentIntervention";
import { useInterventionNavigation } from "./useInterventionNavigation";
import { Intervention } from "@/types/intervention";

export const useInterventionState = () => {
  const {
    interventions,
    filteredInterventions,
    setFilteredInterventions,
    handleCreateIntervention,
    handleUpdateIntervention,
    handleArchiveIntervention
  } = useInterventionsData();

  const {
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
  } = useInterventionFilters(interventions, setFilteredInterventions);

  const {
    isNewInterventionDialogOpen,
    isEditInterventionDialogOpen,
    currentIntervention,
    setIsNewInterventionDialogOpen,
    setIsEditInterventionDialogOpen,
    handleInputChange,
    handleSelectChange,
    handleEditIntervention,
    resetCurrentIntervention
  } = useCurrentIntervention();

  const { linkToProject } = useInterventionNavigation();

  const handleCreateInterventionWrapper = () => {
    const success = handleCreateIntervention(currentIntervention);
    if (success) {
      resetCurrentIntervention();
      setIsNewInterventionDialogOpen(false);
    }
  };

  const handleUpdateInterventionWrapper = () => {
    const success = handleUpdateIntervention(currentIntervention);
    if (success) {
      setIsEditInterventionDialogOpen(false);
    }
  };

  return {
    searchTerm,
    filteredInterventions,
    isNewInterventionDialogOpen,
    isEditInterventionDialogOpen,
    showArchived,
    isAdvancedFiltersOpen,
    currentIntervention,
    filters,
    
    setIsNewInterventionDialogOpen,
    setIsEditInterventionDialogOpen,
    setIsAdvancedFiltersOpen,
    
    handleSearch,
    toggleArchivedView,
    resetFilters,
    handleInputChange,
    handleSelectChange,
    handleCreateIntervention: handleCreateInterventionWrapper,
    handleEditIntervention,
    handleUpdateIntervention: handleUpdateInterventionWrapper,
    handleArchiveIntervention,
    linkToProject,
    applyFilters,
    setFilters
  };
};
