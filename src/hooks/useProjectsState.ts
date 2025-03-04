
import { useProjectsData } from "./projects/useProjectsData";
import { useProjectFilters } from "./projects/useProjectFilters";
import { useProjectStats } from "./projects/useProjectStats";
import { useProjectActions } from "./projects/useProjectActions";
import { useProjectCreation } from "./projects/useProjectCreation";
import { useProjectContent } from "./projects/content";

export const useProjectsState = () => {
  const [state, actions] = useProjectsData();
  const filters = useProjectFilters(state, actions);
  const stats = useProjectStats(state.filteredProjects);
  const projectActions = useProjectActions(state, actions);
  const projectCreation = useProjectCreation(state, actions);
  const projectContent = useProjectContent(state, actions);
  
  return {
    // State properties
    searchTerm: state.searchTerm,
    filteredProjects: state.filteredProjects,
    statusFilter: state.statusFilter,
    currentProject: state.currentProject,
    isAddProjectDialogOpen: state.isAddProjectDialogOpen,
    showArchived: state.showArchived,
    isLoading: state.isLoading,
    
    // Project filter functions
    handleSearch: filters.handleSearch,
    filterByStatus: filters.filterByStatus,
    toggleArchivedView: filters.toggleArchivedView,
    
    // Project action functions
    handleViewProject: projectActions.handleViewProject,
    handleAddProject: projectActions.handleAddProject,
    handleEditProject: projectActions.handleEditProject,
    handleDeleteProject: projectActions.handleDeleteProject,
    handleArchiveProject: projectActions.handleArchiveProject,
    
    // Project creation/editing
    addNewProject: projectCreation.addNewProject,
    
    // Project content management
    addPhaseToProject: projectContent.addPhaseToProject,
    addTaskToPhase: projectContent.addTaskToPhase,
    deleteTask: projectContent.deleteTask,
    addMemberToProject: projectContent.addMemberToProject,
    
    // Stats and other utilities
    stats,
    
    // State setters
    setIsAddProjectDialogOpen: actions.setIsAddProjectDialogOpen,
    setCurrentProject: actions.setCurrentProject
  };
};
