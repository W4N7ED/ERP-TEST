
import { toast } from "sonner";
import { ProjectTask, ProjectMember, TaskPriority } from "@/types/project";
import { ProjectState, ProjectActions } from "../types";

export const useTaskManagement = (
  state: ProjectState,
  actions: ProjectActions
) => {
  const { projects, filteredProjects, currentProject } = state;
  const { setProjects, setFilteredProjects, setCurrentProject } = actions;

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

  return {
    addTaskToPhase,
    deleteTask
  };
};
