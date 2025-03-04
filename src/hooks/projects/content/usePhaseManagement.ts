
import { toast } from "sonner";
import { ProjectPhase } from "@/types/project";
import { ProjectState, ProjectActions } from "../types";

export const usePhaseManagement = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const { projects, filteredProjects, currentProject } = state;
  const { setProjects, setFilteredProjects, setCurrentProject } = actions;

  const addPhaseToProject = (projectId: number, phaseData: {
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
  }) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      toast.error("Projet non trouvé");
      return null;
    }
    
    const newPhaseId = Math.max(
      ...projects.flatMap(p => p.phases.map(phase => phase.id)), 
      0
    ) + 1;
    
    const newPhase: ProjectPhase = {
      id: newPhaseId,
      name: phaseData.name,
      startDate: phaseData.startDate,
      endDate: phaseData.endDate,
      status: "En attente",
      progress: 0,
      description: phaseData.description,
      milestones: [],
      tasks: []
    };
    
    const updatedProject = { 
      ...projects[projectIndex],
      phases: [...projects[projectIndex].phases, newPhase],
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = updatedProject;
    setProjects(updatedProjects);
    
    const filteredIndex = filteredProjects.findIndex(p => p.id === projectId);
    if (filteredIndex !== -1) {
      const updatedFiltered = [...filteredProjects];
      updatedFiltered[filteredIndex] = updatedProject;
      setFilteredProjects(updatedFiltered);
    }
    
    if (currentProject && currentProject.id === projectId) {
      setCurrentProject(updatedProject);
    }
    
    toast.success(`Phase "${newPhase.name}" ajoutée au projet`);
    return newPhase;
  };

  return {
    addPhaseToProject
  };
};
