
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Project, projectsMock } from "@/types/project";
import { getDatabaseInstance } from "@/services/database/databaseFactory";
import { ProjectState, ProjectActions } from "./types";
import { shouldUseMockData } from "@/utils/databaseCheck";

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
        
        // Only use mock data if we should be using it and no real data was returned
        if (shouldUseMockData() && data.length === 0) {
          setProjects(projectsMock);
          setFilteredProjects(projectsMock);
        } else {
          setProjects(data);
          setFilteredProjects(data);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
        
        // Only use mock data as fallback if we're in mock mode
        if (shouldUseMockData()) {
          toast.error("Échec du chargement des projets. Utilisation des données de démonstration.");
          setProjects(projectsMock);
          setFilteredProjects(projectsMock);
        } else {
          toast.error("Échec du chargement des projets. Veuillez vérifier la connexion à la base de données.");
          setProjects([]);
          setFilteredProjects([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    try {
      loadProjects();
    } catch (err) {
      console.warn("Database not initialized yet:", err);
      
      // Only use mock data if we should be using it
      if (shouldUseMockData()) {
        setProjects(projectsMock);
        setFilteredProjects(projectsMock);
      } else {
        setProjects([]);
        setFilteredProjects([]);
      }
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
