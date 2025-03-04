
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Project, projectsMock } from "@/types/project";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { ProjectState, ProjectActions } from "./types";

export const useProjectsData = (): [ProjectState, ProjectActions] => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState<ProjectState["statusFilter"]>("Tous");
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

  const state: ProjectState = {
    searchTerm,
    projects,
    filteredProjects,
    statusFilter,
    currentProject,
    isAddProjectDialogOpen,
    showArchived,
    isLoading
  };

  const actions: ProjectActions = {
    setSearchTerm,
    setFilteredProjects,
    setStatusFilter,
    setCurrentProject,
    setIsAddProjectDialogOpen,
    setShowArchived,
    setProjects,
    setIsLoading
  };

  return [state, actions];
};
