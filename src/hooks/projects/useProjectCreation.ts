
import { toast } from "sonner";
import { Project } from "@/types/project";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { ProjectState, ProjectActions } from "./types";

export const useProjectCreation = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const { projects, statusFilter } = state;
  const { setProjects, setFilteredProjects } = actions;

  const addNewProject = async (projectData: {
    name: string;
    reference: string;
    client?: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
    estimatedBudget?: number;
  }) => {
    try {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      
      const newProject: Project = {
        id: newId,
        name: projectData.name,
        reference: projectData.reference,
        client: projectData.client || undefined,
        location: projectData.location,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        status: "En attente",
        progress: 0,
        description: projectData.description,
        budget: {
          estimated: projectData.estimatedBudget ? Number(projectData.estimatedBudget) : 0,
          actual: 0
        },
        team: [],
        phases: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      try {
        const dbService = getDatabaseInstance();
        const savedProject = await dbService.addProject(newProject);
        
        const updatedProjects = [...projects, savedProject];
        setProjects(updatedProjects);
        
        if (statusFilter === "Tous" || statusFilter === "En attente") {
          // Fix the TypeScript error by creating a new array directly
          setFilteredProjects([...state.filteredProjects, savedProject]);
        }
        
        return savedProject;
      } catch (err) {
        console.error("Failed to save project to database:", err);
        
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        
        if (statusFilter === "Tous" || statusFilter === "En attente") {
          // Fix the TypeScript error by creating a new array directly
          setFilteredProjects([...state.filteredProjects, newProject]);
        }
        
        return newProject;
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Erreur lors de l'ajout du projet");
      return null;
    }
  };

  return {
    addNewProject
  };
};
