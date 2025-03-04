
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { useInterventionState } from "@/hooks/interventions/useInterventionState";
import InterventionHeader from "@/components/interventions/InterventionHeader";
import InterventionStats from "@/components/interventions/InterventionStats";
import InterventionFilters from "@/components/interventions/InterventionFilters";
import AdvancedFilters from "@/components/interventions/AdvancedFilters";
import InterventionList from "@/components/interventions/InterventionList";
import InterventionDialogs from "@/components/interventions/InterventionDialogs";
import { useIsMobile } from "@/hooks/use-mobile";

const Interventions = () => {
  const {
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
    handleCreateIntervention,
    handleEditIntervention,
    handleUpdateIntervention,
    handleArchiveIntervention,
    linkToProject,
    applyFilters,
    setFilters
  } = useInterventionState();
  
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="p-4 md:p-6 lg:p-8">
          <InterventionHeader 
            showArchived={showArchived}
            toggleArchivedView={toggleArchivedView}
            setIsNewInterventionDialogOpen={setIsNewInterventionDialogOpen}
          />
          
          <InterventionStats />
          
          <InterventionFilters 
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            isAdvancedFiltersOpen={isAdvancedFiltersOpen}
            setIsAdvancedFiltersOpen={setIsAdvancedFiltersOpen}
            filters={filters}
          />
          
          <AdvancedFilters 
            isAdvancedFiltersOpen={isAdvancedFiltersOpen}
            setIsAdvancedFiltersOpen={setIsAdvancedFiltersOpen}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            applyFilters={applyFilters}
          />
          
          <div className="card-glass rounded-xl">
            <InterventionList 
              filteredInterventions={filteredInterventions}
              handleEditIntervention={handleEditIntervention}
              handleArchiveIntervention={handleArchiveIntervention}
              linkToProject={linkToProject}
            />
          </div>
        </div>
      </div>
      
      <InterventionDialogs 
        isNewInterventionDialogOpen={isNewInterventionDialogOpen}
        setIsNewInterventionDialogOpen={setIsNewInterventionDialogOpen}
        isEditInterventionDialogOpen={isEditInterventionDialogOpen}
        setIsEditInterventionDialogOpen={setIsEditInterventionDialogOpen}
        currentIntervention={currentIntervention}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleCreateIntervention={handleCreateIntervention}
        handleUpdateIntervention={handleUpdateIntervention}
      />
    </div>
  );
};

export default Interventions;
