
import { Project, ProjectStatus, ProjectPhase, ProjectTask, ProjectMember, TaskStatus, TaskPriority } from "@/types/project";

export interface ProjectStats {
  inProgress: number;
  completed: number;
  pending: number;
  canceled: number;
  totalBudget: number;
  actualBudget: number;
  budgetUsagePercent: number;
  totalTasks: number;
  completedTasks: number;
  taskCompletionPercent: number;
}

export interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  searchTerm: string;
  statusFilter: ProjectStatus | "Tous";
  currentProject: Project | null;
  isAddProjectDialogOpen: boolean;
  showArchived: boolean;
  isLoading: boolean;
}

export interface ProjectActions {
  setSearchTerm: (term: string) => void;
  setFilteredProjects: (projects: Project[]) => void;
  setStatusFilter: (status: ProjectStatus | "Tous") => void;
  setCurrentProject: (project: Project | null) => void;
  setIsAddProjectDialogOpen: (isOpen: boolean) => void;
  setShowArchived: (show: boolean) => void;
  setProjects: (projects: Project[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}
