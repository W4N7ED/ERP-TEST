
import { Project } from "@/types/project";
import { localStorageAdapter } from "../storage/localStorageAdapter";

const PROJECTS_KEY = 'projects';

/**
 * Opérations sur les projets
 */
export const projectOperations = {
  /**
   * Récupère tous les projets
   */
  getAll(): Project[] {
    return localStorageAdapter.getData<Project[]>(PROJECTS_KEY) || [];
  },

  /**
   * Sauvegarde tous les projets
   */
  saveAll(projects: Project[]): boolean {
    return localStorageAdapter.saveData(PROJECTS_KEY, projects);
  },

  /**
   * Ajoute un projet
   */
  add(project: Omit<Project, "id">): Project {
    const projects = this.getAll();
    
    const newId = projects.length > 0 
      ? Math.max(...projects.map(p => p.id)) + 1 
      : 1;
      
    const newProject = { ...project, id: newId } as Project;
    projects.push(newProject);
    
    this.saveAll(projects);
    return newProject;
  },

  /**
   * Met à jour un projet
   */
  update(id: number, partialProject: Partial<Project>): Project | null {
    const projects = this.getAll();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    const updated = { ...projects[index], ...partialProject };
    projects[index] = updated;
    
    this.saveAll(projects);
    return updated;
  },

  /**
   * Supprime un projet
   */
  delete(id: number): boolean {
    const projects = this.getAll();
    const initialLength = projects.length;
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (filteredProjects.length < initialLength) {
      this.saveAll(filteredProjects);
      return true;
    }
    
    return false;
  }
};
