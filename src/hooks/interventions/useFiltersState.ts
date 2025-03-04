
import { useState } from "react";
import { InterventionFilters } from "@/types/intervention";

/**
 * Hook pour gérer l'état des filtres
 */
export const useFiltersState = () => {
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
    setSearchTerm,
    setShowArchived,
    setIsAdvancedFiltersOpen,
    setFilters,
    handleSearch,
    toggleArchivedView,
    resetFilters
  };
};
