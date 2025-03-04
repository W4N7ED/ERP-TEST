
import { toast } from "sonner";
import { Project, ProjectStatus } from "@/types/project";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { ProjectState, ProjectActions } from "./types";

export const useProjectActions = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const { projects, filteredProjects, currentProject, showArchived } = state;
  const { setProjects, setFilteredProjects, setCurrentProject } = actions;

  const handleViewProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleAddProject = () => {
    actions.setIsAddProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    toast.info(`Édition du projet: ${project.name}`);
    // Implement edit functionality
  };

  const handleArchiveProject = async (projectId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir archiver ce projet ?")) {
      try {
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
          const updatedProject = { ...projects[projectIndex], archived: true };
          
          try {
            const dbService = getDatabaseInstance();
            await dbService.updateProject(projectId, { 
              status: "En attente" as ProjectStatus, // Explicitly cast to ProjectStatus
              archived: true 
            });
          } catch (err) {
            console.error("Failed to update project in database:", err);
          }
          
          const updatedProjects = [...projects];
          updatedProjects[projectIndex] = updatedProject;
          setProjects(updatedProjects);
          
          if (!showArchived) {
            setFilteredProjects(filteredProjects.filter(p => p.id !== projectId));
          } else {
            const filteredIndex = filteredProjects.findIndex(p => p.id === projectId);
            if (filteredIndex !== -1) {
              const updatedFiltered = [...filteredProjects];
              updatedFiltered[filteredIndex] = updatedProject;
              setFilteredProjects(updatedFiltered);
            }
          }
          
          if (currentProject && currentProject.id === projectId) {
            setCurrentProject(null);
          }
          
          toast.success(`Le projet "${updatedProject.name}" a été archivé`);
          return true;
        }
      } catch (error) {
        console.error("Error archiving project:", error);
        toast.error("Erreur lors de l'archivage du projet");
      }
    }
    
    return false;
  };

  const handleDeleteProject = async (project: Project) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.name}" ?`)) {
      try {
        try {
          const dbService = getDatabaseInstance();
          await dbService.deleteProject(project.id);
        } catch (err) {
          console.error("Failed to delete project from database:", err);
        }
        
        const updatedProjects = projects.filter(p => p.id !== project.id);
        setProjects(updatedProjects);
        setFilteredProjects(filteredProjects.filter(p => p.id !== project.id));
        toast.success(`Projet "${project.name}" supprimé avec succès`);
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Erreur lors de la suppression du projet");
      }
    }
  };

  return {
    handleViewProject,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleArchiveProject
  };
};
