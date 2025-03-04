
import { Project } from "@/types/project";
import { ProjectStats } from "./types";

export const useProjectStats = (filteredProjects: Project[]): ProjectStats => {
  const calculateProjectStats = (): ProjectStats => {
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

  return calculateProjectStats();
};
