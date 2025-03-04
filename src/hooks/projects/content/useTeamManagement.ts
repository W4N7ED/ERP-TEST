
import { toast } from "sonner";
import { ProjectMember } from "@/types/project";
import { ProjectState, ProjectActions } from "../types";

export const useTeamManagement = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const { projects, filteredProjects, currentProject } = state;
  const { setProjects, setFilteredProjects, setCurrentProject } = actions;

  const addMemberToProject = (projectId: number, memberData: {
    name: string;
    role: string;
  }) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      toast.error("Projet non trouvé");
      return null;
    }
    
    const newMemberId = Math.max(
      ...projects.flatMap(p => p.team.map(member => member.id)),
      0
    ) + 1;
    
    const newMember: ProjectMember = {
      id: newMemberId,
      name: memberData.name,
      role: memberData.role
    };
    
    const updatedProject = {
      ...projects[projectIndex],
      team: [...projects[projectIndex].team, newMember],
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
    
    toast.success(`Membre "${newMember.name}" ajouté au projet`);
    return newMember;
  };

  return {
    addMemberToProject
  };
};
