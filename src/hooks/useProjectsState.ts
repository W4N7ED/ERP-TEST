import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Project, projectsMock, ProjectStatus, ProjectPhase, ProjectTask, ProjectMember, TaskStatus, TaskPriority } from "@/types/project";
import { getDatabaseInstance } from "@/services/database/databaseFactory";

export const useProjectsState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "Tous">("Tous");
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const dbService = getDatabaseInstance();
        const data = await dbService.getProjects();
        setProjects(data.length > 0 ? data : projectsMock);
        setFilteredProjects(data.length > 0 ? data : projectsMock);
      } catch (err) {
        console.error("Failed to load projects:", err);
        toast.error("Échec du chargement des projets. Utilisation des données de démonstration.");
        setProjects(projectsMock);
        setFilteredProjects(projectsMock);
      } finally {
        setIsLoading(false);
      }
    };

    try {
      loadProjects();
    } catch (err) {
      console.warn("Database not initialized yet, using mock data", err);
      setProjects(projectsMock);
      setFilteredProjects(projectsMock);
      setIsLoading(false);
    }
  }, []);

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

  const handleViewProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleAddProject = () => {
    setIsAddProjectDialogOpen(true);
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
            await dbService.updateProject(projectId, { status: "Archivée", archived: true });
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
          setFilteredProjects(prev => [...prev, savedProject]);
        }
        
        return savedProject;
      } catch (err) {
        console.error("Failed to save project to database:", err);
        
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        
        if (statusFilter === "Tous" || statusFilter === "En attente") {
          setFilteredProjects(prev => [...prev, newProject]);
        }
        
        return newProject;
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Erreur lors de l'ajout du projet");
      return null;
    }
  };

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

  const calculateProjectStats = () => {
    const inProgress = filteredProjects.filter(p => p.status === "En cours").length;
    const completed = filteredProjects.filter(p => p.status === "Terminé").length;
    const pending = filteredProjects.filter(p => p.status === "En attente").length;
    const canceled = filteredProjects.filter(p => p.status === "Annulé").length;
    
    const totalBudget = filteredProjects.reduce((sum, p) => sum + p.budget.estimated, 0);
    const actualBudget = filteredProjects.reduce((sum, p) => sum + p.budget.actual, 0);
    
    const totalTasks = filteredProjects.reduce(
      (sum, p) => sum + p.phases.reduce(
        (pSum, phase) => pSum + phase.tasks.length, 0
      ), 0
    );
    
    const completedTasks = filteredProjects.reduce(
      (sum, p) => sum + p.phases.reduce(
        (pSum, phase) => pSum + phase.tasks.filter(t => t.status === "Terminée").length, 0
      ), 0
    );
    
    return {
      inProgress,
      completed,
      pending,
      canceled,
      totalBudget,
      actualBudget,
      budgetUsagePercent: totalBudget > 0 ? Math.round((actualBudget / totalBudget) * 100) : 0,
      totalTasks,
      completedTasks,
      taskCompletionPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  };

  return {
    searchTerm,
    filteredProjects,
    statusFilter,
    currentProject,
    isAddProjectDialogOpen,
    showArchived,
    isLoading,
    stats: calculateProjectStats(),
    handleSearch,
    filterByStatus,
    handleViewProject,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleArchiveProject,
    toggleArchivedView,
    addNewProject,
    addPhaseToProject,
    addTaskToPhase,
    deleteTask,
    addMemberToProject,
    setIsAddProjectDialogOpen,
    setCurrentProject
  };
};
