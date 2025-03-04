
import { Project, ProjectStatus } from "@/types/project";
import { ProjectState, ProjectActions } from "./types";

export const useProjectFilters = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const { searchTerm, statusFilter, showArchived, projects } = state;
  const { setFilteredProjects, setSearchTerm, setStatusFilter, setShowArchived } = actions;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, statusFilter);
  };

  const filterByStatus = (status: ProjectStatus | "Tous") => {
    setStatusFilter(status);
    applyFilters(searchTerm, status);
  };

  const applyFilters = (term: string, status: ProjectStatus | "Tous") => {
    let filtered = [...projects];
    
    if (status !== "Tous") {
      filtered = filtered.filter(project => project.status === status);
    }
    
    if (term.trim() !== "") {
      filtered = filtered.filter(
        project => 
          project.name.toLowerCase().includes(term.toLowerCase()) ||
          project.reference.toLowerCase().includes(term.toLowerCase()) ||
          (project.client && project.client.toLowerCase().includes(term.toLowerCase())) ||
          project.location.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (!showArchived) {
      filtered = filtered.filter(project => !project.archived);
    }
    
    setFilteredProjects(filtered);
  };

  const toggleArchivedView = () => {
    const newShowArchived = !showArchived;
    setShowArchived(newShowArchived);
    
    let filtered = [...projects];
    
    if (statusFilter !== "Tous") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        project => 
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
          project.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (!newShowArchived) {
      filtered = filtered.filter(project => !project.archived);
    }
    
    setFilteredProjects(filtered);
  };

  return {
    handleSearch,
    filterByStatus,
    toggleArchivedView,
    applyFilters
  };
};
