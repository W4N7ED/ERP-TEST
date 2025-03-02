
import { useState } from "react";
import { toast } from "sonner";
import { Project, projectsMock, ProjectStatus } from "@/types/project";

export const useProjectsState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>(projectsMock);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsMock);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "Tous">("Tous");
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

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
    
    // Filter by status
    if (status !== "Tous") {
      filtered = filtered.filter(project => project.status === status);
    }
    
    // Filter by search term
    if (term.trim() !== "") {
      filtered = filtered.filter(
        project => 
          project.name.toLowerCase().includes(term.toLowerCase()) ||
          project.reference.toLowerCase().includes(term.toLowerCase()) ||
          (project.client && project.client.toLowerCase().includes(term.toLowerCase())) ||
          project.location.toLowerCase().includes(term.toLowerCase())
      );
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

  const handleDeleteProject = (project: Project) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.name}" ?`)) {
      const updatedProjects = projects.filter(p => p.id !== project.id);
      setProjects(updatedProjects);
      setFilteredProjects(filteredProjects.filter(p => p.id !== project.id));
      toast.success(`Projet "${project.name}" supprimé avec succès`);
    }
  };

  const addNewProject = (projectData: {
    name: string;
    reference: string;
    client?: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
    estimatedBudget?: number;
  }) => {
    // Créer un nouvel ID (simpliste, dans un vrai système ce serait géré par le backend)
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    
    // Créer le nouveau projet
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
    
    // Mettre à jour l'état
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    
    // Mettre à jour les projets filtrés si nécessaire
    if (statusFilter === "Tous" || statusFilter === "En attente") {
      setFilteredProjects(prev => [...prev, newProject]);
    }
    
    return newProject;
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
    stats: calculateProjectStats(),
    handleSearch,
    filterByStatus,
    handleViewProject,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    addNewProject,
    setIsAddProjectDialogOpen,
    setCurrentProject
  };
};
