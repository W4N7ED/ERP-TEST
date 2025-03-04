
import { useState, useEffect } from "react";
import { Intervention, InterventionFilters } from "@/types/intervention";

export const useInterventionFilters = (
  interventions: Intervention[],
  setFilteredInterventions: (interventions: Intervention[]) => void
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<InterventionFilters>({
    status: null,
    priority: null,
    type: null,
    dateStart: null,
    dateEnd: null,
    technician: null,
    client: null,
    keyword: ""
  });

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, showArchived, interventions]);

  const applyFilters = () => {
    let filtered = [...interventions];
    
    if (!showArchived) {
      filtered = filtered.filter(i => i.status !== "Archivée");
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(intervention => 
        intervention.title.toLowerCase().includes(term) ||
        intervention.client.toLowerCase().includes(term) ||
        intervention.technician.toLowerCase().includes(term) ||
        (intervention.material && intervention.material.toLowerCase().includes(term)) ||
        (intervention.description && intervention.description.toLowerCase().includes(term))
      );
    }
    
    if (filters.status && filters.status !== "Tous") {
      filtered = filtered.filter(i => i.status === filters.status);
    }
    
    if (filters.priority && filters.priority !== "Tous") {
      filtered = filtered.filter(i => i.priority === filters.priority);
    }
    
    if (filters.type && filters.type !== "Tous") {
      filtered = filtered.filter(i => i.type === filters.type);
    }
    
    if (filters.technician) {
      filtered = filtered.filter(i => i.technician === filters.technician);
    }
    
    if (filters.client) {
      filtered = filtered.filter(i => i.client === filters.client);
    }
    
    if (filters.dateStart) {
      const startDate = new Date(filters.dateStart);
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(i => {
        const date = new Date(i.dateCreated);
        return date >= startDate;
      });
    }
    
    if (filters.dateEnd) {
      const endDate = new Date(filters.dateEnd);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(i => {
        const date = new Date(i.dateCreated);
        return date <= endDate;
      });
    }
    
    setFilteredInterventions(filtered);
  };
  
  const resetFilters = () => {
    setFilters({
      status: null,
      priority: null,
      type: null,
      dateStart: null,
      dateEnd: null,
      technician: null,
      client: null,
      keyword: ""
    });
    setSearchTerm("");
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };
  
  const toggleArchivedView = () => {
    setShowArchived(!showArchived);
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
