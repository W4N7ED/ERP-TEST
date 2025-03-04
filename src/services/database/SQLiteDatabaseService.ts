
import { DatabaseService, DatabaseConfig } from "./types";
import { Intervention } from "@/types/intervention";
import { Project } from "@/types/project";
import { toast } from "sonner";

// SQLite-specific implementation using localStorage for the browser environment
export class SQLiteDatabaseService implements DatabaseService {
  private connected: boolean = false;
  private config: DatabaseConfig;
  private projects: Project[] = [];
  private interventions: Intervention[] = [];

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<{ success: boolean; message: string }> {
    try {
      // In browser environment - use localStorage
      this.loadFromLocalStorage();
      
      this.connected = true;
      return { 
        success: true, 
        message: `Connected to SQLite database ${this.config.database || 'in memory'}` 
      };
    } catch (error) {
      console.error("Error connecting to SQLite database:", error);
      return { 
        success: false, 
        message: `Failed to connect to SQLite database: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  }

  private loadFromLocalStorage() {
    try {
      const projectsData = localStorage.getItem('projects');
      if (projectsData) {
        this.projects = JSON.parse(projectsData);
      }
      
      const interventionsData = localStorage.getItem('interventions');
      if (interventionsData) {
        this.interventions = JSON.parse(interventionsData);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      toast.error("Error loading saved data");
    }
  }

  private saveToStorage() {
    // Save to localStorage
    try {
      localStorage.setItem('projects', JSON.stringify(this.projects));
      localStorage.setItem('interventions', JSON.stringify(this.interventions));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast.error("Error saving data");
    }
  }

  async disconnect(): Promise<void> {
    this.saveToStorage();
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async getInterventions(): Promise<Intervention[]> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    return [...this.interventions];
  }

  async addIntervention(intervention: Omit<Intervention, "id">): Promise<Intervention> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const newId = this.interventions.length > 0 
      ? Math.max(...this.interventions.map(i => i.id)) + 1 
      : 1;
      
    const newIntervention = { ...intervention, id: newId } as Intervention;
    this.interventions.push(newIntervention);
    
    this.saveToStorage();
    return newIntervention;
  }

  async updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | null> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const index = this.interventions.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    const updated = { ...this.interventions[index], ...intervention };
    this.interventions[index] = updated;
    
    this.saveToStorage();
    return updated;
  }

  async deleteIntervention(id: number): Promise<boolean> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const initialLength = this.interventions.length;
    this.interventions = this.interventions.filter(i => i.id !== id);
    const success = this.interventions.length < initialLength;
    
    if (success) {
      this.saveToStorage();
    }
    
    return success;
  }

  async getTechnicians(): Promise<string[]> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const technicians = new Set<string>();
    this.interventions.forEach(i => {
      if (i.technician) technicians.add(i.technician);
    });
    
    return Array.from(technicians);
  }

  async getClients(): Promise<string[]> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const clients = new Set<string>();
    this.interventions.forEach(i => {
      if (i.client) clients.add(i.client);
    });
    
    return Array.from(clients);
  }

  // Methods for project handling
  async getProjects(): Promise<Project[]> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    return [...this.projects];
  }
  
  async addProject(project: Omit<Project, "id">): Promise<Project> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const newId = this.projects.length > 0 
      ? Math.max(...this.projects.map(p => p.id)) + 1 
      : 1;
      
    const newProject = { ...project, id: newId } as Project;
    this.projects.push(newProject);
    
    this.saveToStorage();
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<Project>): Promise<Project | null> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updated = { ...this.projects[index], ...project };
    this.projects[index] = updated;
    
    this.saveToStorage();
    return updated;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    if (!this.connected) {
      throw new Error("Not connected to database");
    }
    
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    const success = this.projects.length < initialLength;
    
    if (success) {
      this.saveToStorage();
    }
    
    return success;
  }
}
