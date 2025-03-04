
import { toast } from "sonner";
import { ProjectPhase, ProjectTask, ProjectMember, TaskPriority } from "@/types/project";
import { ProjectState, ProjectActions } from "./types";

export const useProjectContent = (
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

  const addTaskToPhase = (projectId: number, phaseId: number, taskData: {
    name: string;
    priority: TaskPriority;
    deadline: string;
    description?: string;
    assignedToId?: number;
  }) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      toast.error("Projet non trouvé");
      return null;
    }
    
    const phaseIndex = projects[projectIndex].phases.findIndex(p => p.id === phaseId);
    
    if (phaseIndex === -1) {
      toast.error("Phase non trouvée");
      return null;
    }
    
    const newTaskId = Math.max(
      ...projects.flatMap(p => p.phases.flatMap(phase => phase.tasks.map(task => task.id))),
      0
    ) + 1;
    
    let assignedMember: ProjectMember | undefined;
    if (taskData.assignedToId) {
      assignedMember = projects[projectIndex].team.find(m => m.id === taskData.assignedToId);
    }
    
    const newTask: ProjectTask = {
      id: newTaskId,
      name: taskData.name,
      status: "À faire",
      priority: taskData.priority,
      deadline: taskData.deadline,
      assignedTo: assignedMember,
      description: taskData.description,
      interventions: []
    };
    
    const updatedPhases = [...projects[projectIndex].phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      tasks: [...updatedPhases[phaseIndex].tasks, newTask]
    };
    
    const updatedProject = {
      ...projects[projectIndex],
      phases: updatedPhases,
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
    
    toast.success(`Tâche "${newTask.name}" ajoutée à la phase`);
    return newTask;
  };

  const deleteTask = (projectId: number, phaseId: number, taskId: number) => {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      toast.error("Projet non trouvé");
      return;
    }
    
    const phaseIndex = projects[projectIndex].phases.findIndex(p => p.id === phaseId);
    
    if (phaseIndex === -1) {
      toast.error("Phase non trouvée");
      return;
    }
    
    const taskIndex = projects[projectIndex].phases[phaseIndex].tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      toast.error("Tâche non trouvée");
      return;
    }
    
    const taskName = projects[projectIndex].phases[phaseIndex].tasks[taskIndex].name;
    
    const updatedPhases = [...projects[projectIndex].phases];
    updatedPhases[phaseIndex] = {
      ...updatedPhases[phaseIndex],
      tasks: updatedPhases[phaseIndex].tasks.filter(t => t.id !== taskId)
    };
    
    const updatedProject = {
      ...projects[projectIndex],
      phases: updatedPhases,
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
    
    toast.success(`Tâche "${taskName}" supprimée avec succès`);
  };

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
    addPhaseToProject,
    addTaskToPhase,
    deleteTask,
    addMemberToProject
  };
};
